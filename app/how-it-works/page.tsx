"use client";

import Link from "next/dist/client/link";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-cyan-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              BookMatch
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium transition">Home</Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-gray-900 font-medium transition">How It Works</Link>
              <button className="bg-gradient-to-r from-indigo-400 to-cyan-400 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            How
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}BookMatch{" "}
            </span>
            Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered recommendation engine uses advanced natural language processing 
            to find books that truly match your taste.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-20">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-200/30 p-8 md:p-10 border border-gray-100 hover:shadow-2xl hover:shadow-indigo-200/50 transition-shadow duration-300">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">You Tell Us What You Love</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Simply type in the title of a book you enjoyed. Add the author for even more precise results. 
                  That&apos;s it—we handle the rest!
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-200/30 p-8 md:p-10 border border-gray-100 hover:shadow-2xl hover:shadow-indigo-200/50 transition-shadow duration-300">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">We Analyze the Story</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our system fetches the book&apos;s complete description and dives deep into its themes, 
                  plot elements, writing style, and emotional tone to understand what makes it special.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-200/30 p-8 md:p-10 border border-gray-100 hover:shadow-2xl hover:shadow-indigo-200/50 transition-shadow duration-300">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">AI Extracts the Magic</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Using Llama 3.3 AI, we identify key themes, genres, and narrative elements—
                  like &quot;high fantasy,&quot; &quot;coming-of-age,&quot; or &quot;space adventure&quot;—that define your book.
                </p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-200/30 p-8 md:p-10 border border-gray-100 hover:shadow-2xl hover:shadow-indigo-200/50 transition-shadow duration-300">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">We Search the World of Books</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We search across thousands of books using those themes, pulling candidates from different 
                  eras—recent releases, modern classics, and timeless favorites—to ensure diverse recommendations.
                </p>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-200/30 p-8 md:p-10 border border-gray-100 hover:shadow-2xl hover:shadow-indigo-200/50 transition-shadow duration-300">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
                5
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Vector Matching Engine</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Each book&apos;s description is transformed into a mathematical vector—a unique fingerprint of its essence. 
                  We compare these vectors to measure true similarity, not just keyword matches.
                </p>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-200/30 p-8 md:p-10 border border-gray-100 hover:shadow-2xl hover:shadow-indigo-200/50 transition-shadow duration-300">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
                6
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Top Matches Are Selected</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Books are ranked by similarity scores. Only those with meaningful connections make the cut—
                  no random suggestions, just books you&apos;ll genuinely love.
                </p>
              </div>
            </div>
          </div>

          {/* Step 7 */}
          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-200/30 p-8 md:p-10 border border-gray-100 hover:shadow-2xl hover:shadow-indigo-200/50 transition-shadow duration-300">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
                7
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">AI Explains Why</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  For each recommendation, our AI generates a personalized explanation showing exactly why 
                  it matches your book—so you know it&apos;s the perfect next read!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-3xl p-12 shadow-2xl shadow-indigo-200/50">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Find Your Next Favorite Book?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of readers discovering amazing books with AI-powered precision.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-shadow"
            >
                Get Started Now
            </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 mt-20 bg-white/50">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2025 BookMatch. Powered by AI, built for book lovers.</p>
        </div>
      </footer>
    </div>
  );
}
