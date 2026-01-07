import {
  PLAYER_STAT_EXTRACTORS,
  SportMonksFixture,
  SportMonksPlayer,
  SportMonksPlayerSeasonStatistic,
} from "@/integrations/sportmonks";
import { MatchStatus } from "@/modules/matches/migration/matches.types";
import {
  PlayerProfileResponse,
  PlayerSeasonStatsResponse,
} from "./players.types";

export const formatDate = (d: Date) => d.toISOString().slice(0, 10);

export const mapPlayerProfile = (
  p: SportMonksPlayer
): PlayerProfileResponse => {
  const dob = p.date_of_birth ? new Date(p.date_of_birth) : null;

  const age = dob
    ? new Date().getFullYear() -
      dob.getFullYear() -
      (new Date() < new Date(dob.setFullYear(new Date().getFullYear())) ? 1 : 0)
    : null;

  const team = p.teams?.[0] ?? null;

  return {
    id: p.id,
    name: p.name,
    photo: p.image_path,
    date_of_birth: p.date_of_birth,
    age,
    height: p.height,
    weight: p.weight,
    preferred_foot: p.preferred_foot,
    nationality: p.nationality
      ? {
          id: p.nationality.id,
          name: p.nationality.name,
          flag: p.nationality.image_path,
        }
      : null,
    position: {
      id: p.position?.id ?? null,
      name: p.position?.name ?? null,
    },
    current_team: team
      ? {
          id: team.id,
          name: team.team.name,
          logo: team.team.image_path,
        }
      : null,
  };
};

export const mapPlayerSeasonStats = (
  rows: SportMonksPlayerSeasonStatistic[]
): PlayerSeasonStatsResponse[] =>
  rows
    .filter((row) => row.has_values && row.details?.length)
    .map((row) => {
      const stats: Record<string, number | null> = {};

      for (const d of row.details ?? []) {
        const mapping = PLAYER_STAT_EXTRACTORS[d.type_id];
        if (!mapping) continue;

        const value = mapping.extract(d.value);
        if (value !== null) stats[mapping.key] = value;
      }

      return {
        season: {
          id: row.season_id,
          name: row.season?.name ?? "Unknown",
        },
        team: row.team
          ? {
              id: row.team.id,
              name: row.team.name,
              logo: row.team.image_path ?? null,
            }
          : null,
        jersey_number: row.jersey_number ?? null,
        position: {
          id: row.position_id ?? null,
          name: row.position?.name ?? null,
        },
        stats,
      };
    });

export const mapPlayerMatch = (f: SportMonksFixture, status: MatchStatus) => {
  const home = f.participants.find((p) => p.meta?.location === "home");
  const away = f.participants.find((p) => p.meta?.location === "away");

  if (!home || !away || !f.league) return null;

  return {
    id: f.id,
    kickoff_time: f.starting_at,
    status,
    league: {
      id: f.league.id,
      name: f.league.name,
      logo: f.league.image_path ?? null,
    },
    teams: {
      home: {
        id: home.id,
        name: home.name,
        logo: home.image_path ?? null,
      },
      away: {
        id: away.id,
        name: away.name,
        logo: away.image_path ?? null,
      },
    },
    score:
      status !== "UPCOMING"
        ? {
            home:
              f.scores?.find(
                (s) =>
                  s.participant_id === home.id && s.description === "CURRENT"
              )?.score.goals ?? null,
            away:
              f.scores?.find(
                (s) =>
                  s.participant_id === away.id && s.description === "CURRENT"
              )?.score.goals ?? null,
          }
        : undefined,
  };
};
