import {
  DATE_RANGES,
  FIXTURE_STATE_MAP,
  formatDate,
  normalizeFixtureStatus,
  SportMonksClient,
  SportMonksFixture,
  SportMonksResponse,
} from "@/integrations/sportmonks";
import {
  mapFixtureToListItem,
  mapMatchEvents,
  mapMatchLineups,
  mapMatchStats,
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

  const getMatches = async ({ tab, page, limit, q }: MatchListFilters) => {
    const range = DATE_RANGES[tab];

    const now = new Date();
    const fromDate = new Date(now);
    fromDate.setDate(now.getDate() + range.from);

    const toDate = new Date(now);
    toDate.setDate(now.getDate() + range.to);

    const from = formatDate(fromDate);
    const to = formatDate(toDate);

    const res = await client.get<SportMonksResponse<SportMonksFixture[]>>(
      `/football/fixtures/between/${from}/${to}`,
      {
        include: "participants;league;season;scores;state",
        filters: `fixtureStates:${FIXTURE_STATE_MAP[tab].join(",")}`,
        page,
        per_page: limit,
      }
    );

    const fixtures = res.data ?? [];

    const mapped = fixtures.flatMap((f) =>
      mapFixtureToListItem(f, normalizeFixtureStatus(f.state_id))
    );

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

    return {
      tab,
      data: searched,
      pagination: {
        page,
        limit,
        has_next: res.pagination?.has_more ?? false,
      },
    };
  };

  const getMatchById = async (
    matchId: number
  ): Promise<MatchListItem | null> => {
    const res = await client.get<SportMonksResponse<SportMonksFixture>>(
      `/football/fixtures/${matchId}`,
      {
        include: "participants;league;season;scores;state;venue;venue.country",
      }
    );

    if (!res?.data) return null;

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
    const res = await client.get<SportMonksResponse<SportMonksFixture>>(
      `/football/fixtures/${matchId}`,
      { include: "events;participants" }
    );

    if (!res?.data) return null;

    return mapMatchEvents(matchId, res.data);
  };

  const getMatchStats = async (
    matchId: number
  ): Promise<MatchStatsResponse | null> => {
    const res = await client.get<SportMonksResponse<SportMonksFixture>>(
      `/football/fixtures/${matchId}`,
      { include: "statistics;participants" }
    );

    if (!res?.data) return null;

    return mapMatchStats(matchId, res.data);
  };

  const getMatchLineups = async (
    matchId: number
  ): Promise<MatchLineupsResponse | null> => {
    const res = await client.get<SportMonksResponse<SportMonksFixture>>(
      `/football/fixtures/${matchId}`,
      { include: "lineups;participants" }
    );

    if (!res?.data) return null;

    return mapMatchLineups(matchId, res.data);
  };

  const getPredictableMatches = async (page: number, limit: number) => {
    const now = new Date();
    const from = formatDate(now);

    const toDate = new Date(now);
    toDate.setDate(now.getDate() + 21);
    const to = formatDate(toDate);

    const res = await client.get<SportMonksResponse<SportMonksFixture[]>>(
      `/football/fixtures/between/${from}/${to}`,
      {
        include: "participants;league;season;scores;state",
        page,
        per_page: limit,
      }
    );

    const mapped = (res.data ?? []).flatMap((f) =>
      mapFixtureToListItem(f, normalizeFixtureStatus(f.state_id))
    );

    return {
      data: mapped,
      pagination: {
        page,
        limit,
        has_next: res.pagination?.has_more ?? false,
      },
    };
  };

  return {
    getMatches,
    getMatchById,
    getMatchStats,
    getMatchLineups,
    getMatchEvents,
    getPredictableMatches,
  };
};
