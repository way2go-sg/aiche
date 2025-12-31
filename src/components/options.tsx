import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import image from '../assets/black.jpeg';
import image2 from '../assets/black.jpeg';
import image3 from '../assets/black.jpeg';

// Data structure for cleaner code
const sectors = [
  {
    id: 'car',
    title: 'Chem-E-Car',
    subtitle: 'KINETICS // PROPULSION',
    description: "In the crucible of innovation, where chemistry breathes life into motion. Chem-E-Car is forged—a journey that immerses you in the art and science of chemical engineering, bringing to life a vehicle driven by the magic of reaction.",
    img: image,
  },
  {
    id: 'cube',
    title: 'Chem-E-Cube',
    subtitle: 'OPTIMIZE // INTENSIFY',
    description: "A place where ideation meets practicality. We investigate major industrial problems and find innovative, novel solutions by scaling them down to a precision-engineered 1ft³ cube.",
    img: image2,
  },
  {
    id: 'k12',
    title: 'K-12 Outreach',
    subtitle: 'EDUCATION // FUTURE',
    description: "The definition of 'Learning with Fun'. Here, students become the teachers who simplify complex science topics, igniting the spark of engineering in young minds from Kindergarten to 12th grade.",
    img: image3,
  },
];

const Options = () => {
  // Track which card is active. Default to the middle one (or first)
  const [activeId, setActiveId] = useState<string | null>('car');

  return (
    <div className="flex flex-col mt-20 mb-24 w-full px-4 md:px-0">
      
      {/* Header Section */}
      <div className="mb-12 flex flex-col items-center text-center">
        <h2 className="lg:text-8xl text-5xl tracking-tighter heading-text uppercase mb-4">
          Where You<br/>Belong
        </h2>
        <div className="h-1 w-24 bg-black mb-4"></div>
        <p className="font-mono text-sm tracking-widest opacity-60">
          /// SELECT_WING_TO_INITIALIZE
        </p>
      </div>

      {/* The Kinetic Accordion Container */}
      <div className="flex flex-col md:flex-row w-full h-[800px] md:h-[600px] border-y-2 border-black bg-black">
        
        {sectors.map((sector) => (
          <motion.div
            key={sector.id}
            layout
            onClick={() => setActiveId(sector.id)}
            onHoverStart={() => setActiveId(sector.id)}
            className={`
              relative flex h-full cursor-pointer overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-dashed border-[#E6D5B8]/50 last:border-0
              ${activeId === sector.id ? 'flex-[3]' : 'flex-[1]'}
            `}
            transition={{ type: 'spring', stiffness: 120, damping: 12 }}
          >
            {/* Background Image with Tint */}
            <div className="absolute inset-0">
              <img 
                src={sector.img} 
                alt={sector.title} 
                className={`h-full w-full object-cover transition-all duration-700 ${activeId === sector.id ? 'scale-110 grayscale-0' : 'scale-100 grayscale opacity-40'}`}
              />
              {/* Dark Gradient Overlay */}
              <div className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${activeId === sector.id ? 'opacity-30' : 'opacity-80'}`}></div>
            </div>

            {/* CONTENT LAYER */}
            <div className="relative z-10 flex h-full w-full flex-col justify-end p-6 md:p-10 text-[#E6D5B8]">
              
              {/* Vertical Title for Collapsed State (Desktop Only) */}
              {activeId !== sector.id && (
                <div className="hidden md:flex absolute inset-0 items-center justify-center">
                  <h3 className="-rotate-90 whitespace-nowrap text-4xl font-bold uppercase tracking-widest opacity-60">
                    {sector.title}
                  </h3>
                </div>
              )}

              {/* Active Content */}
              <AnimatePresence mode='wait'>
                {activeId === sector.id && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    {/* Decorative Tag */}
                    <div className="mb-4 inline-block border border-[#E6D5B8] px-2 py-1 font-mono text-xs uppercase backdrop-blur-md">
                      {sector.subtitle}
                    </div>

                    <h3 className="mb-6 text-4xl md:text-6xl font-bold leading-none uppercase heading-text">
                      {sector.title}
                    </h3>
                    
                    <p className="max-w-md text-sm md:text-base font-mono leading-relaxed opacity-90 options-text bg-black/50 p-4 border-l-2 border-[#E6D5B8]">
                      {sector.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile Title (Always visible if active or on mobile) */}
              <div className="md:hidden block mt-auto">
                 {activeId !== sector.id && <h3 className="text-2xl font-bold uppercase">{sector.title}</h3>}
              </div>

            </div>

            {/* Decorative Crosshairs */}
            <div className="absolute top-4 right-4 h-4 w-4 border-t border-r border-[#E6D5B8]/50"></div>
            <div className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-[#E6D5B8]/50"></div>

          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Options;