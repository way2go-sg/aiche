import { motion, Variants } from 'framer-motion';
import MagnetLine from "./MagnetLines";
import AnimatedList from './scrollHandler';

// --- Data: The Items List ---
const defaultItems = [
  'Represented the chapter with ingenuity at the Annual Chem-E-Car Competition 2017 in Minneapolis.',
  'Hosted the AIChE India SRC 2018 at VIT Vellore and won the Chem-E-Car competition to represent India at ASC.',
  'Organized the India Student Regional Conference (SRC) for the second time in 2022.',
  'Swept the K–2 and Grades 3–5 categories at the K-12 SRC 2023 and qualified for the K-12 ASC.',
  'Repeated victories in K–2 and 3–5 at K-12 SRC 2024 and qualified in three categories for the ASC.',
  'Secured 3rd place in the Chem-E-Car competition at SRC 2024 held at NIT Rourkela.',
  "Dominated Azeotropy’25 with 1st place in Azeorover at IIT Bombay.",
  'Claimed Runners-up at SRC 2025 Chem-E-Car and ranked in the top 20 at ASC.',
  'Crushed K-12 competitions in 2025: Winners in Grades 3–5 & 9–12, and top finishes in K–2 & 6–8.',
  'Honored as an Outstanding Student Chapter for the 10th time, marking a decade of excellence.'
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