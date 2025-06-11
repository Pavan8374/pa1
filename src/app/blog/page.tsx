// app/blog/page.tsx
export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          Cosmic Chronicles
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((post) => (
            <div key={post} className="bg-gray-900/50 rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-purple-600 to-cyan-500"></div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-cyan-300">Exploring the React Cosmos</h2>
                <p className="text-gray-400 mb-4">
                  Journey through the latest advancements in React and how they're shaping the future of web development.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-cyan-400">May 15, 2023</span>
                  <span className="px-3 py-1 bg-cyan-900/30 text-cyan-300 rounded-full text-xs">
                    8 min read
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}