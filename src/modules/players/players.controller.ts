import { Request } from "express";
import { badRequest, notFound, success } from "../../utils";
import { PlayerDetailView } from "./players.types";
import { PlayersService } from "./players.service";

export class PlayersController {
  constructor(private readonly service: PlayersService) {}

  getPlayers = async (req: Request) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    if (page < 1 || limit < 1) {
      throw badRequest("Invalid pagination parameters");
    }

    const search =
      typeof req.query.search === "string" ? req.query.search : undefined;

    const teamId = req.query.teamId
      ? Number(req.query.teamId)
      : undefined;

    const data = await this.service.getPlayers(page, limit, search, teamId);
    return success(data);
  };

  getPlayer = async (req: Request) => {
    const playerId = Number(req.params.id);
    if (!playerId) {
      throw badRequest("Invalid player id");
    }

    const view = Object.values(PlayerDetailView).includes(
      req.query.view as PlayerDetailView
    )
      ? (req.query.view as PlayerDetailView)
      : PlayerDetailView.OVERVIEW;

    const data = await this.service.getPlayer(playerId, view);
    if (!data) {
      throw notFound("Player not found");
    }

    return success(data);
  };
}
