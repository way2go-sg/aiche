import { motion } from "framer-motion";

interface TickerProps {
  text: string;
  direction?: "left" | "right";
}

const TickerTape = ({ text, direction = "left" }: TickerProps) => {
  const content = Array(10).fill(text).join(" • "); // Repeat text to ensure loop

  return (
    <div className="w-full overflow-hidden bg-black py-2 border-y-2 border-black select-none">
      <motion.div
        className="whitespace-nowrap font-mono text-sm uppercase tracking-widest text-[#E6D5B8] font-bold"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <span className="inline-block px-4">{content}</span>
        <span className="inline-block px-4">{content}</span>
      </motion.div>
    </div>
  );
};

export default TickerTape