"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const BENEFITS = [
  "Lineup reveals before public drops",
  "Early access to ticket windows and upgrades",
  "Curated event updates, no clutter",
] as const;

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");

    // Simulate an async subscription flow.
    window.setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <section
      className={`relative w-full overflow-hidden bg-[#02010A] py-10 text-white font-just`}
    >
      {/* <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-[#0FB6AE]/10 blur-[120px]" />
        <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[#18060F]/25 blur-[120px]" />
        <div className="absolute right-0 top-16 h-80 w-80 rounded-full bg-[#0FB6AE]/6 blur-[140px]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_35%,black_35%,transparent_78%)]" />
      </div> */}

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0FB6AE]/25 bg-[#0FB6AE]/8 px-4 py-2 shadow-[0_0_24px_rgba(15,182,174,0.08)]">
            {/* <Sparkles size={13} className="text-[#0FB6AE]" /> */}
            <span className="text-[10px] font-medium uppercase tracking-wide text-[#0FB6AE]">
              You're on the list. See you there.
            </span>
          </div>

          <h2
            className={`font-just text-[clamp(3.2rem,8vw,5rem)] leading-[0.9] text-white`}
          >
            Stay ahead of the <span className="text-[#0FB6AE]">drop</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
            Be first to know about lineup reveals, ticket drops, exclusive
            member offers, and everything First Light. No spam — ever.
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* <div className="absolute inset-0 bg-gradient-to-r from-[#18060F]/25 via-transparent to-[#0FB6AE]/15" /> */}
          <div className="mx-auto w-full max-w-md px-4">
            {status === "success" ? (
              /* Success State */
              <div className="flex items-center justify-center gap-2 py-3 text-center text-xs font-semibold uppercase tracking-wide text-[#0FB6AE] drop-shadow-[0_0_10px_rgba(15,182,174,0.2)] animate-fade-in">
                <span className="text-sm">✦</span> You&apos;re on the list. See
                you there.
              </div>
            ) : (
              /* Form State */
              <form
                onSubmit={handleSubmit}
                className="group relative flex flex-col gap-2.5 sm:flex-row sm:items-center sm:rounded-2xl sm:border sm:border-white/10 sm:bg-[#02010A]/80 sm:p-1.5 transition-all duration-300 focus-within:border-[#0FB6AE]/30 focus-within:shadow-[0_0_30px_rgba(15,182,174,0.12)]"
              >
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent px-5 py-4 text-xs font-medium tracking-wider text-white outline-none placeholder:text-white/20 sm:py-3 sm:text-sm"
                  />
                </div>

                <button
                  disabled={status === "loading"}
                  className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#0FB6AE] to-[#0d928b] px-6 py-4 text-[10px] font-medium uppercase tracking-wider text-[#0a0010] shadow-[0_4px_20px_rgba(15,182,174,0.15)] transition-all duration-300 hover:shadow-[0_4px_25px_rgba(15,182,174,0.3)] active:scale-[0.98] sm:py-3"
                >
                  <span className="relative z-10 flex items-center cursor-pointer justify-center gap-1.5">
                    {status === "loading" ? "..." : "Notify Me"}
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
