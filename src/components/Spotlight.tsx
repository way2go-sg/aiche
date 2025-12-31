import { useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, PanInfo, AnimatePresence } from 'framer-motion';
import { RotateCcw, Layers } from 'lucide-react';
import img1 from '../assets/spotlight/alumni.jpg';
import img2 from '../assets/spotlight/che.jpg';
import img3 from '../assets/spotlight/det.jpg';
import img4 from '../assets/spotlight/pod.jpg';
import img5 from '../assets/spotlight/sus.jpg';
import img6 from '../assets/spotlight/pod1.jpg';
import img7 from '../assets/spotlight/pod2.jpg';
// --- Assets ---
// Replace with your real imports
const POSTERS = [
    { id: 0, src: img7, color: "from-red-600" },
    { id: 6, src: img6, color: "from-red-600" },
    { id: 1, src: img4, color: "from-red-600" },
    { id: 2, src: img1, color: "from-blue-600" },
    { id: 3, src: img2, color: "from-green-600" },
    { id: 4, src: img3, color: "from-orange-600" },
    { id: 7, src: img5, color: "from-green-600" },
];

// --- Draggable Card Component ---
const Card = ({ 
    data, 
    index, 
    onRemove 
}: { 
    data: typeof POSTERS[0], 
    index: number, 
    onRemove: () => void 
}) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-18, 18]); 
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]); 
    const controls = useAnimation();

    // FIXED: Explicitly typed the event to fix the ESLint 'any' error
    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 150;
        if (Math.abs(info.offset.x) > threshold) {
            console.log(event);
            controls.start({ 
                x: info.offset.x > 0 ? 500 : -500,
                opacity: 0,
                transition: { duration: 0.2 }
            }).then(onRemove);
        } else {
            controls.start({ x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } });
        }
    };

    return (
        <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={controls}
            style={{ x, rotate, opacity, zIndex: 100 - index }}
            initial={{ scale: 0.95, y: -20, opacity: 0 }}
            whileInView={{ scale: 1, y: 0, opacity: 1 }}
            className="absolute top-0 w-full h-full cursor-grab active:cursor-grabbing origin-bottom"
        >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-neutral-900 select-none">
                <img 
                    src={data.src} 
                    alt="Poster" 
                    className="w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity text-white/50 text-xs tracking-widest uppercase">
                    Drag to Shuffle
                </div>
            </div>
        </motion.div>
    );
};

// --- Background Card ---
const BackgroundCard = ({ index }: { index: number }) => {
    return (
        <motion.div
            animate={{ 
                scale: 1 - index * 0.06, 
                y: index * 15,
                rotate: index % 2 === 0 ? 2 : -2
            }}
            className="absolute top-0 w-full h-full rounded-2xl bg-neutral-800/50 border border-white/5 shadow-xl origin-bottom opacity-60 z-0"
        />
    );
};

// --- Main Component ---
const Spotlight = () => {
    const [cards, setCards] = useState(POSTERS);

    // FIXED: Removed the 'history' state variable causing the unused variable error.
    // We can just reset using the POSTERS constant.
    
    const removeCard = () => {
        setCards((current) => current.slice(1));
    };

    const resetStack = () => {
        setCards([...POSTERS]);
    };

    const activeColor = cards[0]?.color || "from-gray-600";

    return (
        <div className="relative w-full py-24 flex items-center justify-center overflow-hidden bg-transparent">
            
            {/* Ambient Glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial ${activeColor} to-transparent opacity-15 blur-[100px] transition-colors duration-700 pointer-events-none`} />

            {/* Grid Texture */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* LEFT: Typography */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                    <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.8 }}
                    >
                       {/*} <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                            <span className="text-sm font-mono text-red-400 tracking-widest uppercase">Inside the Chapter</span>
                        </div>*/}

                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] text-white">
                            THE <br /> 
                            <span className="text-white">EVENTS</span>
                        </h1>
                        
                        <p className="mt-6 text-neutral-400 text-lg max-w-md leading-relaxed lg:border-l lg:border-neutral-800 lg:pl-6 mx-auto lg:mx-0">
                            Our recent curated collection of our journey. <br/>
                            <span className="text-neutral-400 font-medium">Drag the cards to explore the archives.</span>
                        </p>
                    </motion.div>

                    {/* Reset Button */}
                    <AnimatePresence>
                        {cards.length === 0 && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={resetStack}
                                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
                            >
                                <RotateCcw size={18} />
                                Replay History
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

                {/* RIGHT: The Interactive Stack */}
                <div className="flex justify-center items-center h-[500px] perspective-1000">
                    <div className="relative w-[320px] aspect-[4/5]">
                        {/* Ghost cards */}
                        {cards.length > 1 && <BackgroundCard index={2} />}
                        {cards.length > 0 && <BackgroundCard index={1} />}

                        {/* Top Draggable Card */}
                        <AnimatePresence>
                            {cards.map((card, index) => {
                                if (index === 0) {
                                    return (
                                        <Card 
                                            key={card.id} 
                                            data={card} 
                                            index={index} 
                                            onRemove={removeCard} 
                                        />
                                    );
                                }
                                return null;
                            })}
                        </AnimatePresence>

                        {/* Empty State */}
                        {cards.length === 0 && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 flex flex-col items-center justify-center border-2 border-dashed border-neutral-800 rounded-2xl text-neutral-600"
                            >
                                <Layers size={48} className="mb-4 opacity-50"/>
                                <p className="text-sm font-mono uppercase tracking-widest">End of Stream</p>
                            </motion.div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Spotlight;