import {
  MatchStatus,
  PLAYER_STAT_EXTRACTORS,
  SportMonksFixture,
  SportMonksPlayer,
  SportMonksPlayerSeasonStatistic,
  SportMonksTeam,
  SportMonksTeamTransfer,
  formatDate as i,
} from "@/integrations/sportmonks";
import {
  PlayerProfileResponse,
  PlayerSeasonStatsResponse,
  PlayerTransfer,
  TransferTeam,
} from "./players.types";

export const formatDate = i;

export const mapPlayerProfile = (
  p: SportMonksPlayer
): PlayerProfileResponse => {
  const dob = p.date_of_birth ? new Date(p.date_of_birth) : null;

  const age = dob
    ? (() => {
        const today = new Date();
        let a = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) a--;
        return a;
      })()
    : null;

  const teams =
    p.teams?.map((t) => ({
      id: t.team.id,
      name: t.team.name,
      logo: t.team.image_path,
    })) ?? [];

  const currentTeam = teams[0] ?? null;
  
    const trophies = p.trophies?.map((t) => ({
      id: t.id,
      name: t.trophy?.name,
      position: t.trophy?.position,
      team:{
        id: t.team.id,
        name: t.team.name,
        logo : t.team.image_path
      }
    }))
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

    birthplace: {
      country: p.country?.name ?? null,
      city: p.city?.name ?? null,
    },

    position: {
      id: p.position?.id ?? null,
      name: p.position?.name ?? null,
      detailed: p.detailedPosition?.name ?? null,
    },

    shirt_number: p.metadata?.shirt_number ?? null,

    is_active: p.metadata?.is_active ?? true,

    market_value: p.metadata?.market_value ?? null,

    contract: {
      until: p.metadata?.contract_until ?? null,
    },

    is_captain: p.metadata?.is_captain ?? false,

    current_team: currentTeam,
    trophies,
    teams,
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
          starting_at: row.season?.starting_at ?? null,
          ending_at: row.season?.ending_at ?? null,
          league: {
            id: row.season?.league?.id ?? 0,
            name: row.season?.league?.name ?? "Unknown",
            logo: row.season?.league?.image_path ?? null,
          },
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

const mapTeam = (team: SportMonksTeam | null): TransferTeam | null => {
  if (!team) return null;

  return {
    id: team.id,
    name: team.name,
    shortCode: team.short_code,
    image: team.image_path,
  };
};

export const mapSportMonksTransferToPlayerTransfer = (
  transfer: SportMonksTeamTransfer
): PlayerTransfer => {
  return {
    id: transfer.id,
    date: transfer.date,
    type: {
      code: transfer.type.code,
      label: transfer.type.name,
    },
    fromTeam: mapTeam(transfer.fromteam),
    toTeam: mapTeam(transfer.toteam),
    completed: transfer.completed,
    amount: transfer.amount,
  };
};
