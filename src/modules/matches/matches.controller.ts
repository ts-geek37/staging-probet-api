import { Request } from "express";

import { badRequest, notFound, success } from "../../utils";
import { MatchesService } from "./matches.service";
import { MatchDetailView, MatchListStatus } from "./matches.types";

export class MatchesController {
  constructor(private readonly service: MatchesService) {}

  getMatches = async (req: Request) => {
    const status = Object.values(MatchListStatus).includes(
      req.query.status as MatchListStatus
    )
      ? (req.query.status as MatchListStatus)
      : MatchListStatus.LIVE;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    if (page < 1 || limit < 1) {
      throw badRequest("Invalid pagination parameters");
    }

    const leagueId = req.query.leagueId
      ? Number(req.query.leagueId)
      : undefined;

    const search =
      typeof req.query.search === "string" ? req.query.search : undefined;

    const data = await this.service.getMatches(
      status,
      page,
      limit,
      leagueId,
      search
    );

    return success(data);
  };

  getMatch = async (req: Request) => {
    const matchId = Number(req.params.id);
    if (!matchId) {
      throw badRequest("Invalid match id");
    }

    const view = Object.values(MatchDetailView).includes(
      req.query.view as MatchDetailView
    )
      ? (req.query.view as MatchDetailView)
      : MatchDetailView.OVERVIEW;

    const data = await this.service.getMatch(matchId, view);
    if (!data) {
      throw notFound("Match not found");
    }

    return success(data);
  };
}
