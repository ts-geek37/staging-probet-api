import { Request } from "express";

import { badRequest, notFound, success } from "../../utils";
import { LeaguesService } from "./leagues.service";
import { LeagueView } from "./leagues.types";

export class LeaguesController {
  constructor(private readonly service: LeaguesService) {}

  getLeague = async (req: Request) => {
    const leagueId = Number(req.params.id);
    
    if (!leagueId) {
      throw badRequest("Invalid league id");
    }

    const view = Object.values(LeagueView).includes(
      req.query.view as LeagueView
    )
      ? (req.query.view as LeagueView)
      : LeagueView.OVERVIEW;

    const data = await this.service.getLeague(leagueId, view);
    if (!data) {
      throw notFound("League not found");
    }

    return success(data);
  };

  getLeagues = async (req: Request) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    if (page < 1 || limit < 1) {
      throw badRequest("Invalid pagination parameters");
    }

    const search =
      typeof req.query.search === "string" ? req.query.search : undefined;

    const data = await this.service.getLeaguesList(page, limit, search);
    return success(data);
  };
}
