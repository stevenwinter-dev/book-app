import { NextRequest, NextResponse } from 'next/server';

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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const title = searchParams.get('title');
    const author = searchParams.get('author');

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Build Open Library search query
    let query = `title:${title}`;
    if (author) {
      query += ` author:${author}`;
    }

    // Search Open Library API
    const searchUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`;
    const response = await fetch(searchUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch from Open Library');
    }

    const data = await response.json();
    console.log('Raw Open Library API response:', data);

    // Parse and format the results
    const books = await Promise.all(
      data.docs?.map(async (book: OpenLibraryBook) => {
        let description = 'No description available';
        let genres: string[] = [];

        // Fetch additional data from the Works API if the key is available
        if (book.key) {
          const workUrl = `https://openlibrary.org${book.key}.json`;
          try {
            const workResponse = await fetch(workUrl);
            if (workResponse.ok) {
              const workData = await workResponse.json();
              description = workData.description?.value || workData.description || description;
              genres = workData.subjects || [];
            }
          } catch (error) {
            console.error(`Failed to fetch work details for ${book.key}:`, error);
          }
        }

        return {
          title: book.title || 'Unknown Title',
          author: book.author_name?.[0] || 'Unknown Author',
          description,
          subtitle: book.subtitle || 'No subtitle available',
          genres,
          coverImage: book.cover_i 
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : null,
          publishedYear: book.first_publish_year?.toString() || 'Unknown',
          isbn: book.isbn?.[0] || null,
          key: book.key || null,
        };
      }) || []
    );

    // Log the first book's details
    if (books.length > 0) {
      const firstBook = books[0];
      console.log('First Book Details:', {
        title: firstBook.title,
        description: firstBook.description,
        subtitle: firstBook.subtitle,
        genres: firstBook.genres,
      });
    }

    return NextResponse.json({
      success: true,
      results: books,
      total: data.numFound || 0,
    });

  } catch (error) {
    console.error('Error searching books:', error);
    return NextResponse.json(
      { error: 'Failed to search books' },
      { status: 500 }
    );
  }
}
