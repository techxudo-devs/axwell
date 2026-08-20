import { NOTCH_COLOR } from "../constants";

const TicketPerforationLine = () => (
  <div className="absolute top-0 bottom-0 right-[22%] -translate-x-1/2 flex flex-col justify-around py-1.5 w-3 h-full pointer-events-none z-10">
    {Array.from({ length: 9 }).map((_, i) => (
      <div
        key={i}
        className="w-[10px] h-[10px] rounded-full"
        style={{ backgroundColor: NOTCH_COLOR }}
      />
    ))}
  </div>
);

export default TicketPerforationLine;
