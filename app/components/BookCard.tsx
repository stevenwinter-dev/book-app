import Image from "next/image";

interface BookCardProps {
  title: string;
  author: string;
  description?: string;
  coverImage?: string;
  publishedYear?: string;
}

export default function BookCard({
  title,
  author,
  description,
  coverImage,
  publishedYear,
}: BookCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
      {/* Book Cover */}
      <div className="relative h-72 bg-linear-to-br from-indigo-100 to-cyan-100 flex items-center justify-center overflow-hidden">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={`Cover of ${title}`}
            width={350}
            height={288}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-6xl">📚</div>
        )}
      </div>

      {/* Book Info */}
      <div className="p-6 space-y-3">
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-sm font-medium text-gray-600">
          by {author}
        </p>

        {publishedYear && (
          <p className="text-xs text-gray-500">
            Published: {publishedYear}
          </p>
        )}

        {description && (
          <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
            {description}
          </p>
        )}

        <button className="w-full mt-4 bg-linear-to-r from-indigo-400 to-cyan-400 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg">
          View Details
        </button>
      </div>
    </div>
  );
}
