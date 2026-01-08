import { LeagueCard } from "../leagues/migration/leagues.types";
import { MatchListItem } from "../matches/migration/matches.types";
import { TeamCard } from "../teams/migration/teams.types";
import { HomeRepository } from "./home.repository";
import { HomeResponse } from "./home.types";

const leagues: LeagueCard[] = [
  {
    id: 100,
    name: "Premier League",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
    competition_type: "league",
    country: {
      name: "England",
      code: "ENG",
      flag: "https://flagcdn.com/w320/gb.png",
    },
  },
  {
    id: 101,
    name: "La Liga",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/75/LaLiga_Santander.svg",
    competition_type: "league",
    country: {
      name: "Spain",
      code: "ESP",
      flag: "https://flagcdn.com/w320/es.png",
    },
  },
  {
    id: 102,
    name: "Serie A",
    logo: "https://upload.wikimedia.org/wikipedia/en/e/e1/Serie_A_logo_%282019%29.svg",
    competition_type: "league",
    country: {
      name: "Italy",
      code: "ITA",
      flag: "https://flagcdn.com/w320/it.png",
    },
  },
  {
    id: 103,
    name: "Bundesliga",
    logo: "https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg",
    competition_type: "league",
    country: {
      name: "Germany",
      code: "GER",
      flag: "https://flagcdn.com/w320/de.png",
    },
  },
  {
    id: 104,
    name: "Ligue 1",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/c7/Ligue1.svg",
    competition_type: "league",
    country: {
      name: "France",
      code: "FRA",
      flag: "https://flagcdn.com/w320/fr.png",
    },
  },
];

/* ----------------------------------
   TEAMS
---------------------------------- */

const teams: TeamCard[] = [
  {
    id: 1,
    name: "Manchester United",
    short_code: "MUN",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    country: {
      name: "England",
      code: "ENG",
      flag: "https://flagcdn.com/w320/gb.png",
    },
    founded: 1878,
    stadium: { name: "Old Trafford", capacity: 74879 },
  },
  {
    id: 2,
    name: "Liverpool",
    short_code: "LIV",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    country: {
      name: "England",
      code: "ENG",
      flag: "https://flagcdn.com/w320/gb.png",
    },
    founded: 1892,
    stadium: { name: "Anfield", capacity: 54074 },
  },
  {
    id: 3,
    name: "Arsenal",
    short_code: "ARS",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    country: {
      name: "England",
      code: "ENG",
      flag: "https://flagcdn.com/w320/gb.png",
    },
    founded: 1886,
    stadium: { name: "Emirates Stadium", capacity: 60704 },
  },
  {
    id: 4,
    name: "Manchester City",
    short_code: "MCI",
    logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    country: {
      name: "England",
      code: "ENG",
      flag: "https://flagcdn.com/w320/gb.png",
    },
    founded: 1880,
    stadium: { name: "Etihad Stadium", capacity: 53400 },
  },
  {
    id: 7,
    name: "Real Madrid",
    short_code: "RMA",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    country: {
      name: "Spain",
      code: "ESP",
      flag: "https://flagcdn.com/w320/es.png",
    },
    founded: 1902,
    stadium: { name: "Santiago Bernabéu", capacity: 81044 },
  },
  {
    id: 8,
    name: "Barcelona",
    short_code: "FCB",
    logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    country: {
      name: "Spain",
      code: "ESP",
      flag: "https://flagcdn.com/w320/es.png",
    },
    founded: 1899,
    stadium: { name: "Camp Nou", capacity: 99354 },
  },
  {
    id: 9,
    name: "Bayern Munich",
    short_code: "FCB",
    logo: "https://upload.wikimedia.org/wikipedia/en/1/1f/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg",
    country: {
      name: "Germany",
      code: "GER",
      flag: "https://flagcdn.com/w320/de.png",
    },
    founded: 1900,
    stadium: { name: "Allianz Arena", capacity: 75000 },
  },
  {
    id: 10,
    name: "Paris Saint-Germain",
    short_code: "PSG",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg",
    country: {
      name: "France",
      code: "FRA",
      flag: "https://flagcdn.com/w320/fr.png",
    },
    founded: 1970,
    stadium: { name: "Parc des Princes", capacity: 47929 },
  },
];

const matches: MatchListItem[] = [
  {
    id: 6001,
    kickoff_time: "2026-01-07T18:00:00Z",
    status: "LIVE",
    league: { id: 100, name: "Premier League", logo: leagues[0].logo },
    teams: {
      home: { id: 1, name: "Manchester United", logo: teams[0].logo },
      away: { id: 2, name: "Liverpool", logo: teams[1].logo },
    },
    score: { home: 2, away: 1 },
  },
  {
    id: 6002,
    kickoff_time: "2026-01-07T20:30:00Z",
    status: "LIVE",
    league: { id: 101, name: "La Liga", logo: leagues[1].logo },
    teams: {
      home: { id: 7, name: "Real Madrid", logo: teams[4].logo },
      away: { id: 8, name: "Barcelona", logo: teams[5].logo },
    },
    score: { home: 1, away: 1 },
  },
  {
    id: 6003,
    kickoff_time: "2026-01-08T18:00:00Z",
    status: "UPCOMING",
    league: { id: 102, name: "Serie A", logo: leagues[2].logo },
    teams: {
      home: { id: 4, name: "Manchester City", logo: teams[3].logo },
      away: { id: 3, name: "Arsenal", logo: teams[2].logo },
    },
  },
  {
    id: 6004,
    kickoff_time: "2026-01-08T20:00:00Z",
    status: "UPCOMING",
    league: { id: 103, name: "Bundesliga", logo: leagues[3].logo },
    teams: {
      home: { id: 9, name: "Bayern Munich", logo: teams[6].logo },
      away: { id: 10, name: "Paris Saint-Germain", logo: teams[7].logo },
    },
  },
  {
    id: 6005,
    kickoff_time: "2026-01-06T19:00:00Z",
    status: "FT",
    league: { id: 104, name: "Ligue 1", logo: leagues[4].logo },
    teams: {
      home: { id: 10, name: "Paris Saint-Germain", logo: teams[7].logo },
      away: { id: 9, name: "Bayern Munich", logo: teams[6].logo },
    },
    score: { home: 3, away: 2 },
  },
];

export const mockHomeResponse: HomeResponse = {
  featured_match: matches[0],

  sections: {
    live_now: matches.filter((m) => m.status === "LIVE"),
    starting_soon: matches.filter((m) => m.status === "UPCOMING"),
    recently_finished: matches.filter((m) => m.status === "FT"),
  },

  top_leagues: leagues,

  popular_teams: teams,

  news: [
    {
      id: "n1",
      title: "United edge Liverpool in instant classic",
      excerpt:
        "A high-intensity clash at Old Trafford sees United hold on for a vital win.",
      image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d",
      category: "Match Report",
      published_at: "2026-01-07T19:10:00Z",
    },
    {
      id: "n2",
      title: "El Clásico delivers drama again",
      excerpt:
        "Real Madrid and Barcelona share the spoils in a thrilling draw.",
      image: "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253",
      category: "La Liga",
      published_at: "2026-01-07T21:15:00Z",
    },
    {
      id: "n3",
      title: "Bundesliga giants prepare for European showdown",
      excerpt: "Bayern Munich face PSG in a highly anticipated clash.",
      image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6",
      category: "Preview",
      published_at: "2026-01-08T08:30:00Z",
    },
  ],

  meta: {
    updated_at: new Date().toISOString(),
    fixtures_window: {
      from: "2026-01-01T00:00:00Z",
      to: "2026-01-31T23:59:59Z",
    },
  },
};

export const mockHomeRepository: HomeRepository = {
  async getHomeData(): Promise<HomeResponse> {
    return mockHomeResponse;
  },
};
