import {
  normalizeFixtureStatus,
  SportMonksFixture,
} from "@/integrations/sportmonks";
import { LiveMatchItem } from "./live.types";
import { MatchListStatus } from "../matches/matches.types";

export const mapLiveMatchListItem = (
  fixture: SportMonksFixture
): LiveMatchItem | null => {
  const home = fixture.participants.find((p) => p.meta?.location === "home");
  const away = fixture.participants.find((p) => p.meta?.location === "away");

  if (!home || !away) return null;

  const homeScore =
    fixture.scores?.find(
      (s) => s.participant_id === home.id && s.description === "CURRENT"
    )?.score.goals ?? null;

  const awayScore =
    fixture.scores?.find(
      (s) => s.participant_id === away.id && s.description === "CURRENT"
    )?.score.goals ?? null;

  const mapSc =
    homeScore && awayScore ? { home: homeScore, away: awayScore } : null;
 
const state = Object.values(MatchListStatus).find(
  (s) => MatchListStatus[s] === stateId
);

const stateId = state ? state.id : null;
const stateName = state ? state.name : null;
const stateShort = state ? state.short : null;

const mappedState = {
  id: stateId,
  name: stateName,
  short: stateShort,
};
  return {
    id: fixture.id,
    league: {
      id: fixture.league.id,
      name: fixture.league.name,
      logo: fixture.league.image_path,
    },
    teams: {
      home: {
        id: home.id,
        name: home.name,
        logo: home.image_path,
      },
      away: {
        id: away.id,
        name: away.name,
        logo: away.image_path,
      },
    },
    scores: mapSc,
    minute: null,
    state: state ? { id: stateId, name: state, short: state } : null,
    startedAt: fixture.starting_at.toString(),
  };
};
