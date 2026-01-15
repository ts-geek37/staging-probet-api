import {
  SportMonksClient,
  SportMonksFixture,
  SportMonksResponse,
} from "../../integrations/sportmonks";
import { getLeaguesFromDb } from "../../modules/leagues/leagues.db.repository";
import { MatchListItem } from "../../modules/matches/matches.types";
import { getTeamsFromDb } from "../../modules/teams/teams.db.repository";
import { HomeRepository } from "./home.repository";
import { HomeResponse } from "./home.types";
import { mapFixtureToHomeMatch } from "./mapper";

export const HomeSportMonksRepository = (): HomeRepository => {
  const client = new SportMonksClient();

  const formatDate = (d: Date) => d.toISOString().slice(0, 10);

  const getHomeData = async (): Promise<HomeResponse> => {
    const now = new Date();

    const from = new Date(now);
    from.setDate(now.getDate() - 3);

    const to = new Date(now);
    to.setDate(now.getDate() + 3);

    const [fixturesRes, leagues, teams] = await Promise.all([
      client.get<SportMonksResponse<SportMonksFixture[]>>(
        `/football/fixtures/between/${formatDate(from)}/${formatDate(to)}`,
        {
          include: "participants;league;scores;state",
        }
      ),

      getLeaguesFromDb(1, 5),
      getTeamsFromDb(1, 5),
    ]);

    const fixtures = fixturesRes.data ?? [];

    const mapped = fixtures
      .map(mapFixtureToHomeMatch)
      .filter(Boolean) as MatchListItem[];

    const live: MatchListItem[] = [];
    const upcoming: MatchListItem[] = [];
    const finished: MatchListItem[] = [];

    for (const match of mapped) {
      if (match.status === "LIVE" && live.length < 3) {
        live.push(match);
      } else if (match.status === "UPCOMING" && upcoming.length < 3) {
        upcoming.push(match);
      } else if (match.status === "FINISHED" && finished.length < 3) {
        finished.push(match);
      }
    }

    return {
      featured_match: live[0] ?? upcoming[0] ?? null,

      sections: {
        live_now: live,
        starting_soon: upcoming,
        recently_finished: finished,
      },

      top_leagues: leagues.data,
      popular_teams: teams.data,

      meta: {
        updated_at: new Date().toISOString(),
        fixtures_window: {
          from: formatDate(from),
          to: formatDate(to),
        },
      },
    };
  };

  return {
    getHomeData,
  };
};
