import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useMotionValue, useMotionTemplate, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// --- Assets (Replace these with your actual import paths if different) ---
import logo from '../assets/header.png';
import image from '../assets/core.jpg';
import sidebar from '../assets/sidebarmenu.png';

// =========================================
// 1. INTRO COMPONENT
// =========================================

interface IntroProps {
    onComplete: () => void;
}

const IntroOverlay: React.FC<IntroProps> = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // 1. Trigger the parent to load the content slightly BEFORE the curtains open (3.5s)
        // This ensures the content is ready behind the curtain.
        const loadTimer = setTimeout(() => {
            onComplete();
        }, 3500);

        // 2. Start the exit animation (curtains opening) at 3.8s
        const exitTimer = setTimeout(() => {
            setIsVisible(false);
        }, 3800);

        return () => {
            clearTimeout(loadTimer);
            clearTimeout(exitTimer);
        };
    }, [onComplete]);

    return (
        <AnimatePresence mode='wait'>
            {isVisible && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none font-serif">
                    
                    {/* Layer 1: Darkest Red (Bottom Layer) */}
                    <motion.div
                        initial={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                        className="absolute inset-0 bg-[#4a0a0a] z-30"
                    />

                    {/* Layer 2: Brand Red (Middle Layer) */}
                    <motion.div
                        initial={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                        className="absolute inset-0 bg-[#8e1a1a] z-40"
                    />

                    {/* Layer 3: Light Red (Top Layer) */}
                    <motion.div
                        initial={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        className="absolute inset-0 bg-[#a32222] z-50"
                    />

                    {/* Content Layer */}
                    <motion.div
                        className="relative z-[60] flex flex-col items-center justify-center p-10 pl-8"
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="overflow-hidden mb-2">
                            <motion.h1
                                initial={{ y: "110%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                                className="text-6xl md:text-8xl font-bold text-[#eaddcf] tracking-tight leading-none"
                            >
                                AIChE
                            </motion.h1>
                        </div>

                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "40px" }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="w-[1px] bg-[#eaddcf] my-2"
                        />

                        <div className="overflow-hidden w-full flex justify-center">
                            <motion.h2
                                initial={{ y: "-110%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
                                className="text-3xl md:text-5xl italic text-[#d4b483]"
                            >
                                VIT
                            </motion.h2>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
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


// =========================================
// 2. MAIN HEADER COMPONENT
// =========================================

const Header = () => {
    // --- State to control Main Content Loading ---
    const [isLoaded, setIsLoaded] = useState(false);

    // --- Scroll Logic ---
    const [isHidden, setIsHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
    });

    // --- Mouse Tracking for Image Effect ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    // Flashlight radius size
    const maskImage = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, black 10%, transparent 200px)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    // --- Animation Variants ---
    const navVariants: Variants = {
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
    };

    const textReveal: Variants = {
        hidden: { y: "100%" },
        visible: (i: number) => ({
            y: 0,
            transition: { delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        })
    };

    const navigate = useNavigate();
    const handleClick = (url: string) => {
        navigate(url);
    };

    return (
        <div className="relative w-full min-h-screen overflow-x-hidden">
            
            {/* 1. INTRO OVERLAY */}
            <IntroOverlay onComplete={() => setIsLoaded(true)} />

            {/* 2. MAIN CONTENT - Only renders after intro signals completion */}
            {isLoaded && (
                <>
                    {/* === NAVIGATION (Logo & Menu) === */}
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
                            className="w-24 md:w-32 cursor-pointer pointer-events-auto mix-blend-multiply"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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

                    {/* === HERO CONTENT === */}
                    <main className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 lg:pt-0 min-h-screen flex items-center">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 w-full">
                            
                            {/* LEFT: Typography */}
                            <div className="w-full lg:w-[55%] space-y-8 relative z-10">
                                <div className="flex gap-6 md:gap-8">
                                    {/* Animated Vertical Line */}
                                    <div className="w-[2px] md:w-[3px] bg-black/10 relative overflow-hidden h-auto min-h-[150px]">
                                        <motion.div 
                                            initial={{ height: 0 }}
                                            animate={{ height: "100%" }}
                                            transition={{ duration: 1.2, ease: "easeInOut" }}
                                            className="absolute top-0 w-full bg-black" 
                                        />
                                    </div>

                                    {/* Headline Reveal */}
                                    <div className="flex flex-col justify-center">
                                        {["A set of engineers,", "Built different."].map((text, i) => (
                                            <div key={i} className="overflow-hidden">
                                                <motion.h1
                                                    custom={i}
                                                    variants={textReveal}
                                                    initial="hidden"
                                                    animate="visible"
                                                    className="text-[8vw] md:text-[5vw] lg:text-[5vw] heading-text uppercase leading-[0.85] tracking-tighter text-black font-serif"
                                                >
                                                    {text}
                                                </motion.h1>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Description Paragraph */}
                                <motion.p 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 0.7, x: 0 }}
                                    transition={{ delay: 1, duration: 0.8 }}
                                    className="max-w-md text-base md:text-lg font-light leading-relaxed md:ml-12 border-t border-black/10 pt-8 text-black"
                                >
                                    Established in 2014, <span className="font-bold">AIChE VIT</span> stands as the powerhouse of chemical innovation at VIT Vellore. Technical brilliance meets social impact.
                                </motion.p>
                            </div>

                            {/* RIGHT: Spotlight Image Section */}
                            <div className="w-full flex justify-center lg:justify-start lg:border-l border-black/10 lg:pl-10 py-4">
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.2, duration: 0.8 }}
                                    className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/5"
                                    onMouseMove={handleMouseMove}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    {/* Layer 1: Grayscale Image (Always Visible) */}
                                    <img 
                                        src={image} 
                                        alt="Core Team Grayscale" 
                                        className="absolute rounded-2xl inset-0 w-full h-full object-cover filter grayscale pointer-events-none"
                                    />

                                    {/* Layer 2: Color Image (Visible only via Mask) */}
                                    <motion.div
                                        className="absolute inset-0 rounded-2xl w-full h-full bg-transparent"
                                        animate={{ opacity: isHovered ? 1 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        style={{ 
                                            maskImage: maskImage,
                                            WebkitMaskImage: maskImage 
                                        }}
                                    >
                                        <img 
                                            src={image} 
                                            alt="Core Team Color" 
                                            className="w-full h-full object-cover contrast-110"
                                        />
                                    </motion.div>

                                </motion.div>
                            </div>

                        </div>
                    </main>
                </>
            )}
        </div>
    );
};

export default Header;