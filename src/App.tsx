import Countdown from "./components/countdown";

export default function App() {
  return (
    <div className="container">
      <h1 className="title">
        <span>AIChE VIT</span>
      </h1>

      <p className="subtitle">
        A reaction is about to begin.
      </p>

      <Countdown />

      <p className="footer">
        Launching <strong>01 • 01 • 2026</strong> at <strong>00:00 IST</strong>
      </p>
    </div>
  );
}
