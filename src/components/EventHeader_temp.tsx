import React, {useState} from 'react';

import { motion, Variants, useScroll, useMotionValueEvent } from 'framer-motion';
import img1 from '../assets/chemathon.png';
import sidebar from '../assets/sidebarmenu.png';
import logo from '../assets/header.png';
//import classNames from 'classnames';

interface EventHeaderProps {
  hours: string;
  schedule: string;
  title: string;
}

const Events: React.FC<EventHeaderProps> = ({ schedule, title, hours }) => {
  const [isHidden, setIsHidden] = useState(false);

  const { scrollY } = useScroll();
  const handleClick = (url: string) => { window.location.href = url; };
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        // Hide if scrolling down and moved past 150px
        if (latest > previous && latest > 1) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
    });
  const textReveal: Variants = {
    hidden: { y: "100%", opacity: 0 },
    show: { 
      y: "0%", 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } 
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    show: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 } 
    }
  };
  const navVariants = {
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
    };
  return (
    <div className="relative min-h-screen w-full bg-[#91191a] text-white overflow-hidden selection:bg-white selection:text-[#91191a] font-sans">
            {/* --- Navbar --- */}

            <motion.nav
                variants={navVariants}
                initial="visible"
                animate={isHidden ? "hidden" : "visible"}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-8 md:px-16 z-[100] bg-transparent pointer-events-none"
            >
                {/* Logo */}
                <motion.img 
                    src={logo} 
                    alt="Logo" 
                    className="w-24 md:hidden md:w-32 cursor-pointer pointer-events-auto mix-blend-multiply"
                    onClick={() => handleClick("/")}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                />

                {/* Menu Trigger */}
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => handleClick("/menu")}
className="w-12 md:hidden block cursor-pointer hover:opacity-70 transition-opacity pointer-events-auto"
                    src={sidebar}
                    alt="Menu"
                />
            </motion.nav>
      <div className="flex flex-col md:flex-row min-h-screen w-full items-center max-w-7xl mx-auto px-6 py-12 md:py-0">
        
        {/* LEFT COLUMN: Heading */}
        <div className="w-full md:w-1/2 flex flex-col justify-center z-10 md:pr-10 pt-20 md:pt-0">
          
          <div className="flex items-center gap-4 mb-8">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "2.5rem" }}
              className="h-[1px] bg-white/40" 
            />
            <div className="overflow-hidden">
              <motion.span 
                variants={textReveal} 
                initial="hidden"
                whileInView="show"
                className="block text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-white/80"
              >
                {schedule} • {hours}
              </motion.span>
            </div>
          </div>

          <div className="relative">
            <h1 className="text-[14vw] md:text-[5.5vw] font-black leading-[0.8] tracking-tighter uppercase">
              {title.split(' ').map((word, i) => (
                <span key={i} className="block overflow-hidden py-1">
                  <motion.span 
                    className="block" 
                    variants={textReveal} 
                    initial="hidden" 
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* RIGHT COLUMN: Glass Card */}
        <div className="w-full md:w-1/2 flex items-center justify-center mt-12 md:mt-0 pb-20 md:pb-0">
          
          <motion.div
             variants={cardVariants}
             initial="hidden"
             whileInView="show"
             className="w-full max-w-xl bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-14 backdrop-blur-xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            {/* ---- UPDATED IMAGE BLENDING SECTION ---- */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              // CHANGED: Added a reddish drop-shadow to the container for a soft glow effect
              // Removed 'mb-10' and used 'flex justify-center' for better alignment
              className="relative z-10 w-full mb-8 flex justify-center drop-shadow-[0_0_30px_rgba(255,100,100,0.25)]"
            >
              <img 
                src={img1}
                alt="Chemathon Logo"
                // CHANGED: Removed 'shadow-lg' and 'rounded-xl' for cleaner edges.
                // Added 'opacity-95' so it isn't perfectly solid.
                className="w-48 md:w-56 opacity-95 rounded-xl shadow-lg mix-blend-normal"
              />
            </motion.div>
            {/* ---------------------------------------- */}

            <div className="relative z-10 space-y-6 text-white/90">
              <p className="text-sm md:text-base leading-relaxed font-light">
                The flagship event of <strong className="font-bold text-white">AIChE-VIT</strong>, Chem-A-Thon, aims to inspire and challenge undergraduates from all across Asia. Students are persuaded to look beyond theory as they form practical solutions for real-world crises during this <strong className="font-bold text-white">36-hour hackathon</strong>.
              </p>
              
              <p className="text-sm md:text-base leading-relaxed font-light text-white/70">
                Collaborating with VIT's School of Chemical Engineering (SCHEME), we hosted Chem-A-Thon 6.0 from February 14–16, 2025. The event integrated creativity, teamwork, and realistic problem-solving.
              </p>

            
            </div>

            <div className="absolute bottom-8 right-8 opacity-40">
                <div className="w-8 h-8 border-b-[1px] border-r-[1px] border-white" />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default Events;