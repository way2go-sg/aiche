import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import MagneticLine from './MagnetLines';

interface EventItem {
  id: string;
  title: string;
  description: string;
  color: string;
  dotColor: string;
  gradient: string;
  colSpan?: string;
  type: string;
}

const events: EventItem[] = [
  {
    id: 'bbc',
    title: 'Bid Build Curate',
    description: 'Mystery met Mastery. Teams clashed in high voltage auctions, then raced the clock to craft brilliance from chaos.',
    color: 'text-emerald-400',
    dotColor: 'bg-emerald-400',
    gradient: 'from-emerald-500/20 to-emerald-900/5',
    colSpan: 'md:col-span-1',
    type: `GRAVITAS'24`,
  },
  {
    id: 'ae',
    title: 'Alchemy Empire',
    description: 'Ambition meets Strategy. Teams forged daring contracts and raced to craft innovations that could redefine industries.',
    color: 'text-amber-400',
    dotColor: 'bg-amber-400',
    gradient: 'from-amber-500/20 to-amber-900/5',
    colSpan: 'md:col-span-1',
    type: `GRAVITAS'24`,
  },
  {
    id: 'otr',
    title: 'On The Rocks',
    description: 'Creativity and precision wove together, each experiment a delicate dance of discovery and crystal craftsmanship.',
    color: 'text-cyan-400',
    dotColor: 'bg-cyan-400',
    gradient: 'from-cyan-500/20 to-cyan-900/5',
    colSpan: 'md:col-span-1',
    type: `GRAVITAS'24`,
  },
  {
    id: 'astro',
    title: 'Astroworld',
    description: 'Blending the mysteries of the cosmos with the thrill of hands-on exploration and decoding Morse codes to uncover secrets hidden in the stars.',
    color: 'text-rose-400',
    dotColor: 'bg-rose-500',
    gradient: 'from-rose-500/20 to-rose-900/5',
    colSpan: 'md:col-span-2',
    type: `GRAVITAS'24`,
  },  
  {
    id: 'yantra',
    title: 'The Elemental Fourfold Forge',
    description: 'The Elemental Fourfold Forge was a two-day group hackathon organized by AIChE-VIT, in collaboration with VITSpartans. The event featured two structured rounds. In the first round, teams identified a real-world problem and presented the reason behind their selection. Round 2 pushed boundaries further with prototype implementation.',
    color: 'text-purple-400',
    dotColor: 'bg-purple-500',
    gradient: 'from-purple-500/20 to-purple-900/5',
    colSpan: 'md:col-span-3',
    type: `YANTRA'25`,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  },
};

interface BentoCardProps {
  event: EventItem;
  index: number;
}
const BentoCard = ({ event, index }: BentoCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      variants={cardVariants}
      onClick={() => setIsOpen(!isOpen)}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-zinc-900 border border-white/10 p-8 transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-black/50 cursor-pointer ${event.colSpan || 'col-span-1'}`}
    >
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} 
      />

      {/* --- Header Section with Tag --- */}
      <motion.div layout="position" className="relative z-10 flex w-full items-center justify-between mb-4">
        <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
            {(index + 1).toString().padStart(2, '0')} / EVENT
            </span>

            {/* === GLASSMORPHIC TAG ADDED HERE === */}
            <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 backdrop-blur-md text-[10px] font-mono font-bold tracking-wider text-zinc-300 shadow-sm">
                {event.type}
            </span>
        </div>
        
        <span className="relative flex h-3 w-3">
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-0 group-hover:opacity-75 ${event.dotColor}`}></span>
          <span className={`relative inline-flex h-3 w-3 rounded-full ${event.dotColor}`}></span>
        </span>
      </motion.div>

      <div className="relative z-10">
        <motion.h3 
          layout="position"
          className="mb-3 text-3xl font-bold leading-none tracking-tight text-white group-hover:translate-x-1 transition-transform duration-300"
        >
          {event.title}
        </motion.h3>
        
        <motion.div layout="position">
            <p className={`text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300 ${isOpen ? '' : 'line-clamp-3'}`}>
                {event.description}
            </p>
        </motion.div>
      </div>

      <motion.div layout="position" className="relative z-10 mt-8 flex items-center gap-2 overflow-hidden">
        <div className={`h-[1px] w-full bg-white/10 group-hover:bg-white/30 transition-colors`} />
        {/* If you want text here, add children, otherwise it's just a spacer line currently */}
        <motion.span 
            key={isOpen ? "close" : "view"}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`font-mono text-xs uppercase ${event.color} whitespace-nowrap`}
        >
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

const GravitasEventsGallery = () => {
  return (
    // Ensure parent background is set (e.g., bg-[#111] or bg-black)
    <section className="min-h-screen w-full px-6 py-24 selection:bg-white selection:text-black">
      <MagneticLine/>
      <div className="mx-auto max-w-7xl">     
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
              [ Events ]
            </p>
            <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9]">
              Highlights
            </h2>
          </div>
          <p className="md:max-w-xs text-zinc-400 text-sm leading-relaxed pb-2">
            A collection of technical prowess and creative engineering from our recent flagship hackathons.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 grid-cols-1 md:grid-cols-3 auto-rows-fr"
        >
          {events.map((event, i) => (
            <BentoCard key={event.id} event={event} index={i} />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default GravitasEventsGallery;