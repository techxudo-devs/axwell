import { NOTCH_COLOR } from "../constants";

interface TicketEdgeNotchesProps {
  side: "left" | "right";
}

const TicketEdgeNotches = ({ side }: TicketEdgeNotchesProps) => (
  <div
    className={`absolute top-0 bottom-0 flex flex-col justify-around py-2 w-3 h-full pointer-events-none z-10 ${
      side === "left" ? "left-[-6px]" : "right-[-6px]"
    }`}
  >
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: NOTCH_COLOR }}
      />
    ))}
  </div>
);

export default TicketEdgeNotches;
