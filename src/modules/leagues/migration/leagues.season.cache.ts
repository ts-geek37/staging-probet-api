import { SportMonksLeague } from "../../../integrations/sportmonks/entities";
import { SportMonksClient } from "../../../integrations/sportmonks/sportmonks.client";
import { SportMonksResponse } from "../../../integrations/sportmonks/sportmonks.types";
import { CurrentSeason } from "./leagues.types";

const CACHE_TTL = 60 * 60 * 1000;

const seasonCache = new Map<
  number,
  { value: CurrentSeason | null; expires: number }
>();

export const getCachedSeason = (leagueId: number) => {
  const entry = seasonCache.get(leagueId);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    seasonCache.delete(leagueId);
    return null;
  }
  return entry.value;
};

export const setCachedSeason = (
  leagueId: number,
  season: CurrentSeason | null
) => {
  seasonCache.set(leagueId, {
    value: season,
    expires: Date.now() + CACHE_TTL,
  });
};

export const resolveCurrentSeason = async (
  leagueId: number,
  client: SportMonksClient
): Promise<CurrentSeason | null> => {
  const cached = getCachedSeason(leagueId);
  if (cached) return cached;

  const res = await client.get<SportMonksResponse<SportMonksLeague>>(
    `/football/leagues/${leagueId}`,
    { include: "seasons" }
  );

  const seasons = res.data.seasons ?? [];

  const season =
    seasons.find((s) => s.is_current) ??
    seasons
      .filter((s) => s.ending_at)
      .sort(
        (a, b) =>
          new Date(b.ending_at!).getTime() - new Date(a.ending_at!).getTime()
      )[0] ??
    null;

  const normalized = season
    ? {
        id: 19735,
        name: season.name,
        starting_at: season.starting_at,
        ending_at: season.ending_at,
      }
    : null;

  setCachedSeason(leagueId, normalized);

  return normalized;
};
