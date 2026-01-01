import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 1. Reduced total visible duration to 1 second
    const timer = setTimeout(() => setIsVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode='wait'>
      {isVisible && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none font-serif">
          
          {/* --- Background Layers --- */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
            className="absolute inset-0 bg-[#4a0a0a] z-30"
          />
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.05 }}
            className="absolute inset-0 bg-[#8e1a1a] z-40"
          />
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#a32222] z-50"
          />

          {/* --- Content --- */}
          <motion.div
            className="relative z-[60] flex flex-col items-center justify-center p-10 pl-8"
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Top Text */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                className="text-6xl md:text-8xl font-bold text-[#eaddcf] tracking-tight leading-none"
              >
                AIChE
              </motion.h1>
            </div>

            {/* 2. ROTATING LOADING LINE */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: "40px", 
                opacity: 1,
                rotate: 360 // Spin a full 360 degrees
              }}
              transition={{ 
                height: { duration: 0.3, delay: 0.1 },
                opacity: { duration: 0.2, delay: 0.1 },
                rotate: { 
                  duration: 0.5, // Faster spin to match the shorter 1s lifespan
                  ease: "linear", 
                  repeat: Infinity // Keeps spinning
                }
              }}
              className="w-[2px] bg-[#d4b483] my-2"
            />

            {/* Bottom Text */}
            <div className="overflow-hidden w-full flex justify-center">
              <motion.h2
                initial={{ y: "-110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
                className="text-3xl md:text-5xl italic text-[#d4b483]"
              >
                VIT
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-6 text-[#eaddcf]/80 text-xs md:text-sm tracking-[0.3em] uppercase font-sans"
            >
              Est. 2014
            </motion.p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;