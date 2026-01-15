import {
  DATE_RANGES,
  FIXTURE_STATE_MAP,
  formatDate,
  normalizeFixtureStatus,
  SportMonksClient,
  SportMonksFixture,
  SportMonksFixtureComment,
  SportMonksResponse,
} from "../../integrations/sportmonks";
import {
  mapFixtureToListItem,
  mapMatchEvents,
  mapMatchLineups,
  mapMatchStats,
  mapTeamSeasonStats,
} from "./mappers";
import { MatchesRepository } from "./matches.repository";
import {
  MatchEventsResponse,
  MatchLineupsResponse,
  MatchListFilters,
  MatchListItem,
  MatchStatsResponse,
} from "./matches.types";

export const MatchesSportMonksRepository = (): MatchesRepository => {
  const client = new SportMonksClient();

  const getDateRange = (fromOffset: number, toOffset: number) => {
    const now = new Date();

    const fromDate = new Date(now);
    fromDate.setDate(now.getDate() + fromOffset);

    const toDate = new Date(now);
    toDate.setDate(now.getDate() + toOffset);

    return {
      from: formatDate(fromDate),
      to: formatDate(toDate),
    };
  };

  const mapFixtures = (fixtures: SportMonksFixture[] = []) =>
    fixtures.flatMap((f) =>
      mapFixtureToListItem(f, normalizeFixtureStatus(f.state_id))
    );

  const getFixtureList = async (path: string, params: Record<string, any>) =>
    client.get<SportMonksResponse<SportMonksFixture[]>>(path, params);

  const getSingleFixture = async (matchId: number, include: string) =>
    client.get<SportMonksResponse<SportMonksFixture>>(
      `/football/fixtures/${matchId}`,
      { include }
    );

  const getMatches = async ({ tab, page, limit, q }: MatchListFilters) => {
    const range = DATE_RANGES[tab];
    const { from, to } = getDateRange(range.from, range.to);

    const res = await getFixtureList(
      `/football/fixtures/between/${from}/${to}`,
      {
        include: "participants;league;season;scores;state",
        filters: `fixtureStates:${FIXTURE_STATE_MAP[tab].join(",")}`,
        page,
        per_page: limit,
      }
    );

    const mapped = mapFixtures(res.data);

    const searched = q
      ? mapped.filter((m) => {
          const qq = q.toLowerCase();
          return (
            m.league.name.toLowerCase().includes(qq) ||
            m.teams.home.name.toLowerCase().includes(qq) ||
            m.teams.away.name.toLowerCase().includes(qq)
          );
        })
      : mapped;

    const count = res.pagination?.count ?? searched.length;
    const perPage = res.pagination?.per_page ?? limit;

    return {
      tab,
      data: searched,
      pagination: {
        page: res.pagination?.current_page ?? page,
        limit: perPage,
        count,
        total_pages: Math.ceil(count / perPage),
      },
    };
  };

  const getMatchById = async (
    matchId: number
  ): Promise<MatchListItem | null> => {
    const res = await getSingleFixture(
      matchId,
      "participants;league;season;scores;state;venue;venue.country"
    );

    if (!res.data) return null;

    return (
      mapFixtureToListItem(
        res.data,
        normalizeFixtureStatus(res.data.state_id),
        true
      )[0] ?? null
    );
  };

  const getMatchEvents = async (
    matchId: number
  ): Promise<MatchEventsResponse | null> => {
    const res = await getSingleFixture(matchId, "events;participants");
    return res.data ? mapMatchEvents(matchId, res.data) : null;
  };

  const getMatchStats = async (
    matchId: number
  ): Promise<MatchStatsResponse | null> => {
    const res = await getSingleFixture(matchId, "statistics;participants");
    return res.data ? mapMatchStats(matchId, res.data) : null;
  };

  const getMatchLineups = async (
    matchId: number
  ): Promise<MatchLineupsResponse | null> => {
    const res = await getSingleFixture(matchId, "lineups;participants");
    return res.data ? mapMatchLineups(matchId, res.data) : null;
  };

  const getPredictableMatches = async (page: number, limit: number) => {
    const { from, to } = getDateRange(0, 21);

    const res = await getFixtureList(
      `/football/fixtures/between/${from}/${to}`,
      {
        include: "participants;league;season;scores;state",
        page,
        per_page: limit,
      }
    );

    const mapped = mapFixtures(res.data);

    return {
      data: mapped,
      pagination: {
        page,
        limit,
        count: mapped.length,
        total_pages: Math.ceil(mapped.length / limit),
      },
    };
  };

  const getHeadToHeadMatches = async ({
    team1,
    team2,
  }: {
    team1: number;
    team2: number;
  }) => {
    const res = await getFixtureList(
      `/football/fixtures/head-to-head/${team1}/${team2}`,
      {
        include: "participants;league;season;scores;state",
      }
    );

    return {
      matches: mapFixtures(res.data),
    };
  };

  const getMatchComments = async (
    matchId: number
  ): Promise<SportMonksFixtureComment[] | null> => {
    const res = await getSingleFixture(matchId, "comments");

    if (!res.data?.comments) return null;

    return [...res.data.comments].sort((a, b) => a.order - b.order);
  };

  const getTeamStats = async (matchId: number, seasonId: number) => {
    const res = await client.get<SportMonksResponse<SportMonksFixture>>(
      `/football/fixtures/${matchId}`,
      {
        include: "participants.statistics.details",
        filters: `seasonstatisticSeasons=${seasonId}`,
      }
    );

    return mapTeamSeasonStats(res.data?.participants ?? [], seasonId);
  };

  return {
    getMatches,
    getMatchById,
    getMatchStats,
    getMatchLineups,
    getMatchEvents,
    getPredictableMatches,
    getHeadToHeadMatches,
    getMatchComments,
    getTeamStats,
  };
};
