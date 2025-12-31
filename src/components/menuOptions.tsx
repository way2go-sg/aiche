import exit from '../assets/exit menu.png'
import { motion } from 'framer-motion';

const MenuOptions = () => {
    const handleClick = (url: string) => {
        window.location.href = url;
    };
    const goBack = () => {
        window.history.back();
    }
  return (
    <div className='h-full relative bg-neutral-200'>
        <div onClick={() => goBack()} className='md:w-16 w-12 p-2 hover:bg-neutral-300 md:hover:bg-[rgb(75,140,186)] rounded-[5px] duration-250 ease-out cursor-pointer absolute lg:right-14 lg:top-14 right-8 top-8 z-10'>
            <img src={exit} alt="Logo" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 h-full relative z-0">
            <motion.div onClick={() => handleClick("/")}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0}}
            viewport={{ once: true }} // `once: true` ensures it only triggers once
            transition={{ duration: 0.1, ease: "easeIn"}}
            className="bg-[#d4b483] h-full md:h-full text-center flex items-center justify-center options-text md:text-4xl text-2xl cursor-pointer">About</motion.div>
            
            <motion.div onClick={() => handleClick("/events")}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0}}
            viewport={{ once: true }} // `once: true` ensures it only triggers once
            transition={{ duration: 0.1, ease: "easeIn", delay: 0.1 }}
            className="bg-[#8e1a1a] h-full md:h-full text-center flex items-center justify-center options-text md:text-4xl text-2xl cursor-pointer">Events</motion.div>
            
            <motion.div onClick={() => handleClick("/insider")}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0}}
            viewport={{ once: true }} // `once: true` ensures it only triggers once
            transition={{ duration: 0.1, ease: "easeIn", delay: 0.2 }}
            className="bg-[#7a1410] h-full md:h-full text-center flex items-center justify-center options-text md:text-4xl text-2xl cursor-pointer">Insider</motion.div>
            
            <motion.div onClick={() => handleClick("/board")}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0}}
            viewport={{ once: true }} // `once: true` ensures it only triggers once
            transition={{ duration: 0.1, ease: "easeIn", delay: 0.3 }}
            className="bg-[#551d1c] h-full md:h-full text-center flex items-center justify-center options-text md:text-4xl text-2xl cursor-pointer">Meet The Team</motion.div>
        </div>
    </div>
  );
};

export default MenuOptions;
