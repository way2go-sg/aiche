//import React from 'react';
import { motion } from 'framer-motion';
import img from '../assets/insider.webp'; 

// 1. Update Interface to include an optional 'link'
interface ContentItem {
    title: string;
    date: string;
    type: string;
    link?: string; // Optional: Events won't have this
}

// 2. Update Data with links for Podcasts and Blogs
const CONTENT: { events: ContentItem[]; podcasts: ContentItem[]; blogs: ContentItem[] } = {
    events: [
        { title: "Yantra Event", date: "01/2026", type: "EVENT" },
        { title: "Chemathon 7.0", date: "03/2026", type: "EVENT" }
    ],
    podcasts: [
        { 
            title: "Podcast Mania", 
            date: "WATCH NOW", 
            type: "PODCAST", 
            link: "https://www.youtube.com/playlist?list=PLcRDViqfG1-DOyQW9HTr7w5Ms-5PjMRHi" // Add your link here
        },
        { 
            title: "Chemically Doped", 
            date: "WATCH NOW", 
            type: "PODCAST", 
            link: "https://www.youtube.com/playlist?list=PLcRDViqfG1-Cv8FrA7P4ZQW7FKdhGoyGl" // Add your link here
        }
    ],
    blogs: [
        { 
            title: "The Walking Dead", 
            date: "READ NOW", 
            type: "ARTICLE", 
            link: "https://medium.com/@aichevit/the-walking-dead-de-extinction-of-dire-wolves-1a049937d776?source=user_profile_page---------0-------------431ebe456cb5----------------------" // Add your link here
        },
        { 
            title: "Behind Every Bite", 
            date: "READ NOW", 
            type: "ARTICLE", 
            link: "https://medium.com/@aichevit/behind-every-bite-ef7b7678971b?source=user_profile_page---------1-------------431ebe456cb5----------------------" // Add your link here
        }
    ]
};

const AboutEvents = () => {
    
    const handleClick = (url: string) => {
        window.open(url, "_blank");
    };

    return (
        <div className="mt-12 md:mt-16 flex flex-col w-full mb-16 bg-[#E6D5B8]/30">
            
            <div className="flex flex-col items-center justify-center mb-8">
                <h1 className="lg:text-8xl text-6xl text-center tracking-tighter heading-text uppercase">
                    The<br />Spotlight
                </h1>
            </div>


            <div className="w-full grid grid-cols-1 lg:grid-cols-3 border-b-2 border-black">
                
                {/* Events Column */}
                <div className="flex flex-col border-b-2 lg:border-b-0 lg:border-r-2 border-black">
                    <SectionHeader title="Events" />
                    {CONTENT.events.map((item, idx) => (
                        <SpotlightItem key={idx} item={item} isLast={idx === CONTENT.events.length - 1} />
                    ))}
                </div>

                {/* Podcasts Column */}
                <div className="flex flex-col border-b-2 lg:border-b-0 lg:border-r-2 border-black">
                    <SectionHeader title="Podcasts" />
                    {CONTENT.podcasts.map((item, idx) => (
                        <SpotlightItem key={idx} item={item} isLast={idx === CONTENT.podcasts.length - 1} />
                    ))}
                </div>

                {/* Blogs Column */}
                <div className="flex flex-col">
                    <SectionHeader title="Blogs" />
                    {CONTENT.blogs.map((item, idx) => (
                        <SpotlightItem key={idx} item={item} isLast={idx === CONTENT.blogs.length - 1} />
                    ))}
                </div>
            </div>

            {/* View Archives Button */}
            <div className="w-full flex justify-center py-12 border-b-2 border-black border-dashed bg-[#E6D5B8]">
                <button 
                    onClick={() => handleClick("./events")} 
                    className="relative px-12 py-4 border-2 border-black bg-white text-xl font-bold uppercase tracking-widest transition-all duration-200 hover:bg-black hover:text-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                    View Archives
                </button>
            </div>

            {/* Bottom Cards */}
            <div className="grid md:grid-cols-2 w-full md:mt-16 mt-8 gap-8 px-4 md:px-0">
                <motion.div 
                    onClick={() => handleClick("/board")}            
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0}}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative h-80 md:h-[500px] cursor-pointer group font-bold uppercase z-0"
                >
                    <div className="absolute top-3 left-3 w-full h-full bg-black -z-10 transition-all duration-300 ease-out group-hover:top-0 group-hover:left-0"></div>
                    <div className="h-full w-full border-2 border-black border-dashed bg-[#E6D5B8] flex flex-col justify-between p-6 transition-all duration-300 group-hover:bg-black group-hover:text-[#E6D5B8] group-hover:border-solid">
                        <div className="w-full flex justify-between text-xs font-mono opacity-70">
                            <span>[ORG__COMMUNITY]</span>
                            <span>/// DIR_2025</span>
                        </div>
                        <div className="flex-grow flex items-center justify-center">
                            <span className="text-7xl md:text-8xl text-center leading-[0.85] heading-text tracking-tighter">
                                Meet<br/>The<br/>Team
                            </span>
                        </div>
                        <div className="w-full flex justify-end items-center text-xl font-mono tracking-widest">
                            <span className="mr-2 text-sm">ACCESS PERSONNEL</span> 
                            <span className="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0}}
                     viewport={{ once: true }}
                     transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
                    onClick={() => handleClick("/insider")} 
                    className="border-2 border-black border-dashed h-80 md:h-[500px] cursor-pointer relative overflow-hidden group bg-black"
                >
                    <img 
                        className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-100" 
                        src={img} 
                        alt="Insider Access" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                        <span className="text-[#E6D5B8] text-3xl md:text-4xl font-bold uppercase border-2 border-[#E6D5B8] px-6 py-4 bg-black tracking-widest shadow-[4px_4px_0px_0px_#E6D5B8]">
                            Insider Access
                        </span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const SectionHeader = ({ title }: { title: string }) => (
    <div className="bg-black text-[#E6D5B8] py-2 px-4 border-b-2 border-black">
        <h2 className="font-mono text-sm tracking-[0.2em] uppercase">{title}</h2>
    </div>
);

// 3. Updated Helper Component with Link Logic
const SpotlightItem = ({ item, isLast }: { item: ContentItem, isLast: boolean }) => {
    
    // Only items with a 'link' property are clickable
    const isClickable = !!item.link;

    const handleItemClick = () => {
        if (isClickable && item.link) {
            window.open(item.link, "_blank");
        }
    };

    return (
        <div 
            onClick={handleItemClick}
            className={`
                group flex-1 flex flex-col justify-between p-6 transition-all duration-300 
                ${!isLast ? 'border-b-2 border-black border-dashed' : ''}
                ${isClickable ? 'cursor-pointer hover:bg-black hover:text-[#E6D5B8]' : 'cursor-default'}
            `}
        >
            <div>
                <div className="flex justify-between items-start mb-4">
                    <span className="font-mono text-xs opacity-60 border border-current px-1 rounded-sm">
                        {item.type}
                    </span>
                    <span className="font-mono text-xs font-bold">{item.date}</span>
                </div>
                <h3 className={`text-2xl md:text-3xl font-bold uppercase leading-[0.9] tracking-tight transition-transform duration-300 ${isClickable ? 'group-hover:translate-x-1' : ''}`}>
                    {item.title}
                </h3>
            </div>
            
            {/* Only show the arrow/open text if it is clickable */}
            {isClickable && (
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end">
                    <span className="text-sm font-mono tracking-widest">OPEN →</span>
                </div>
            )}
        </div>
    );
};

export default AboutEvents;