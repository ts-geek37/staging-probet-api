import "dotenv/config";
import { Pool } from "pg";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const setupDB = async () => {
  try {
    const {
      DATABASE_AUTHENTICATOR,
      DATABASE_AUTHENTICATOR_PASSWORD,
      DATABASE_NAME,
      DATABASE_OWNER,
      DATABASE_OWNER_PASSWORD,
      DATABASE_VISITOR,
      ROOT_DATABASE_URL,
      DATABASE_URL,
    } = process.env;

    if (!DATABASE_URL || !ROOT_DATABASE_URL) {
      console.error("❌ Missing DATABASE_URL or ROOT_DATABASE_URL");
      process.exit(1);
    }

    console.log("🚧 Setting up local PostgreSQL environment...");

    const pgPool = new Pool({ connectionString: ROOT_DATABASE_URL });
    pgPool.on("error", (err) => console.error("❌ Database connection error:", err.message));

    let attempts = 0;
    while (true) {
      try {
        await pgPool.query('SELECT true AS "Connection test";');
        break;
      } catch {
        attempts++;
        if (attempts > 30) {
          console.error("❌ Database never came up, aborting.");
          process.exit(1);
        }
        console.log(`Database not ready yet (attempt ${attempts})...`);
        await sleep(1000);
      }
    }

    const client = await pgPool.connect();
    try {
      console.log("🧹 Cleaning up old roles and databases...");

      await client.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}_shadow;`);
      await client.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}_test;`);
      await client.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME};`);
      console.log(`🗑️ Dropped databases: ${DATABASE_NAME}, ${DATABASE_NAME}_test, ${DATABASE_NAME}_shadow`);

      await client.query(`
        DO $$
        BEGIN
          IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = '${DATABASE_AUTHENTICATOR}') THEN
            REASSIGN OWNED BY ${DATABASE_AUTHENTICATOR} TO postgres;
            DROP OWNED BY ${DATABASE_AUTHENTICATOR};
          END IF;
          IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = '${DATABASE_OWNER}') THEN
            REASSIGN OWNED BY ${DATABASE_OWNER} TO postgres;
            DROP OWNED BY ${DATABASE_OWNER};
          END IF;
          IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = '${DATABASE_VISITOR}') THEN
            REASSIGN OWNED BY ${DATABASE_VISITOR} TO postgres;
            DROP OWNED BY ${DATABASE_VISITOR};
          END IF;
        END
        $$;
      `);

      await client.query(`DROP ROLE IF EXISTS ${DATABASE_VISITOR};`);
      await client.query(`DROP ROLE IF EXISTS ${DATABASE_AUTHENTICATOR};`);
      await client.query(`DROP ROLE IF EXISTS ${DATABASE_OWNER};`);

      console.log("👤 Creating roles...");
      await client.query(
        `CREATE ROLE ${DATABASE_OWNER} WITH LOGIN PASSWORD '${DATABASE_OWNER_PASSWORD}' SUPERUSER;`
      );
      await client.query(
        `CREATE ROLE ${DATABASE_AUTHENTICATOR} WITH LOGIN PASSWORD '${DATABASE_AUTHENTICATOR_PASSWORD}' NOINHERIT;`
      );
      await client.query(`CREATE ROLE ${DATABASE_VISITOR};`);
      await client.query(`GRANT ${DATABASE_VISITOR} TO ${DATABASE_AUTHENTICATOR};`);

      console.log("🗃️ Creating databases...");
      await client.query(`CREATE DATABASE ${DATABASE_NAME} OWNER ${DATABASE_OWNER};`);
      await client.query(`CREATE DATABASE ${DATABASE_NAME}_test OWNER ${DATABASE_OWNER};`);
    } finally {
      await client.release();
    }
    await pgPool.end();
    
    const ownerPgPool = new Pool({ connectionString: DATABASE_URL });
    const ownerClient = await ownerPgPool.connect();
    try {
      console.log("🔌 Setting schema ownership and permissions...");
      await ownerClient.query(`
        ALTER SCHEMA public OWNER TO ${DATABASE_OWNER};
        GRANT ALL ON DATABASE ${DATABASE_NAME} TO ${DATABASE_OWNER};
        GRANT CONNECT ON DATABASE ${DATABASE_NAME} TO ${DATABASE_AUTHENTICATOR};
        GRANT CONNECT ON DATABASE ${DATABASE_NAME} TO ${DATABASE_VISITOR};
      `);
    } finally {
      await ownerClient.release();
    }
    await ownerPgPool.end();

    console.log("✅ Local database setup complete!");
  } catch (err) {
    console.error("❌ Setup failed. Check your .env configuration.");
    console.error(err);
    process.exit(1);
  }
};

setupDB();
