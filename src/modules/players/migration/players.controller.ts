import { Request } from "express"
import { badRequest, notFound, success } from "@/utils"
import { PlayersService } from "./players.service"

export class PlayersController {
  constructor(private readonly service: PlayersService) {}

  getPlayerProfile = async (req: Request) => {
    const playerId = Number(req.params.id)
    if (!playerId) throw badRequest("Invalid player id")

    const data = await this.service.getPlayerProfile(playerId)
    if (!data) throw notFound("Player not found")

    return success(data)
  }

  getPlayerStats = async (req: Request) => {
    const playerId = Number(req.params.id)
    if (!playerId) throw badRequest("Invalid player id")

    const data = await this.service.getPlayerStats(playerId)
    if (!data) throw notFound("Player not found")

    return success(data)
  }

  getPlayerMatches = async (req: Request) => {
    const playerId = Number(req.params.id)
    if (!playerId) throw badRequest("Invalid player id")

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    if (page < 1 || limit < 1) {
      throw badRequest("Invalid pagination parameters")
    }

    const data = await this.service.getPlayerMatches(playerId, page, limit)
    if (!data) throw notFound("Player not found")

    return success(data)
  }
}
