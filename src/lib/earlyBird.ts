/** Early Bird started 28 August 2026 at 5:00 PM PKT */
export const EARLY_BIRD_STARTS_AT = new Date("2026-08-28T17:00:00+05:00");

/** Early Bird ends 4 September 2026 at 5:00 PM PKT */
export const EARLY_BIRD_ENDS_AT = new Date("2026-09-04T17:00:00+05:00");

export const isEarlyBirdActive = (now = Date.now()) =>
  now >= EARLY_BIRD_STARTS_AT.getTime() && now < EARLY_BIRD_ENDS_AT.getTime();

export const getEarlyBirdRemainingMs = (now = Date.now()) =>
  Math.max(0, EARLY_BIRD_ENDS_AT.getTime() - now);
