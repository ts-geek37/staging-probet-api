import {
  LeagueListResponse,
  LeagueMatch,
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
        country_flag: `https://flagcdn.com/w40/gb-eng.png`,
      },
    };
    const recent: LeagueMatch[] = [
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
    ];

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
          recent: recent,
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
                kickoff_time: "2026-01-07T19:06:45Z",
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
            recent: recent,
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
                team_logo_url:
                  "https://resources.premierleague.com/premierleague/badges/t43.png",
                goals: 14,
              },
              {
                player_id: 102,
                name: "Mohamed Salah",
                team: "Liverpool",
                team_logo_url:
                  "https://resources.premierleague.com/premierleague/badges/t1.png",
                goals: 12,
              },
              {
                player_id: 103,
                name: "Cole Palmer",
                team: "Chelsea",
                team_logo_url:
                  "https://resources.premierleague.com/premierleague/badges/t8.png",
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
        country_code: "GB",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
      },
      {
        id: 10,
        name: "Bundesliga",
        country: "Germany",
        country_code: "DE",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg",
      },
      {
        id: 8,
        name: "La Liga",
        country: "Spain",
        country_code: "ES",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/9/92/La_Liga_logo_2023.svg",
      },
      {
        id: 11,
        name: "Serie A",
        country: "Italy",
        country_code: "IT",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/e/e1/Serie_A_logo_%282019%29.svg",
      },
      {
        id: 12,
        name: "Eredivisie",
        country: "Netherlands",
        country_code: "NL",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/7/7f/Eredivisie_logo.svg",
      },
      {
        id: 13,
        name: "Ligue 1",
        country: "France",
        country_code: "FR",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/c/c7/Ligue1_logo.svg",
      },
      {
        id: 14,
        name: "Major League Soccer",
        country: "USA",
        country_code: "US",
        season: "2025",
        logo: "https://upload.wikimedia.org/wikipedia/en/a/a2/MLS_crest_logo.svg",
      },
      {
        id: 15,
        name: "Brasileirão Série A",
        country: "Brazil",
        country_code: "BR",
        season: "2025",
        logo: "https://upload.wikimedia.org/wikipedia/en/5/5e/Campeonato_Brasileiro_S%C3%A9rie_A_logo.png",
      },
      {
        id: 16,
        name: "Primeira Liga",
        country: "Portugal",
        country_code: "PT",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Liga_Portugal_logo_2023.svg",
      },
      {
        id: 17,
        name: "Süper Lig",
        country: "Turkey",
        country_code: "TR",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Trendyol_S%C3%BCper_Lig_logo.svg",
      },
      {
        id: 18,
        name: "Saudi Pro League",
        country: "Saudi Arabia",
        country_code: "SA",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/a/a8/Saudi_Pro_League_logo.svg",
      },
      {
        id: 19,
        name: "Liga MX",
        country: "Mexico",
        country_code: "MX",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/4/43/Liga_MX_logo.svg",
      },
      {
        id: 20,
        name: "Argentine Primera División",
        country: "Argentina",
        country_code: "AR",
        season: "2025",
        logo: "https://upload.wikimedia.org/wikipedia/en/f/f6/Liga_Profesional_de_F%C3%BAtbol_de_la_AFA.svg",
      },
      {
        id: 21,
        name: "Championship",
        country: "England",
        country_code: "GB",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/c/c9/EFL_Championship_logo.svg",
      },
      {
        id: 22,
        name: "Scottish Premiership",
        country: "Scotland",
        country_code: "GB-SCT",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/1/14/Scottish_Premiership_logo.svg",
      },
      {
        id: 23,
        name: "UEFA Champions League",
        country: "Europe",
        country_code: "EU",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/b/bf/UEFA_Champions_League_logo_2.svg",
      },
      {
        id: 24,
        name: "Primeira Liga",
        country: "Portugal",
        country_code: "PT",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Liga_Portugal_logo_2023.svg",
      },
      {
        id: 25,
        name: "Jupiler Pro League",
        country: "Belgium",
        country_code: "BE",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/f/f3/Belgian_Pro_League_logo.svg",
      },
      {
        id: 26,
        name: "Swiss Super League",
        country: "Switzerland",
        country_code: "CH",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Swiss_Super_League_logo.svg",
      },
      {
        id: 27,
        name: "Süper Lig",
        country: "Turkey",
        country_code: "TR",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/6/6b/S%C3%BCper_Lig_logo.svg",
      },
      {
        id: 28,
        name: "Austrian Bundesliga",
        country: "Austria",
        country_code: "AT",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/f/f3/Austrian_Football_Bundesliga_logo.svg",
      },
      {
        id: 29,
        name: "Scottish Premiership",
        country: "Scotland",
        country_code: "GB-SCT",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/1/14/Scottish_Premiership_logo.svg",
      },
      {
        id: 30,
        name: "Superligaen",
        country: "Denmark",
        country_code: "DK",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/9/9b/Danish_Superliga_logo.svg",
      },
      {
        id: 31,
        name: "Greek Super League",
        country: "Greece",
        country_code: "GR",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/d/db/Super_League_Greece_logo.svg",
      },
      {
        id: 32,
        name: "Liga MX",
        country: "Mexico",
        country_code: "MX",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/4/43/Liga_MX_logo.svg",
      },
      {
        id: 33,
        name: "Argentine Primera División",
        country: "Argentina",
        country_code: "AR",
        season: "2025",
        logo: "https://upload.wikimedia.org/wikipedia/en/f/f6/Liga_Profesional_de_F%C3%BAtbol_de_la_AFA.svg",
      },
      {
        id: 34,
        name: "Categoría Primera A",
        country: "Colombia",
        country_code: "CO",
        season: "2025",
        logo: "https://upload.wikimedia.org/wikipedia/en/6/63/Categor%C3%ADa_Primera_A_logo.svg",
      },
      {
        id: 35,
        name: "Chilean Primera División",
        country: "Chile",
        country_code: "CL",
        season: "2025",
        logo: "https://upload.wikimedia.org/wikipedia/en/3/30/Campeonato_PlanVital_logo.svg",
      },
      {
        id: 36,
        name: "Saudi Pro League",
        country: "Saudi Arabia",
        country_code: "SA",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/a/a8/Saudi_Pro_League_logo.svg",
      },
      {
        id: 37,
        name: "J1 League",
        country: "Japan",
        country_code: "JP",
        season: "2025",
        logo: "https://upload.wikimedia.org/wikipedia/en/b/b3/J1_League_logo.svg",
      },
      {
        id: 38,
        name: "K League 1",
        country: "South Korea",
        country_code: "KR",
        season: "2025",
        logo: "https://upload.wikimedia.org/wikipedia/en/1/1a/K_League_logo.svg",
      },
      {
        id: 39,
        name: "A-League Men",
        country: "Australia",
        country_code: "AU",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/7/7d/A-League_Men_logo.svg",
      },
      {
        id: 40,
        name: "Indian Super League",
        country: "India",
        country_code: "IN",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/b/b2/Indian_Super_League_logo.svg",
      },
      {
        id: 41,
        name: "EFL Championship",
        country: "England",
        country_code: "GB",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/c/c9/EFL_Championship_logo.svg",
      },
      {
        id: 42,
        name: "2. Bundesliga",
        country: "Germany",
        country_code: "DE",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/8/87/2._Bundesliga_logo.svg",
      },
      {
        id: 43,
        name: "Segunda División",
        country: "Spain",
        country_code: "ES",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/LaLiga_Hypermotion_logo.svg",
      },
      {
        id: 44,
        name: "UEFA Champions League",
        country: "Europe",
        country_code: "EU",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/b/bf/UEFA_Champions_League_logo_2.svg",
      },
      {
        id: 45,
        name: "UEFA Europa League",
        country: "Europe",
        country_code: "EU",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/en/b/b5/UEFA_Europa_League_logo_%282021%29.svg",
      },
      {
        id: 46,
        name: "CONMEBOL Libertadores",
        country: "South America",
        country_code: "SA",
        season: "2025",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Copa_Libertadores_logo_2017.svg",
      },
      {
        id: 47,
        name: "AFC Champions League Elite",
        country: "Asia",
        country_code: "AS",
        season: "2025/26",
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/AFC_Champions_League.svg",
      },
      {
        id: 48,
        name: "FIFA World Cup 2026",
        country: "Global",
        country_code: "UN",
        season: "2026",
        country_flag: `https://flagcdn.com/w40/gb-eng.png`,
        logo: "https://upload.wikimedia.org/wikipedia/en/4/4b/2026_FIFA_World_Cup_logo.svg",
      },
    ];
    const FLAG_BASE_URL = "https://flagcdn.com/w40";

    const filtered = search
      ? all.filter((l) =>
          `${l.name} ${l.country}`.toLowerCase().includes(search.toLowerCase())
        )
      : all;

    const start = (page - 1) * limit;
    const end = start + limit;
    const data = filtered.slice(start, end).map((league) => ({
      ...league,
      country_flag: `${FLAG_BASE_URL}/${league.country_code.toLowerCase()}.png`,
    }));

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
