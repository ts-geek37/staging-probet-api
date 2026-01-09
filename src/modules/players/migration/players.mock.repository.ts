import { PlayersRepository } from "./players.repository";
import {
  PlayerMatches,
  PlayerProfileResponse,
  PlayerSeasonStatsResponse,
} from "./players.types";

export const mockPlayerProfiles: Record<number, PlayerProfileResponse> = {
  201: {
    id: 201,
    name: "Jude Bellingham",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/3/3f/Jude_Bellingham_2023.jpg",
    date_of_birth: "2003-06-29",
    age: 22,
    height: 186,
    weight: 75,
    preferred_foot: "Right",
    nationality: {
      id: 44,
      name: "England",
      flag: "https://flagcdn.com/w320/gb.png",
    },
    position: {
      id: 4,
      name: "Midfielder",
    },
    teams: [
      {
        id: 7,
        name: "Real Madrid",
        logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
      },
    ],
  },
  202: {
    id: 202,
    name: "Erling Haaland",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/5/5c/Erling_Haaland_2023.jpg",
    date_of_birth: "2000-07-21",
    age: 25,
    height: 194,
    weight: 88,
    preferred_foot: "Left",
    nationality: {
      id: 47,
      name: "Norway",
      flag: "https://flagcdn.com/w320/no.png",
    },
    position: {
      id: 9,
      name: "Forward",
    },
    teams: [
      {
        id: 5,
        name: "Manchester City",
        logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
      },
    ],
  },
};

export const mockPlayerSeasonStats: Record<
  number,
  PlayerSeasonStatsResponse[]
> = {
  201: [
    {
      season: { id: 2025, name: "2024/25" },
      team: {
        id: 7,
        name: "Real Madrid",
        logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
      },
      jersey_number: 5,
      position: { id: 4, name: "Midfielder" },
      stats: {
        appearances: 34,
        goals: 18,
        assists: 9,
        minutes_played: 2890,
        shots_total: 96,
        shots_on_target: 42,
        passes: 1850,
        accurate_passes: 1630,
        pass_accuracy: 88,
        key_passes: 64,
        tackles: 78,
        interceptions: 44,
        dribbles_attempted: 112,
        dribbles_successful: 71,
        yellow_cards: 5,
        red_cards: 1,
        rating: 8.1,
      },
    },
    {
      season: { id: 2024, name: "2023/24" },
      team: {
        id: 7,
        name: "Real Madrid",
        logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
      },
      jersey_number: 5,
      position: { id: 4, name: "Midfielder" },
      stats: {
        appearances: 32,
        goals: 13,
        assists: 7,
        minutes_played: 2710,
        passes: 1710,
        accurate_passes: 1490,
        pass_accuracy: 87,
        tackles: 65,
        interceptions: 39,
        rating: 7.8,
      },
    },
  ],
  202: [
    {
      season: { id: 2025, name: "2024/25" },
      team: {
        id: 5,
        name: "Manchester City",
        logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
      },
      jersey_number: 9,
      position: { id: 9, name: "Forward" },
      stats: {
        appearances: 31,
        goals: 27,
        assists: 6,
        minutes_played: 2520,
        shots_total: 124,
        shots_on_target: 68,
        expected_goals: 24.1,
        duels_total: 186,
        duels_won: 112,
        aerials_won: 84,
        rating: 8.3,
      },
    },
  ],
};

export const mockPlayerMatches: Record<number, PlayerMatches> = {
  201: {
    matches: Array.from({ length: 18 }).map((_, i) => ({
      id: 8000 + i,
      kickoff_time: `2026-01-${String(i + 1).padStart(2, "0")}T20:00:00Z`,
      status: i < 4 ? "LIVE" : i < 10 ? "FT" : "UPCOMING",
      league: {
        id: 101,
        name: "La Liga",
        logo: "https://upload.wikimedia.org/wikipedia/en/7/75/LaLiga_Santander.svg",
      },
      teams: {
        home: {
          id: 7,
          name: "Real Madrid",
          logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
        },
        away: {
          id: 9,
          name: "Atletico Madrid",
          logo: "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg",
        },
      },
      score:
        i < 10
          ? {
              home: i % 3,
              away: (i + 1) % 2,
            }
          : undefined,
    })),
  },
};

export const mockPlayersRepository: PlayersRepository = {
  async getPlayerProfile(playerId) {
    return mockPlayerProfiles[playerId] ?? null;
  },

  async getPlayerStats(playerId) {
    return mockPlayerSeasonStats[playerId] ?? null;
  },

  async getPlayerMatches(playerId, page, limit) {
    const data = mockPlayerMatches[playerId];
    if (!data) return null;

    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      matches: data.matches.slice(start, end),
      pagination: {
        page,
        limit,
        count: data.matches.length,
        total_pages: Math.ceil(data.matches.length / limit),
      },
    };
  },
};
