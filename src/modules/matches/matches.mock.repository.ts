import {
  MatchStatus,
  SportMonksFixtureComment,
} from "@/integrations/sportmonks";
import { MatchesRepository } from "./matches.repository";
import {
  MatchEventsResponse,
  MatchLineupsResponse,
  MatchListFilters,
  MatchListItem,
  MatchStatsResponse,
} from "./matches.types";

const allMatches: MatchListItem[] = Array.from({ length: 30 }).map((_, i) => {
  const status: MatchStatus = i < 8 ? "LIVE" : i < 18 ? "UPCOMING" : "FINISHED";

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
      status === "UPCOMING" ? undefined : { home: i % 4, away: (i + 1) % 3 },
  };
});

/* ----------------------------------
   EVENTS / LINEUPS / STATS
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
      ],
    },
  ])
);

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
   HEAD TO HEAD
---------------------------------- */

const getHeadToHeadMatches = ({
  team1,
  team2,
}: {
  team1: number;
  team2: number;
}): Promise<{ matches: MatchListItem[] }> =>
  Promise.resolve({
    matches: allMatches.filter(
      (m) =>
        (m.teams.home.id === team1 && m.teams.away.id === team2) ||
        (m.teams.home.id === team2 && m.teams.away.id === team1)
    ),
  });

/* ----------------------------------
   COMMENTS
---------------------------------- */

const getMatchComments = async (
  matchId: number
): Promise<SportMonksFixtureComment[] | null> => {
  if (!matchId) return null;

  return [
    {
      id: 1,
      fixture_id: matchId,
      comment: "Kick-off! The match is underway.",
      minute: 1,
      extra_minute: null,
      is_goal: false,
      is_important: true,
      order: 1,
    },
    {
      id: 2,
      fixture_id: matchId,
      comment: "GOAL! A brilliant finish.",
      minute: 23,
      extra_minute: null,
      is_goal: true,
      is_important: true,
      order: 2,
    },
  ];
};

import { MatchesTeamStats } from "./matches.types";

/* ----------------------------------
   MOCK: TEAM SEASON STATS (TYPE-SAFE)
---------------------------------- */

export const getTeamStats = async (
  matchId: number,
  seasonId: number
): Promise<MatchesTeamStats | null> => {
  if (!matchId || !seasonId) return null;

  return {
    home: {
      id: 62,
      name: "Rangers",
      logo: "https://cdn.sportmonks.com/images/soccer/teams/30/62.png",
      stats: {
        games_played: 22,
        minutes_played: 1980,
        wins: 14,
        draws: 5,
        losses: 3,
        points_per_game: 2.14,

        goals_for: 51,
        goals_against: 28,
        expected_goals: 49.6,
        clean_sheets: 9,
        failed_to_score: 3,

        shots: 412,
        corners: 141,
        attacks: 2820,
        dangerous_attacks: 1440,
        possession: 59.55,
        penalties: 7,
        offsides: 63,
        assists: 38,

        tackles: 610,
        fouls: 420,

        yellow_cards: 45,
        red_cards: 1,
        yellow_red_cards: 0,
        fouls_per_card: 9.3,

        rating: 7.18,
        highest_rated_player: 901,

        average_player_height: 183.43,
        average_player_age: 26.1,
        foreign_players: 16,
        appearing_players: 25,
        national_team_players: 10,

        penalty_conversion_rate: 78,
        shot_conversion_rate: 13.6,
        shot_on_target_percentage: 36.4,
        scoring_frequency: 43,

        scoring_minutes: {
          "0-15": { count: 6, percentage: 17.65 },
          "15-30": { count: 5, percentage: 11.76 },
          "30-45": { count: 5, percentage: 14.71 },
          "45-60": { count: 5, percentage: 14.71 },
          "60-75": { count: 4, percentage: 11.76 },
          "75-90": { count: 9, percentage: 26.47 },
        },

        conceded_scoring_minutes: {
          "0-15": { count: 1, percentage: 5.88 },
          "15-30": { count: 3, percentage: 17.65 },
          "30-45": { count: 4, percentage: 23.53 },
          "45-60": { count: 1, percentage: 5.88 },
          "60-75": { count: 4, percentage: 23.53 },
          "75-90": { count: 4, percentage: 23.53 },
        },

        most_scored_half: {
          most_scored_half: "2nd-half",
          most_scored_half_goals: 27,
          details: {
            "1st-half": { period: "1st-half", total: 24 },
            "2nd-half": { period: "2nd-half", total: 27 },
          },
        },

        most_frequent_scoring_minute: {
          minute: 75,
          goals: 6,
        },

        half_results: {
          won_both_halves: 2,
          scored_both_halves: 7,
          comebacks: 3,
        },

        goal_results: {
          scored_first: 15,
          conceded_first: 7,
          wins_when_scoring_first: 13,
        },

        interception_stats: {
          total: 398,
          per_match: 18.1,
        },

        pass_stats: {
          total: 12840,
          accurate: 11210,
          accuracy_percentage: 87.3,
        },

        assist_stats: {
          total: 38,
          per_match: 1.73,
        },

        players_footing: {
          left: 7,
          right: 16,
          both: 2,
        },

        most_substituted_players: [
          { player_id: 501, name: "Midfielder A", substitutions: 18 },
          { player_id: 502, name: "Winger B", substitutions: 15 },
        ],

        most_injured_players: [
          { player_id: 601, name: "Defender C", injuries: 3 },
        ],

        team_of_the_week: {
          appearances: 12,
          players: [
            { id: 701, name: "Captain X", position: "Midfielder" },
            { id: 702, name: "Striker Y", position: "Forward" },
          ],
        },

        injury_time_goals: {
          total: 2,
          average: 0.09,
        },
      },
    },

    away: {
      id: 273,
      name: "Aberdeen",
      logo: "https://cdn.sportmonks.com/images/soccer/teams/17/273.png",
      stats: {
        games_played: 22,
        minutes_played: 1980,
        wins: 10,
        draws: 6,
        losses: 6,
        points_per_game: 1.64,

        goals_for: 38,
        goals_against: 36,
        expected_goals: 40.2,
        clean_sheets: 6,
        failed_to_score: 6,

        shots: 356,
        corners: 110,
        attacks: 2510,
        dangerous_attacks: 1195,
        possession: 47.86,
        penalties: 4,
        offsides: 71,
        assists: 29,

        tackles: 645,
        fouls: 455,

        yellow_cards: 51,
        red_cards: 2,
        yellow_red_cards: 1,
        fouls_per_card: 7.9,

        rating: 6.91,
        highest_rated_player: 812,

        average_player_height: 183.79,
        average_player_age: 27.3,
        foreign_players: 18,
        appearing_players: 27,
        national_team_players: 8,

        penalty_conversion_rate: 71,
        shot_conversion_rate: 12.1,
        shot_on_target_percentage: 34.1,
        scoring_frequency: 61,

        scoring_minutes: {
          "0-15": { count: 0, percentage: 0 },
          "15-30": { count: 3, percentage: 15 },
          "30-45": { count: 4, percentage: 20 },
          "45-60": { count: 0, percentage: 0 },
          "60-75": { count: 6, percentage: 30 },
          "75-90": { count: 7, percentage: 35 },
        },

        conceded_scoring_minutes: {
          "0-15": { count: 2, percentage: 7.14 },
          "15-30": { count: 3, percentage: 10.71 },
          "30-45": { count: 5, percentage: 17.86 },
          "45-60": { count: 3, percentage: 10.71 },
          "60-75": { count: 6, percentage: 21.43 },
          "75-90": { count: 9, percentage: 32.14 },
        },

        most_scored_half: {
          most_scored_half: "2nd-half",
          most_scored_half_goals: 31,
          details: {
            "1st-half": { period: "1st-half", total: 17 },
            "2nd-half": { period: "2nd-half", total: 31 },
          },
        },

        injury_time_goals: {
          total: 7,
          average: 0.32,
        },
      },
    },
  };
};

export const mockMatchesRepository: MatchesRepository = {
  async getMatches({ tab, page, limit, q }: MatchListFilters) {
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
        count: data.length,
        total_pages: Math.ceil(data.length / limit),
      },
    };
  },

  getPredictableMatches: async (page, limit) => {
    const data = allMatches.map((m) => ({
      ...m,
      status: "UPCOMING" as MatchStatus,
    }));

    return {
      tab: "UPCOMING",
      data: data.slice((page - 1) * limit, page * limit),
      pagination: {
        page,
        limit,
        count: data.length,
        total_pages: Math.ceil(data.length / limit),
      },
    };
  },

  getMatchById: async (matchId) =>
    allMatches.find((m) => m.id === matchId) ?? null,

  getMatchStats: async (matchId) => matchStats[matchId] ?? null,

  getMatchLineups: async (matchId) => matchLineups[matchId] ?? null,

  getMatchEvents: async (matchId) => matchEvents[matchId] ?? null,

  getHeadToHeadMatches,

  getMatchComments,

  getTeamStats,
};
