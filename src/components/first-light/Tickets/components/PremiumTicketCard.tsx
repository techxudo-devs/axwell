import { Clock, Mail, Ticket } from "lucide-react";
import type { TicketCardProps } from "../types";
import TicketEdgeNotches from "./TicketEdgeNotches";
import TicketPerforationLine from "./TicketPerforationLine";
import TicketPriceActions from "./TicketPriceActions";
import TicketStub from "./TicketStub";

const PremiumTicketCard = ({ ticket, onDetails }: TicketCardProps) => {
  const isPLATINUM = ticket.id === "platinum";
  
  return (
    <div 
      className="relative flex h-[175px] w-full rounded-md overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(15,182,174,0.15)] backdrop-blur-md"
      style={{ 
        background: isPLATINUM 
          ? "linear-gradient(to right, #000000, #1a1a1a, #000000)" 
          : `linear-gradient(to right, ${ticket.color}, #2a003a, ${ticket.color})` 
      }}
    >
    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-linear-to-b from-[#18060F] via-[#0FB6AE] to-[#18060F]" />

    <TicketEdgeNotches side="left" />

    <div className="flex flex-col justify-between flex-1 p-5 pr-8 select-none">
      <div>
        <span className="text-[10px] uppercase font-medium tracking-wider text-[#0FB6AE] bg-[#0FB6AE]/10 px-2 py-0.5 rounded-sm border border-[#0FB6AE]/20">
          Exclusive Pass
        </span>
        <h3
          className={`font-just text-[40px] leading-none text-transparent bg-clip-text bg-linear-to-r from-[#0FB6AE] via-[#ffffff] to-[#0FB6AE] mt-1.5r`}
        >
          {ticket.name}
        </h3>
      </div>

      <div className="flex items-end justify-between gap-2">
        <div className="flex flex-col gap-1 text-[11px] font-medium tracking-wider text-zinc-300 uppercase">
          <div className="flex items-center gap-2">
            <Clock size={13} className="text-[#0FB6AE]" />
            <span>
              {ticket.gateLabel} · from <span className="text-[#0FB6AE]">{ticket.gates}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Ticket size={13} className="text-[#0FB6AE]" />
            <span>
              Max {ticket.maxPerID} per ID
            </span>
          </div>
        </div>

        <TicketPriceActions ticket={ticket} onDetails={onDetails} />
      </div>
    </div>

    <TicketPerforationLine />
    <TicketStub barcodeColor="#0FB6AE" borderClassName="border-[#0FB6AE]/20" />
    <TicketEdgeNotches side="right" />
    </div>
  );
};

export default PremiumTicketCard;
