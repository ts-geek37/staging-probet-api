import {
  PlayerBase,
  PlayerDetailResponse,
  PlayerDetailView,
  PlayerListResponse,
} from "../players.types";
import { PlayersRepository } from "./players.repository";

type InternalPlayer = {
  base: PlayerBase;
  current_season: {
    appearances: number;
    goals: number;
    assists: number;
    minutes: number;
  };
  career_totals: {
    appearances: number;
    goals: number;
    assists: number;
    yellow_cards: number;
    red_cards: number;
  };
  seasons: {
    season: string;
    competition: string;
    appearances: number;
    goals: number;
    assists: number;
    minutes: number;
  }[];
  matches: {
    match_id: number;
    kickoff_time: string;
    competition: string;
    opponent: string;
    minutes_played: number | null;
    goals: number | null;
    assists: number | null;
  }[];
};

export class PlayersMockRepository implements PlayersRepository {
  private players: InternalPlayer[] = [
    {
      base: {
        id: 10,
        full_name: "Bukayo Saka",
        nationality: "England",
        date_of_birth: "2001-09-05",
        age: 24,
        height: "178 cm",
        weight: "70 kg",
        preferred_foot: "Left",
        position: "Right Winger",
        shirt_number: 7,
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/6/6c/Bukayo_Saka_2022.jpg",
        team: {
          id: 1,
          name: "Arsenal",
          logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
        },
        contract_end_year: 2028,
        market_value: null,
      },
      current_season: {
        appearances: 15,
        goals: 8,
        assists: 6,
        minutes: 1240,
      },
      career_totals: {
        appearances: 210,
        goals: 58,
        assists: 46,
        yellow_cards: 18,
        red_cards: 1,
      },
      seasons: [
        {
          season: "2025/26",
          competition: "Premier League",
          appearances: 15,
          goals: 8,
          assists: 6,
          minutes: 1240,
        },
        {
          season: "2024/25",
          competition: "Premier League",
          appearances: 36,
          goals: 14,
          assists: 11,
          minutes: 3100,
        },
      ],
      matches: [
        {
          match_id: 9001,
          kickoff_time: "2025-12-18T20:00:00Z",
          competition: "Premier League",
          opponent: "Chelsea",
          minutes_played: 90,
          goals: 1,
          assists: 1,
        },
        {
          match_id: 9002,
          kickoff_time: "2025-12-15T18:30:00Z",
          competition: "Premier League",
          opponent: "Liverpool",
          minutes_played: 88,
          goals: 0,
          assists: 1,
        },
      ],
    },
  ];

  async getPlayers(
    page: number,
    limit: number,
    search?: string,
    teamId?: number
  ): Promise<PlayerListResponse> {
    const filtered = this.players.filter((p) => {
      if (teamId && p.base.team.id !== teamId) return false;
      if (
        search &&
        !p.base.full_name.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });

    const start = (page - 1) * limit;
    const slice = filtered.slice(start, start + limit);

    return {
      data: slice.map((p) => ({
        id: p.base.id,
        full_name: p.base.full_name,
        nationality: p.base.nationality,
        position: p.base.position,
        photo: p.base.photo,
        team: p.base.team,
      })),
      pagination: {
        page,
        limit,
        count: filtered.length,
        total_pages: Math.ceil(filtered.length / limit),
      },
    };
  }

  async getPlayerById(
    playerId: number,
    view: PlayerDetailView
  ): Promise<PlayerDetailResponse | null> {
    const player = this.players.find((p) => !!p.base.id);
    if (!player) return null;

    switch (view) {
      case PlayerDetailView.STATS:
        return {
          ...player.base,
          career_totals: player.career_totals,
          seasons: player.seasons,
        };

      case PlayerDetailView.MATCHES:
        return {
          ...player.base,
          matches: player.matches,
        };

      default:
        return {
          ...player.base,
          current_season_summary: player.current_season,
        };
    }
  }
}
