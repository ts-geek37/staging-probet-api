export interface SportMonksFixture {
  id: number;
  starting_at: string;
  state: {
    short_name: string;
  };
  time: {
    minute: number | null;
  };
  participants: SportMonksParticipant[];
  league: SportMonksLeague;
  scores?: {
    home: number;
    away: number;
  };
}

export interface SportMonksParticipant {
  id: number;
  name: string;
  image_path: string;
  meta: {
    location: 'home' | 'away';
  };
}

export interface SportMonksLeague {
  id: number;
  name: string;
  image_path: string;
  country?: {
    name: string;
  };
}

export interface SportMonksStanding {
  position: number;
  points: number;
  played: number;
  participant: {
    id: number;
    name: string;
    image_path: string;
  };
}

export interface SportMonksSeasonStandings {
  league: {
    id: number;
    name: string;
    country: {
      name: string;
    };
  };
  season: {
    name: string;
  };
  standings: SportMonksStanding[];
}
