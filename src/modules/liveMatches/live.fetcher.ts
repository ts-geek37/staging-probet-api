import {
    SportMonksClient,
    SportMonksFixture,
    SportMonksResponse,
} from "../../integrations/sportmonks";
import { LIVE_STATE_IDS } from "./live.constants";
import { mapLiveMatchListItem } from "./live.mapper";

const client = new SportMonksClient();

export const fetchLiveMatches = async () => {
  const res = await client.get<SportMonksResponse<SportMonksFixture[]>>(
    "/football/fixtures",
    {
      include: "participants;league;scores;state",
      filters: `fixtureStates:${LIVE_STATE_IDS.join(",")}`,
    }
  );

  return (res.data ?? []).map(mapLiveMatchListItem);
};
