import { TeamsRepository } from "./teams.repository";
import {
  TeamMatchesResponse,
  TeamOverviewResponse,
  TeamPlayersResponse,
  TeamSeasonStatsResponse,
  TeamsListResponse,
} from "./teams.types";

export const mockTeams: TeamsListResponse["data"] = [
  {
    id: 1,
    name: "Manchester United",
    short_code: "MUN",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    country: {
      name: "England",
      code: "ENG",
      flag: "https://flagcdn.com/w320/gb.png",
    },
    founded: 1878,
    stadium: { name: "Old Trafford", capacity: 74879 },
  },
  {
    id: 2,
    name: "Liverpool",
    short_code: "LIV",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    country: {
      name: "England",
      code: "ENG",
      flag: "https://flagcdn.com/w320/gb.png",
    },
    founded: 1892,
    stadium: { name: "Anfield", capacity: 54074 },
  },
  {
    id: 3,
    name: "Arsenal",
    short_code: "ARS",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    country: {
      name: "England",
      code: "ENG",
      flag: "https://flagcdn.com/w320/gb.png",
    },
    founded: 1886,
    stadium: { name: "Emirates Stadium", capacity: 60704 },
  },
  {
    id: 4,
    name: "Chelsea",
    short_code: "CHE",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
    country: {
      name: "England",
      code: "ENG",
      flag: "https://flagcdn.com/w320/gb.png",
    },
    founded: 1905,
    stadium: { name: "Stamford Bridge", capacity: 40341 },
  },
  {
    id: 5,
    name: "Manchester City",
    short_code: "MCI",
    logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    country: {
      name: "England",
      code: "ENG",
      flag: "https://flagcdn.com/w320/gb.png",
    },
    founded: 1880,
    stadium: { name: "Etihad Stadium", capacity: 53400 },
  },
];

export const mockTeamPlayers: Record<number, TeamPlayersResponse> = {
  1: {
    team_id: 1,
    players: Array.from({ length: 22 }).map((_, i) => ({
      id: 1000 + i,
      name: `Player ${i + 1}`,
      photo: null,
      position: {
        id: i % 4,
        label: ["Goalkeeper", "Defender", "Midfielder", "Forward"][i % 4],
      },
      jersey_number: i + 1,
      nationality: "England",
      contract: {
        start: "2022-07-01",
        end: "2026-06-30",
      },
    })),
  },
};

export const mockTeamOverviews: Record<number, TeamOverviewResponse> = {
  1: {
    id: 1,
    name: "Manchester United",
    short_code: "MUN",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    founded: 1878,
    country: {
      name: "England",
      code: "ENG",
      flag: "https://flagcdn.com/w320/gb.png",
    },
    socials: [],
    rankings: [
      {
        rank: 1,
        name: "UEFA",
        points: 100,
        id: 1,
      },
    ],
    rivals: [
      {
        id: 2,
        name: "Liverpool",
        type: "championship",
        logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
      },
      {
        id: 3,
        name: "Arsenal",
        type: "championship",

        logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
      },
    ],
    stadium: { name: "Old Trafford", capacity: 74879, image: null },
    current_seasons: [
      {
        id: 1,
        name: "2022/2023",
        is_current: true,
        starting_at: "2022-08-05",
        ending_at: "2023-05-28",
        league: {
          id: 1,
          name: "Premier League",
          logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
        },
      },
      {
        id: 2,
        name: "2023/2024",
        is_current: false,
        starting_at: "2023-08-05",
        ending_at: "2024-05-28",
        league: {
          id: 1,
          name: "Premier League",
          logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
        },
      },
    ],
  },
};

export const mockTeamMatches: Record<number, TeamMatchesResponse> = {
  1: {
    latest: Array.from({ length: 5 }).map((_, i) => ({
      id: 9000 + i,
      kickoff_time: `2026-01-${5 + i}T18:00:00Z`,
      status: "FINISHED",
      league: {
        id: 100,
        name: "Premier League",
        logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
      },
      teams: {
        home: { id: 1, name: "Manchester United", logo: null },
        away: { id: 2, name: "Liverpool", logo: null },
      },
      score: {
        home: 2,
        away: 1,
      },
    })),
    upcoming: Array.from({ length: 5 }).map((_, i) => ({
      id: 9100 + i,
      kickoff_time: `2026-01-${15 + i}T20:00:00Z`,
      status: "UPCOMING",
      league: {
        id: 100,
        name: "Premier League",
        logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
      },
      teams: {
        home: { id: 1, name: "Manchester United", logo: null },
        away: { id: 3, name: "Arsenal", logo: null },
      },
    })),
  },
};

export const mockTeamStats: Record<number, TeamSeasonStatsResponse> = {
  1: {
    team: {
      id: 1,
      name: "Manchester United",
      logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    },
    seasons: [
      {
        season: {
          id: 1001,
          name: "2024/25",
          starting_at: "2024-08-05",
          ending_at: "2025-05-28",
          league: {
            id: 1,
            name: "Premier League",
            logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
          },
        },
        stats: {
          goals_for: 58,
          goals_against: 32,
          shots: 410,
          yellow_cards: 61,
          red_cards: 3,
          minutes_played: 34200,
          clean_sheets: 14,
          wins: 21,
          draws: 9,
          losses: 8,
        },
      },
      {
        season: {
          id: 999,
          name: "2023/24",
          starting_at: "2023-08-05",
          ending_at: "2024-05-28",
          league: {
            id: 1,
            name: "Premier League",
            logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
          },
        },
        stats: {
          goals_for: 54,
          goals_against: 40,
          shots: 395,
          yellow_cards: 68,
          red_cards: 5,
          minutes_played: 34200,
          clean_sheets: 11,
          wins: 18,
          draws: 10,
          losses: 10,
        },
      },
    ],
  },
};

export const mockTeamsRepository: TeamsRepository = {
  async getTeams(page, limit, search): Promise<TeamsListResponse> {
    let data = mockTeams;

    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.short_code?.toLowerCase().includes(q)
      );
    }

    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      data: data.slice(start, end),
      pagination: {
        page,
        limit,
        count: data.length,
        total_pages: Math.ceil(data.length / limit),
      },
    };
  },

  async getTeamPlayers(teamId) {
    return mockTeamPlayers[1] ?? null;
  },

  async getTeamOverview(teamId) {
    return mockTeamOverviews[1] ?? null;
  },

  async getTeamMatches(teamId) {
    return mockTeamMatches[1] ?? null;
  },

  async getTeamStats(teamId) {
    return mockTeamStats[1] ?? null;
  },
  async getTeamTransfers(teamId) {
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
