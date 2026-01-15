import { MatchesRepository } from "../matches/matches.repository";
import { PredictableMatchesResponse } from "../matches/matches.types";
import { PredictionTypesResolver } from "./prediction.type.resolver";
import { PredictionsRepository } from "./predictions.repository";
import {
  FixturePredictionsResponse,
  FixtureValueBetsResponse,
  PredictionMarket,
  PredictionMarketType,
} from "./predictions.types";

export const PredictionsService = (
  repo: PredictionsRepository,
  matchesRepo: MatchesRepository,
  resolver: ReturnType<typeof PredictionTypesResolver>
) => {
  const isPredictable = (kickoff: string) => {
    const t = new Date(kickoff).getTime();
    const n = Date.now();
    return n >= t - 21 * 24 * 60 * 60 * 1000;
  };

  const mapMarket = (
    label: PredictionMarketType,
    p: Record<string, any>
  ): PredictionMarket | null => {
    switch (label) {
      case PredictionMarketType.BOTH_TEAMS_TO_SCORE:
        return { type: label, data: { yes: p.Yes, no: p.No } };

      case PredictionMarketType.FULLTIME_RESULT:
      case PredictionMarketType.DOUBLE_CHANCE:
      case PredictionMarketType.TEAM_TO_SCORE_FIRST:
      case PredictionMarketType.FIRST_HALF_WINNER:
        return {
          type: label,
          data: { home: p["1"], draw: p["X"], away: p["2"] },
        };

      case PredictionMarketType.OVER_UNDER_1_5:
      case PredictionMarketType.OVER_UNDER_2_5:
      case PredictionMarketType.OVER_UNDER_3_5:
      case PredictionMarketType.OVER_UNDER_4_5:
      case PredictionMarketType.HOME_OVER_UNDER_0_5:
      case PredictionMarketType.HOME_OVER_UNDER_1_5:
      case PredictionMarketType.HOME_OVER_UNDER_2_5:
      case PredictionMarketType.HOME_OVER_UNDER_3_5:
      case PredictionMarketType.AWAY_OVER_UNDER_0_5:
      case PredictionMarketType.AWAY_OVER_UNDER_1_5:
      case PredictionMarketType.AWAY_OVER_UNDER_2_5:
      case PredictionMarketType.AWAY_OVER_UNDER_3_5:
        return { type: label, data: { over: p.Over, under: p.Under } };

      case PredictionMarketType.CORRECT_SCORE:
        return {
          type: label,
          data: {
            scores: Object.entries(p).map(([score, probability]) => ({
              score,
              probability,
            })),
          },
        };

      default:
        return null;
    }
  };

  const getProbabilities = async (
    fixtureId: number
  ): Promise<FixturePredictionsResponse> => {
    const raw = await repo.getPredictionsByMatches(fixtureId);

    const markets = raw
      .filter((r) => r.type_id !== 33)
      .map((r) => {
        const label = resolver.resolve(r.type_id);
        if (!label) return null;
        return mapMarket(label, r.predictions);
      })
      .filter(Boolean) as PredictionMarket[];

    return { fixture_id: fixtureId, predictable: true, markets };
  };

  const getValueBets = async (
    fixtureId: number
  ): Promise<FixtureValueBetsResponse> => {
    return repo.getValueBetsByMatches(fixtureId);
  };

  const getPredictableMatches = async (
    page: number,
    limit: number
  ): Promise<PredictableMatchesResponse> => {
    const matches = await matchesRepo.getPredictableMatches(page, limit);
    return matches;
  };

  return { getProbabilities, getValueBets, getPredictableMatches };
};
