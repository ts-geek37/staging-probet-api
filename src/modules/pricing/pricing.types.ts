import { BillingCycle } from "../billing";

export type Plan = {
  product: string;
  billing_cycle: BillingCycle;
  currency: string;
  amount: number;
  label: string;
};
