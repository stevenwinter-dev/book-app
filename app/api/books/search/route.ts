import { NextRequest, NextResponse } from 'next/server';
import {
  generateSimpleEmbedding,
  cosineSimilarity,
  extractKeywords,
  generateSimilarityExplanation,
} from '@/app/lib/embeddings';

interface OpenLibraryBook {
  title?: string;
  author_name?: string[];
  first_sentence?: string[];
  subtitle?: string;
  cover_i?: number;
  first_publish_year?: number;
  isbn?: string[];
  key?: string;
}

interface BookWithSimilarity {
  title: string;
  author: string;
  description: string;
  coverImage: string | null;
  publishedYear: string;
  similarity: number;
  explanation?: string;
}

async function fetchBookDescription(key: string): Promise<string> {
  const workUrl = `https://openlibrary.org${key}.json`;
  try {
    const response = await fetch(workUrl);
    if (response.ok) {
      const data = await response.json();
      return data.description?.value || data.description || '';
    }
  } catch (error) {
    console.error(`Failed to fetch work details for ${key}:`, error);
  }
  return '';
}

// Filter terms to exclude study guides and non-book materials
const EXCLUDE_TERMS = ['study guide', 'companion', 'analysis', 'summary', 'cliff notes', 'sparknotes', 'workbook'];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');
    const author = searchParams.get('author');

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    console.log(`\n🔍 Step 1: Searching for "${title}"...`);

    // Step 1: Find the original book
    let query = `title:${title}`;
    if (author) {
      query += ` author:${author}`;
    }

    const searchUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5`;
    const response = await fetch(searchUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch from Open Library');
    }

    const data = await response.json();
    
    if (!data.docs || data.docs.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Book not found',
        results: [],
      });
    }

    // Filter out study guides, companions, and other non-book materials
    const validBooks = data.docs.filter((book: OpenLibraryBook) => {
      const title = (book.title || '').toLowerCase();
      return !EXCLUDE_TERMS.some(term => title.includes(term));
    });

    if (validBooks.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Book not found',
        results: [],
      });
    }

    const originalBook = validBooks[0];
    console.log(`✅ Found: "${originalBook.title}"`);

    // Step 2: Fetch the original book's description
    console.log('\n📖 Step 2: Fetching book description...');
    const originalDescription = await fetchBookDescription(originalBook.key);
    
    if (!originalDescription || originalDescription.length < 20) {
      return NextResponse.json({
        success: false,
        error: 'Could not find a detailed description for this book',
        results: [],
      });
    }

    console.log(`✅ Description length: ${originalDescription.length} characters`);

    // Step 3: Extract keywords using Llama
    console.log('\n🤖 Step 3: Extracting keywords with Llama...');
    const keywords = await extractKeywords(originalDescription);
    console.log(`✅ Keywords: ${keywords.join(', ')}`);

    // Step 4: Search for similar books using keywords
    console.log('\n🔍 Step 4: Searching for similar books...');
    // Clean keywords - remove periods, commas, and extra words
    const cleanKeywords = keywords
      .map(k => k.replace(/[.,]/g, '').trim())
      .filter(k => k.length > 2)
      .slice(0, 5);
    
    // Search multiple keywords and combine results
    console.log(`   Searching for keywords: ${cleanKeywords.join(', ')}`);
    const searchPromises = cleanKeywords.map(async (keyword) => {
      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(keyword)}&limit=20`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data.docs || [];
      }
      return [];
    });

    const searchResults = await Promise.all(searchPromises);
    
    // Combine and deduplicate results by key, filtering out study guides
    const seenKeys = new Set<string>();
    const allBooks = searchResults.flat().filter(book => {
      if (!book.key || seenKeys.has(book.key)) return false;
      const title = (book.title || '').toLowerCase();
      if (EXCLUDE_TERMS.some(term => title.includes(term))) return false;
      seenKeys.add(book.key);
      return true;
    });
    
    // Get diverse time periods - sample from different eras
    const currentYear = new Date().getFullYear();
    const categorizedBooks = {
      recent: allBooks.filter(b => b.first_publish_year && b.first_publish_year >= currentYear - 10),
      modern: allBooks.filter(b => b.first_publish_year && b.first_publish_year >= 1990 && b.first_publish_year < currentYear - 10),
      classic: allBooks.filter(b => b.first_publish_year && b.first_publish_year >= 1950 && b.first_publish_year < 1990),
      vintage: allBooks.filter(b => b.first_publish_year && b.first_publish_year < 1950),
      unknown: allBooks.filter(b => !b.first_publish_year)
    };

    // Sample from each category to ensure diversity
    const diverseBooks = [
      ...categorizedBooks.recent.slice(0, 10),
      ...categorizedBooks.modern.slice(0, 10),
      ...categorizedBooks.classic.slice(0, 5),
      ...categorizedBooks.vintage.slice(0, 3),
      ...categorizedBooks.unknown.slice(0, 2)
    ];
    
    const similarData = { docs: diverseBooks };
    console.log(`✅ Found ${similarData.docs?.length || 0} potential matches (recent: ${categorizedBooks.recent.length}, modern: ${categorizedBooks.modern.length}, classic: ${categorizedBooks.classic.length})`);

    // Step 5 & 6: Vectorize and compare
    console.log('\n🧮 Step 5 & 6: Generating vectors and comparing...');
    const originalVector = generateSimpleEmbedding(originalDescription);

    const similarBooksWithScores: BookWithSimilarity[] = await Promise.all(
      (similarData.docs || [])
        .filter((book: OpenLibraryBook) => book.key !== originalBook.key) // Exclude the original book
        .map(async (book: OpenLibraryBook) => {
          const description = await fetchBookDescription(book.key || '');
          const vector = generateSimpleEmbedding(description || 'No description');
          const similarity = cosineSimilarity(originalVector, vector);

          return {
            title: book.title || 'Unknown Title',
            author: book.author_name?.[0] || 'Unknown Author',
            description: description || 'No description available',
            coverImage: book.cover_i 
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
              : null,
            publishedYear: book.first_publish_year?.toString() || 'Unknown',
            similarity,
          };
        })
    );

    // Filter out low similarity scores and sort
    const filteredBooks = similarBooksWithScores
      .filter(book => book.similarity > 0.3) // Only keep reasonably similar books
      .sort((a, b) => b.similarity - a.similarity);

    console.log(`   Similarity scores: ${filteredBooks.slice(0, 5).map(b => `${b.title}: ${b.similarity.toFixed(3)}`).join(', ')}`);

    // Step 7: Return top 3 with explanations
    console.log('\n🏆 Step 7: Selecting top 3 matches...');
    const topMatches = filteredBooks.slice(0, 3);

    // Generate explanations for top matches
    const resultsWithExplanations = await Promise.all(
      topMatches.map(async (book) => {
        const explanation = await generateSimilarityExplanation(
          originalBook.title,
          originalDescription,
          book.title,
          book.description
        );
        return {
          ...book,
          explanation,
        };
      })
    );

    console.log(`✅ Complete! Returning ${resultsWithExplanations.length} recommendations\n`);

    return NextResponse.json({
      success: true,
      original: {
        title: originalBook.title,
        author: originalBook.author_name?.[0] || 'Unknown Author',
        description: originalDescription,
      },
      results: resultsWithExplanations,
      keywords,
    });

  } catch (error) {
    console.error('Error searching books:', error);
    return NextResponse.json(
      { error: 'Failed to search books' },
      { status: 500 }
    );
  }
}
