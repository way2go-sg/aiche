import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import sidebar from '../assets/sidebarmenu.webp';
import logo from '../assets/header.webp';
//import classNames from 'classnames';
interface CommunityHeaderProps {
    details: string;
    title: string;
}

const BoardHeader = ({ details, title }: CommunityHeaderProps) => {
    const handleClick = (url: string) => {
        window.location.href = url;
    };

    // --- Scroll Logic ---
    const [isHidden, setIsHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        // Hide if scrolling down and moved past 150px
        if (latest > previous && latest > 1) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
    });

    // --- Navbar Variants ---
    const navVariants = {
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
    };

    return (
        <div>
            <div className="w-full h-auto mt-10 md:block hidden">
            </div>

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
            <motion.div
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className='flex justify-self-end text-right lg:w-1/5 w-1/2 options-text mt-26 md:text-[15px] text-[13px]'>
                <p>{details}</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
                className='flex flex-col w-full md:flex-row justify-start items-center md:gap-12 gap-4 mt-4 p-0'>
                <div className='w-full heading-text'>
                    <div className='lg:text-[200px] text-6xl'>{title}</div>
                </div>
            </motion.div>
        </div>
    )
}

export default BoardHeader