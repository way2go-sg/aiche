import { motion, Variants } from 'framer-motion';
import MagnetLine from "./MagnetLines";
import AnimatedList from './scrollHandler';

// --- Data: The Items List ---
const defaultItems = [
  'Proudly received the Outstanding Student Chapter Award an awe-inspiring total of 9 times.',
  'Successfully organized the India Student Regional Conference (SRC) twice in 2018 and 2022.',
  'Won the Chem-E-Car competition in SRC 2018 and represented India in the ASC 2018.',
  'Won the K-2 category prize at the K-12 SRC in 2023 and 2024.',
  'Won the Grades 3–5 category at the K-12 SRC in 2023 and 2024.',
  'Qualified in the K-12 ASC in 2023 (K–2, 3–5) and 2024 (K–2, 3–5, 9–12 categories).',
  'Won 3rd place in the Chem-E-Car competition at SRC 2024 held at NIT Rourkela.',
  "Won 1st place in the Azeotropor (Chem-E-Car) at Azeotropy'25, IIT Bombay.",
  'Proudly hosted the AIChE India SRC 2018 at VIT Vellore, a qualifier for the ASC.',
  'Represented with ingenuity at the Annual Chem-E-Car Competition 2017 in Minneapolis.'
];

// --- Types ---
interface BannerProps {
  image1: string;
  image2: string;
  title: string;
  subtitle: string;
  achievements?: string[]; // Optional: will use defaultItems if not provided
}

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const textReveal: Variants = {
  hidden: { y: "100%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const floatAnimation: Variants = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 2, -2, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Banner = ({
  image1,
  image2,
  title,
  subtitle,
  achievements = defaultItems // Defaulting to the list defined above
}: BannerProps) => {

  // Note: The unused isHidden state was removed for cleanliness as it wasn't needed for this fix.
  
  return (
    <div className="w-full relative flex flex-col items-center overflow-hidden">

      {/* Top Separator */}
      <MagnetLine />

      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >

        {/* --- Hero Section: Images & Title --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 lg:gap-16 mb-20 relative">

          {/* Left Decoration - Hidden on mobile, visible on md screens and up */}
          <motion.div
            variants={floatAnimation}
            animate="animate"
            className="hidden md:block order-2 md:order-1 flex-shrink-0"
          >
            <img
              className="w-28 md:w-40 lg:w-56 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              src={image1}
              alt="Decorative left"
            />
          </motion.div>

          {/* Center Text Content */}
          <div className="order-1 md:order-2 flex flex-col items-center justify-center text-center z-10 flex-grow">
            {/* Title */}
            <div className="overflow-hidden mb-4">
              <motion.h1
                variants={textReveal}
                className="text-7xl md:text-8xl lg:text-9xl font-extrabold heading-text leading-none tracking-tight"
              >
                {title}
              </motion.h1>
            </div>

            {/* Subtitle */}
            <div className="overflow-hidden">
              <motion.p
                variants={textReveal}
                className="options-text text-base md:text-xl uppercase tracking-[0.25em] opacity-80 font-medium"
              >
                {subtitle}
              </motion.p>
            </div>
          </div>

          {/* Right Decoration - Hidden on mobile, visible on md screens and up */}
          <motion.div
            variants={floatAnimation}
            // Reverted animate prop to use the correct variant name "animate" instead of the unused state
            animate="animate"
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="hidden md:block order-3 flex-shrink-0"
          >
            <img
              className="w-28 md:w-40 lg:w-56 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              src={image2}
              alt="Decorative right"
            />
          </motion.div>
        </div>

        {/* --- Achievements / List Section --- */}
        {achievements && achievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full flex flex-col items-center"
          >
            <div className="w-full max-w-4xl mx-auto">
              <div className="options-text text-center backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 shadow-xl overflow-hidden p-2">
                <AnimatedList
                  items={achievements}
                  displayScrollbar={false}
                  showGradients={true}
                  enableArrowNavigation={false}
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>
        )}

      </motion.div>

      {/* Bottom Separator */}
      <MagnetLine />
    </div>
  );
};

export default Banner;