export interface TicketRegistrationAction {
  label: string;
  price: string;
  description: string;
  defaultEnabled?: boolean;
}

export interface TicketRegistrationDetails {
  eyebrow: string;
  title: string;
  body: string;
  highlights: string[];
  agePolicy: string;
  idPolicy: string;
  addOn?: TicketRegistrationAction;
}

export interface Ticket {
  id: string;
  name: string;
  /** Compact price shown on the ticket face, e.g. "8,500 PKR" */
  price: string;
  /** Full price shown in the detail modal, e.g. "PKR 8,500" */
  priceFull: string;
  /** Early bird price, e.g. "6,500 PKR" */
  earlyBirdPrice?: string;
  /** Total capacity / spots available for this tier */
  capacity?: number;
  gates: string;
  gateLabel: string;
  minPerID: number;
  maxPerID: number;
  featured: boolean;
  color: string;
  features: string[];
  registration: TicketRegistrationDetails;
}

export type TicketDetailsHandler = (ticket: Ticket) => void;

export interface TicketCardProps {
  ticket: Ticket;
  onDetails: TicketDetailsHandler;
}

export interface TicketDetailModalProps {
  ticket: Ticket;
  onClose: () => void;
}

export interface TicketRegistrationModalProps {
  ticket: Ticket;
  onClose: () => void;
}
