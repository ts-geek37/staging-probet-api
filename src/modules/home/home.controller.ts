import { Request } from "express";

import { notFound, success } from "@/utils";
import { HomeService } from "./home.service";

export class HomeController {
  constructor(private readonly service: HomeService) {}

  getHome = async (_req: Request) => {
    const data = await this.service.getHome();

    if (!data) {
      throw notFound("Home not found");
    }

    return success(data);
  };
}
