import { getFlagUrlByName } from "../../../utils";
import {
  TeamBase,
  TeamDetailResponse,
  TeamDetailView,
  TeamListResponse,
} from "../teams.types";
import { TeamsRepository } from "./teams.repository";

type Region = "europe" | "americas" | "asia" | "africa" | "oceania";
export enum PlayerPosition {
  Goalkeeper = "Goalkeeper",
  Defender = "Defender",
  Midfielder = "Midfielder",
  Forward = "Forward",
}

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
    goal_difference: number;
    possession_percentage: number;
    pass_accuracy_percentage: number;
    average_shots: number;
    performance_index: number;
  };
  squad: {
    player_id: number;
    name: string;
    position: PlayerPosition;
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
        goal_difference: 18,
        possession_percentage: 58.3,
        pass_accuracy_percentage: 89.4,
        average_shots: 16.2,
        performance_index: 7.8,
      },
      squad: [
        {
          player_id: 1,
          name: "David Raya",
          position: PlayerPosition.Goalkeeper,
          shirt_number: 1,
          nationality: "Spain",
          photo:
            "https://upload.wikimedia.org/wikipedia/commons/b/b2/David_Raya_2023.jpg",
        },
        {
          player_id: 2,
          name: "William Saliba",
          position: PlayerPosition.Defender,
          shirt_number: 2,
          nationality: "France",
          photo:
            "https://upload.wikimedia.org/wikipedia/commons/0/0e/William_Saliba_2022.jpg",
        },
        {
          player_id: 6,
          name: "Gabriel Magalhães",
          position: PlayerPosition.Defender,
          shirt_number: 6,
          nationality: "Brazil",
          photo:
            "https://upload.wikimedia.org/wikipedia/commons/a/a3/Gabriel_Magalhaes_2022.jpg",
        },
        {
          player_id: 41,
          name: "Declan Rice",
          position: PlayerPosition.Midfielder,
          shirt_number: 41,
          nationality: "England",
          photo:
            "https://upload.wikimedia.org/wikipedia/commons/0/0c/Declan_Rice_2023.jpg",
        },
        {
          player_id: 8,
          name: "Martin Ødegaard",
          position: PlayerPosition.Midfielder,
          shirt_number: 8,
          nationality: "Norway",
          photo:
            "https://upload.wikimedia.org/wikipedia/commons/3/3d/Martin_Odegaard_2022.jpg",
        },
        {
          player_id: 36,
          name: "Martín Zubimendi",
          position: PlayerPosition.Midfielder,
          shirt_number: 36,
          nationality: "Spain",
          photo: "https://example.com/photos/zubimendi.jpg",
        },
        {
          player_id: 7,
          name: "Bukayo Saka",
          position: PlayerPosition.Forward,
          shirt_number: 7,
          nationality: "England",
          photo:
            "https://upload.wikimedia.org/wikipedia/commons/6/6c/Bukayo_Saka_2022.jpg",
        },
        {
          player_id: 14,
          name: "Viktor Gyökeres",
          position: PlayerPosition.Forward,
          shirt_number: 14,
          nationality: "Sweden",
          photo: "https://example.com/photos/gyokeres.jpg",
        },
        {
          player_id: 11,
          name: "Gabriel Martinelli",
          position: PlayerPosition.Forward,
          shirt_number: 11,
          nationality: "Brazil",
          photo:
            "https://upload.wikimedia.org/wikipedia/commons/b/b3/Gabriel_Martinelli_2022.jpg",
        },
      ],
      recent_matches: [
        {
          match_id: 9005,
          kickoff_time: "2026-01-04T16:30:00Z",
          opponent: "Arsenal",
          home_away: "away",
          score: "0-0",
          competition: "Premier League",
        },
        {
          match_id: 9004,
          kickoff_time: "2026-01-01T15:00:00Z",
          opponent: "Tottenham",
          home_away: "home",
          score: "3-1",
          competition: "Premier League",
        },
        {
          match_id: 9003,
          kickoff_time: "2025-12-28T20:15:00Z",
          opponent: "Aston Villa",
          home_away: "away",
          score: "2-4",
          competition: "Premier League",
        },
        {
          match_id: 9001,
          kickoff_time: "2025-12-18T20:00:00Z",
          opponent: "Chelsea",
          home_away: "home",
          score: "2-1",
          competition: "Premier League",
        },
      ],
      upcoming_matches: [
        {
          match_id: 9010,
          kickoff_time: "2026-01-10T12:30:00Z",
          opponent: "Manchester City",
          home_away: "home",
          score: null,
          competition: "Premier League",
        },
        {
          match_id: 9011,
          kickoff_time: "2026-01-14T20:00:00Z",
          opponent: "Real Madrid",
          home_away: "away",
          score: null,
          competition: "Champions League",
        },
        {
          match_id: 9012,
          kickoff_time: "2026-01-18T14:00:00Z",
          opponent: "Everton",
          home_away: "away",
          score: null,
          competition: "Premier League",
        },
        {
          match_id: 9013,
          kickoff_time: "2026-01-25T16:00:00Z",
          opponent: "Newcastle United",
          home_away: "home",
          score: null,
          competition: "FA Cup",
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
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Clube_de_Regatas_do_Flamengo_logo.svg",
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
        goal_difference: 13,
        possession_percentage: 55.6,
        pass_accuracy_percentage: 87.9,
        average_shots: 14.8,
        performance_index: 7.2,
      },
      squad: [
        {
          player_id: 201,
          name: "Agustín Rossi",
          position: PlayerPosition.Goalkeeper,
          shirt_number: 1,
          nationality: "Argentina",
          photo: "https://example.com/photos/rossi.jpg",
        },
        {
          player_id: 202,
          name: "Léo Ortiz",
          position: PlayerPosition.Defender,
          shirt_number: 3,
          nationality: "Brazil",
          photo: "https://example.com/photos/leo_ortiz.jpg",
        },
        {
          player_id: 203,
          name: "Emerson Royal",
          position: PlayerPosition.Defender,
          shirt_number: 22,
          nationality: "Brazil",
          photo: "https://example.com/photos/emerson_royal.jpg",
        },
        {
          player_id: 204,
          name: "Saúl Ñíguez",
          position: PlayerPosition.Midfielder,
          shirt_number: 8,
          nationality: "Spain",
          photo: "https://example.com/photos/saul_niguez.jpg",
        },
        {
          player_id: 205,
          name: "Giorgian de Arrascaeta",
          position: PlayerPosition.Midfielder,
          shirt_number: 10,
          nationality: "Uruguay",
          photo: "https://example.com/photos/arrascaeta.jpg",
        },
        {
          player_id: 206,
          name: "Samuel Lino",
          position: PlayerPosition.Midfielder,
          shirt_number: 16,
          nationality: "Brazil",
          photo: "https://example.com/photos/samuel_lino.jpg",
        },
        {
          player_id: 207,
          name: "Pedro",
          position: PlayerPosition.Forward,
          shirt_number: 9,
          nationality: "Brazil",
          photo: "https://example.com/photos/pedro.jpg",
        },
        {
          player_id: 208,
          name: "Gonzalo Plata",
          position: PlayerPosition.Forward,
          shirt_number: 50,
          nationality: "Ecuador",
          photo: "https://example.com/photos/gonzalo_plata.jpg",
        },
        {
          player_id: 209,
          name: "Bruno Henrique",
          position: PlayerPosition.Forward,
          shirt_number: 27,
          nationality: "Brazil",
          photo: "https://example.com/photos/bruno_henrique.jpg",
        },
      ],
      recent_matches: [
        {
          match_id: 9101,
          kickoff_time: "2025-12-17T20:00:00Z",
          opponent: "Paris Saint-Germain",
          home_away: "away",
          score: "1-1 (P)",
          competition: "FIFA Intercontinental Cup",
        },
        {
          match_id: 9102,
          kickoff_time: "2025-12-13T20:00:00Z",
          opponent: "Pyramids FC",
          home_away: "home",
          score: "3-1",
          competition: "FIFA Challenger Cup",
        },
        {
          match_id: 9103,
          kickoff_time: "2025-12-07T19:00:00Z",
          opponent: "Ceará",
          home_away: "home",
          score: "1-0",
          competition: "Série A",
        },
      ],
      upcoming_matches: [
        {
          match_id: 9201,
          kickoff_time: "2026-01-15T18:00:00Z",
          opponent: "Bangu",
          home_away: "away",
          score: null,
          competition: "Campeonato Carioca",
        },
        {
          match_id: 9202,
          kickoff_time: "2026-01-18T18:00:00Z",
          opponent: "Volta Redonda",
          home_away: "away",
          score: null,
          competition: "Campeonato Carioca",
        },
        {
          match_id: 9203,
          kickoff_time: "2026-01-22T21:00:00Z",
          opponent: "Vasco da Gama",
          home_away: "home",
          score: null,
          competition: "Campeonato Carioca",
        },
        {
          match_id: 9204,
          kickoff_time: "2026-01-28T21:00:00Z",
          opponent: "São Paulo",
          home_away: "away",
          score: null,
          competition: "Série A",
        },
      ],
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
    const team = this.teams.find((t) => t.id == teamId) ?? this.teams[0];
    if (!team) return null;

    const base: TeamBase = {
      id: team.id,
      name: team.name,
      logo: team.logo,
      country: team.country,
      country_flag: getFlagUrlByName(team.country),
      founded: team.founded,
      stadium: team.stadium,
      league: team.league,
    };
    ``;
    switch (view) {
      case TeamDetailView.MATCHES:
        return {
          ...base,
          matches: {
            recent: team.recent_matches,
            upcoming: team.upcoming_matches,
          },
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