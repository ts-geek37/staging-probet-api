import { Request } from "express";
import { badRequest, notFound, success } from "../../utils";
import { TeamDetailView } from "./teams.types";
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
    const region =
      typeof req.query.region === "string" ? req.query.region : undefined;

    const data = await this.service.getTeams(page, limit, search, region);
    return success(data);
  };

  getTeam = async (req: Request) => {
    const teamId = Number(req.params.id);
    if (!teamId) {
      throw badRequest("Invalid team id");
    }

    const view = Object.values(TeamDetailView).includes(
      req.query.view as TeamDetailView
    )
      ? (req.query.view as TeamDetailView)
      : TeamDetailView.OVERVIEW;

    const data = await this.service.getTeam(teamId, view);
    if (!data) {
      throw notFound("Team not found");
    }

    return success(data);
  };
}
