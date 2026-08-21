"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ClipboardEvent, KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  Clock,
  LoaderCircle,
  Mail,
  Ticket as TicketIcon,
  X,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { TicketRegistrationModalProps } from "../types";
import { toast } from "sonner";

gsap.registerPlugin(useGSAP);

type Stage = "form" | "sending" | "otp" | "verifying" | "review";

interface AttendeeForm {
  fullName: string;
  dateOfBirth: string;
  idType: string;
  idNumber: string;
  foundingMember: boolean;
}

const OTP_LENGTH = 5;
const ID_TYPES = ["CNIC", "Passport", "National ID", "B-Form", "Other"];
const OTP_PREFERENCES = ["Email"];

const formatIDNumber = (value: string, type: string) => {
  if (type === "CNIC" || type === "B-Form") {
    const digits = value.replace(/\D/g, "").slice(0, 13);
    let formatted = "";
    if (digits.length > 0) {
      formatted += digits.substring(0, 5);
      if (digits.length > 5) {
        formatted += "-" + digits.substring(5, 12);
        if (digits.length > 12) {
          formatted += "-" + digits.substring(12, 13);
        }
      }
    }
    return formatted;
  }
  if (type === "Passport") {
    return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 15);
  }
  return value.slice(0, 30);
};

const getIDPlaceholder = (type: string) => {
  switch (type) {
    case "CNIC":
    case "B-Form":
      return "XXXXX-XXXXXXX-X";
    case "Passport":
      return "e.g. AB1234567";
    case "National ID":
      return "Enter National ID number";
    default:
      return "Enter ID number";
  }
};

const PAYMENT_URL = "https://ticketwala.pk/events/first-light-axwell-2026";

const createAttendee = (): AttendeeForm => ({
  fullName: "",
  dateOfBirth: "",
  idType: "",
  idNumber: "",
  foundingMember: false,
});

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-PK").format(value);

const BlurText = ({ text }: { text: string }) => {
  return (
    <>
      {text.split(/(Axwell|AXWELL)/g).map((part, i) => {
        if (part === "Axwell" || part === "AXWELL") {
          return (
            <span key={i} className="relative inline-block mx-1 translate-y-[2px]">
              <span className="blur-[3.5px] select-none pointer-events-none opacity-40">
                {part}
              </span>
              <span className="absolute inset-0 flex items-center justify-center text-[9px] text-white font-medium tracking-tight whitespace-nowrap">
                Axwell
              </span>
            </span>
          );
        }
        return part;
      })}
    </>
  );
};

const TicketRegistrationModal = ({
  ticket,
  onClose,
}: TicketRegistrationModalProps) => {
  const minTickets = ticket.minPerID || 1;
  const maxTickets = ticket.maxPerID || 1;

  const root = useRef<HTMLDivElement>(null);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [stage, setStage] = useState<Stage>("form");
  const [quantity, setQuantity] = useState(minTickets);
  const [attendees, setAttendees] = useState<AttendeeForm[]>(() =>
    Array.from({ length: minTickets }, () => createAttendee()),
  );
  const [otpPreference, setOtpPreference] = useState("");
  const [foundingMemberEnabled, setFoundingMemberEnabled] = useState(
    Boolean(ticket.registration.addOn?.defaultEnabled),
  );
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [termsConfirmed, setTermsConfirmed] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>(
    Array.from({ length: OTP_LENGTH }, () => ""),
  );
  const flowTimers = useRef<number[]>([]);

  const quantityOptions = useMemo(
    () =>
      Array.from(
        { length: maxTickets - minTickets + 1 },
        (_, index) => index + minTickets,
      ),
    [maxTickets, minTickets],
  );

  const getCleanPrice = (priceStr: string | undefined) => {
    if (!priceStr) return 0;
    const digits = priceStr.replace(/[^\d]/g, "");
    return digits ? Number(digits) : 0;
  };

  const basePriceValue = getCleanPrice(ticket.earlyBirdPrice || ticket.price);
  const baseTotal = basePriceValue * quantity;

  const addOnPrice = ticket.registration.addOn;

  const addOnTotal = useMemo(() => {
    if (!addOnPrice) return 0;
    const addOnPriceValue = getCleanPrice(addOnPrice.price);
    if (foundingMemberEnabled) return addOnPriceValue * quantity;
    return attendees.filter((a) => a.foundingMember).length * addOnPriceValue;
  }, [addOnPrice, foundingMemberEnabled, quantity, attendees]);

  const finalTotal = baseTotal + addOnTotal;

  const leadBuyer = attendees[0] ?? createAttendee();

  const updateAttendee = (
    index: number,
    field: keyof AttendeeForm,
    value: string | boolean,
  ) => {
    setAttendees((current) =>
      current.map((attendee, attendeeIndex) => {
        if (attendeeIndex === index) {
          if (field === "idNumber" && typeof value === "string") {
            const formattedValue = formatIDNumber(value, attendee.idType);
            return { ...attendee, [field]: formattedValue };
          }
          if (field === "idType" && typeof value === "string") {
            return {
              ...attendee,
              idType: value,
              idNumber: formatIDNumber(attendee.idNumber, value),
            };
          }
          return { ...attendee, [field]: value };
        }
        return attendee;
      }),
    );
  };

  const handleQuantityChange = (nextQuantity: number) => {
    setQuantity(nextQuantity);
    setAttendees((current) =>
      Array.from(
        { length: nextQuantity },
        (_, index) => current[index] ?? createAttendee(),
      ),
    );
  };

  const validateForm = () => {
    if (!email.trim()) return "Please enter the lead buyer email.";
    if (!phoneNumber.trim()) return "Please enter the lead buyer phone number.";
    if (!otpPreference) return "Please select OTP delivery preference.";

    for (const [index, attendee] of attendees.entries()) {
      if (!attendee.fullName.trim())
        return `Please enter the full name for Ticket ${index + 1}.`;
      if (!attendee.dateOfBirth)
        return `Please enter the date of birth for Ticket ${index + 1}.`;
      if (!attendee.idType)
        return `Please select the ID type for Ticket ${index + 1}.`;
      if (!attendee.idNumber.trim())
        return `Please enter the ID number for Ticket ${index + 1}.`;
    }

    if (!ageConfirmed || !termsConfirmed) {
      return "Please confirm both declarations to continue.";
    }

    return "";
  };

  const handleSendOtp = async () => {
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setErrorMessage("");
    setOtpDigits(Array.from({ length: OTP_LENGTH }, () => ""));
    setStage("sending");

    try {
      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send OTP");
      }

      setStage("otp");
      requestAnimationFrame(() => {
        otpRefs.current[0]?.focus();
      });
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to send OTP. Please try again.");
      setStage("form");
    }
  };

  const verifyCode = async (digits: string[]) => {
    const code = digits.join("");
    if (code.length !== OTP_LENGTH) return;

    setStage("verifying");

    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Invalid verification code");
      }

      setStage("review");
    } catch (error: any) {
      toast.error("Incorrect Verification Code");
      setErrorMessage(error.message || "Invalid code. Please try again.");
      setStage("otp");
      setOtpDigits(Array.from({ length: OTP_LENGTH }, () => ""));
      requestAnimationFrame(() => {
        otpRefs.current[0]?.focus();
      });
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const nextValue = value.replace(/[^0-9]/g, "").slice(0, 1);
    const next = [...otpDigits];
    next[index] = nextValue;
    setOtpDigits(next);

    if (nextValue && index < OTP_LENGTH - 1) {
      requestAnimationFrame(() => {
        otpRefs.current[index + 1]?.focus();
      });
    }

    if (next.every((digit) => digit)) {
      verifyCode(next);
    }
  };

  const handleOtpKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;

    const next = Array.from(
      { length: OTP_LENGTH },
      (_, index) => pasted[index] ?? "",
    );
    setOtpDigits(next);
    requestAnimationFrame(() => {
      const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
      otpRefs.current[focusIndex]?.focus();
    });

    if (next.every((digit) => digit)) {
      verifyCode(next);
    }
  };

  const reviewRows = useMemo(
    () => [
      { label: "Lead Buyer", value: leadBuyer.fullName || "—" },
      { label: "Email", value: email || "—" },
      { label: "Phone", value: phoneNumber || "—" },
      { label: "Tier", value: ticket.name },
      { label: "Quantity", value: String(quantity) },
      {
        label: "Founding Member",
        value: ticket.registration.addOn
          ? foundingMemberEnabled
            ? "Enabled"
            : "Disabled"
          : "N/A",
      },
      { label: "Total", value: `PKR ${formatCurrency(finalTotal)}` },
    ],
    [
      email,
      finalTotal,
      foundingMemberEnabled,
      leadBuyer.fullName,
      phoneNumber,
      quantity,
      ticket,
    ],
  );

  const { contextSafe } = useGSAP(
    () => {
      if (typeof document === "undefined" || !root.current) return;

      gsap
        .timeline()
        .from(".registration-backdrop", {
          autoAlpha: 0,
          duration: 0.3,
          ease: "power2.out",
        })
        .from(
          ".registration-glow",
          {
            autoAlpha: 0,
            scale: 0.6,
            duration: 0.55,
            ease: "power2.out",
          },
          "-=0.1",
        )
        .from(
          ".registration-card",
          {
            y: 64,
            scale: 0.92,
            autoAlpha: 0,
            duration: 0.55,
            ease: "back.out(1.35)",
          },
          "-=0.45",
        )
        .from(
          ".registration-stagger",
          {
            y: 18,
            autoAlpha: 0,
            duration: 0.4,
            stagger: 0.04,
            ease: "power2.out",
          },
          "-=0.25",
        );

      gsap.to(".registration-topbar, .registration-card-neon", {
        backgroundPosition: "300% 0",
        duration: 3.5,
        ease: "none",
        repeat: -1,
      });
      gsap.to(".registration-side-rail", {
        backgroundPosition: "0% 300%",
        duration: 4,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: root, dependencies: [ticket], revertOnUpdate: true },
  );

  const handleClose = contextSafe(() => {
    gsap
      .timeline({ onComplete: onClose })
      .to(".registration-card", {
        y: 36,
        scale: 0.95,
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.in",
      })
      .to(
        [".registration-glow", ".registration-backdrop"],
        { autoAlpha: 0, duration: 0.28, ease: "power2.in" },
        "-=0.18",
      );
  });

  useEffect(() => {
    return () => {
      flowTimers.current.forEach((timer) => window.clearTimeout(timer));
      flowTimers.current = [];
    };
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={root}
      className={`font-just fixed inset-0 z-[101] flex items-center justify-center p-4`}
      role="dialog"
      aria-modal="true"
      aria-label={`${ticket.name} registration`}
    >
      <div
        className="registration-backdrop absolute inset-0 bg-[#02010A]/88 backdrop-blur-md"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 40%, rgba(24,6,15,0.24), transparent 55%)",
        }}
        onClick={handleClose}
      />

      <div
        className="registration-glow pointer-events-none absolute h-[560px] w-[440px] rounded-full opacity-70 blur-[100px]"
        style={{
          background: ticket.featured
            ? "radial-gradient(circle, rgba(15,182,174,0.32), rgba(24,6,15,0.22) 60%, transparent 75%)"
            : "radial-gradient(circle, rgba(24,6,15,0.26), rgba(15,182,174,0.14) 60%, transparent 75%)",
        }}
      />

      <div className="registration-card-wrap relative w-full max-w-[1180px] rounded-[28px] p-[2px]">
        <div
          className="registration-card-neon pointer-events-none absolute inset-0 rounded-[28px] opacity-90"
          style={{
            background:
              "linear-gradient(90deg,#0FB6AE,#ffffff,#0FB6AE,#18060F,#0FB6AE,#ffffff)",
            backgroundSize: "300% 100%",
          }}
        />

        <div className="registration-card relative flex h-[min(92vh,1020px)] w-full flex-col overflow-hidden rounded-[26px] bg-linear-to-b from-[#160014] via-[#0f0014] to-[#02010A] shadow-[0_0_70px_rgba(15,182,174,0.16)]">
          <div
            className="registration-side-rail pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-[3px] rounded-l-[26px]"
            style={{
              background:
                "linear-gradient(180deg,#0FB6AE,#ffffff,#0FB6AE,#18060F,#0FB6AE)",
              backgroundSize: "100% 300%",
            }}
          />
          <div
            className="registration-side-rail pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-[3px] rounded-r-[26px]"
            style={{
              background:
                "linear-gradient(180deg,#18060F,#0FB6AE,#ffffff,#0FB6AE,#18060F)",
              backgroundSize: "100% 300%",
            }}
          />

          <div className="relative z-20 h-[5px] w-full overflow-hidden rounded-t-[26px]">
            <div
              className="registration-topbar absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg,#0FB6AE,#ffffff,#0FB6AE,#18060F,#0FB6AE,#ffffff)",
                backgroundSize: "300% 100%",
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="absolute right-4 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/70 backdrop-blur-sm transition-all duration-300 hover:rotate-90 hover:border-[#18060F] hover:text-[#18060F] cursor-pointer"
          >
            <X size={16} />
          </button>

          <div
            data-lenis-prevent
            className="scrollbar-none min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain"
          >
            {stage === "form" && (
              <div className="grid gap-0 lg:grid-cols-[minmax(0,1.25fr)_360px]">
                <div className="px-5 py-5 sm:px-7 sm:py-7 lg:border-r lg:border-white/8">
                  <div className="registration-stagger rounded-[28px] border border-white/10 bg-black/25 p-5 sm:p-6 shadow-[0_0_36px_rgba(15,182,174,0.06)]">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#0FB6AE]/25 bg-[#0FB6AE]/8 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#0FB6AE]">
                      <TicketIcon size={12} />
                      {ticket.registration.eyebrow}
                    </span>
                    <h2
                      className={`font-just mt-4 text-[42px] leading-[0.9] text-white sm:text-[54px]`}
                    >
                      <BlurText text={ticket.registration.title} />
                    </h2>
                    <p className="registration-stagger mt-4 max-w-3xl text-sm leading-7 text-white/72 sm:text-[15px]">
                      <BlurText text={ticket.registration.body} />
                    </p>
                  </div>

                  <div className="mt-5 rounded-[26px] border border-white/10 bg-black/20 p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-[#0FB6AE]/75">
                          {ticket.name} Details
                        </p>
                        <h3
                          className={`font-just mt-2 text-[30px] leading-none text-white`}
                        >
                          <BlurText text={ticket.registration.title} />
                        </h3>
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/72">
                          <BlurText text={ticket.registration.body} />
                        </p>
                      </div>
                      <div className="hidden rounded-[18px] border border-[#0FB6AE]/20 bg-[#0FB6AE]/8 px-4 py-3 text-right md:block">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-[#0FB6AE]">
                          Price
                        </p>
                        <p
                          className={`font-just text-[28px] leading-none text-white`}
                        >
                          {ticket.priceFull}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {ticket.registration.highlights.map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/78"
                        >
                          <span className="flex items-start gap-2">
                            <Check
                              size={15}
                              className="mt-0.5 shrink-0 text-[#0FB6AE]"
                            />
                            <span><BlurText text={item} /></span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 rounded-[26px] border border-[#0FB6AE]/20 bg-[#0FB6AE]/8 p-5 sm:p-6">
                    <div className="flex md:flex-row flex-col items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-[#0FB6AE]/75">
                          First Light Founding Member
                        </p>
                        <h3
                          className={`font-just mt-1 text-[28px] leading-none text-white`}
                        >
                          + PKR 1,500 per ticket
                        </h3>
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/72">
                          Lucky draw: meet <span className="relative inline-block mx-1 translate-y-[2px]"><span className="blur-[3.5px] select-none pointer-events-none opacity-40">Axwell</span><span className="absolute inset-0 flex items-center justify-center text-[9px] text-white font-medium tracking-tight whitespace-nowrap">Axwell</span></span> + Exclusive Stage Pass · Tier
                          upgrade opportunity · Fast Lane at future OP events ·
                          Early access to future editions · Founding Members
                          registry listing. Add for all tickets in this order.
                        </p>
                      </div>
                      <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                        <input
                          type="checkbox"
                          checked={foundingMemberEnabled}
                          onChange={(event) =>
                            setFoundingMemberEnabled(event.target.checked)
                          }
                          className="h-4 w-4 rounded border-white/20 bg-transparent text-[#0FB6AE] accent-[#0FB6AE]"
                        />
                        <span className="text-xs font-semibold text-white/80">
                          Add for all tickets
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="mt-5 rounded-[26px] border border-white/10 bg-black/20 p-5 sm:p-6">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-white/45">
                      How many tickets?
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {quantityOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleQuantityChange(option)}
                          className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${option === quantity ? "border-[#0FB6AE] bg-[#0FB6AE] text-[#0a0010] shadow-[0_0_18px_rgba(15,182,174,0.2)]" : "border-white/10 bg-white/[0.04] text-white/65 hover:border-[#0FB6AE]/35 hover:text-white"}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-white/35">
                      Min {minTickets} · Max {maxTickets} tickets per ID. Each ticket
                      is a unique single-use QR code tied to one entry.
                    </p>
                    <div className="mt-4 rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-3">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-white/45">
                        Order Total (excl. Founding Member)
                      </p>
                      <p
                        className={`font-just mt-1 text-[30px] leading-none text-white`}
                      >
                        PKR {formatCurrency(baseTotal)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div className="rounded-[26px] border border-[#0FB6AE]/30 bg-[#0FB6AE]/5 p-5 sm:p-6">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0FB6AE] text-[#02010A]">
                          <span className="text-[12px] font-medium">!</span>
                        </div>
                        <div>
                          <h4 className="text-[13px] font-medium uppercase tracking-wider text-[#0FB6AE]">
                            ID & Age Verification Required
                          </h4>
                          <p className="mt-1.5 text-sm leading-6 text-white/70">
                            Each ticket is tied to one unique government-issued
                            ID. Fill in the details for every person attending.
                            Age 15+ only (18+ for VIP & PLATINUM). Ticket 1 is the
                            lead buyer — all confirmation emails and OTP go to
                            their contact details.
                          </p>
                        </div>
                      </div>
                    </div>

                    {attendees.map((attendee, index) => {
                      const isLead = index === 0;

                      return (
                        <div
                          key={index}
                          className="rounded-[26px] border border-white/10 bg-black/20 p-5 sm:p-6"
                        >
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <p className="text-[10px] font-medium uppercase tracking-wider text-[#0FB6AE]/65">
                                Ticket {index + 1}
                              </p>
                              <h3
                                className={`font-just mt-1 text-[30px] leading-none text-white`}
                              >
                                {isLead
                                  ? "Lead Buyer (You)"
                                  : `Attendee ${index + 1}`}
                              </h3>
                            </div>
                            <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[9px] font-medium uppercase tracking-wider text-white/45">
                              {isLead
                                ? "Your Details & Contact"
                                : "ID Details Required"}
                            </div>
                          </div>

                          <div className="mt-5 grid gap-4 md:grid-cols-2">
                            <label className="block">
                              <span className="text-[10px] font-medium uppercase tracking-wider text-white/50">
                                Full Legal Name *
                              </span>
                              <input
                                type="text"
                                value={attendee.fullName}
                                onChange={(event) =>
                                  updateAttendee(
                                    index,
                                    "fullName",
                                    event.target.value,
                                  )
                                }
                                placeholder="e.g. Ahmed Ali Khan"
                                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#0FB6AE]/60 focus:ring-2 focus:ring-[#0FB6AE]/15"
                              />
                              <p className="mt-1 text-[11px] text-white/30">
                                Please enter full legal name.
                              </p>
                            </label>

                            <label className="block">
                              <span className="text-[10px] font-medium uppercase tracking-wider text-white/50">
                                Date of Birth *
                              </span>
                              <input
                                type="date"
                                value={attendee.dateOfBirth}
                                onChange={(event) =>
                                  updateAttendee(
                                    index,
                                    "dateOfBirth",
                                    event.target.value,
                                  )
                                }
                                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none transition focus:border-[#0FB6AE]/60 focus:ring-2 focus:ring-[#0FB6AE]/15"
                              />
                              <p className="mt-1 text-[11px] text-white/30">
                                Must be 15+ at event date (18+ for VIP/PLATINUM).
                              </p>
                            </label>

                            <label className="block">
                              <span className="text-[10px] font-medium uppercase tracking-wider text-white/50">
                                ID Type *
                              </span>
                              <select
                                value={attendee.idType}
                                onChange={(event) =>
                                  updateAttendee(
                                    index,
                                    "idType",
                                    event.target.value,
                                  )
                                }
                                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none transition focus:border-[#0FB6AE]/60 focus:ring-2 focus:ring-[#0FB6AE]/15"
                              >
                                <option value="">Select ID Type</option>
                                {ID_TYPES.map((type) => (
                                  <option key={type} value={type}>
                                    {type}
                                  </option>
                                ))}
                              </select>
                              <p className="mt-1 text-[11px] text-white/30">
                                Select an ID type.
                              </p>
                            </label>

                            <label className="block">
                              <span className="text-[10px] font-medium uppercase tracking-wider text-white/50">
                                ID Number *
                              </span>
                              <input
                                type="text"
                                value={attendee.idNumber}
                                onChange={(event) =>
                                  updateAttendee(
                                    index,
                                    "idNumber",
                                    event.target.value,
                                  )
                                }
                                placeholder={getIDPlaceholder(attendee.idType)}
                                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#0FB6AE]/60 focus:ring-2 focus:ring-[#0FB6AE]/15"
                              />
                              <p className="mt-1 text-[11px] text-white/30">
                                {attendee.idType === "CNIC" ||
                                attendee.idType === "B-Form"
                                  ? "Format: XXXXX-XXXXXXX-X"
                                  : "Each ticket requires a unique government-issued ID."}
                              </p>
                            </label>

                            {isLead && (
                              <>
                                <label className="block md:col-span-2">
                                  <span className="text-[10px] font-medium uppercase tracking-wider text-white/50">
                                    Email *
                                  </span>
                                  <input
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                      setEmail(event.target.value)
                                    }
                                    placeholder="your@email.com"
                                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#0FB6AE]/60 focus:ring-2 focus:ring-[#0FB6AE]/15"
                                  />
                                  <p className="mt-1 flex items-center gap-1.5 text-[11px] text-white/30">
                                    <Mail size={11} />
                                    Confirmation & QR code sent here.
                                  </p>
                                </label>

                                <label className="block md:col-span-2">
                                  <span className="text-[10px] font-medium uppercase tracking-wider text-white/50">
                                    Phone *
                                  </span>
                                  <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(event) =>
                                      setPhoneNumber(event.target.value)
                                    }
                                    placeholder="+92 3XX XXXXXXX"
                                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#0FB6AE]/60 focus:ring-2 focus:ring-[#0FB6AE]/15"
                                  />
                                  <p className="mt-1 text-[11px] text-white/30">
                                    OTP will be sent here.
                                  </p>
                                </label>

                                <label className="block md:col-span-2">
                                  <span className="text-[10px] font-medium uppercase tracking-wider text-white/50">
                                    OTP Delivery Preference *
                                  </span>
                                  <select
                                    value={otpPreference}
                                    onChange={(event) =>
                                      setOtpPreference(event.target.value)
                                    }
                                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none transition focus:border-[#0FB6AE]/60 focus:ring-2 focus:ring-[#0FB6AE]/15"
                                  >
                                    <option value="">Select preference</option>
                                    {OTP_PREFERENCES.map((pref) => (
                                      <option key={pref} value={pref}>
                                        {pref}
                                      </option>
                                    ))}
                                  </select>
                                  <p className="mt-1 text-[11px] text-white/30">
                                    Please select OTP delivery preference.
                                  </p>
                                </label>
                              </>
                            )}

                            {ticket.registration.addOn &&
                              !foundingMemberEnabled && (
                                <div className="mt-2 md:col-span-2">
                                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#0FB6AE]/20 bg-[#0FB6AE]/5 p-4 transition-all hover:bg-[#0FB6AE]/10">
                                    <input
                                      type="checkbox"
                                      checked={attendee.foundingMember}
                                      onChange={(event) =>
                                        updateAttendee(
                                          index,
                                          "foundingMember",
                                          event.target.checked,
                                        )
                                      }
                                      className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent text-[#0FB6AE] accent-[#0FB6AE]"
                                    />
                                    <div>
                                      <span className="block text-[11px] font-medium uppercase tracking-wider text-[#0FB6AE]">
                                        Add First Light Founding Member — +{" "}
                                        {ticket.registration.addOn.price}
                                      </span>
                                      <span className="mt-1 block text-[11px] leading-relaxed text-white/50">
                                        Lucky draw (meet <span className="relative inline-block mx-0.5 translate-y-[1px]"><span className="blur-[3.5px] select-none pointer-events-none opacity-40">Axwell</span><span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium tracking-tight whitespace-nowrap">Axwell</span></span>), tier upgrade,
                                        Fast Lane, early access, registry
                                        listing.
                                      </span>
                                    </div>
                                  </label>
                                </div>
                              )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 flex items-start gap-3 rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                    <input
                      type="checkbox"
                      checked={ageConfirmed}
                      onChange={(event) =>
                        setAgeConfirmed(event.target.checked)
                      }
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent text-[#0FB6AE] accent-[#0FB6AE]"
                    />
                    <p className="text-sm leading-7 text-white/72">
                      I confirm all attendees are aged 15+ (18+ for VIP/PLATINUM)
                      and will bring valid government-issued ID. Under-18
                      attendees will be accompanied by a parent or guardian.
                    </p>
                  </div>

                  <div className="mt-4 flex items-start gap-3 rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                    <input
                      type="checkbox"
                      checked={termsConfirmed}
                      onChange={(event) =>
                        setTermsConfirmed(event.target.checked)
                      }
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent text-[#0FB6AE] accent-[#0FB6AE]"
                    />
                    <p className="text-sm leading-7 text-white/72">
                      I have read and agree to OP Productions&apos; Terms &amp;
                      Conditions, Refund Policy, and Disclaimer. I understand
                      tickets are non-refundable except as stated, and
                      attendance is at my own risk.
                    </p>
                  </div>

                  <div className="mt-6 rounded-[26px] border border-[#0FB6AE]/20 bg-[#0FB6AE]/5 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-[#0FB6AE]/70">
                          Final Order Total
                        </p>
                        <p
                          className={`font-just mt-1 text-[36px] leading-none text-white`}
                        >
                          PKR {formatCurrency(finalTotal)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">
                          {quantity} Tickets
                        </p>
                        <p className="mt-1 text-xs text-white/60">
                          Incl. all taxes & fees
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <aside className="px-5 py-5 sm:px-7 sm:py-7 lg:sticky lg:top-0 lg:h-fit lg:border-l lg:border-white/8">
                  <div className="rounded-[28px] border border-white/10 bg-black/28 p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-[#0FB6AE]/65">
                          Order Snapshot
                        </p>
                        <h3
                          className={`font-just mt-1 text-[34px] leading-none text-white`}
                        >
                          {ticket.name}
                        </h3>
                      </div>
                      <div className="rounded-2xl flex gap-2 items-center border border-[#0FB6AE]/20 bg-[#0FB6AE]/8 px-3 py-2 text-right">
                        <p className="text-[18px] font-medium -translate-y-[1px] uppercase tracking-wider text-[#0FB6AE]">
                          Qty
                        </p>
                        <p
                          className={`font-just text-[20px] leading-none text-white`}
                        >
                          {quantity}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3 rounded-[22px] border border-white/10 bg-white/[0.03] p-4 text-sm text-white/70">
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-2">
                          <Clock size={14} className="text-[#0FB6AE]" /> {ticket.gateLabel}
                        </span>
                        <span className="font-semibold text-white">
                          from {ticket.gates}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Base price</span>
                        <span className="font-semibold text-white">
                          {ticket.earlyBirdPrice || ticket.priceFull}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Founding Member</span>
                        <span
                          className={`font-semibold ${foundingMemberEnabled ? "text-[#0FB6AE]" : "text-white/45"}`}
                        >
                          {ticket.registration.addOn && foundingMemberEnabled
                            ? `PKR ${formatCurrency(addOnTotal)}`
                            : "Disabled"}
                        </span>
                      </div>
                      <div className="border-t border-white/10 pt-3 flex items-center justify-between gap-4 text-base">
                        <span className="font-medium text-white">
                          Order total
                        </span>
                        <span className="font-medium text-[#0FB6AE]">
                          PKR {formatCurrency(finalTotal)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-white/45">
                        Need-to-know
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-white/68">
                        {ticket.registration.highlights
                          .slice(0, 3)
                          .map((item) => (
                            <li key={item} className="flex gap-2">
                              <Check
                                size={14}
                                className="mt-1 shrink-0 text-[#0FB6AE]"
                              />
                              <span><BlurText text={item} /></span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>
            )}

            {stage === "sending" && (
              <div className="flex h-[min(92vh,1020px)] flex-col items-center justify-center px-5 py-10 text-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-[#0FB6AE]/20 blur-2xl" />
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#0FB6AE]/20 bg-[#0FB6AE]/5 text-[#0FB6AE]">
                    <LoaderCircle className="animate-spin" size={42} />
                  </div>
                </div>
                <h2
                  className={`font-just mt-8 text-[54px] leading-none text-white sm:text-[72px]`}
                >
                  Sending OTP
                </h2>
                <div className="mt-6 max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
                  <p className="text-sm leading-7 text-white/70">
                    We are preparing the verification code for{" "}
                    <span className="font-medium text-[#0FB6AE]">{email}</span>.
                  </p>
                  <p className="mt-4 text-[10px] font-medium uppercase tracking-wider text-white/35">
                    Please wait 2 seconds
                  </p>
                </div>
              </div>
            )}

            {stage === "otp" && (
              <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_360px]">
                <div className="px-5 py-5 sm:px-7 sm:py-7 lg:border-r lg:border-white/8">
                  <button
                    type="button"
                    onClick={() => setStage("form")}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-medium uppercase tracking-wider text-white/70 transition-all duration-300 hover:border-[#0FB6AE]/30 hover:text-white"
                  >
                    <ChevronLeft size={13} />
                    Back
                  </button>

                  <div className="mt-5 rounded-[28px] border border-white/10 bg-black/25 p-5 sm:p-6">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#0FB6AE]/25 bg-[#0FB6AE]/8 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#0FB6AE]">
                      <TicketIcon size={12} />
                      Verify email
                    </span>

                    <h2
                      className={`font-just mt-4 text-[46px] leading-[0.9] text-white sm:text-[58px]`}
                    >
                      Verify Your Number
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 sm:text-[15px]">
                      Enter the 5-digit code sent to{" "}
                      <span className="text-white">{email}</span>.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
                      {otpDigits.map((digit, index) => (
                        <input
                          key={index}
                          ref={(node) => {
                            otpRefs.current[index] = node;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(event) =>
                            handleOtpChange(index, event.target.value)
                          }
                          onKeyDown={(event) => handleOtpKeyDown(index, event)}
                          onPaste={handleOtpPaste}
                          className="h-16 w-14 rounded-[18px] border border-white/10 bg-black/35 text-center text-[24px] font-medium tracking-wider text-white outline-none transition focus:border-[#0FB6AE]/60 focus:ring-2 focus:ring-[#0FB6AE]/15 sm:h-18 sm:w-16"
                        />
                      ))}
                    </div>

                    <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.03] p-5 text-left text-sm leading-7 text-white/70">
                      <p className="font-semibold text-white/85">
                        Automatic verification flow
                      </p>
                      <p className="mt-2">
                        As soon as all 5 digits are entered, the screen will
                        move to your registration review after 2 seconds.
                      </p>
                    </div>
                  </div>
                </div>

                <aside className="px-5 py-5 sm:px-7 sm:py-7 lg:sticky lg:top-0 lg:h-fit lg:border-l lg:border-white/8">
                  <div className="rounded-[28px] border border-white/10 bg-black/28 p-5 sm:p-6">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-[#0FB6AE]/65">
                      Code Sent To
                    </p>
                    <p
                      className={`font-just mt-2 text-[34px] leading-none text-white`}
                    >
                      {email}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/68">
                      Please enter the code to verify your identity and secure
                      your tickets.
                    </p>

                    <div className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.03] p-4 text-sm text-white/70">
                      <div className="mt-1 flex items-center gap-2 text-xs uppercase tracking-wider text-white/40">
                        <Clock size={13} className="text-[#0FB6AE]" />
                        Waiting for code completion.
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            )}

            {stage === "verifying" && (
              <div className="flex h-[min(92vh,1020px)] flex-col items-center justify-center px-5 py-10 text-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-[#0FB6AE]/20 blur-2xl" />
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#0FB6AE]/20 bg-[#0FB6AE]/5 text-[#0FB6AE]">
                    <LoaderCircle className="animate-spin" size={42} />
                  </div>
                </div>
                <h2
                  className={`font-just mt-8 text-[54px] leading-none text-white sm:text-[72px]`}
                >
                  Verifying Code
                </h2>
                <div className="mt-6 max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
                  <p className="text-sm leading-7 text-white/70">
                    Please wait 2 seconds while we finalize your registration
                    details.
                  </p>
                </div>
              </div>
            )}

            {stage === "review" && (
              <div className="px-5 py-6 sm:px-7 sm:py-7">
                <div className="mx-auto max-w-[1260px] rounded-[30px] border border-white/10 bg-black/25 p-6 sm:p-8 shadow-[0_0_36px_rgba(15,182,174,0.08)]">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#0FB6AE]/25 bg-[#0FB6AE]/8 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#0FB6AE]">
                    <Check size={12} />
                    Registration Confirmed
                  </span>
                  <h2
                    className={`font-just mt-5 text-[46px] leading-[0.9] text-white sm:text-[62px]`}
                  >
                    Registration Details
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    Your registration is recorded by OP Productions. You will
                    now be redirected to Ticketwala to complete payment. Have
                    your card ready. Bring matching ID for all attendees on
                    event day.
                  </p>

                  <div className="mt-8 grid gap-3 text-left sm:grid-cols-2 lg:grid-cols-3">
                    {reviewRows.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4"
                      >
                        <p className="text-[10px] font-medium uppercase tracking-wider text-white/45">
                          {item.label}
                        </p>
                        <p className="mt-2 break-words text-sm font-semibold text-white/80">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-[26px] border border-white/10 bg-white/[0.03] p-5 text-left">
                    <div className="space-y-4">
                      {attendees.map((attendee, index) => (
                        <div key={index} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                          <p className="text-[10px] font-medium uppercase tracking-wider text-[#0FB6AE]/70">
                            Ticket {index + 1} - {index === 0 ? "Lead Buyer" : `Attendee ${index + 1}`}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {attendee.fullName || "—"}
                          </p>
                          <p className="text-xs text-white/50">
                            ID: <span className="text-white/80">{attendee.idType} {attendee.idNumber || "—"}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 border-t border-white/10 pt-6 space-y-2">
                      <p className="text-sm leading-7 text-white/72">
                        Email - {email || "—"}
                        <br />
                        Phone - {phoneNumber || "—"}
                        <br />
                        Tier - {ticket.name}
                        <br />
                        Quantity - {quantity}
                        <br />
                        Founding Member -{" "}
                        {ticket.registration.addOn
                          ? foundingMemberEnabled
                            ? "Enabled"
                            : "Disabled"
                          : "N/A"}
                        <br />
                        Total - PKR {formatCurrency(finalTotal)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <a
                      href={PAYMENT_URL}
                      target="_blank"
                      className={`font-just rounded-2xl bg-[#0FB6AE] px-8 py-4 text-center text-lg uppercaser text-[#02010A] shadow-[0_0_30px_rgba(15,182,174,0.25)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(15,182,174,0.45)] active:scale-[0.98]`}
                    >
                      Complete Payment on Ticketwala
                    </a>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-4 text-sm font-semibold uppercase tracking-wider cursor-pointer text-white/70 transition-all duration-300 hover:border-[#0FB6AE]/30 hover:text-white active:scale-[0.98]"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {stage === "form" && (
            <div className="relative z-[50] border-t border-white/10 bg-[#02010A]/98 px-5 py-4 backdrop-blur-xl sm:px-7">
              {errorMessage && (
                <div className="mb-4 rounded-[20px] border border-[#0FB6AE]/25 bg-[#0FB6AE]/8 px-4 py-3 text-sm text-white/80">
                  {errorMessage}
                </div>
              )}

              <button
                type="button"
                onClick={handleSendOtp}
                className={`font-just group relative z-[60] flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0FB6AE] py-4 text-lg uppercase text-[#02010A] shadow-[0_0_30px_rgba(15,182,174,0.25)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(15,182,174,0.45)] active:scale-[0.98]`}
              >
                Send OTP &amp; Verify
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default TicketRegistrationModal;
