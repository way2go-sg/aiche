import React, { useRef, useEffect, CSSProperties } from 'react';

interface MagneticLineBorderProps {
  /** The total number of lines to display in the row. */
  lineCount?: number;
  /** The color of the lines. */
  lineColor?: string;
  /** The width of each line (e.g., '2px', '0.5vmin'). */
  lineWidth?: string;
  /** The height of each line (e.g., '2rem', '5vmin'). */
  lineHeight?: string;
  /** The default resting angle of the lines. */
  baseAngle?: number;
  /** Tailwind classes for the container (e.g., 'w-full h-12'). */
  className?: string;
  /** Additional inline styles for the container. */
  style?: CSSProperties;
}

const MagneticLineBorder: React.FC<MagneticLineBorderProps> = ({
  lineCount = 75,
  lineColor = '#000000',
  lineWidth = '2px',
  lineHeight = '2.5rem', // e.g., 40px
  baseAngle = -10, // Using your original default
  className = '',
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // We target the spans by a specific class for safety
    const items = container.querySelectorAll<HTMLSpanElement>('.magnetic-line');

    const onPointerMove = (pointer: { x: number; y: number }) => {
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        const b = pointer.x - centerX;
        const a = pointer.y - centerY;
        const r = ((Math.atan2(a, b) * 180) / Math.PI) + 90; // Corrected angle calculation

        item.style.setProperty('--rotate', `${r}deg`);
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      onPointerMove({ x: e.x, y: e.y });
    };

    window.addEventListener('pointermove', handlePointerMove);

    // Set initial "at rest" state (pointing to center of screen)
    if (items.length) {
      onPointerMove({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []); // Runs once on mount

  const spans = Array.from({ length: lineCount }, (_, i) => (
    <span
      key={i}
      // Add a specific class for the querySelector
      className="magnetic-line block origin-center"
      style={{
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        '--rotate': `${baseAngle}deg`,
        transform: 'rotate(var(--rotate))',
        willChange: 'transform',
        // Add a smooth transition
        transition: 'transform 0.1s linear',
      }}
    />
  ));

  return (
    <div
      ref={containerRef}
      // Key change: Using flex instead of grid
      className={`
        flex items-center justify-around w-full overflow-hidden 
        ${className}
      `}
      style={style}
    >
      {spans}
    </div>
  );
};

export default MagneticLineBorder;