import { BillingCycle } from "./billing.constants";
import { BillingPriceRepository } from "./billing.price.repository";

export class BillingPricesService {
  constructor(
    private readonly billingPriceRepository: BillingPriceRepository
  ) {}

  async getActivePlans(product: string) {
    return this.billingPriceRepository.getActivePlans(product);
  }

  async getActivePrice(billingCycle: BillingCycle) {
    return this.billingPriceRepository.getActivePrice({
      product: "vip",
      billingCycle,
      currency: "USD",
    });
  }
}
