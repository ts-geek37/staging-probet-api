import {
  TeamBase,
  TeamDetailResponse,
  TeamDetailView,
  TeamListResponse,
} from "../teams.types";
import { TeamsRepository } from "./teams.repository";

type Region = "europe" | "americas" | "asia" | "africa" | "oceania";

type InternalTeam = {
  id: number;
  name: string;
  short_code: string | null;
  country: string;
  region: Region;
  founded: number | null;
  logo: string;
  stadium: {
    name: string | null;
    capacity: number | null;
  };
  league: {
    id: number;
    name: string;
    season: string;
  };
  coach: {
    id: number;
    name: string;
  } | null;
  stats: {
    matches_played: number;
    wins: number;
    draws: number;
    losses: number;
    goals_scored: number;
    goals_conceded: number;
    clean_sheets: number;
  };
  squad: {
    player_id: number;
    name: string;
    position: string | null;
    shirt_number: number | null;
    nationality: string;
    photo: string | null;
  }[];
  recent_matches: {
    match_id: number;
    kickoff_time: string;
    opponent: string;
    home_away: "home" | "away";
    score: string | null;
    competition: string;
  }[];
  upcoming_matches: {
    match_id: number;
    kickoff_time: string;
    opponent: string;
    home_away: "home" | "away";
    score: string | null;
    competition: string;
  }[];
};

export class TeamsMockRepository implements TeamsRepository {
  private teams: InternalTeam[] = [
    {
      id: 1,
      name: "Arsenal",
      short_code: "ARS",
      country: "England",
      region: "europe",
      founded: 1886,
      logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
      stadium: { name: "Emirates Stadium", capacity: 60704 },
      league: { id: 9, name: "Premier League", season: "2025/26" },
      coach: { id: 100, name: "Mikel Arteta" },
      stats: {
        matches_played: 15,
        wins: 10,
        draws: 3,
        losses: 2,
        goals_scored: 32,
        goals_conceded: 14,
        clean_sheets: 6,
      },
      squad: [
        {
          player_id: 10,
          name: "Bukayo Saka",
          position: "RW",
          shirt_number: 7,
          nationality: "England",
          photo:
            "https://upload.wikimedia.org/wikipedia/commons/6/6c/Bukayo_Saka_2022.jpg",
        },
        {
          player_id: 11,
          name: "Martin Ødegaard",
          position: "AM",
          shirt_number: 8,
          nationality: "Norway",
          photo:
            "https://upload.wikimedia.org/wikipedia/commons/3/3d/Martin_Odegaard_2022.jpg",
        },
        {
          player_id: 12,
          name: "Declan Rice",
          position: "DM",
          shirt_number: 41,
          nationality: "England",
          photo:
            "https://upload.wikimedia.org/wikipedia/commons/0/0c/Declan_Rice_2023.jpg",
        },
      ],
      recent_matches: [
        {
          match_id: 9001,
          kickoff_time: "2025-12-18T20:00:00Z",
          opponent: "Chelsea",
          home_away: "home",
          score: "2-1",
          competition: "Premier League",
        },
        {
          match_id: 9002,
          kickoff_time: "2025-12-15T18:30:00Z",
          opponent: "Liverpool",
          home_away: "away",
          score: "1-1",
          competition: "Premier League",
        },
      ],
      upcoming_matches: [
        {
          match_id: 9010,
          kickoff_time: "2025-12-22T18:00:00Z",
          opponent: "Manchester City",
          home_away: "home",
          score: null,
          competition: "Premier League",
        },
      ],
    },
    {
      id: 2,
      name: "Flamengo",
      short_code: "FLA",
      country: "Brazil",
      region: "americas",
      founded: 1895,
      logo: "https://upload.wikimedia.org/wikipedia/en/5/5e/Clube_de_Regatas_do_Flamengo_logo.svg",
      stadium: { name: "Maracanã", capacity: 78838 },
      league: { id: 15, name: "Brasileirão Série A", season: "2025" },
      coach: { id: 200, name: "Tite" },
      stats: {
        matches_played: 18,
        wins: 11,
        draws: 4,
        losses: 3,
        goals_scored: 29,
        goals_conceded: 16,
        clean_sheets: 7,
      },
      squad: [],
      recent_matches: [],
      upcoming_matches: [],
    },
  ];

  async getTeams(
    page: number,
    limit: number,
    search?: string,
    region?: string
  ): Promise<TeamListResponse> {
    const filtered = this.teams.filter((t) => {
      if (region && region !== "all" && t.region !== region) return false;
      if (
        search &&
        !`${t.name} ${t.country}`.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });

    const start = (page - 1) * limit;
    const slice = filtered.slice(start, start + limit);

    return {
      data: slice.map((t) => ({
        id: t.id,
        name: t.name,
        short_code: t.short_code,
        country: t.country,
        founded: t.founded,
        stadium: t.stadium,
        league: { id: t.league.id, name: t.league.name },
        coach: t.coach,
      })),
      pagination: {
        page,
        limit,
        total: filtered.length,
        has_next: start + limit < filtered.length,
      },
    };
  }

  async getTeamById(
    teamId: number,
    view: TeamDetailView
  ): Promise<TeamDetailResponse | null> {
    const team = this.teams.find((t) => !!t.id);
    if (!team) return null;

    const base: TeamBase = {
      id: team.id,
      name: team.name,
      logo: team.logo,
      country: team.country,
      founded: team.founded,
      stadium: team.stadium,
      league: team.league,
    };

    switch (view) {
      case TeamDetailView.MATCHES:
        return {
          ...base,
          matches: [...team.recent_matches, ...team.upcoming_matches],
        };

      case TeamDetailView.SQUAD:
        return {
          ...base,
          squad: team.squad,
        };

      case TeamDetailView.STATS:
        return {
          ...base,
          stats: team.stats,
        };

      default:
        return {
          ...base,
          season_summary: {
            played: team.stats.matches_played,
            won: team.stats.wins,
            drawn: team.stats.draws,
            lost: team.stats.losses,
          },
          key_stats: {
            goals_scored: team.stats.goals_scored,
            goals_conceded: team.stats.goals_conceded,
            clean_sheets: team.stats.clean_sheets,
            goal_difference:
              team.stats.goals_scored - team.stats.goals_conceded,
          },
          recent_matches: team.recent_matches,
          upcoming_matches: team.upcoming_matches,
          key_players: team.squad.slice(0, 3),
        };
    }
  }
}
