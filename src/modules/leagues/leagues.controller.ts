import { MatchListStatus } from "@/modules/matches/migration/matches.types";
import { badRequest, notFound, success } from "@/utils";
import { Request } from "express";
import { LeaguesService } from "./leagues.service";

export class LeaguesController {
  constructor(private readonly service: LeaguesService) {}

  getLeagues = async (req: Request) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    if (page < 1 || limit < 1) {
      throw badRequest("Invalid pagination parameters");
    }

    const search =
      typeof req.query.search === "string" ? req.query.search : undefined;

    const data = await this.service.getLeagues(page, limit, search);
    return success(data);
  };

  getLeagueProfile = async (req: Request) => {
    const leagueId = Number(req.params.id);
    if (!leagueId) throw badRequest("Invalid league id");

    const data = await this.service.getLeagueProfile(leagueId);
    if (!data) throw notFound("League not found");

    return success(data);
  };

  getLeagueStandings = async (req: Request) => {
    const leagueId = Number(req.params.id);
    if (!leagueId) throw badRequest("Invalid league id");

    const data = await this.service.getLeagueStandings(leagueId);
    if (!data) throw notFound("League standings not found");

    return success(data);
  };

  getLeagueStatistics = async (req: Request) => {
    const leagueId = Number(req.params.id);
    if (!leagueId) throw badRequest("Invalid league id");

    const data = await this.service.getLeagueStatistics(leagueId);
    if (!data) throw notFound("League statistics not found");

    return success(data);
  };

  getLeagueMatches = async (req: Request) => {
    const leagueId = Number(req.params.id);
    if (!leagueId) throw badRequest("Invalid league id");

    const status = Object.values(MatchListStatus).includes(
      req.query.status as MatchListStatus
    )
      ? (req.query.status as MatchListStatus)
      : undefined;

    const data = await this.service.getLeagueMatches(leagueId, status);

    return success(data);
  };

  getTopScorers = async (req: Request) => {
    const leagueId = Number(req.params.id);
    if (!leagueId) throw badRequest("Invalid league id");

    const data = await this.service.getTopScorers(leagueId);

    return success(data);
  };
}
