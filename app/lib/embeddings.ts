import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Generate text embeddings using a simple character frequency approach
 * This is a free alternative to OpenAI embeddings
 */
export function generateSimpleEmbedding(text: string): number[] {
  // Normalize text
  const normalized = text.toLowerCase().trim();
  
  // Create a simple embedding based on:
  // 1. Character frequencies
  // 2. Word patterns
  // 3. Common themes
  
  const embedding: number[] = new Array(384).fill(0);
  
  // Character frequency features (first 26 dimensions)
  for (let i = 0; i < normalized.length; i++) {
    const charCode = normalized.charCodeAt(i);
    if (charCode >= 97 && charCode <= 122) { // a-z
      embedding[charCode - 97]++;
    }
  }
  
  // Common book-related keywords (dimensions 26-100)
  const keywords = [
    'fantasy', 'adventure', 'magic', 'mystery', 'romance', 'thriller',
    'science', 'fiction', 'horror', 'drama', 'comedy', 'war', 'historical',
    'contemporary', 'young', 'adult', 'children', 'family', 'friendship',
    'love', 'death', 'hero', 'villain', 'quest', 'journey', 'discovery'
  ];
  
  keywords.forEach((keyword, index) => {
    if (normalized.includes(keyword)) {
      embedding[26 + index] = 1;
    }
  });
  
  // Normalize the embedding
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  return embedding.map(val => magnitude > 0 ? val / magnitude : 0);
}

/**
 * Calculate cosine similarity between two vectors
 */
export function cosineSimilarity(vec1: number[], vec2: number[]): number {
  if (vec1.length !== vec2.length) {
    throw new Error('Vectors must have the same length');
  }
  
  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;
  
  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i] * vec2[i];
    magnitude1 += vec1[i] * vec1[i];
    magnitude2 += vec2[i] * vec2[i];
  }
  
  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);
  
  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;
  }
  
  return dotProduct / (magnitude1 * magnitude2);
}

/**
 * Extract keywords from a book description using Llama
 */
export async function extractKeywords(description: string): Promise<string[]> {
  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are a literary expert. Extract 8-10 single-word or two-word key themes, genres, and keywords from book descriptions. Return ONLY a comma-separated list with NO periods or extra punctuation. Example: science fiction, adventure, space, survival, mystery',
        },
        {
          role: 'user',
          content: `Extract keywords from this book description:\n\n${description}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 100,
    });

    const keywords = response.choices[0]?.message?.content
      ?.split(',')
      .map(k => k.trim().toLowerCase().replace(/[.,!?;]/g, ''))
      .filter(k => k.length > 2 && k.split(' ').length <= 2) // Only 1-2 word keywords
      || [];
    
    return keywords;
  } catch (error) {
    console.error('Error extracting keywords:', error);
    return [];
  }
}

/**
 * Generate explanation for why books are similar using Llama
 */
export async function generateSimilarityExplanation(
  book1Title: string,
  book1Description: string,
  book2Title: string,
  book2Description: string
): Promise<string> {
  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are a literary expert. Explain why two books are similar in 1-2 concise sentences.',
        },
        {
          role: 'user',
          content: `Why are these two books similar?\n\nBook 1: ${book1Title}\nDescription: ${book1Description}\n\nBook 2: ${book2Title}\nDescription: ${book2Description}`,
        },
      ],
      temperature: 0.5,
      max_tokens: 100,
    });

    return response.choices[0]?.message?.content || 'Similar themes and style.';
  } catch (error) {
    console.error('Error generating explanation:', error);
    return 'Similar themes and style.';
  }
}
