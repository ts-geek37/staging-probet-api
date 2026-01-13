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
    shirt_number: 10,
    is_active: true,
    market_value: 10000,
    contract: {
      until: "2024-06-30",
    },
    is_captain: false,
    position: {
      id: 4,
      name: "Midfielder",
      detailed: "Defensive Midfielder",
    },
    current_team: {
      id: 7,
      name: "Real Madrid",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    },
    birthplace: {
      city: "London",
      country: "England",
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
      detailed: "Striker",
    },
    teams: [
      {
        id: 5,
        name: "Manchester City",
        logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
      },
    ],
    is_active: true,
    market_value: 10000,
    contract: {
      until: "2024-06-30",
    },
    is_captain: false,
    current_team: {
      id: 5,
      name: "Manchester City",
      logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    },
    birthplace: {
      city: "Oslo",
      country: "Norway",
    },
    shirt_number: 9,
  },
};

export const mockPlayerSeasonStats: Record<
  number,
  PlayerSeasonStatsResponse[]
> = {
  201: [
    {
      season: {
        id: 2025,
        name: "2024/25",
        starting_at: "2023-08-05",
        ending_at: "2024-05-28",
        league: {
          id: 1,
          name: "Premier League",
          logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
        },
      },
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
      season: {
        id: 2024,
        name: "2023/24",
        starting_at: "2022-08-05",
        ending_at: "2023-05-28",
        league: {
          id: 1,
          name: "Premier League",
          logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
        },
      },
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
      season: {
        id: 2025,
        name: "2024/25",
        starting_at: "2024-08-05",
        ending_at: "2025-05-28",
        league: {
          id: 1,
          name: "Premier League",
          logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
        },
      },
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
      status: i < 4 ? "LIVE" : i < 10 ? "FINISHED" : "UPCOMING",
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

  async getPlayerTransfers(playerId) {
    return {
      transfers: [
        {
          id: 537328,
          date: "2026-01-01",
          amount: null,
          completed: true,
          type: {
            id: 220,
            code: "free-transfer",
            label: "Free Transfer",
          },
          player: {
            id: 19642679,
            name: "Michael Schjonning-Larsen",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/23/19642679.png",
          },
          from_team: {
            id: 4400,
            name: "Levadia",
            logo: "https://cdn.sportmonks.com/images/soccer/teams/16/4400.png",
          },
          to_team: {
            id: 180,
            name: "Kilmarnock",
            logo: "https://cdn.sportmonks.com/images/soccer/teams/20/180.png",
          },
        },
        {
          id: 526092,
          date: "2025-10-24",
          amount: null,
          completed: true,
          type: {
            id: 219,
            code: "transfer",
            label: "Transfer",
          },
          player: {
            id: 7026565,
            name: "Tyreece John-Jules",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/5/7026565.png",
          },
          from_team: {
            id: 260131,
            name: "TBC",
            logo: "https://cdn.sportmonks.com/images/soccer/team_placeholder.png",
          },
          to_team: {
            id: 180,
            name: "Kilmarnock",
            logo: "https://cdn.sportmonks.com/images/soccer/teams/20/180.png",
          },
        },
        {
          id: 525921,
          date: "2025-10-22",
          amount: null,
          completed: true,
          type: {
            id: 218,
            code: "loan-transfer",
            label: "Loan",
          },
          player: {
            id: 37459066,
            name: "Oluwatobi Oluwayemi",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/26/37459066.png",
          },
          from_team: {
            id: 256438,
            name: "Celtic II",
            logo: "https://cdn.sportmonks.com/images/soccer/teams/22/256438.png",
          },
          to_team: {
            id: 180,
            name: "Kilmarnock",
            logo: "https://cdn.sportmonks.com/images/soccer/teams/20/180.png",
          },
        },
        {
          id: 515169,
          date: "2025-08-29",
          amount: null,
          completed: false,
          type: {
            id: 218,
            code: "loan-transfer",
            label: "Loan",
          },
          player: {
            id: 174383,
            name: "Robby McCrorie",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/15/174383.png",
          },
          from_team: {
            id: 180,
            name: "Kilmarnock",
            logo: "https://cdn.sportmonks.com/images/soccer/teams/20/180.png",
          },
          to_team: {
            id: 1371,
            name: "Esbjerg",
            logo: "https://cdn.sportmonks.com/images/soccer/teams/27/1371.png",
          },
        },
        {
          id: 475030,
          date: "2025-08-30",
          amount: null,
          completed: true,
          type: {
            id: 220,
            code: "free-transfer",
            label: "Free Transfer",
          },
          player: {
            id: 123690,
            name: "James Brown",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/10/123690.png",
          },
          from_team: {
            id: 246,
            name: "Ross County",
            logo: "https://cdn.sportmonks.com/images/soccer/teams/22/246.png",
          },
          to_team: {
            id: 180,
            name: "Kilmarnock",
            logo: "https://cdn.sportmonks.com/images/soccer/teams/20/180.png",
          },
        },
        {
          id: 520783,
          date: "2025-08-20",
          amount: null,
          completed: false,
          type: {
            id: 220,
            code: "free-transfer",
            label: "Free Transfer",
          },
          player: {
            id: 8839,
            name: "Kyle Vassell",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/7/8839.png",
          },
          from_team: {
            id: 180,
            name: "Kilmarnock",
            logo: "https://cdn.sportmonks.com/images/soccer/teams/20/180.png",
          },
          to_team: {
            id: 1547,
            name: "Colorado Springs",
            logo: "https://cdn.sportmonks.com/images/soccer/teams/11/1547.png",
          },
        },
        {
          id: 519366,
          date: "2017-05-31",
          amount: null,
          completed: false,
          type: {
            id: 9688,
            code: "end-of-loan",
            label: "End of loan",
          },
          player: {
            id: 6409,
            name: "Josh Umerah",
            image: "https://cdn.sportmonks.com/images/soccer/placeholder.png",
          },
          from_team: {
            id: 180,
            name: "Kilmarnock",
            logo: "https://cdn.sportmonks.com/images/soccer/teams/20/180.png",
          },
          to_team: {
            id: 263120,
            name: "Charlton Athletic U21",
            logo: "https://cdn.sportmonks.com/images/soccer/teams/16/263120.png",
          },
        },
        {
          id: 519370,
          date: "2017-01-31",
          amount: null,
          completed: false,
          type: {
            id: 218,
            code: "loan-transfer",
            label: "Loan",
          },
          player: {
            id: 6409,
            name: "Josh Umerah",
            image: "https://cdn.sportmonks.com/images/soccer/placeholder.png",
          },
          from_team: {
            id: 263120,
            name: "Charlton Athletic U21",
            logo: "https://cdn.sportmonks.com/images/soccer/teams/16/263120.png",
          },
          to_team: {
            id: 180,
            name: "Kilmarnock",
            logo: "https://cdn.sportmonks.com/images/soccer/teams/20/180.png",
          },
        },
        {
          id: 517576,
          date: "2018-07-04",
          amount: null,
          completed: false,
          type: {
            id: 218,
            code: "loan-transfer",
            label: "Loan",
          },
          player: {
            id: 896243,
            name: "Mikael Ndjoli",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/19/896243.png",
          },
          from_team: {
            id: 264312,
            name: "AFC Bournemouth U21",
            logo: "https://cdn.sportmonks.com/images/soccer/teams/24/264312.png",
          },
          to_team: {
            id: 180,
            name: "Kilmarnock",
            logo: "https://cdn.sportmonks.com/images/soccer/teams/20/180.png",
          },
        },
        {
          id: 517575,
          date: "2019-05-20",
          amount: null,
          completed: false,
          type: {
            id: 9688,
            code: "end-of-loan",
            label: "End of loan",
          },
          player: {
            id: 896243,
            name: "Mikael Ndjoli",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/19/896243.png",
          },
          from_team: {
            id: 180,
            name: "Kilmarnock",
            logo: "https://cdn.sportmonks.com/images/soccer/teams/20/180.png",
          },
          to_team: {
            id: 264312,
            name: "AFC Bournemouth U21",
            logo: "https://cdn.sportmonks.com/images/soccer/teams/24/264312.png",
          },
        },
      ],
      pagination: {
        page: 1,
        limit: 10,
        count: 10,
        total_pages: 1,
      },
    };
  },
};
