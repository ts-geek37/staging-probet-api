import {
  LeagueListResponse,
  LeagueResponse,
  LeagueView,
} from "../leagues.types";
import { LeaguesRepository } from "./leagues.repository";

export class LeaguesMockRepository implements LeaguesRepository {
  async getLeagueById(
    leagueId: number,
    view: LeagueView
  ): Promise<LeagueResponse> {
    const base: LeagueResponse = {
      league: {
        id: leagueId,
        name: "Premier League",
        country: "England",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
      },
    };

    switch (view) {
      case LeagueView.OVERVIEW:
        return {
          ...base,
          overview: {
            description:
              "The Premier League is the top tier of English football, featuring 20 elite clubs competing across the season.",
            total_teams: 20,
            matches_played: 160,
            goals_scored: 456,
            goals_per_match: 2.85,
            top_teams: [
              {
                id: 1,
                name: "Liverpool",
                logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
                points: 41,
              },
              {
                id: 2,
                name: "Chelsea",
                logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
                points: 34,
              },
              {
                id: 3,
                name: "Arsenal",
                logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
                points: 34,
              },
              {
                id: 4,
                name: "Manchester City",
                logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
                points: 29,
              },
              {
                id: 5,
                name: "Manchester United",
                logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
                points: 26,
              },
            ],
          },
        };

      case LeagueView.STANDINGS:
        return {
          ...base,
          standings: {
            table: [
              {
                position: 1,
                team: {
                  id: 3,
                  name: "Arsenal",
                  logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
                },
                played: 15,
                wins: 12,
                draws: 2,
                losses: 1,
                goal_difference: 38,
                points: 38,
                form: ["W", "W", "W", "D", "W"],
              },
              {
                position: 2,
                team: {
                  id: 2,
                  name: "Chelsea",
                  logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
                },
                played: 15,
                wins: 9,
                draws: 7,
                losses: -1 < 0 ? -1 : -1,
                goal_difference: 28,
                points: 28,
                form: ["W", "W", "D", "W", "W"],
              },
              {
                position: 3,
                team: {
                  id: 1,
                  name: "Liverpool",
                  logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
                },
                played: 15,
                wins: 11,
                draws: 1,
                losses: 3,
                goal_difference: 34,
                points: 34,
                form: ["W", "L", "W", "D", "W"],
              },
              {
                position: 4,
                team: {
                  id: 6,
                  name: "Aston Villa",
                  logo: "https://upload.wikimedia.org/wikipedia/en/f/f9/Aston_Villa_FC_crest_%282016%29.svg",
                },
                played: 15,
                wins: 9,
                draws: 3,
                losses: 3,
                goal_difference: 30,
                points: 30,
                form: ["W", "L", "L", "D", "W"],
              },
              {
                position: 5,
                team: {
                  id: 7,
                  name: "Tottenham",
                  logo: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
                },
                played: 15,
                wins: 8,
                draws: 2,
                losses: 5,
                goal_difference: 26,
                points: 26,
                form: ["D", "W", "W", "D", "W"],
              },
            ],
          },
        };

      case LeagueView.MATCHES:
        return {
          ...base,
          matches: {
            upcoming: [
              {
                id: 9001,
                kickoff_time: "2025-12-22T18:00:00Z",
                status: "UPCOMING",
                home_team: {
                  id: 1,
                  name: "Liverpool",
                  logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
                },
                away_team: {
                  id: 2,
                  name: "Chelsea",
                  logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
                },
              },
              {
                id: 9002,
                kickoff_time: "2025-12-22T20:00:00Z",
                status: "UPCOMING",
                home_team: {
                  id: 3,
                  name: "Arsenal",
                  logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
                },
                away_team: {
                  id: 4,
                  name: "Manchester City",
                  logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
                },
              },
            ],
            recent: [
              {
                id: 8001,
                kickoff_time: "2025-12-18T20:00:00Z",
                status: "FT",
                home_team: {
                  id: 5,
                  name: "Manchester United",
                  logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
                  score: 1,
                },
                away_team: {
                  id: 7,
                  name: "Tottenham",
                  logo: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
                  score: 1,
                },
              },
              {
                id: 8002,
                kickoff_time: "2025-12-17T18:30:00Z",
                status: "FT",
                home_team: {
                  id: 6,
                  name: "Aston Villa",
                  logo: "https://upload.wikimedia.org/wikipedia/en/f/f9/Aston_Villa_FC_crest_%282016%29.svg",
                  score: 2,
                },
                away_team: {
                  id: 2,
                  name: "Chelsea",
                  logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
                  score: 3,
                },
              },
            ],
          },
        };

      case LeagueView.STATS:
        return {
          ...base,
          stats: {
            total_goals: 287,
            clean_sheets: 54,
            yellow_cards: 142,
            goals_per_match: 2.9,
            top_scorers: [
              {
                player_id: 101,
                name: "Erling Haaland",
                team: "Manchester City",
                goals: 14,
              },
              {
                player_id: 102,
                name: "Mohamed Salah",
                team: "Liverpool",
                goals: 12,
              },
              {
                player_id: 103,
                name: "Cole Palmer",
                team: "Chelsea",
                goals: 10,
              },
            ],
          },
        };

      case LeagueView.TEAMS:
        return {
          ...base,
          teams: {
            teams: [
              {
                id: 1,
                name: "Liverpool",
                logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
              },
              {
                id: 2,
                name: "Chelsea",
                logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
              },
              {
                id: 3,
                name: "Arsenal",
                logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
              },
              {
                id: 4,
                name: "Manchester City",
                logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
              },
              {
                id: 7,
                name: "Tottenham",
                logo: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
              },
            ],
          },
        };
    }
  }
  async getLeaguesList(
    page: number,
    limit: number,
    search?: string
  ): Promise<LeagueListResponse> {
    const all = [
      {
        id: 9,
        name: "Premier League",
        country: "England",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
      },
      {
        id: 10,
        name: "Bundesliga",
        country: "Germany",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg",
      },
      {
        id: 8,
        name: "La Liga",
        country: "Spain",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/9/92/La_Liga_logo_2023.svg",
      },
      {
        id: 11,
        name: "Serie A",
        country: "Italy",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/e/e1/Serie_A_logo_%282019%29.svg",
      },
      {
        id: 12,
        name: "Eredivisie",
        country: "Netherlands",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/7/7f/Eredivisie_logo.svg",
      },
      {
        id: 13,
        name: "Ligue 1",
        country: "France",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/c/c7/Ligue1_logo.svg",
      },
      {
        id: 14,
        name: "Major League Soccer",
        country: "USA",
        season: "2025",
        logo: "https://upload.wikimedia.org/wikipedia/en/a/a2/MLS_crest_logo.svg",
      },
      {
        id: 15,
        name: "Brasileirão Série A",
        country: "Brazil",
        season: "2025",
        logo: "https://upload.wikimedia.org/wikipedia/en/5/5e/Campeonato_Brasileiro_S%C3%A9rie_A_logo.png",
      },
    ];

    const filtered = search
      ? all.filter((l) =>
          `${l.name} ${l.country}`.toLowerCase().includes(search.toLowerCase())
        )
      : all;

    const start = (page - 1) * limit;
    const end = start + limit;
    const data = filtered.slice(start, end);

    return {
      data,
      pagination: {
        page,
        limit,
        total: filtered.length,
        has_next: end < filtered.length,
      },
    };
  }
}
