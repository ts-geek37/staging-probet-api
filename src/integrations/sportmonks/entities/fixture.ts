 import { SportMonksEvent } from "./event";
import { SportMonksLineup } from "./lineup";
import { SportMonksParticipant } from "./participant";
import { SportMonksScore } from "./score";
import { SportMonksStatistic } from "./statistic";

 

export interface SportMonksFixture {
  id: number;
  starting_at: string;
  state: string;
  round?: {
    name: string;
  } | null;
  league: {
    id: number;
    name: string;
  };
  season: {
    id: number;
    name: string;
  };
  venue?: {
    name: string | null;
  } | null;
  referee?: {
    name: string | null;
  } | null;
  participants: SportMonksParticipant[];
  scores?: SportMonksScore[];
  statistics?: SportMonksStatistic[];
  lineups?: SportMonksLineup[];
  events?: SportMonksEvent[];
}
