import { HomeResponse } from "./home.types";

export interface HomeRepository {
  getHomeData(): Promise<HomeResponse>;
}
