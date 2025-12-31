'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCcw, Maximize2 } from 'lucide-react';

// --- Types ---
interface GalleryItem {
  id: number;
  src: string;
  rotation: number;
  scale: number;
}

const AIChEGallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 1. Generate Data with "Controlled Chaos"
  useEffect(() => {
    const generateItems = () => {
      const newItems = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        // Using Picsum for demo. Replace with your local imports.
        src: `https://picsum.photos/600/800?random=${i + 100}`,
        // chaos level: LOW (just slight tilts)
        rotation: Math.random() * 6 - 3, // Random between -3deg and +3deg
        scale: 0.9 + Math.random() * 0.1, // Slight size variation
      }));
      setItems(newItems);
    };

    generateItems();
  }, []);

  const handleShuffle = () => {
    setItems((prev) => 
      prev.map((item) => ({
        ...item,
        rotation: Math.random() * 6 - 3,
      }))
    );
  };

  const selectedItem = items.find((i) => i.id === selectedId);

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8 font-sans selection:bg-rose-500">
      
      {/* --- Header --- */}
      <div className="max-w-7xl mx-auto flex justify-between items-end mb-12 border-b border-neutral-800 pb-6">
        <div>
          <h1 className="text-5xl font-bold tracking-tighter mb-2 bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
            The Collection
          </h1>
          <p className="text-neutral-400">
            A curated view of our journey. Drag to rearrange, click to focus.
          </p>
        </div>
        <button 
          onClick={handleShuffle}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors text-sm font-medium"
        >
          <RefreshCcw size={16} /> Re-Tilt
        </button>
      </div>

      {/* --- The Grid (Less Scrambled) --- */}
      {/* We use standard CSS Grid for structure, but individual items are tilted */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto pb-20">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layoutId={`card-${item.id}`}
            // Drag properties
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Snap back to grid when released
            dragElastic={0.2} // Feel the resistance
            
            // Initial randomness
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              rotate: item.rotation,
            }}
            whileHover={{ 
              scale: 1.05, 
              rotate: 0, // Straighten up on hover
              zIndex: 10,
              boxShadow: "0px 20px 40px rgba(0,0,0,0.5)"
            }}
            whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 50 }}
            onClick={() => setSelectedId(item.id)}
            
            className="relative aspect-[3/4] bg-white p-3 shadow-lg cursor-pointer group"
          >
            {/* The Photo */}
            <div className="w-full h-[85%] bg-gray-200 overflow-hidden relative">
               <motion.img 
                src={item.src} 
                alt="Gallery" 
                className="w-full h-full object-cover"
              />
              {/* Overlay Icon */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize2 className="text-white drop-shadow-md" />
              </div>
            </div>

            {/* The Caption */}
            <div className="h-[15%] flex items-center justify-center">
              <span className="text-gray-800 font-semibold text-sm opacity-60 font-mono">
                IMG_0{item.id}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- Lightbox Modal --- */}
      <AnimatePresence>
        {selectedId !== null && selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              layoutId={`card-${selectedId}`}
              className="relative w-auto max-w-5xl max-h-[90vh] bg-white p-2 shadow-2xl overflow-hidden"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(null);
                }}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors"
              >
                <X size={24} />
              </button>

              <motion.img
                src={selectedItem.src}
                className="w-full h-full max-h-[85vh] object-contain"
              />
              
              <div className="bg-white p-4 text-center">
                <p className="text-black font-bold text-lg font-mono">
                  Captured Memory #{selectedItem.id}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AIChEGallery;