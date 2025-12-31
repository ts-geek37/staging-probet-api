export interface HomeResponse {
  live_matches: LiveMatch[];
  upcoming_matches: UpcomingMatch[];
  top_leagues: LeagueSummary[];
  league_standings: LeagueStandings | null; 
  latest_news: NewsSummary[];
}

export interface LiveMatch {
  id: number;
  status: "LIVE";
  minute: number;

  home_team: TeamWithScore;
  away_team: TeamWithScore;

  league: LeagueRef;
}

export interface UpcomingMatch {
  id: number;
  kickoff_time: string;
  date: string;

  home_team: TeamRef;
  away_team: TeamRef;

  league: LeagueRef;
}

export interface TeamRef {
  id: number;
  name: string;
  logo: string;
}

export interface TeamWithScore extends TeamRef {
  score: number;
}

export interface LeagueRef {
  id: number;
  name: string;
  logo?: string;
}

export interface LeagueSummary {
  id: number;
  name: string;
  country: string;
  logo: string;
}

export interface LeagueStandings {
  league: {
    id: number;
    name: string;
    country: string;
  };
  season: string;
  table: Array<{
    position: number;
    team: TeamRef;
    played: number;
    points: number;
  }>;
}

export interface VipSection {
  enabled: boolean;
  teaser: string;
  stats: {
    daily_predictions: number;
    leagues_covered: number;
  };
}

export interface NewsSummary {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  published_at: string;
}
