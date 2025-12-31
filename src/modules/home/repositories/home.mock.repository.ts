import { HomeResponse } from "../home.types";
import { HomeRepository } from "./home.repository";

export class HomeMockRepository implements HomeRepository {
  async getHomeData(): Promise<HomeResponse> {
    return {
      live_matches: [
        {
          id: 1001,
          status: "LIVE",
          minute: 67,
          home_team: {
            id: 1,
            name: "Real Madrid",
            logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
            score: 3,
          },
          away_team: {
            id: 2,
            name: "Barcelona",
            logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
            score: 3,
          },
          league: {
            id: 8,
            name: "La Liga",
            logo: "https://upload.wikimedia.org/wikipedia/en/9/92/La_Liga_logo_2023.svg",
          },
        },
        {
          id: 1002,
          status: "LIVE",
          minute: 54,
          home_team: {
            id: 3,
            name: "Manchester United",
            logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
            score: 3,
          },
          away_team: {
            id: 4,
            name: "Liverpool",
            logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
            score: 1,
          },
          league: {
            id: 9,
            name: "Premier League",
            logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
          },
        },
      ],
      upcoming_matches: [
        {
          id: 2001,
          kickoff_time: "2025-12-19T18:00:00Z",
          date: "2025-12-19",
          home_team: {
            id: 3,
            name: "Manchester United",
            logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
          },
          away_team: {
            id: 2,
            name: "Barcelona",
            logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
          },
          league: {
            id: 9,
            name: "Premier League",
          },
        },
        {
          id: 2002,
          kickoff_time: "2025-12-19T20:00:00Z",
          date: "2025-12-19",
          home_team: {
            id: 1,
            name: "Real Madrid",
            logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
          },
          away_team: {
            id: 4,
            name: "Liverpool",
            logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
          },
          league: {
            id: 8,
            name: "La Liga",
          },
        },
        {
          id: 2003,
          kickoff_time: "2025-12-19T22:00:00Z",
          date: "2025-12-19",
          home_team: {
            id: 6,
            name: "Bayern Munich",
            logo: "https://upload.wikimedia.org/wikipedia/en/1/1f/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg",
          },
          away_team: {
            id: 7,
            name: "Marseille",
            logo: "https://upload.wikimedia.org/wikipedia/en/6/6e/Olympique_de_Marseille_logo.svg",
          },
          league: {
            id: 10,
            name: "Bundesliga",
          },
        },
      ],
      top_leagues: [
        {
          id: 9,
          name: "Premier League",
          country: "England",
          logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
        },
        {
          id: 10,
          name: "Bundesliga",
          country: "Germany",
          logo: "https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg",
        },
        {
          id: 8,
          name: "La Liga",
          country: "Spain",
          logo: "https://upload.wikimedia.org/wikipedia/en/9/92/La_Liga_logo_2023.svg",
        },
        {
          id: 11,
          name: "Serie A",
          country: "Italy",
          logo: "https://upload.wikimedia.org/wikipedia/en/e/e1/Serie_A_logo_%282019%29.svg",
        },
        {
          id: 12,
          name: "Eredivisie",
          country: "Netherlands",
          logo: "https://upload.wikimedia.org/wikipedia/en/7/7f/Eredivisie_logo.svg",
        },
      ],
      league_standings: {
        league: {
          id: 9,
          name: "Premier League",
          country: "England",
        },
        season: "2024/25",
        table: [
          {
            position: 1,
            team: {
              id: 20,
              name: "Arsenal",
              logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
            },
            played: 15,
            points: 38,
          },
          {
            position: 2,
            team: {
              id: 21,
              name: "Chelsea",
              logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
            },
            played: 15,
            points: 28,
          },
          {
            position: 3,
            team: {
              id: 4,
              name: "Liverpool",
              logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
            },
            played: 15,
            points: 34,
          },
          {
            position: 4,
            team: {
              id: 22,
              name: "Aston Villa",
              logo: "https://upload.wikimedia.org/wikipedia/en/f/f9/Aston_Villa_FC_crest_%282016%29.svg",
            },
            played: 15,
            points: 30,
          },
        ],
      },

      latest_news: [
        {
          id: "news-1",
          title:
            "Arsenal extends winning streak with crucial victory over Liverpool",
          excerpt:
            "The Gunners continue their impressive Premier League campaign with a commanding performance.",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/3/3f/Emirates_Stadium_interior.jpg",
          category: "Match Report",
          published_at: "2025-12-18T20:30:00Z",
        },
        {
          id: "news-2",
          title: "Transfer window: Top players to watch in January",
          excerpt:
            "Several high-profile names could be on the move as clubs prepare for the winter transfer window.",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/1/1c/Football_transfer_window.jpg",
          category: "Transfers",
          published_at: "2025-12-18T15:10:00Z",
        },
        {
          id: "news-3",
          title: "Champions League draw sets up exciting clashes",
          excerpt:
            "European giants are set to face off after the latest Champions League draw.",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/6/6a/UEFA_Champions_League_trophy.jpg",
          category: "UEFA",
          published_at: "2025-12-17T10:00:00Z",
        },
      ],
    };
  }
}
