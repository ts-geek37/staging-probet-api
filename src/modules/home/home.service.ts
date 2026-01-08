import { HomeRepository } from "./home.repository";
import { HomeResponse } from "./home.types";

export class HomeService {
  constructor(private readonly repo: HomeRepository) {}

  getHome(): Promise<HomeResponse> {
    return this.repo.getHomeData();
  }
}
