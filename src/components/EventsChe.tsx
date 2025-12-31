import React from 'react';
import { motion } from 'framer-motion';

const ChemicalHighlight = ({ children }: { children: React.ReactNode }) => (
  <motion.span 
    className="relative inline-block font-bold cursor-pointer px-1 mx-1 overflow-hidden align-bottom group"
    whileHover={{ scale: 1.02 }}
  >

    <motion.span 
      className="absolute inset-0 bg-[#1a1a1a] z-0"
      initial={{ y: "100%" }}
      whileHover={{ y: "0%" }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    />
    <span className="relative z-10 transition-colors duration-200 group-hover:text-white">
      {children}
    </span>
  </motion.span>
);

const FoodSelection = () => {
  return (
    <div className="w-full flex justify-center py-12">
      
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Custom bezier for that "premium" snap
        className="relative w-full max-w-5xl"
      >
      
        <div className="relative p-8 md:p-14 rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] overflow-hidden">
          
          <div className="absolute top-6 right-6 flex flex-col items-end opacity-40">
            <span className="font-mono text-xs tracking-[0.2em] text-black">SEC:01</span>
            <div className="w-12 h-[1px] bg-black mt-1"></div>
          </div>

          <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-black/30"></div>
          
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply"></div>

          <div className="relative z-10 flex flex-col gap-10 text-black">

            <div className="flex items-center gap-4">
              <div className="h-[2px] w-8 bg-black"></div>
              <h3 className="font-mono text-sm tracking-widest uppercase opacity-70">Event Brief</h3>
            </div>

            <div className="flex flex-col gap-8 text-lg md:text-2xl font-medium leading-relaxed tracking-tight">
              
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                The flagship event of <span className="font-extrabold">AIChE-VIT</span>, Chem-A-Thon, isn't just a competition—it's a crucible. We challenge undergraduates to shatter the glass ceiling of theory and forge
                 <ChemicalHighlight>practical solutions</ChemicalHighlight> 
                for global crises.
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-black/80"
              >
                During this <span className="font-bold border-b-2 border-black">36-hour hackathon</span>, we hosted <span className="font-bold">Chem-A-Thon 6.0</span> (Feb 14–16, 2025) in collaboration with SCHEME. 
                From Environmental Sustainability to Product Design, teams navigated faculty-led checkpoints to engineer the future.
              </motion.p>
              
            </div>

            {/* Footer Signature */}
            <div className="pt-6 border-t border-black/10 flex justify-between items-end">
               <span className="font-mono text-xs text-black/40">AUTHORIZED BY AIChE-VIT</span>
               <div className="flex gap-1">
                 {[...Array(3)].map((_, i) => (
                   <div key={i} className="w-1.5 h-1.5 rounded-full bg-black/20"></div>
                 ))}
               </div>
            </div>

          </div>
        </div>
        
        {/* Outer Glow for depth */}
        <div className="absolute -inset-1 bg-white/20 blur-xl -z-10 rounded-[2.5rem]"></div>
      
      </motion.div>
    </div>
  );
};

export default FoodSelection;