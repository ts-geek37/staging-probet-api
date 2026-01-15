import { badRequest, success } from "../../utils";
import { Request } from "express";
import { BillingPricesService } from "./billing.prices.service";

export class BillingPricesController {
  constructor(private readonly service: BillingPricesService) {}

  getActivePlans = async (req: Request) => {
    const data = await this.service.getActivePlans("vip");
    return success(data);
  };

  getActivePrice = async (req: Request) => {
    const plan = req.query.plan;
    if (!plan) throw badRequest("Invalid billing cycle");

    if (
      plan !== "monthly" &&
      plan !== "quarterly" &&
      plan !== "semi_annual" &&
      plan !== "yearly"
    ) {
      throw badRequest("Invalid billing cycle");
    }

    const data = await this.service.getActivePrice(plan);
    return success(data);
  };
}
