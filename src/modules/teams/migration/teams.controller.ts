import { Request } from "express";
import { badRequest, notFound, success } from "../../../utils";
import { TeamsService } from "./teams.service";

export class TeamsController {
  constructor(private readonly service: TeamsService) {}

  getTeams = async (req: Request) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    if (page < 1 || limit < 1) {
      throw badRequest("Invalid pagination parameters");
    }

    const search =
      typeof req.query.search === "string" ? req.query.search : undefined;

    const data = await this.service.getTeams(page, limit, search);
    return success(data);
  };

  getTeamProfile = async (req: Request) => {
    const teamId = Number(req.params.id);
    if (!teamId) throw badRequest("Invalid team id");

    const data = await this.service.getTeamProfile(teamId);
    if (!data) throw notFound("Team not found");

    return success(data);
  };

  getTeamPlayers = async (req: Request) => {
    const teamId = Number(req.params.id);
    if (!teamId) throw badRequest("Invalid team id");

    const data = await this.service.getTeamPlayers(teamId);
    if (!data) throw notFound("Team not found");

    return success(data);
  };
  getTeamMatches = async (req: Request) => {
    const teamId = Number(req.params.id);
    if (!teamId) throw badRequest("Invalid team id");

    const data = await this.service.getTeamMatches(teamId);

    return success(data);
  };

  getTeamStats = async (req: Request) => {
    const teamId = Number(req.params.id);
    if (!teamId) throw badRequest("Invalid team id");

    const data = await this.service.getTeamStats(teamId);
    if (!data) throw notFound("Team not found");

    return success(data);  
  };

}
