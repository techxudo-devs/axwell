import { Clock, Mail, Ticket, Users } from "lucide-react";
import type { TicketCardProps } from "../types";
import TicketEdgeNotches from "./TicketEdgeNotches";
import TicketPerforationLine from "./TicketPerforationLine";
import TicketPriceActions from "./TicketPriceActions";
import TicketStub from "./TicketStub";

const TicketCard = ({ ticket, onDetails }: TicketCardProps) => {
  const getGradient = () => {
    switch (ticket.id) {
      case "bronze":
        return "linear-gradient(110deg, #6b4423 0%, #8b5a2b 40%, #a86b32 50%, #8b5a2b 70%, #6b4423 100%)";
      case "silver":
        return "linear-gradient(110deg, #4b5563 0%, #9ca3af 40%, #cbd5e1 50%, #9ca3af 70%, #4b5563 100%)";
      case "gold":
        return "linear-gradient(110deg, #b8860b 0%, #d4af37 40%, #fbbf24 50%, #d4af37 70%, #b8860b 100%)";
      case "gold-women":
        return "linear-gradient(110deg, #FFD700 0%, #FDB931 40%, #FFE600 50%, #FDB931 70%, #FFD700 100%)";
      case "vip":
        return "linear-gradient(110deg, #4B0082 0%, #2a003a 40%, #4B0082 50%, #2a003a 70%, #4B0082 100%)";
      case "platinum":
        return "linear-gradient(110deg, #000000 0%, #1a1a1a 40%, #262626 50%, #1a1a1a 70%, #000000 100%)";
      default:
        return ticket.color;
    }
  };

  const isDark = ticket.id === "vip" || ticket.id === "platinum";
  const textColor = isDark ? "text-white" : "text-[#0a0010]";
  const secondaryTextColor = isDark ? "text-white/80" : "text-[#0a0010]/80";
  const barcodeColor = isDark ? "#ffffff" : "#0a0010";

  return (
    <div 
      className="relative flex h-[175px] w-full rounded-md overflow-hidden transition-all duration-300 shadow-xl border-0"
      style={{ background: getGradient() }}
    >
      <TicketEdgeNotches side="left" />

      <div className="flex flex-col justify-between flex-1 p-5 pr-8 select-none">
        <h3
          className={`font-just text-[24px] sm:text-[34px] md:text-[38px] leading-none ${textColor}`}
        >
          {ticket.name}
        </h3>

        <div className="flex items-end justify-between gap-2">
          <div className={`flex flex-col gap-1 text-[10px] md:text-[11px] font-medium tracking-wider ${secondaryTextColor} uppercase`}>
            <span className="flex items-center gap-2 tracking-tight">
              <Clock size={13} className={`${textColor} md:block hidden`} />
              {ticket.gateLabel} · from {ticket.gates}</span>
            <div className="flex items-center gap-2 tracking-tight">
              <Ticket size={13} className={`${textColor} md:block hidden`} />
              <span>Max {ticket.maxPerID} per ID</span>
            </div>
            {ticket.capacity && (
              <span className="flex items-center gap-2 tracking-tight">
                <Users size={13} className={`${textColor} md:block hidden`} />
                {ticket.capacity.toLocaleString()} spots
              </span>
            )}
          </div>

          <TicketPriceActions ticket={ticket} onDetails={onDetails} />
        </div>
      </div>

      <TicketPerforationLine />
      <TicketStub barcodeColor={barcodeColor} borderClassName={isDark ? "border-white/20" : "border-black/20"} />
      <TicketEdgeNotches side="right" />
    </div>
  );
};

export default TicketCard;
