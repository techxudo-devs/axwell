import type { TicketCardProps } from "../types";

const TicketPriceActions = ({ ticket, onDetails }: TicketCardProps) => {
  const getCleanPrice = (priceStr: string | undefined) => {
    if (!priceStr) return 0;
    const digits = priceStr.replace(/[^\d]/g, "");
    return digits ? Number(digits) : 0;
  };

  const regularPrice = getCleanPrice(ticket.price);

  const formattedRegular = new Intl.NumberFormat("en-PK").format(regularPrice);

  return (
    <div className="self-end flex flex-col items-stretch w-[120px] gap-[4px]">
      <div className="flex items-center justify-center h-[30px] border border-[#0FB6AE] bg-[#0FB6AE] rounded-sm overflow-hidden px-3">
        <span className="text-[13px] font-medium leading-none text-[#0a0010]">
          PKR {formattedRegular}
        </span>
      </div>
      <button
        type="button"
        onClick={() => onDetails(ticket)}
        className={`font-just bg-[#18060F] hover:bg-[#18060F] active:scale-95 text-white h-[30px] px-3 rounded-sm text-center transition-all duration-300 uppercase shadow-lg shadow-[#18060F]/20 cursor-pointer`}
      >
        Details
      </button>
    </div>
  );
};

export default TicketPriceActions;
