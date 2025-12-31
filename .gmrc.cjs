require("dotenv").config();

module.exports = {
  connectionString: process.env.DATABASE_URL,
  rootConnectionString: process.env.ROOT_DATABASE_URL,
  shadowConnectionString: process.env.SHADOW_DATABASE_URL,
  manageGraphileMigrateSchema: true,
  migrationsFolder: "./migrations",
};
