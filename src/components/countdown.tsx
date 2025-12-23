import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-01-01T00:00:00+05:30");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const calculateTimeLeft = (): TimeLeft => {
  const difference = TARGET_DATE.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);

      if (
        updated.days === 0 &&
        updated.hours === 0 &&
        updated.minutes === 0 &&
        updated.seconds === 0
      ) {
        setLaunched(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (launched) {
    return (
      <div className="launch-text">
        🚀 <span>AIChE-VIT is LIVE</span>
        <p>Engineering the future. Starting now.</p>
      </div>
    );
  }

  return (
    <div className="countdown">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="time-card">
          <span className="value">{value.toString().padStart(2, "0")}</span>
          <span className="label">{label}</span>
        </div>
      ))}
    </div>
  );
}
