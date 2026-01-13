import { normalizeCompetitionType } from "@/integrations/sportmonks";
import { SportMonksLeague } from "@/integrations/sportmonks/entities";
import { SportMonksClient } from "@/integrations/sportmonks/sportmonks.client";
import { SportMonksResponse } from "@/integrations/sportmonks/sportmonks.types";
import { CachedLeagueContext } from "./leagues.types";

const CACHE_TTL = 60 * 60 * 1000; // 1 hour

const leagueContextCache = new Map<
  number,
  { value: CachedLeagueContext | null; expires: number }
>();

const getCachedLeagueContext = (
  leagueId: number
): CachedLeagueContext | null | undefined => {
  const entry = leagueContextCache.get(leagueId);

  if (!entry) return undefined;

  if (Date.now() > entry.expires) {
    leagueContextCache.delete(leagueId);
    return undefined;
  }

  return entry.value;
};

const setCachedLeagueContext = (
  leagueId: number,
  value: CachedLeagueContext | null
) => {
  leagueContextCache.set(leagueId, {
    value,
    expires: Date.now() + CACHE_TTL,
  });
};

const resolveLeagueContext = async (
  leagueId: number,
  client: SportMonksClient
): Promise<CachedLeagueContext | null> => {
  const cached = getCachedLeagueContext(leagueId);
  if (cached !== undefined) return cached;

  const res = await client.get<SportMonksResponse<SportMonksLeague>>(
    `/football/leagues/${leagueId}`,
    {
      include:
        "currentSeason;currentSeason.currentStage;country;currentSeason.stages",
    }
  );

  const league = res.data;
  if (!league) {
    setCachedLeagueContext(leagueId, null);
    return null;
  }

  const context: CachedLeagueContext = {
    league: {
      id: league.id,
      name: league.name,
      logo: league.image_path ?? null,
      competition_type: normalizeCompetitionType(league.type),
      country: {
        name: league.country?.name ?? "",
        code: league.country?.iso2 ?? null,
        flag: league.country?.image_path ?? null,
      },
    },
    season: league.currentseason
      ? {
          id: league.currentseason.id,
          name: league.currentseason.name,
          starting_at: league.currentseason.starting_at ?? null,
          ending_at: league.currentseason.ending_at ?? null,
          stages: league.currentseason.stages.map((stage) => ({
            id: stage.id,
            name: stage.name,
            starting_at: stage.starting_at ?? null,
            ending_at: stage.ending_at ?? null,
          })),
          stage: league.currentseason.currentstage
            ? {
                id: league.currentseason.currentstage.id,
                name: league.currentseason.currentstage.name,
                starting_at:
                  league.currentseason.currentstage.starting_at ?? null,
                ending_at: league.currentseason.currentstage.ending_at ?? null,
              }
            : null,
        }
      : null,
  };

  setCachedLeagueContext(leagueId, context);
  return context;
};

export { resolveLeagueContext };

