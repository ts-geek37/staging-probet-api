import {
  SportMonksClient,
  SportMonksFixture,
  SportMonksLeague,
  SportMonksResponse,
  SportMonksStanding,
  formatDate,
  normalizeCompetitionType,
} from "@/integrations/sportmonks";
import { getLeagueProfileFromDb } from "./leagues.db.repository";
import { LeaguesRepository } from "./leagues.repository";
import { resolveCurrentSeason } from "./leagues.season.cache";
import {
  LeagueMatchesResponse,
  LeagueProfileResponse,
  LeagueStandingsResponse,
  LeagueStatisticsResponse,
} from "./leagues.types";
import {
  mapLeagueFixtureMatch,
  mapSeasonStatistics,
  mapStandingsTable,
} from "./mapper";

export const LeaguesSportMonksRepository = (baseRepo: {
  getLeagues: LeaguesRepository["getLeagues"];
  getLeagueProfile: LeaguesRepository["getLeagueProfile"];
}): LeaguesRepository => {
  const getLeagues = baseRepo.getLeagues;

  const getLeagueProfile = async (
    leagueId: number
  ): Promise<LeagueProfileResponse | null> => {
    const base = await getLeagueProfileFromDb(leagueId);
    if (!base) return null;

    const client = new SportMonksClient();
    const season = await resolveCurrentSeason(leagueId, client);

    const leagueRes = await client.get<SportMonksResponse<SportMonksLeague>>(
      `/football/leagues/${leagueId}`
    );

    return {
      id: base.id,
      name: base.name,
      logo: base.logo,
      competition_type: normalizeCompetitionType(leagueRes.data.type),
      country: base.country,
      current_season: season,
    };
  };

  const getLeagueStandings = async (
    leagueId: number
  ): Promise<LeagueStandingsResponse | null> => {
    const header = await getLeagueProfileFromDb(leagueId);
    if (!header) return null;

    const client = new SportMonksClient();
    const season = await resolveCurrentSeason(leagueId, client);
    if (!season) return null;

    const res = await client.get<SportMonksResponse<SportMonksStanding[]>>(
      `/football/standings/seasons/${season.id}`,
      { include: "participant;form" }
    );

    return {
      league: {
        id: header.id,
        name: header.name,
        country: header.country.name,
      },
      season: {
        id: season.id,
        name: season.name,
      },
      table: mapStandingsTable(res.data),
    };
  };

  const getLeagueStatistics = async (
    leagueId: number
  ): Promise<LeagueStatisticsResponse | null> => {
    const header = await getLeagueProfileFromDb(leagueId);
    if (!header) return null;

    const client = new SportMonksClient();

    const season = await resolveCurrentSeason(leagueId, client);
    if (!season) return null;

    const res = await client.get<
      SportMonksResponse<{ statistics?: { type_id: number; value: any }[] }>
    >(`/football/seasons/${season.id}`, {
      include: "statistics",
    });

    return {
      league: {
        id: header.id,
        name: header.name,
      },
      seasons: [mapSeasonStatistics(season, res.data.statistics ?? [])],
    };
  };

  const getLeagueMatches = async (
    leagueId: number,
    status?: "LIVE" | "UPCOMING" | "FT"
  ): Promise<LeagueMatchesResponse | null> => {
    const header = await getLeagueProfileFromDb(leagueId);
    if (!header) return null;

    const client = new SportMonksClient();

    const now = new Date();

    const from = new Date(now);
    from.setDate(now.getDate() - 30);

    const to = new Date(now);
    to.setDate(now.getDate() + 30);

    const res = await client.get<SportMonksResponse<SportMonksFixture[]>>(
      `/football/fixtures/between/${formatDate(from)}/${formatDate(to)}`,
      {
        include: "participants;league;scores;state",
        params: {
          "filter[league_id]": leagueId,
          order: "asc",
        },
      }
    );

    const matches = (res.data ?? [])
      .map((f) => mapLeagueFixtureMatch(f))
      .filter(Boolean)
      .filter((m) => {
        if (!status) return true;
        return m.status === status;
      });

    return {
      league: {
        id: header.id,
        name: header.name,
      },
      season: null,
      matches,
    };
  };

  return {
    getLeagues,
    getLeagueProfile,
    getLeagueStandings,
    getLeagueStatistics,
    getLeagueMatches,
  };
};
