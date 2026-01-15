import "dotenv/config";
import { seedCountries } from "./seed.countries";
import { seedLeagues } from "./seed.leagues";
import { seedTeams } from "./seed.teams";
import logger from "@/logger";

const run = async () => {
  await seedCountries();
   // await seedLeagues();
  // await seedTeams();
  process.exit(0);
};

run().catch((err) => {
  logger.error(err);
  process.exit(1);
});
