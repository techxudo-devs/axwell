"use client"

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Venue from '@/components/first-light/Venue';
import { CircleQuestionMark, Mail, ChevronDown, Loader2, CheckCircle, Send } from 'lucide-react';

const EMAILJS_SERVICE_ID = 'service_gdipzyr'
const EMAILJS_TEMPLATE_ID = 'template_1vm1i4g'
const EMAILJS_PUBLIC_KEY = 'YCQqjBVRZovx6t5Q9'

const SERVICE_LABELS: Record<string, string> = {
  partnership: 'Partnership',
  sponsorship: 'Sponsorship',
  booking: 'Live Booking',
  management: 'Management Inquiry',
  other: 'Other',
}

const FaqActionButton = () => (
  <button
    type="button"
    aria-label="View FAQ details"
    className="self-end bg-black text-white p-3 rounded-2xl hover:scale-105 transition-transform duration-200"
  >
    <CircleQuestionMark size={18} strokeWidth={2.5} />
  </button>
);

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqsData: FAQItem[] = [
    {
    id: 6,
    category: 'FAQ',
    question: 'How many tickets can I buy?',
    answer: "Per-ID limits keep entry fair and secure — Bronze up to 10, Silver up to 6, Gold up to 8, Gold Women's up to 5, VIP up to 5, PLATINUM up to 4 per transaction. Each ticket carries a unique single-use QR code tied to one entry, so buy for your group in one go and share each person's QR before the gates.",
  },
  {
    id: 7,
    category: 'FAQ',
    question: 'Who else is performing?',
    answer: 'Opening the night: Bilal Brohi, Hazey and Shotbox. Topping the bill — Axwell The confirmed running order and set times drop with the full announcement.',
  },
  {
    id: 1,
    category: 'FAQ',
    question: 'What is the refund and postponement policy?',
    answer: "In short: if OP Productions cancels or postpones, you're covered — a full refund, or your ticket automatically rolls to the new date. No refunds for change of mind or personal circumstances. Full terms in the Policies section below.",
  },
  {
    id: 2,
    category: 'FAQ',
    question: 'When do tickets go on sale?',
    answer: 'On-sale details are announced shortly. The safest way to secure a ticket is to join the First Light list — members on our email list get early access before the public on-sale and are notified the moment sales open. Prices, tiers and Early Bird availability go live with the official announcement.',
  },
  {
    id: 3,
    category: 'FAQ',
    question: 'How do I contact OP Productions?',
    answer: '',
  },
  {
    id: 4,
    category: 'FAQ',
    question: 'Where is the Venue?',
    answer: "First Light is an open-air event at DHA Golf Club (Moin Khan Academy), Zone B / Phase 8, Karachi. On-site parking and ride-hailing drop-off are available at Gate A. Full directions, your gate and a venue map arrive in your confirmation email. Strictly 18+.",
  },
  {
    id: 5,
    category: 'FAQ',
    question: 'Do I need Id at the gate?',
    answer: "This is an 18+ event, so carry a valid government-issued ID (CNIC or passport). PLATINUM and VIP tickets are ID-matched — the name on your ticket must match your ID. Bronze entry is by QR scan only. Whatever your tier, have your QR e-ticket ready for scanning.",
  },
  {
    id: 8,
    category: 'FAQ',
    question: 'Who is organizing this event?',
    answer: 'First Light is produced by OP Productions — an original OP Productions event. Tickets are issued and managed by Ticketwala on behalf of OP Productions.',
  },
  {
    id: 9,
    category: 'FAQ',
    question: 'What Time and date do early bird tickets closed?',
    answer: 'Early Bird discounts will be valid for 48 hours after the tickets go live. Once the 48-hour period ends, the Early Bird offer will close and regular ticket pricing will apply.'
  },
  {
    id: 10,
    category: 'FAQ',
    question: 'What Time and date do normal ticket open?',
    answer: 'Tickets will be announced on 22 August 2026 at 5:00 PM. The Early Bird discount will remain valid for 48 hours, meaning the discount will end on 24 August 2026 at 5:00 PM. From 24 August 2026 at 5:00 PM onwards, normal ticket pricing will apply.'

  },
];

interface ClockItem {
  name: string;
  hours: number; 
  minutes: number;
  label: string; 
}

const clocksData: ClockItem[] = [
  { name: 'BRONZE', hours: 16, minutes: 0, label: '4:00 PM · Gate 4' },
  { name: 'SILVER', hours: 16, minutes: 0, label: '4:00 PM · Gate 3' },
  { name: 'GOLD', hours: 16, minutes: 15, label: '4:15 PM · Gate 2' },
  { name: 'PLATINUM', hours: 16, minutes: 30, label: '4:30 PM · Gate 1' },
  { name: 'VIP', hours: 16, minutes: 0, label: '4:00 PM · Gate 1' },
];

const AnalogClock = ({ name, hours, minutes, label }: ClockItem) => {
  const minuteAngle = minutes * 6; 
  const hourAngle = ((hours % 12) + minutes / 60) * 30; 

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-[120px] h-[120px] rounded-full bg-[#120114] border-2 border-[#0FB6AE]/40 shadow-[0_0_25px_rgba(15,182,174,0.15)]">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 h-[6px] w-[2px] bg-[#0FB6AE]/50"
            style={{
              transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-52px)`,
            }}
          />
        ))}

        <span
          className="absolute left-1/2 top-1/2 w-[4px] h-[34px] rounded-full bg-white origin-bottom"
          style={{
            transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
          }}
        />

        <span
          className="absolute left-1/2 top-1/2 w-[2px] h-[46px] rounded-full bg-[#18060F] origin-bottom"
          style={{
            transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`,
          }}
        />

        <span className="absolute left-1/2 top-1/2 w-[10px] h-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0FB6AE]" />
      </div>

      <div className="flex flex-col items-center">
        <span className="text-[15px] font-medium uppercase tracking-wider text-[#0FB6AE]">
          {name}
        </span>
        <span className="text-[13px] font-medium text-white/80">{label}</span>
      </div>
    </div>
  );
};

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(4);
  const [contactEmail, setContactEmail] = useState("");
  const [contactService, setContactService] = useState("");
  const [contactStatus, setContactStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleContactSubmit = async () => {
    if (!contactEmail || !contactService) return;
    setContactStatus("submitting");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_email: contactEmail,
          reply_to: contactEmail,
          service: SERVICE_LABELS[contactService] || contactService,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setContactStatus("success");
      setTimeout(() => {
        setContactStatus("idle");
        setContactEmail("");
        setContactService("");
      }, 4500);
    } catch (error) {
      console.error("Failed to send inquiry:", error);
      setContactStatus("idle");
    }
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : faqsData.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < faqsData.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className={`relative min-h-screen w-full bg-gradient-to-b from-[#0E010E] to-[#04040A] flex flex-col items-center justify-between pb-10 px-4 md:px-12 overflow-hidden font-just`}>

      <div className="w-full max-w-[1100px] z-10">
        <h2
          className={`font-just mb-14 text-[40px] md:text-[50px] lg:text-[56px] text-[#0FB6AE] text-center uppercase drop-shadow-[0_0_15px_rgba(15,182,174,0.3)] select-none`}
        >
          Doors Open
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
          {clocksData.map((clock) => (
            <AnalogClock key={clock.name} {...clock} />
          ))}
        </div>
      </div>

      <Venue />
      
      <div id="faqs" className="w-full scroll-mt-28">
        <div className="w-full flex justify-center select-none pointer-events-none mt-16 mb-14">
          <h2
            className={`font-just text-[40px] md:text-[50px] lg:text-[56px] text-[#0FB6AE] text-center uppercase drop-shadow-[0_0_15px_rgba(15,182,174,0.3)]`}
          >
            Faqs
          </h2>
        </div>

        {/* Slider Viewport Container */}
        <div className="relative w-full max-w-[1240px] h-[400px] flex items-center justify-center">
          
          {/* Carousel Tracks */}
          <div className="relative w-full h-full flex items-center justify-center">
            {faqsData.map((item, index) => {
              const N = faqsData.length;
              let relativeOffset = index - activeIndex;

              // Adjust the offset to calculate the shortest path on a circular loop
              if (relativeOffset > N / 2) {
                relativeOffset -= N;
              } else if (relativeOffset < -N / 2) {
                relativeOffset += N;
              }

              const isCenter = relativeOffset === 0;

              // Generate horizontal positioning translation (345px spacing per card)
              const translateX = relativeOffset * 345;

              // Vertical staggered translations
              let translateY = 0;
              if (isCenter) {
                translateY = 40; // Center card is low
              } else if (Math.abs(relativeOffset) === 1) {
                translateY = -15; // Adjacent cards are high
              } else {
                translateY = 15; // Outer cards are low
              }

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`absolute w-[325px] h-[365px] rounded-[38px] p-7 flex flex-col justify-between transition-all duration-500 ease-out select-none shadow-[0_15px_45px_rgba(0,0,0,0.08)] ${
                    isCenter 
                      ? 'bg-[#18060F] text-white z-20 scale-100' 
                      : 'bg-[#0FB6AE] text-black z-10 scale-[0.94] cursor-pointer'
                  }`}
                  style={{
                    transform: `translateX(${translateX}px) translateY(${translateY}px)`,
                    // Smooth visual fade out for distant cards
                    opacity: Math.abs(relativeOffset) > 2 ? 0 : 1,
                    pointerEvents: Math.abs(relativeOffset) > 1 ? 'none' : 'auto',
                  }}
                >
                  {isCenter ? (
                    <>
                      <div className="flex flex-col gap-3 items-start h-full">
                        <span className="text-[10px] uppercase font-medium tracking-wider border border-white/30 px-3.5 py-1.5 rounded-full bg-white/5">
                          {item.category}
                        </span>
                        <h3 className={`text-[23px] font-medium leading-[1.1] tracking-tight ${item.id === 3 ? "pb-2" : ""}`}>
                          {item.question}
                        </h3>

                        {item.id === 3 && contactStatus === "success" ? (
                          <div className="flex items-center gap-2 text-[#0FB6AE] text-[12px] font-medium">
                            <CheckCircle size={18} />
                            Message sent! We'll get back to you soon.
                          </div>
                        ) : item.id === 3 ? (
                          <div className="flex flex-col gap-2 w-full mt-1">
                            <div className="relative">
                              <Mail size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                              <input
                                type="email"
                                placeholder="Your email"
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-8 pr-3 text-[11px] text-white outline-none focus:border-[#0FB6AE] placeholder:text-white/30 transition-colors"
                              />
                            </div>
                            <div className="relative">
                              <select
                                value={contactService}
                                onChange={(e) => setContactService(e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-[11px] text-white outline-none focus:border-[#0FB6AE] appearance-none transition-colors"
                              >
                                <option value="" disabled className="text-black">Select service</option>
                                <option value="partnership" className="text-black">Partnership</option>
                                <option value="sponsorship" className="text-black">Sponsorship</option>
                                <option value="booking" className="text-black">Live Booking</option>
                                <option value="management" className="text-black">Management Inquiry</option>
                                <option value="other" className="text-black">Other</option>
                              </select>
                              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                            </div>
                            <button
                              onClick={handleContactSubmit}
                              disabled={contactStatus === "submitting" || !contactEmail || !contactService}
                              className="flex items-center justify-center gap-2 w-full bg-[#0FB6AE] hover:bg-[#0FB6AE]/80 disabled:opacity-50 text-[#02010A] font-medium text-[10px] uppercase tracking-wider rounded-lg py-2.5 transition-all mt-1 cursor-pointer"
                            >
                              {contactStatus === "submitting" ? (
                                <>
                                  <Loader2 size={14} className="animate-spin" />
                                  Submitting
                                </>
                              ) : (
                                <>
                                  <Send size={14} />
                                  Submit
                                </>
                              )}
                            </button>
                          </div>
                        ) : (
                          <p className="text-[11px] leading-relaxed font-medium text-white/90">
                            {item.answer.includes("Axwell") ? (
                              <>
                                {item.answer.split("Axwell")[0]}
                                <span className="relative inline-block">
                                  <span className="select-none pointer-events-none">
                                    Axwell
                                  </span>
                                </span>
                                {item.answer.split("Axwell")[1]}
                              </>
                            ) : (
                              item.answer
                            )}
                          </p>
                        )}
                      </div>

                      <FaqActionButton />
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col gap-4">
                        <h3 className="text-[22px] font-medium leading-[1.1] tracking-tight">
                          {item.question}
                        </h3>
                      </div>

                      <FaqActionButton />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation controls */}
        <div className="flex gap-4 mt-16 z-10 justify-center">
          <button 
            onClick={handlePrev}
            className="group px-6 py-4 rounded-full border border-zinc-800 hover:border-zinc-700 transition-colors duration-300 active:scale-95 cursor-pointer"
            aria-label="Previous FAQ"
          >
            <svg 
              width="24" 
              height="14" 
              viewBox="0 0 32 16" 
              fill="none" 
              stroke="white" 
              strokeWidth="2"
              className="group-hover:-translate-x-1 transition-transform duration-200"
            >
              <path d="M31 8H1M1 8L8 1M1 8L8 15" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button 
            onClick={handleNext}
            className="group px-6 py-4 rounded-full border border-zinc-800 hover:border-zinc-700 transition-colors duration-300 active:scale-95 cursor-pointer"
            aria-label="Next FAQ"
          >
            <svg 
              width="24" 
              height="14" 
              viewBox="0 0 32 16" 
              fill="none" 
              stroke="white" 
              strokeWidth="2"
              className="group-hover:translate-x-1 transition-transform duration-200"
            >
              <path d="M1 8H31M31 8L24 1M31 8L24 15" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Faqs;