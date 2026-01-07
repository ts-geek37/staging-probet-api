import {
  SportMonksClient,
  SportMonksLeague,
  SportMonksResponse,
  SportMonksSeason,
  SportMonksStanding,
  normalizeCompetitionType,
} from "@/integrations/sportmonks";
import { resolveCurrentSeason } from "./leagues.season.cache";
import {
  LeagueMatchesResponse,
  LeagueProfileResponse,
  LeagueStandingsResponse,
  LeagueStatisticsResponse,
} from "./leagues.types";
import { getLeagueProfileFromDb } from "./leagues.db.repository";
import { LeaguesRepository } from "./leagues.repository";
import {
  mapSeasonMatches,
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

    const seasonsRes = await client.get<
      SportMonksResponse<{ id: number; name: string }[]>
    >(`/football/seasons`, {
      filters: `league:${leagueId}`,
      order: "desc",
      per_page: 3,
    });

    const seasons = seasonsRes.data ?? [];
    if (seasons.length === 0) return null;

    const seasonStats = [];

    for (const season of seasons) {
      const res = await client.get<
        SportMonksResponse<{ statistics?: { type_id: number; value: any }[] }>
      >(`/football/seasons/${season.id}`, { include: "statistics" });

      seasonStats.push(mapSeasonStatistics(season, res.data.statistics ?? []));
    }

    return {
      league: {
        id: header.id,
        name: header.name,
      },
      seasons: seasonStats,
    };
  };

  const getLeagueMatches = async (
    leagueId: number,
    status?: "LIVE" | "UPCOMING" | "FT"
  ): Promise<LeagueMatchesResponse | null> => {
    const header = await getLeagueProfileFromDb(leagueId);
    if (!header) return null;

    const client = new SportMonksClient();
    const season = await resolveCurrentSeason(leagueId, client);
    if (!season) return null;

    const res = await client.get<SportMonksResponse<SportMonksSeason>>(
      `/football/seasons/${season.id}`,
      { include: "fixtures.participants;fixtures.scores" }
    );

    return {
      league: {
        id: header.id,
        name: header.name,
      },
      season: {
        id: season.id,
        name: season.name,
      },
      matches: mapSeasonMatches(res.data.fixtures ?? [], status),
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
