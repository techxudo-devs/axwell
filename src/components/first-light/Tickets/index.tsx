"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { getTicketById } from "./data";
import type { Ticket } from "./types";
import TicketCard from "./components/TicketCard";
import TicketDetailModal from "./components/TicketDetailModal";
import TicketRegistrationModal from "./components/TicketRegistrationModal";
import TicketsBackground from "./components/TicketsBackground";

type ActiveModal =
  | { type: "details"; ticket: Ticket }
  | { type: "register"; ticket: Ticket }
  | null;

const Tickets = () => {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  useEffect(() => {
    const handleOpenRegistration = (event: any) => {
      const { ticketId } = event.detail;
      try {
        const ticket = getTicketById(ticketId);
        setActiveModal({ type: "details", ticket });
      } catch (error) {
        console.error("Failed to open ticket details:", error);
      }
    };

    window.addEventListener("open-ticket-registration", handleOpenRegistration);
    return () => {
      window.removeEventListener(
        "open-ticket-registration",
        handleOpenRegistration,
      );
    };
  }, []);

  const activeDetailsTicket =
    activeModal?.type === "details" ? activeModal.ticket : null;
  const activeRegistrationTicket =
    activeModal?.type === "register" ? activeModal.ticket : null;

  return (
    <section
      id="tickets"
      className="relative min-h-screen w-full bg-[#02010A] flex flex-col items-center justify-center px-4 pb-10 overflow-hidden scroll-mt-24"
    >
      <TicketsBackground />

      <div className="relative z-10 w-full max-w-[920px] flex flex-col items-center">
        <h2
          className={`font-just text-[40px] md:text-[50px] leading-none lg:text-[56px] text-[#0FB6AE] mb-14 text-center uppercase drop-shadow-[0_0_15px_rgba(15,182,174,0.3)]`}
        >
          Choose your experience
        </h2>

        {/* High-End Premium Early Bird Banner */}
        {/* <div className="mb-10 w-full max-w-[850px] group relative">
          <div className="absolute -inset-[2px] bg-gradient-to-r from-[#18060F] via-[#0FB6AE] to-[#18060F] rounded-3xl blur-[8px] opacity-25 group-hover:opacity-50 transition-opacity duration-700 animate-pulse"></div>

          <div
            className={`relative bg-black/40 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch shadow-2xl font-just`}
          >
            <div className="hidden md:block w-1.5 bg-gradient-to-b from-[#18060F] via-[#0FB6AE] to-[#18060F]"></div>

            <div className="flex-1 px-8 py-6 flex flex-col justify-center text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Sparkles className="text-[#0FB6AE] w-4 h-4" />
                <span className="text-[10px] uppercase font-medium tracking-wider text-[#0FB6AE]/80">
                  Early Bird Special
                </span>
              </div>
              <h3 className="text-[15px] sm:text-[16px] leading-tight text-white font-medium tracking-wide">
                <span className="text-white font-medium">
                  Limited allocation
                </span>{" "}
                at the lowest prices of the campaign.
                On-sale details announced soon.
              </h3>
              <p className="text-[11px] sm:text-[12px] mt-2 text-zinc-400 font-medium uppercase tracking-wide">
                Join the First Light list for early access
              </p>
            </div>

            <div className="bg-white/5 border-t md:border-t-0 md:border-l border-white/10 px-10 py-6 flex flex-col items-center justify-center min-w-[220px] relative overflow-hidden">
              <div className="absolute inset-0 bg-[#0FB6AE]/5 blur-2xl"></div>

              <span className="relative z-10 text-[9px] uppercase font-medium tracking-wider text-white mb-1">
                Discounted Price
              </span>
              <div className="relative z-10 flex items-baseline gap-1">
                <span className="text-[14px] font-medium text-[#0FB6AE]">
                  PKR
                </span>
                <span className="text-[32px] font-medium text-white leading-none tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  5,950
                </span>
              </div>
              <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-transparent via-[#18060F] to-transparent"></div>
            </div>
          </div>
        </div> */}

        <div className="flex flex-col gap-y-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full">
            <TicketCard
              ticket={getTicketById("bronze")}
              onDetails={(ticket) =>
                setActiveModal({ type: "details", ticket })
              }
            />
            <TicketCard
              ticket={getTicketById("silver")}
              onDetails={(ticket) =>
                setActiveModal({ type: "details", ticket })
              }
            />
            <TicketCard
              ticket={getTicketById("gold")}
              onDetails={(ticket) =>
                setActiveModal({ type: "details", ticket })
              }
            />
            <TicketCard
              ticket={getTicketById("gold-women")}
              onDetails={(ticket) =>
                setActiveModal({ type: "details", ticket })
              }
            />
            <TicketCard
              ticket={getTicketById("vvip")}
              onDetails={(ticket) =>
                setActiveModal({ type: "details", ticket })
              }
            />
              <TicketCard
                ticket={getTicketById("platinum")}
                onDetails={(ticket) =>
                  setActiveModal({ type: "details", ticket })
                }
              />
          </div>

          {/* <div className="flex justify-center w-full my-2">
            <div className="w-full md:max-w-[448px]">
            </div>
          </div> */}
        </div>
      </div>

      {activeDetailsTicket && (
        <TicketDetailModal
          ticket={activeDetailsTicket}
          onClose={() => setActiveModal(null)}
          onBuyNow={(ticket) => setActiveModal({ type: "register", ticket })}
        />
      )}

      {activeRegistrationTicket && (
        <TicketRegistrationModal
          ticket={activeRegistrationTicket}
          onClose={() => setActiveModal(null)}
        />
      )}
    </section>
  );
};

export default Tickets;
