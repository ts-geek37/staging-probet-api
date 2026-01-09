import { MatchesRepository } from "./matches.repository";
import {
  MatchesListResponse,
  MatchEventsResponse,
  MatchLineupsResponse,
  MatchListFilters,
  MatchListItem,
  MatchStatsResponse,
  MatchStatus,
} from "./matches.types";

/* ----------------------------------
   BASE MATCH DATA
---------------------------------- */

const allMatches: MatchListItem[] = Array.from({ length: 30 }).map((_, i) => {
  const status = i < 8 ? "LIVE" : i < 18 ? "UPCOMING" : "FT";

  return {
    id: 10000 + i,
    kickoff_time: `2026-01-${String((i % 28) + 1).padStart(2, "0")}T18:00:00Z`,
    status,
    league: {
      id: i % 2 === 0 ? 100 : 101,
      name: i % 2 === 0 ? "Premier League" : "La Liga",
      logo:
        i % 2 === 0
          ? "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg"
          : "https://upload.wikimedia.org/wikipedia/en/7/75/LaLiga_Santander.svg",
    },
    season: {
      id: 2025,
      name: "2024/25",
    },
    venue: {
      id: 200 + i,
      name: i % 2 === 0 ? "Old Trafford" : "Santiago Bernabéu",
      city: i % 2 === 0 ? "Manchester" : "Madrid",
      country: i % 2 === 0 ? "England" : "Spain",
      capacity: i % 2 === 0 ? 74879 : 81044,
    },
    referee: i % 3 === 0 ? "Michael Oliver" : "Antonio Mateu",
    teams: {
      home: {
        id: i % 2 === 0 ? 1 : 7,
        name: i % 2 === 0 ? "Manchester United" : "Real Madrid",
        logo:
          i % 2 === 0
            ? "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg"
            : "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
      },
      away: {
        id: i % 2 === 0 ? 2 : 9,
        name: i % 2 === 0 ? "Liverpool" : "Atletico Madrid",
        logo:
          i % 2 === 0
            ? "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg"
            : "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg",
      },
    },
    score:
      status === "UPCOMING"
        ? undefined
        : {
            home: i % 4,
            away: (i + 1) % 3,
          },
  };
});

/* ----------------------------------
   EVENTS
---------------------------------- */

const matchEvents: Record<number, MatchEventsResponse> = Object.fromEntries(
  allMatches.map((m) => [
    m.id,
    {
      match_id: m.id,
      events: [
        {
          id: m.id * 10 + 1,
          minute: 1,
          extra_minute: null,
          type: "PERIOD_START",
          team: null,
          detail: "Kick-off",
        },
        {
          id: m.id * 10 + 2,
          minute: 23,
          extra_minute: null,
          type: "GOAL",
          team: {
            id: m.teams.home.id,
            name: m.teams.home.name,
            logo: m.teams.home.logo,
          },
          player: { id: 500 + m.id, name: "Goal Scorer" },
          detail: "Right footed shot",
        },
        {
          id: m.id * 10 + 3,
          minute: 45,
          extra_minute: 2,
          type: "PERIOD_END",
          team: null,
          detail: "Half-time",
        },
      ],
    },
  ])
);

/* ----------------------------------
   LINEUPS
---------------------------------- */

const matchLineups: Record<number, MatchLineupsResponse> = Object.fromEntries(
  allMatches.map((m) => [
    m.id,
    {
      match_id: m.id,
      teams: [
        {
          team: m.teams.home,
          formation: "4-3-3",
          starting_xi: Array.from({ length: 11 }).map((_, i) => ({
            id: m.id * 100 + i,
            name: `Home Player ${i + 1}`,
            number: i + 1,
            position_id: i === 0 ? 1 : 2,
            formation_field: "field",
            formation_position: i + 1,
          })),
          substitutes: Array.from({ length: 7 }).map((_, i) => ({
            id: m.id * 1000 + i,
            name: `Home Sub ${i + 1}`,
            number: i + 12,
            position_id: null,
            formation_field: null,
            formation_position: null,
          })),
        },
        {
          team: m.teams.away,
          formation: "4-4-2",
          starting_xi: Array.from({ length: 11 }).map((_, i) => ({
            id: m.id * 200 + i,
            name: `Away Player ${i + 1}`,
            number: i + 1,
            position_id: i === 0 ? 1 : 2,
            formation_field: "field",
            formation_position: i + 1,
          })),
          substitutes: Array.from({ length: 7 }).map((_, i) => ({
            id: m.id * 2000 + i,
            name: `Away Sub ${i + 1}`,
            number: i + 12,
            position_id: null,
            formation_field: null,
            formation_position: null,
          })),
        },
      ],
    },
  ])
);

/* ----------------------------------
   STATS
---------------------------------- */

const matchStats: Record<number, MatchStatsResponse> = Object.fromEntries(
  allMatches.map((m) => [
    m.id,
    {
      match_id: m.id,
      teams: [
        {
          team: m.teams.home,
          statistics: {
            possession: 55,
            shots_on_target: 6,
            shots_total: 14,
            corners: 5,
            fouls: 11,
          },
        },
        {
          team: m.teams.away,
          statistics: {
            possession: 45,
            shots_on_target: 4,
            shots_total: 10,
            corners: 3,
            fouls: 14,
          },
        },
      ],
    },
  ])
);

/* ----------------------------------
   REPOSITORY
---------------------------------- */

export const mockMatchesRepository: MatchesRepository = {
  async getMatches({
    tab,
    page,
    limit,
    q,
  }: MatchListFilters): Promise<MatchesListResponse> {
    let data = allMatches.filter((m) => m.status === tab);

    if (q) {
      const query = q.toLowerCase();
      data = data.filter(
        (m) =>
          m.teams.home.name.toLowerCase().includes(query) ||
          m.teams.away.name.toLowerCase().includes(query) ||
          m.league.name.toLowerCase().includes(query)
      );
    }

    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      tab,
      data: data.slice(start, end),
      pagination: {
        page,
        limit,
        has_next: end < data.length,
      },
    };
  },

  getPredictableMatches: async (
    page: number,
    limit: number
  ): Promise<MatchesListResponse> => {
    const now = new Date();

    const data = allMatches.map((m, i) => ({
      ...m,
      kickoff_time: new Date(
        now.getTime() + (i % 21) * 24 * 60 * 60 * 1000
      ).toISOString(),
      status: "UPCOMING" as MatchStatus,
    }));

    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      tab: "UPCOMING",
      data: data.slice(start, end),
      pagination: {
        page,
        limit,
        has_next: end < data.length,
      },
    };
  },

  async getMatchById(matchId) {
    return allMatches.find((m) => m.id === matchId) ?? null;
  },

  async getMatchStats(matchId) {
    return matchStats[matchId] ?? null;
  },

  async getMatchLineups(matchId) {
    return matchLineups[matchId] ?? null;
  },

  async getMatchEvents(matchId) {
    return matchEvents[matchId] ?? null;
  },
};
