import { seedCountries } from "./seed.countries";
import { seedLeagues } from "./seed.leagues";
 import { seedTeams } from "./seed.teams";
import "dotenv/config";
const run = async () => {
  // await seedCountries();
  // await seedLeagues();
  await seedTeams();
   process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
