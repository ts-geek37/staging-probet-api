import { HomeRepository } from "./repositories/home.repository";

export class HomeService {
  constructor(private readonly repo: HomeRepository) {}

  async getHome() {
    return this.repo.getHomeData();
  }
}
