import type { TicketCardProps } from "../types";

const TicketPriceActions = ({ ticket, onDetails }: TicketCardProps) => {
  const getCleanPrice = (priceStr: string | undefined) => {
    if (!priceStr) return 0;
    const digits = priceStr.replace(/[^\d]/g, "");
    return digits ? Number(digits) : 0;
  };

  const regularPrice = getCleanPrice(ticket.price);
  const earlyBirdPrice = getCleanPrice(ticket.earlyBirdPrice);

  const formattedRegular = new Intl.NumberFormat("en-PK").format(regularPrice);
  const formattedEarlyBird =
    earlyBirdPrice > 0
      ? new Intl.NumberFormat("en-PK").format(earlyBirdPrice)
      : null;

  const savings =
    formattedEarlyBird && regularPrice > earlyBirdPrice
      ? new Intl.NumberFormat("en-PK").format(regularPrice - earlyBirdPrice)
      : null;

  return (
    <div className="self-end flex flex-col items-stretch w-[120px] gap-[4px]">
      <div className="flex flex-col border border-[#0FB6AE] bg-[#0FB6AE] rounded-sm overflow-hidden">
        {formattedEarlyBird && (
          <div className="py-0.5 px-1 bg-[#18060F] text-[#0FB6AE] text-[7px] font-medium uppercase tracking-tighter text-center">
            Early Bird
          </div>
        )}
        <div className="py-1 px-2 text-center text-xs font-semibold tracking-tight text-[#0a0010] flex flex-col items-center justify-center">
          {formattedEarlyBird ? (
            <>
              <span className="text-[9px] line-through opacity-60 decoration-1">
                PKR {formattedRegular}
              </span>
              <span className="text-[13px] font-medium leading-none">
                PKR {formattedEarlyBird}
              </span>
              {savings && (
                <span className="text-[9px] font-medium text-[#18060F]/70 uppercase mt-0.5">
                  Save PKR {savings}
                </span>
              )}
            </>
          ) : (
            <span className="text-[13px] font-medium leading-none">
              PKR {formattedRegular}
            </span>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onDetails(ticket)}
        className={`font-just bg-[#18060F] hover:bg-[#18060F] active:scale-95 text-white py-1 px-3 rounded-sm text-center transition-all duration-300 uppercase shadow-lg shadow-[#18060F]/20 cursor-pointer`}
      >
        Details
      </button>
    </div>
  );
};

export default TicketPriceActions;
