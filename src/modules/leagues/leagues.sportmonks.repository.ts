import {
  SportMonksClient,
  SportMonksFixture,
  SportMonksResponse,
  SportMonksStanding,
  SportMonksTopScorer,
  formatDate,
} from "@/integrations/sportmonks";
import { getLeagueProfileFromDb } from "./leagues.db.repository";
import { LeaguesRepository } from "./leagues.repository";
import { resolveLeagueContext } from "./leagues.season.cache";
import {
  LeagueMatchesResponse,
  LeagueProfileResponse,
  LeagueStandingsResponse,
  LeagueStatisticsResponse,
  TopScorersResponse,
} from "./leagues.types";
import {
  mapLeagueFixtureMatch,
  mapSeasonStatistics,
  mapStandingsTable,
  mapTopScorers,
} from "./mapper";

export const LeaguesSportMonksRepository = (
  baseRepo: Pick<LeaguesRepository, "getLeagues" | "getLeagueProfile">
): LeaguesRepository => {
  const getLeagues = baseRepo.getLeagues;

  const getLeagueProfile = async (
    leagueId: number
  ): Promise<LeagueProfileResponse | null> => {
    const base = await getLeagueProfileFromDb(leagueId);
    if (!base) return null;

    const client = new SportMonksClient();
    const context = await resolveLeagueContext(leagueId, client);
    if (!context) return null;

    return {
      id: base.id,
      name: base.name,
      logo: base.logo,
      competition_type: context.league.competition_type,
      country: base.country,
      current_season: context.season,
    };
  };

  const getLeagueStandings = async (
    leagueId: number
  ): Promise<LeagueStandingsResponse | null> => {
    const client = new SportMonksClient();
    const context = await resolveLeagueContext(leagueId, client);
    if (!context?.season) return null;

    const res = await client.get<SportMonksResponse<SportMonksStanding[]>>(
      `/football/standings/seasons/${context.season.id}`,
      { include: "participant;form;details" }
    );

    return {
      league: {
        id: context.league.id,
        name: context.league.name,
        country: context.league.country.name,
      },
      season: context.season,
      table: mapStandingsTable(res.data),
    };
  };

  const getLeagueStatistics = async (
    leagueId: number
  ): Promise<LeagueStatisticsResponse | null> => {
    const client = new SportMonksClient();
    const context = await resolveLeagueContext(leagueId, client);
    if (!context?.season) return null;

    const res = await client.get<
      SportMonksResponse<{ statistics?: { type_id: number; value: any }[] }>
    >(`/football/seasons/${context.season.id}`, {
      include: "statistics",
    });

    return {
      league: context.league,
      seasons: [mapSeasonStatistics(context.season, res.data.statistics ?? [])],
    };
  };

  const getLeagueMatches = async (
    leagueId: number,
    status?: "LIVE" | "UPCOMING" | "FT"
  ): Promise<LeagueMatchesResponse | null> => {
    const client = new SportMonksClient();
    const context = await resolveLeagueContext(leagueId, client);
    if (!context) return null;

    const now = new Date();
    const from = new Date(now);
    from.setDate(now.getDate() - 10);

    const to = new Date(now);
    to.setDate(now.getDate() + 10);

    const res = await client.get<SportMonksResponse<SportMonksFixture[]>>(
      `/football/fixtures/between/${formatDate(from)}/${formatDate(to)}`,
      {
        include: "participants;league;scores",
        params: {
          "filter[league_id]": leagueId,
          order: "asc",
        },
      }
    );

    const matches = (res.data ?? [])
      .map(mapLeagueFixtureMatch)
      .filter(Boolean)
      .filter((m) => (status ? m.status === status : true));

    return {
      league: context.league,
      season: context.season,
      matches,
    };
  };

  const getTopScorers = async (
    leagueId: number
  ): Promise<TopScorersResponse | null> => {
    const client = new SportMonksClient();
    const context = await resolveLeagueContext(leagueId, client);
    if (!context?.season) return null;

    const res = await client.get<SportMonksResponse<SportMonksTopScorer[]>>(
      `/football/topscorers/seasons/${context.season.id}`,
      { include: "player;participant;type" }
    );

    const mapped = mapTopScorers(res.data);

    return {
      league: context.league,
      season: context.season,
      schema: {
        tables: mapped.schema,
        order: mapped.order,
      },
      tables: mapped.tables,
    };
  };

  return {
    getLeagues,
    getLeagueProfile,
    getLeagueStandings,
    getLeagueStatistics,
    getLeagueMatches,
    getTopScorers,
  };
};
