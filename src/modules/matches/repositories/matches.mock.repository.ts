import {
  MatchBase,
  MatchCard,
  MatchDetailResponse,
  MatchDetailView,
  MatchListStatus,
  MatchesListResponse,
} from "../matches.types";
import { MatchesRepository } from "./matches.repository";

export class MatchesMockRepository implements MatchesRepository {
  async getMatches(
    status: MatchListStatus,
    page: number,
    limit: number,
    leagueId?: number,
    search?: string
  ): Promise<MatchesListResponse> {
    const all: MatchCard[] = [
      {
        id: 1,
        league: { id: 9, name: "Premier League" },
        status: "LIVE",
        kickoff_time: "2025-12-19T18:00:00Z",
        minute: 72,
        home_team: {
          id: 1,
          name: "Arsenal",
          logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
          score: 2,
        },
        away_team: {
          id: 2,
          name: "Chelsea",
          logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
          score: 1,
        },
      },
      {
        id: 2,
        league: { id: 9, name: "Premier League" },
        status: "UPCOMING",
        kickoff_time: "2025-12-20T18:00:00Z",
        home_team: {
          id: 3,
          name: "Liverpool",
          logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
        },
        away_team: {
          id: 4,
          name: "Manchester United",
          logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
        },
      },
    ];

    const filtered = all.filter((m) => {
      if (status === MatchListStatus.LIVE) return m.status === "LIVE";
      if (status === MatchListStatus.FINISHED) return m.status === "FINISHED";
      return true;
    });

    const searched = search
      ? filtered.filter((m) =>
          `${m.home_team.name} ${m.away_team.name} ${m.league.name}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      : filtered;

    const leagueFiltered = leagueId
      ? searched.filter((m) => m.league.id === leagueId)
      : searched;

    const start = (page - 1) * limit;
    const slice = leagueFiltered.slice(start, start + limit);

    return {
      data: slice,
      pagination: {
        page,
        limit,
        count: leagueFiltered.length,
        total_pages: Math.ceil(leagueFiltered.length / limit),
      },
    };
  }

  async getMatchById(
    matchId: number,
    view: MatchDetailView
  ): Promise<MatchDetailResponse | null> {
    const base: MatchBase = {
      id: matchId,
      league: { id: 9, name: "Premier League", season: "2025/26" },
      status: "LIVE",
      kickoff_time: new Date().toISOString(),
      minute: 61,
      venue: "Emirates Stadium",
      referee: "Michael Oliver",
      home_team: {
        id: 1,
        name: "Arsenal",
        logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
        score: 2,
      },
      away_team: {
        id: 2,
        name: "Chelsea",
        logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
        score: 1,
      },
    };

    switch (view) {
      case MatchDetailView.STATS:
        return {
          ...base,
          statistics: [
            { team_id: 1, possession: 56, shots_on_target: 6 },
            { team_id: 2, possession: 44, shots_on_target: 3 },
          ],
        };

      case MatchDetailView.LINEUPS:
        return {
          ...base,
          lineups: [
            {
              team_id: 1,
              formation: "4-3-3",
              starting_xi: [{ id: 10, name: "Bukayo Saka" }],
              substitutes: [{ id: 11, name: "Gabriel Jesus" }],
            },
          ],
        };

      case MatchDetailView.EVENTS:
        return {
          ...base,
          events: [
            {
              id: 1,
              minute: 22,
              type: "goal",
              team_id: 1,
              player_name: "Saka",
            },
          ],
        };

      case MatchDetailView.PREDICTIONS:
        return {
          ...base,
          prediction: {
            home_win_probability: 0.55,
            draw_probability: 0.25,
            away_win_probability: 0.2,
          },
        };

      default:
        return {
          ...base,
          score: {
            home: base.home_team.score ?? null,
            away: base.away_team.score ?? null,
          },
        };
    }
  }
}
