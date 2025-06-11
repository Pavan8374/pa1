// app/gallery/page.tsx
export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          Digital Cosmos Gallery
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div 
              key={index} 
              className="aspect-square rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:z-10"
            >
              <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 via-purple-600/30 to-pink-500/40 animate-gradient-xy"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}