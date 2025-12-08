"use client";

import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please enter a book title");
      return;
    }
    setError("");
    setLoading(true);
    // API call will be implemented in later steps
    setTimeout(() => {
      setLoading(false);
      setRecommendations([]);
    }, 1000);
  };

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
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition">Home</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition">About</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition">How It Works</a>
              <button className="bg-gradient-to-r from-indigo-400 to-cyan-400 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Books You&apos;ll
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Love to Read
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Tell us about a book you love, and our AI-powered engine will find your next favorite read.
            <br />
            Personalized recommendations, instantly.
          </p>
        </div>

        {/* Search Card */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-200/50 p-8 md:p-12 border border-gray-100">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-400 to-cyan-400 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                </svg>
                AI-Powered Book Discovery
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Find Your Next Read
              </h2>
              <p className="text-gray-600">
                Enter a book title and author to get personalized recommendations
              </p>
            </div>

            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Book Title <span className="text-indigo-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., The Great Gatsby"
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-base"
                />
              </div>
              
              <div>
                <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-2">
                  Author <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  id="author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g., F. Scott Fitzgerald"
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-base"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm font-medium bg-red-50 px-4 py-3 rounded-xl">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                  </svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-400 to-cyan-400 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg shadow-indigo-300/50 hover:shadow-xl hover:shadow-indigo-400/50 transition-all duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Searching...
                  </>
                ) : (
                  <>
                    Find Similar Books
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Recommended For You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Book cards will be displayed here */}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}