import {
  LeagueStandings,
  LiveMatch,
  TeamRef,
  UpcomingMatch,
} from "../home.types";
import {
  SportMonksFixture,
  SportMonksSeasonStandings,
} from "./home.sportmonks.types";

const getHomeTeam = (participants: any[]) =>
  participants.find((p) => p.meta.location === "home");

const getAwayTeam = (participants: any[]) =>
  participants.find((p) => p.meta.location === "away");

export const mapFixtureToLiveMatch = (
  fixture: SportMonksFixture
): LiveMatch => {
  const home = getHomeTeam(fixture.participants);
  const away = getAwayTeam(fixture.participants);

  return {
    id: fixture.id,
    status: "LIVE",
    minute: fixture.time.minute ?? 0,
    home_team: {
      id: home.id,
      name: home.name,
      logo: home.image_path,
      score: fixture.scores?.home ?? 0,
    },
    away_team: {
      id: away.id,
      name: away.name,
      logo: away.image_path,
      score: fixture.scores?.away ?? 0,
    },
    league: {
      id: fixture.league.id,
      name: fixture.league.name,
      logo: fixture.league.image_path,
    },
  };
};

export const mapFixtureToUpcomingMatch = (
  fixture: SportMonksFixture
): UpcomingMatch => {
  const home = getHomeTeam(fixture.participants);
  const away = getAwayTeam(fixture.participants);

  return {
    id: fixture.id,
    kickoff_time: fixture.starting_at,
    date: fixture.starting_at.split("T")[0],
    home_team: {
      id: home.id,
      name: home.name,
      logo: home.image_path,
    },
    away_team: {
      id: away.id,
      name: away.name,
      logo: away.image_path,
    },
    league: {
      id: fixture.league.id,
      name: fixture.league.name,
    },
  };
};

export const mapSeasonStandings = (
  data: SportMonksSeasonStandings
): LeagueStandings => {
  return {
    league: {
      id: data.league.id,
      name: data.league.name,
      country: data.league.country.name,
    },
    season: data.season.name,
    table: data.standings.map((s) => ({
      position: s.position,
      played: s.played,
      points: s.points,
      team: {
        id: s.participant.id,
        name: s.participant.name,
        logo: s.participant.image_path,
      } as TeamRef,
    })),
  };
};
