import { badRequest, notFound, success } from "@/utils";
import { Request } from "express";
import { MatchesService } from "./matches.service";

enum VALID_TABS {
  live = "LIVE",
  upcoming = "UPCOMING",
  finished = "FINISHED",
}

export class MatchesController {
  constructor(private readonly service: MatchesService) {}

  getMatches = async (req: Request) => {
    const key = req.query.tab as keyof typeof VALID_TABS;
    const tab = VALID_TABS[key] || VALID_TABS.upcoming;

    if (!tab || !VALID_TABS[key]) throw badRequest("Invalid tab");

    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 20, 50);
    const q =
      typeof req.query.q === "string" && req.query.q.trim().length > 0
        ? req.query.q.trim()
        : undefined;

    if (page < 1 || limit < 1) {
      throw badRequest("Invalid pagination parameters");
    }

    const data = await this.service.getMatches({
      tab,
      page,
      limit,
      q,
    });

    return success(data);
  };

  getMatch = async (req: Request) => {
    const matchId = Number(req.params.id);
    if (!matchId) throw badRequest("Invalid match id");

    const data = await this.service.getMatch(matchId);
    if (!data) throw notFound("Match not found");

    return success(data);
  };
  getMatchStats = async (req: Request) => {
    const matchId = Number(req.params.id);
    if (!matchId) throw badRequest("Invalid match id");

    const data = await this.service.getMatchStats(matchId);
    if (!data) throw notFound("Match stats not found");

    return success(data);
  };

  getMatchLineups = async (req: Request) => {
    const matchId = Number(req.params.id);
    if (!matchId) throw badRequest("Invalid match id");

    const data = await this.service.getMatchLineups(matchId);
    if (!data) throw notFound("Match lineups not found");

    return success(data);
  };

  getMatchEvents = async (req: Request) => {
    const matchId = Number(req.params.id);
    if (!matchId) throw badRequest("Invalid match id");

    const data = await this.service.getMatchEvents(matchId);
    if (!data) throw notFound("Match events not found");

    return success(data);
  };

  getMatchComments = async (req: Request) => {
    const matchId = Number(req.params.id);
    if (!matchId) throw badRequest("Invalid match id");

    const data = await this.service.getMatchComments(matchId);
    if (!data) throw notFound("Match comments not found");

    return success(data);
  };

  getHeadToHeadMatches = async (req: Request) => {
    const team1 = Number(req.query.team1);
    const team2 = Number(req.query.team2);

    if (!team1 || !team2) throw badRequest("Invalid team ids");

    const data = await this.service.getHeadToHeadMatches({ team1, team2 });
    if (!data) throw notFound("Head to head not found");

    return success(data);
  };
  getMatchesTeamStats = async (req: Request) => {
    const matchId = Number(req.params.id);
    if (!matchId) throw badRequest("Invalid match id");
    const seasonId = Number(req.params.seasonId);
    const data = await this.service.getMatchesTeamStats(matchId, seasonId);
    if (!data) throw notFound("Match team stats not found");

    return success(data);
  };
}
