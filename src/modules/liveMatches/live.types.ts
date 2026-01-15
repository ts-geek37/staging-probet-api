export interface LiveMatchItem {
  id: number;

  league: {
    id: number;
    name: string;
    logo: string | null;
  };

  teams: {
    home: {
      id: number;
      name: string;
      logo: string | null;
    };
    away: {
      id: number;
      name: string;
      logo: string | null;
    };
  };

  scores: {
    home: number | null;
    away: number | null;
  };

  state: {
    id: number;
    name: string;
    short: string;
  };

  minute: number | null;
  startedAt: string | null;
}

export interface LiveCache {
  updatedAt: number;
  data: LiveMatchItem[];
}
 

export interface LiveMatchListItem {
  id: number;
  league: {
    id: number;
    name: string;
    logo: string | null;
  };
  teams: {
    home: { id: number; name: string; logo: string | null };
    away: { id: number; name: string; logo: string | null };
  };
  score: {
    home: number;
    away: number;
  };
  minute: number | null;
  state: string;
}
