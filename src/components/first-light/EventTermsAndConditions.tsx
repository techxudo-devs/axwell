import React from "react";

const definitions = [
  {
    term: "Agent",
    text: "Ticketwala, being the authorised and sole official ticketing agent through which Tickets for the Event are sold.",
  },
  {
    term: "Event",
    text: "First Light, held at the Venue on the date(s) stated on the Ticket, headlined by Axwell.",
  },
  {
    term: "Management or Organizer",
    text: "OP Productions (SMC) Private Limited, its officers, employees, representatives, contractors and sub-contractors.",
  },
  {
    term: "Promoter",
    text: "OP Productions (SMC) Private Limited, being the entity staging and promoting the Event.",
  },
  {
    term: "Venue",
    text: "DHA Sports Club (Moin Khan Academy), Phase 8, Karachi, or such alternate venue as may be notified for the Event.",
  },
  {
    term: "Ticket",
    text: "Any ticket, wristband, QR code or e-ticket issued for entry to the Event.",
  },
  {
    term: "Conditions",
    text: "Collectively, these Terms & Conditions, the Do's & Don'ts, the Health & Safety Notice, and any special conditions published on the Ticketwala listing or OP Productions' website in relation to the Event.",
  },
  {
    term: "You / Your",
    text: "The holder of a Ticket, or any person who, in Management's reasonable opinion, is acting with the authority or permission of a Ticket holder.",
  },
  {
    term: "Face Value",
    text: "The base price of the Ticket exclusive of card processing fees, MDR, payment gateway fees, bank transfer charges, delivery fees, platform/service fees and applicable taxes.",
  },
];

type Clause = { n: number; lead?: string; text: string };

const part1Sections: { heading: string; clauses: Clause[] }[] = [
  {
    heading: "Incorporation, Acceptance & Hierarchy",
    clauses: [
      {
        n: 1,
        text: "These Terms & Conditions incorporate, and are to be read together with, the Do's & Don'ts, the Health & Safety Notice, and any special conditions published on the Ticketwala listing or OP Productions' official channels from time to time. Together these are referred to as the \u201CConditions.\u201D",
      },
      {
        n: 2,
        text: "All Tickets are sold subject to the Conditions. Purchase or possession of a Ticket constitutes acceptance of the Conditions in full, whether or not You have read them.",
      },
      {
        n: 3,
        text: "Only Tickets purchased through Ticketwala, the sole official ticketing agent, are valid for entry. OP Productions gives no guarantee of validity for any Ticket purchased through any other source, and any such Ticket will be treated as void.",
      },
    ],
  },
  {
    heading: "Event Restrictions, Alterations & Right to Vary",
    clauses: [
      {
        n: 4,
        text: "Management reserves the right to implement, vary, or add to safety, security, or entry restrictions before and during the Event, including in response to weather, security advisories, or government directives. You must comply with all such restrictions and with any instruction given by Event staff and stewards. Failure to comply may result in refusal of entry or ejection without refund.",
      },
      {
        n: 5,
        text: "Artists, set times, running order, and other elements of the Event are subject to change. The Event as billed, including the confirmed lineup, may be varied where reasonably necessary. Changes to the lineup, delays to the start of performance, curtailment where the majority of the Event has been performed, and adverse weather are not, by themselves, treated as grounds for a refund (see Clause \u201CMajor Cancellation, Material Alteration & Special Exception\u201D below).",
      },
      {
        n: 6,
        text: "If You have any specific access requirements, or any concerns about special effects to be used at the Event (including lighting, strobe effects, lasers, pyrotechnics, or sound levels), You must raise these with Management prior to purchasing a Ticket. Management will use reasonable efforts to assist with genuine access requirements notified in advance, but cannot guarantee accommodation of requirements raised after purchase or at the Venue.",
      },
    ],
  },
  {
    heading: "Major Cancellation, Material Alteration & Special Exception",
    clauses: [
      {
        n: 7,
        text: "A \u201Cmajor cancellation\u201D means the cancellation of the Event in full, and not merely a postponement or rescheduling. Where only part of a multi-part Event is cancelled, a proportionate partial or full refund of Face Value only may be offered at Management's discretion.",
      },
      {
        n: 8,
        text: "A \u201Cmaterial alteration\u201D means a change to the Event (other than a rescheduling) which, in Management's reasonable opinion, makes the Event materially different from what ticket purchasers, taken generally, could reasonably have expected. For clarity, the following are not material alterations: changes to the artist lineup or support acts, adverse weather, curtailment where the majority of the Event has been performed, and delays to the start time.",
      },
      {
        n: 9,
        text: "A \u201Cspecial exception\u201D is a discretionary exception to the standard refund position, applied by Management at its sole discretion in circumstances it considers warrant one.",
      },
      {
        n: 10,
        text: "Management's total liability in the event of a major cancellation, material alteration, or postponement is limited strictly to the Face Value of the Ticket, as set out in Part 2 (Refund & Entry Denial Policy). Personal costs incidental to attendance — including travel, accommodation, and hospitality arranged by You — are at Your own risk, and neither Management nor the Promoter is liable for these beyond Ticket Face Value.",
      },
    ],
  },
  {
    heading: "Notification of Cancellation or Rescheduling",
    clauses: [
      {
        n: 11,
        text: "It is Your responsibility to keep yourself informed of whether the Event has been cancelled or rescheduled. Management will use reasonable efforts to notify ticket holders using the contact details provided at the time of purchase, but does not guarantee that You will be informed before the scheduled date. It is Your responsibility to keep your contact details, provided to Ticketwala at the point of purchase, up to date.",
      },
    ],
  },
  {
    heading: "Resale, Transfer & Ticket Packaging",
    clauses: [
      { n: 12, text: "Tickets may not be resold above Face Value, or resold or transferred in any manner." },
      {
        n: 13,
        text: "Tickets may not be combined with hospitality, travel, accommodation, merchandise or any other product or service to create a bundled package for resale, commercial gain, or use as a prize or promotional incentive, without Management's prior written consent.",
      },
      {
        n: 14,
        text: "Tickets must not be used, referenced, or displayed as part of any marketing, media, or sales promotion, whether commercial or otherwise, without Management's prior written approval.",
      },
    ],
  },
  {
    heading: "Nature of the Ticket & Void Tickets",
    clauses: [
      {
        n: 15,
        text: "A Ticket is a personal, revocable license granted by Management. It remains, together with any wristband issued, the property of Management at all times and is subject to the Conditions.",
      },
      {
        n: 16,
        text: "A Ticket obtained in breach of the Conditions — including a duplicated, altered, defaced, or fraudulently obtained Ticket — is void. Any person attempting to use a void Ticket to gain or provide entry to the Event will be refused entry or ejected, may be treated as a trespasser, and may be subject to legal action. Void Tickets are non-refundable.",
      },
    ],
  },
  {
    heading: "Right to Refuse Entry or Eject",
    clauses: [
      {
        n: 17,
        text: "Management reserves the right to refuse You entry to, or eject You from, the Event and the Venue, without refund, in circumstances including — but not limited to — the following: for health, safety, or security reasons; if You behave in a manner that affects or is likely to affect the enjoyment of other attendees; if You use threatening, abusive, or insulting words or conduct toward the Event or Management or Agent's staff or otherwise; if You are found in possession of a prohibited item or substance; if, in Management's reasonable opinion, You are intoxicated or under the influence of drugs; if You fail to produce valid, original CNIC, Smart Card, or Passport matching the name on the Ticket when requested; if You refuse a security search; if You harass or cause distress to staff or security, including by filming or photographing them in a manner likely to constitute harassment; or if Your Ticket is void or obtained in breach of the Conditions.",
      },
      { n: 18, text: "No refund will be given where entry is refused, or You are ejected, for any of the reasons set out above." },
    ],
  },
  {
    heading: "Maximum Tickets Per Order",
    clauses: [
      {
        n: 19,
        text: "Ticket purchases are restricted to a maximum number per order/person, as notified on the Ticketwala listing at the time of purchase (see Part 3 — Ticket Sale Structure). Tickets purchased in excess of this limit may be cancelled by Management without prior notice, unless the excess purchase resulted from Management's own error.",
      },
    ],
  },
  {
    heading: "Complaints",
    clauses: [
      {
        n: 20,
        text: "If You have a complaint before or during the Event, You should raise it promptly with a steward or Management representative, as complaints are difficult to resolve after the Event has concluded. Management will use reasonable efforts to address the concern but is under no obligation to resolve every complaint to Your satisfaction.",
      },
    ],
  },
  {
    heading: "Security Searches & Prohibited Items",
    clauses: [
      {
        n: 21,
        text: "Management reserves the right to conduct security searches at entry, within the Venue, and on exit, and to confiscate any item that, in Management's opinion, may cause danger or disruption, or that is listed as a prohibited item under Part 5 (Don'ts). Refusal to permit a search may result in refusal of entry without refund.",
      },
      { n: 22, text: "Neither Management nor the Promoter is liable for the loss, theft, or damage of any confiscated item." },
    ],
  },
  {
    heading: "Protests & Demonstrations",
    clauses: [
      {
        n: 23,
        text: "OP Productions recognises freedom of peaceful assembly as a fundamental right. However, protests, demonstrations, or organised political activity are not permitted inside the Event, as they may disrupt safe operation of the Event and compromise the safety of attendees. Non-compliance to this cause may result in eviction from the Event with no recourse to a ticket refund.",
      },
    ],
  },
  {
    heading: "Re-Entry",
    clauses: [
      {
        n: 24,
        text: "There is no re-entry or pass-out once You have exited the Venue, except where expressly permitted by Management at its discretion for operational or medical reasons. Management will make reasonable efforts to admit latecomers at a suitable point in the Event, but cannot guarantee admission for latecomers.",
      },
    ],
  },
  {
    heading: "Recording, Filming & Media Consent",
    clauses: [
      {
        n: 25,
        text: "Unauthorised use of any equipment to photograph, record, or transmit audio, visual, or audio-visual material within the Venue is strictly prohibited. Prohibited equipment, and any unauthorised recordings made using it, may be confiscated. Any such recording made in breach of the Conditions shall belong to the Promoter, and by attending the Event You agree to assign all rights in it to the Promoter. Neither Management nor the Promoter is liable for loss, theft, or damage to confiscated equipment.",
      },
      {
        n: 26,
        text: "By attending the Event, You consent, without fee, to Your actual or simulated likeness being included in any photograph, film, or audio-visual recording made by or on behalf of OP Productions and/or First Light, for use in any media, for promotional or security purposes, at any time. This includes filming carried out by security personnel for the safety of attendees and prevention of crime.",
      },
    ],
  },
  {
    heading: "Lost Property",
    clauses: [
      {
        n: 27,
        text: "Management is not responsible for personal belongings lost, stolen, or left unattended at the Venue. Contact OP Productions promptly to enquire about lost property; if found, proof of ownership and identification may be required for release.",
      },
    ],
  },
  {
    heading: "Data Protection",
    clauses: [
      {
        n: 28,
        text: "Personal information collected in connection with your Ticket purchase will be processed by Ticketwala and OP Productions solely for purposes related to the Event — including entry validation, communication about the Event, and safety/security — and in accordance with applicable Pakistani data protection law and OP Productions' privacy practices. Queries regarding use of your personal information may be directed to OP Productions through its official contact channels.",
      },
    ],
  },
  {
    heading: "Liability",
    clauses: [
      {
        n: 29,
        text: "Subject to Clause below, Management shall not be liable for any loss, injury, or damage to any person (including You) or property, however caused, where there is no breach of a legal duty of care owed by Management, where such loss is not a reasonably foreseeable result of any such breach, or to the extent the loss is increased by Your own breach of the Conditions or acts of recklessness and/or negligence.",
      },
      {
        n: 30,
        text: "Nothing in the Conditions excludes or limits any liability of Management for death or personal injury caused by its negligence, for fraud, or for any other liability which cannot lawfully be excluded or limited.",
      },
    ],
  },
  {
    heading: "Force Majeure",
    clauses: [
      {
        n: 31,
        text: "\u201CForce Majeure\u201D means any cause beyond Management's reasonable control, including act of God, war, insurrection, riot, civil disturbance, terrorism, fire, explosion, flood, earthquake or other natural disaster, extreme weather, epidemic or pandemic, national mourning, theft of essential equipment, malicious damage, strike, third-party injunction, or acts or regulations of national or local government. Management shall not be liable for failure to perform any obligation under the Conditions to the extent such failure results from Force Majeure.",
      },
    ],
  },
  {
    heading: "General",
    clauses: [
      { n: 32, lead: "Assignment:", text: "Management may assign its rights and obligations under the Conditions, provided Your rights are not adversely affected." },
      { n: 33, lead: "Severability:", text: "If any provision of the Conditions is held invalid or unenforceable, it shall be severed or amended to the minimum extent necessary, and the remainder of the Conditions shall continue in full force." },
      { n: 34, lead: "No Waiver:", text: "A delay or failure by Management to enforce any Condition does not constitute a waiver of its right to do so." },
      { n: 35, lead: "Third-Party Rights:", text: "No person other than Management or the Promoter may enforce any term of the Conditions." },
      { n: 36, lead: "Entire Agreement:", text: "The Conditions constitute the entire agreement between You and Management regarding the Event and supersede any prior representation, arrangement, or understanding, save that nothing in this clause excludes liability for fraud or fraudulent misrepresentation." },
      { n: 37, lead: "Statutory Rights:", text: "Nothing in the Conditions affects Your statutory rights as a consumer under applicable Pakistani law." },
      { n: 38, lead: "Dispute Resolution:", text: "In the event of any dispute arising out of the Conditions, the parties shall first use reasonable efforts to resolve the matter through good-faith negotiation before pursuing formal proceedings." },
      { n: 39, lead: "Governing Law & Jurisdiction:", text: "The Conditions are governed by the laws of Pakistan, and the parties submit to the exclusive jurisdiction of the courts of Karachi." },
    ],
  },
];

const noRefunds = [
  "Change of mind or personal circumstances",
  "Denied entry due to an invalid, duplicate, or already-scanned QR code",
  "Denied entry due to CNIC/Smart Card/Passport mismatch with the name on the Ticket, or failure to present valid original ID",
  "Denied entry due to intoxication or suspected use of intoxicants",
  "Denied entry or ejection due to breach of venue rules, the Do's & Don'ts, or any other Condition",
  "Denied entry due to arriving after gate closure for your tier",
  "A photosensitivity or noise-related reaction to lighting, strobe, laser, or sound effects disclosed in the Health & Safety Notice",
  "Tickets purchased through any channel other than Ticketwala",
];

const part2Clauses: Clause[] = [
  {
    n: 40,
    lead: "Major Cancellation:",
    text: "If the Event is cancelled in full and not rescheduled, refunds — if any — will be limited strictly to Ticket Face Value. All fees listed in Part 3 (card processing/MDR, payment gateway fees, bank transfer charges, delivery fees, platform/service fees, and applicable taxes) are non-refundable in every circumstance.",
  },
  {
    n: 41,
    lead: "Postponement:",
    text: "If the Event is postponed and rescheduled, Tickets remain valid for the new date. Ticket holders unable to attend the rescheduled date may request a refund of Face Value only, subject to the claims process below.",
  },
  {
    n: 42,
    lead: "Material Alteration:",
    text: "Where a material alteration occurs (as defined in Part 1), You may be entitled to a Face-Value refund, subject to Management's assessment under the definitions in Part 1.",
  },
  {
    n: 43,
    lead: "Refund Claims Process:",
    text: "To claim a refund where one is due under this Policy, You must apply in writing to Ticketwala (or such other channel as Management notifies) within 30 days of the original scheduled date of the Event, providing your booking reference and, where applicable, your unused Ticket(s)/QR code(s). Refunds will only be made to the person who purchased the Ticket, using the original payment method where possible. Claims received after this window may be declined at Management's discretion.",
  },
];

const part3Items = [
  "Early Bird tickets close 48 hours after the sale announcement, or once sold out — whichever occurs first",
  "Standard tickets open immediately once Early Bird tickets close",
  "Seating/standing layout is a fixed map, published prior to sale, with tiers clearly demarcated (e.g., General, Premium, VIP)",
  "Tickets are sold exclusively through Ticketwala. The event name, artist name, venue name, and date must appear identically across the seat map, the Ticket/QR, the Ticketwala listing, and all marketing materials",
];

const part4Items = [
  "All prices displayed are the Face Value of the Ticket",
  "The following are charged in addition to Face Value and are non-refundable under any circumstance: card processing fees / MDR; payment gateway fees; bank transfer charges; delivery fees; platform/service fees; applicable taxes; etc",
  "The total amount charged (Face Value plus the above) will be displayed at checkout before final payment confirmation",
];

const dos = [
  "Carry a valid, original CNIC, Smart Card, or Passport — strictly 18+ event, ID must match the name on the Ticket",
  "Keep your QR e-ticket ready (digital or printed) for scanning at the gate",
  "Arrive early to clear security before your tier's designated gate time",
  "Buy only through Ticketwala, the official channel",
  "Buy for your full group in one transaction and share each person's individual QR",
  "Check your confirmation email for your specific gate number and entry time",
];

const donts = [
  "No outside food or drinks",
  "No alcohol or intoxicants — entry will be restricted",
  "No smoking substances or illegal items of any kind",
  "No fireworks, lasers, or flares",
  "No professional cameras or recording rigs",
  "No unauthorized commercial photography or filming",
  "No drones of any kind",
  "No large bags, weapons, or sharp objects",
  "No purses or handbags allowed inside the Venue",
  "No re-entry once exited from the Venue",
];

const photosensitiveEpilepsy = [
  "This Event features strobe lighting, lasers, and high-intensity visual effects as part of the production.",
  "These effects may trigger seizures in individuals with photosensitive epilepsy or similar photosensitivity-related conditions.",
  "Attendees with a history of epilepsy or photosensitive reactions are advised to consult a medical professional before attending.",
  "OP Productions (SMC) Private Limited assumes no liability for any medical episode arising from exposure to lighting or visual effects disclosed in this notice.",
  "Entry constitutes acknowledgment of this notice — no refund will be issued on the basis of a photosensitivity-related reaction, as this risk is disclosed prior to purchase.",
];

const noiseExposure = [
  "Warning: prolonged exposure to loud noise may cause damage to your hearing. Amplified sound, smoke effects, strobe lighting, and lasers will be used at this Event",
  "Management will endeavour to maintain reasonable sound levels; however, levels may vary due to environmental conditions, venue acoustics, and licensing constraints",
];

const bodyText = "text-[13px] md:text-[14px] leading-[1.85] text-white/40";
const subHeading = "mb-4 text-[16px] md:text-[18px] uppercase text-white/70";

const ClauseList = ({ clauses }: { clauses: Clause[] }) => (
  <ol className="space-y-3">
    {clauses.map((clause) => (
      <li key={clause.n} className="flex gap-3">
        <span className={`shrink-0 font-medium text-[#0FB6AE] ${bodyText}`}>{clause.n}.</span>
        <p className={bodyText}>
          {clause.lead && <span className="font-medium text-white/60">{clause.lead} </span>}
          {clause.text}
        </p>
      </li>
    ))}
  </ol>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2.5">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3">
        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0FB6AE]/70" />
        <p className={bodyText}>{item}</p>
      </li>
    ))}
  </ul>
);

const EventTermsAndConditions = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#04040A] px-4 py-14 md:px-12 md:py-20 font-just">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[60%] -translate-x-1/2 rounded-full bg-[#0FB6AE]/[0.04] blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#18060F]/[0.08] blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1100px]">
        {/* Heading */}
        <div className="mb-2 flex justify-center select-none">
          <h1 className="font-just text-center text-[32px] uppercase leading-tight text-[#0FB6AE] drop-shadow-[0_0_15px_rgba(15,182,174,0.3)] min-[390px]:text-[38px] sm:text-[44px] md:text-[50px] lg:text-[56px]">
            Event Terms &amp; Conditions
          </h1>
        </div>
        <p className="mx-auto mb-14 max-w-2xl text-center text-[11px] uppercase tracking-wider text-white/50 md:text-sm">
          DHA Sports Club (Moin Khan Academy), Phase 8, Karachi
        </p>

        {/* Intro */}
        <p className={`${bodyText} mx-auto mb-14 max-w-4xl`}>
          This Document is the complete and binding set of Terms &amp; Conditions for First Light. It incorporates the
          short-form Terms &amp; Conditions presented at checkout, the Do&apos;s &amp; Don&apos;ts, the Health &amp;
          Safety Notice, and all governing rules referenced on the ticket, the Ticketwala listing, and event signage.
          Purchase or possession of a ticket constitutes acceptance of these Terms &amp; Conditions in full.
        </p>

        {/* Definitions */}
        <h2 className="mb-6 border-b border-white/10 pb-4 text-[24px] uppercase tracking-wide text-[#0FB6AE] drop-shadow-[0_0_15px_rgba(15,182,174,0.3)] md:text-[28px]">
          Definitions
        </h2>
        <dl className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          {definitions.map((def) => (
            <div key={def.term}>
              <dt className={`mb-1.5 text-[15px] md:text-[16px] font-medium uppercase text-white/70`}>{def.term}</dt>
              <dd className={bodyText}>{def.text}</dd>
            </div>
          ))}
        </dl>

        {/* Part 1 */}
        <h2 className="mb-6 mt-20 border-b border-white/10 pb-4 text-[24px] uppercase tracking-wide text-[#0FB6AE] drop-shadow-[0_0_15px_rgba(15,182,174,0.3)] md:text-[28px]">
          Part 1 — General Terms &amp; Conditions
        </h2>
        <p className={`${bodyText} mb-4`}>
          These General Terms &amp; Conditions apply to every Ticket sold for the Event. Where any inconsistency arises
          between these General Terms &amp; Conditions and the short-form Terms &amp; Conditions shown at the point of
          purchase, these General Terms &amp; Conditions shall prevail to the extent of the conflict.
        </p>
        {part1Sections.map((section) => (
          <div key={section.heading} className="mb-10">
            <h3 className={subHeading}>{section.heading}</h3>
            <ClauseList clauses={section.clauses} />
          </div>
        ))}

        {/* Part 2 */}
        <h2 className="mb-6 mt-16 border-b border-white/10 pb-4 text-[24px] uppercase tracking-wide text-[#0FB6AE] drop-shadow-[0_0_15px_rgba(15,182,174,0.3)] md:text-[28px]">
          Part 2 — Refund &amp; Entry Denial Policy
        </h2>

        <h3 className={subHeading}>No-Refund Circumstances</h3>
        <p className={`${bodyText} mb-4`}>
          All ticket sales are final. No refunds, exchanges, or cancellations will be issued for:
        </p>
        <BulletList items={noRefunds} />

        <h3 className={subHeading}>Event Cancellation, Postponement &amp; Material Alteration</h3>
        <ClauseList clauses={part2Clauses} />

        {/* Part 3 */}
        <h2 className="mb-6 mt-16 border-b border-white/10 pb-4 text-[24px] uppercase tracking-wide text-[#0FB6AE] drop-shadow-[0_0_15px_rgba(15,182,174,0.3)] md:text-[28px]">
          Part 3 — Ticket Sale Structure
        </h2>
        <BulletList items={part3Items} />

        {/* Part 4 */}
        <h2 className="mb-6 mt-16 border-b border-white/10 pb-4 text-[24px] uppercase tracking-wide text-[#0FB6AE] drop-shadow-[0_0_15px_rgba(15,182,174,0.3)] md:text-[28px]">
          Part 4 — Pricing, Fees &amp; Charges
        </h2>
        <BulletList items={part4Items} />

        {/* Part 5 */}
        <h2 className="mb-6 mt-16 border-b border-white/10 pb-4 text-[24px] uppercase tracking-wide text-[#0FB6AE] drop-shadow-[0_0_15px_rgba(15,182,174,0.3)] md:text-[28px]">
          Part 5 — Do&apos;s &amp; Don&apos;ts
        </h2>
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          <div>
            <h3 className={`${subHeading} mt-0`}>Do&apos;s</h3>
            <BulletList items={dos} />
          </div>
          <div>
            <h3 className={`${subHeading} mt-0`}>Don&apos;ts</h3>
            <BulletList items={donts} />
          </div>
        </div>

        {/* Part 6 */}
        <h2 className="mb-6 mt-16 border-b border-white/10 pb-4 text-[24px] uppercase tracking-wide text-[#0FB6AE] drop-shadow-[0_0_15px_rgba(15,182,174,0.3)] md:text-[28px]">
          Part 6 — Health &amp; Safety Notice
        </h2>
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          <div>
            <h3 className={`${subHeading} mt-0`}>Photosensitive Epilepsy</h3>
            <div className="space-y-2.5">
              {photosensitiveEpilepsy.map((paragraph, i) => (
                <p key={i} className={bodyText}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h3 className={`${subHeading} mt-0`}>Noise Exposure</h3>
            <div className="space-y-2.5">
              {noiseExposure.map((paragraph, i) => (
                <p key={i} className={bodyText}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Fine print */}
        <p className="mx-auto mt-16 max-w-3xl border-t border-white/10 pt-8 text-center text-[10px] leading-relaxed text-white/30 sm:text-[11px]">
          © 2026 OP Productions (SMC) Private Limited. First Light is an OP Productions original event. Tickets issued
          and managed by Ticketwala on behalf of OP Productions.
        </p>
      </div>
    </section>
  );
};

export default EventTermsAndConditions;
