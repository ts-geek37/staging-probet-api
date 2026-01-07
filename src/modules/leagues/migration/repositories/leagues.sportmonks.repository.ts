import {
  SportMonksLeague,
  SportMonksSeason,
  SportMonksStanding
} from "../../../../integrations/sportmonks/entities";
import { SportMonksClient } from "../../../../integrations/sportmonks/sportmonks.client";
import { SportMonksResponse } from "../../../../integrations/sportmonks/sportmonks.types";
import {
  normalizeCompetitionType,
  normalizeForm
} from "../leagues.normalizer";
import { resolveCurrentSeason } from "../leagues.season.cache";
import {
  LeagueMatchesResponse,
  LeagueProfileResponse,
  LeagueStandingsResponse,
  LeagueStatisticsResponse,
} from "../leagues.types";
import { getLeagueProfileFromDb } from "./leagues.db.repository";
import { LeaguesRepository } from "./leagues.repository";

export const LeaguesSportMonksRepository = (baseRepo: {
  getLeagues: LeaguesRepository["getLeagues"];
  getLeagueProfile: LeaguesRepository["getLeagueProfile"];
}): LeaguesRepository => {
  const client = new SportMonksClient();

  const getLeagues = baseRepo.getLeagues;

  const getLeagueProfile = async (
    leagueId: number
  ): Promise<LeagueProfileResponse | null> => {
    const base = await getLeagueProfileFromDb(leagueId);
    if (!base) return null;

    const client = new SportMonksClient();

    const season = await resolveCurrentSeason(leagueId, client);

    const leagueRes = await client.get<SportMonksResponse<SportMonksLeague>>(
      `/football/leagues/${leagueId}`
    );

    return {
      id: base.id,
      name: base.name,
      logo: base.logo,
      competition_type: normalizeCompetitionType(leagueRes.data.type),
      country: base.country,
      current_season: season,
    };
  };

  const getLeagueStandings = async (
    leagueId: number
  ): Promise<LeagueStandingsResponse | null> => {
    const header = await getLeagueProfileFromDb(leagueId);
    if (!header) return null;

    const client = new SportMonksClient();

    const season = await resolveCurrentSeason(leagueId, client);
    if (!season) return null;

    const res = await client.get<SportMonksResponse<SportMonksStanding[]>>(
      `/football/standings/seasons/${season.id}`,
      {
        include: "participant;form",
      }
    );

    const primaryTable = res.data
      .filter((s) => s.group_id === null)
      .sort((a, b) => a.position - b.position);

    return {
      league: {
        id: header.id,
        name: header.name,
        country: header.country.name,
      },
      season: {
        id: season.id,
        name: season.name,
      },
      table: primaryTable.map((s) => ({
        position: s.position,
        team: {
          id: s.participant.id,
          name: s.participant.name,
          logo: s.participant.image_path,
        },
        points: s.points,
        form: normalizeForm(s.form),
      })),
    };
  };
  const getLeagueStatistics = async (
  leagueId: number
): Promise<LeagueStatisticsResponse | null> => {
  const header = await getLeagueProfileFromDb(leagueId);
  if (!header) return null;

  const client = new SportMonksClient();

   const seasonsRes = await client.get<
    SportMonksResponse<{ id: number; name: string }[]>
  >(`/football/seasons`, {
    filters: `league:${leagueId}`,
    order: "desc",
    per_page: 3,
  });

  const seasons = seasonsRes.data ?? [];
  if (seasons.length === 0) return null;

  const seasonStats = [];

  for (const season of seasons) {
    const res = await client.get<
      SportMonksResponse<{
        statistics?: { type_id: number; value: any }[];
      }>
    >(`/football/seasons/${season.id}`, {
      include: "statistics",
    });

    const stats = res.data.statistics ?? [];
    const byType = new Map(stats.map((s) => [s.type_id, s.value]));

    const goals = byType.get(191);
    const cards = byType.get(193);
    const overUnder = byType.get(197);

    seasonStats.push({
      season: {
        id: season.id,
        name: season.name,
      },
      overview: {
        matches_played: byType.get(188)?.played ?? null,
        total_goals: goals?.total ?? null,
        average_goals_per_match: goals?.average ?? null,
      },
      scoring: {
        home_goals_percentage: goals?.home?.percentage ?? null,
        away_goals_percentage: goals?.away?.percentage ?? null,
        over_25_percentage: overUnder?.over?.["2_5"]?.percentage ?? null,
        under_25_percentage: overUnder?.under?.["2_5"]?.percentage ?? null,
      },
      discipline: {
        yellow_cards: cards?.yellowcards ?? null,
        red_cards: cards?.redcards ?? null,
        average_yellow_cards: cards?.average_yellowcards ?? null,
        average_red_cards: cards?.average_redcards ?? null,
      },
    });
  }

  return {
    league: {
      id: header.id,
      name: header.name, 
    },
    seasons: seasonStats,
  };
};


  const getLeagueMatches = async (
    leagueId: number,
    status?: "LIVE" | "UPCOMING" | "FT"
  ): Promise<LeagueMatchesResponse | null> => {
    const header = await getLeagueProfileFromDb(leagueId);
    if (!header) return null;

    const client = new SportMonksClient();

    const season = await resolveCurrentSeason(leagueId, client);
    if (!season) return null;

    const res = await client.get<SportMonksResponse<SportMonksSeason>>(
      `/football/seasons/${season.id}`,
      {
        include: "fixtures.participants;fixtures.scores",
      }
    );
    const fixtures = res.data.fixtures ?? [];

    const matches = fixtures
      .map((f) => {
        const home = f.participants[0];
        const away = f.participants[1];

        return {
          id: f.id,
          kickoff_time: f.starting_at,
          status: "LIVE",
          home_team: {
            id: home.id,
            name: home.name,
            logo: home.image_path,
            score: f.scores?.find((s) => s.participant_id === home.id)?.score,
          },
          away_team: {
            id: away.id,
            name: away.name,
            logo: away.image_path,
            score: f.scores?.find((s) => s.participant_id === away.id)?.score,
          },
        };
      })
      .filter((m) => {
        if (!status) return true;
        return m.status === status;
      });

    return {
      league: {
        id: header.id,
        name: header.name,
      },
      season: {
        id: season.id,
        name: season.name,
      },
      matches,
    };
  };

  return {
    getLeagues,
    getLeagueProfile,
    getLeagueStandings,
    getLeagueStatistics,
    getLeagueMatches,
  };
};
