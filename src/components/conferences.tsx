import React from 'react';
import { motion } from 'framer-motion';

// --- Types ---
interface TiltCardProps {
  title: string;
  subtitle: string;
  tag: string;
  text: string;
  delay?: number;
}

// --- 3D Tilt Card Component ---
const TiltCard: React.FC<TiltCardProps> = ({ title, subtitle, tag, text}) => {

  // Motion values for mouse position


  return (
    <motion.div
      className="relative group w-full"
    >
      <div 
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="relative h-full bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2rem] backdrop-blur-md shadow-2xl overflow-hidden"
      >
        {/* Hover Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#91191a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Decorative Tag */}
        <div className="flex justify-between items-start mb-6">
            <span className="font-mono text-xs text-[#91191a] bg-white/90 px-2 py-1 rounded-md font-bold tracking-widest uppercase">
                {tag}
            </span>
      
        </div>

        {/* Header */}
        <div className="relative z-10 mb-6">
          <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">
            {title}
          </h3>
          <p className="text-white/60 font-mono text-sm uppercase tracking-widest">
            {subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="relative z-10">
            <p className="text-white/80 font-light leading-relaxed text-sm md:text-base">
                {text}
            </p>
        </div>

        {/* Visual Decoration Bottom Right */}
        <div className="absolute bottom-6 right-6 opacity-20">
            <div className="flex gap-1">
                <div className="w-2 h-2 bg-white rounded-full" />
                <div className="w-2 h-2 bg-white rounded-full" />
                <div className="w-2 h-2 bg-transparent border border-white rounded-full" />
            </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Container ---
const Conferences: React.FC = () => {
  return (
    <section className="relative w-full py-24 px-6 perspective-1000">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-16 md:mb-24 border-l-2 border-white/20 pl-6"
        >
            <h2 className="text-white text-3xl md:text-6xl font-bold uppercase tracking-tight">
                Global & <span className="text-white/40">Regional</span>
            </h2>
            <p className="text-white/50 mt-2 font-mono text-xs md:text-sm tracking-widest">
                AIChE-VIT STUDENT CHAPTER PRESENCE
            </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 perspective-origin-center">
          <TiltCard
            tag="01 // REGIONAL"
            title="SRC"
            subtitle="Student Regional Conference"
            text="The AIChE Student Regional Conference (SRC) is one of the most anticipated annual events for chemical engineering students across India. Hosted each year by a different AIChE student chapter, the SRC brings together hundreds of students, faculty members, researchers, and industry professionals for a high-energy weekend of learning, competition, and collaboration. At its core, the SRC is designed to celebrate innovation, foster professional growth, and strengthen the student community within AIChE."
          />
          <TiltCard
            tag="02 // INTERNATIONAL"
            title="ASC"
            subtitle="Annual Student Conference"
            text="The Annual Student Conference (ASC) is the pinnacle of chemical engineering gatherings, a global stage where the brightest student minds converge to push the boundaries of innovation. Unlike typical conferences where ideas are merely discussed, ASC is where concepts are tested, executed, and brought to life. AIChE VIT has proudly marked its presence at this prestigious platform twice, representing India with distinction and demonstrating that our students compete at the highest level."
          />
        </div>

      </div>
    </section>
  );
};

export default Conferences;