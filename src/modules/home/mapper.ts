// home.sportmonks.repository.ts

import { SportMonksFixture } from "@/integrations/sportmonks";
import { MatchListItem } from "@/modules/matches/matches.types";

export const mapFixtureToHomeMatch = (
  f: SportMonksFixture
): MatchListItem | null => {
  if (!f.participants || f.participants.length < 2 || !f.league) {
    return null;
  }

  const home = f.participants.find((p) => p.meta?.location === "home");
  const away = f.participants.find((p) => p.meta?.location === "away");

  if (!home || !away) return null;

  const homeScore =
    f.scores?.find(
      (s) => s.participant_id === home.id && s.description === "CURRENT"
    )?.score.goals ?? null;

  const awayScore =
    f.scores?.find(
      (s) => s.participant_id === away.id && s.description === "CURRENT"
    )?.score.goals ?? null;

  return {
    id: f.id,
    kickoff_time: f.starting_at,
    status:
      f.state_id === 1 || f.state_id === 2
        ? "UPCOMING"
        : f.state_id === 3 || f.state_id === 4
        ? "LIVE"
        : "FINISHED",

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
      f.state_id >= 3
        ? {
            home: homeScore,
            away: awayScore,
          }
        : undefined,
  };
};
