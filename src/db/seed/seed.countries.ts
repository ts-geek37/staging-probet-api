import { db } from "../index";
import { SportMonksClient } from "../../integrations/sportmonks/sportmonks.client";
import { countries } from "../schema/countries";
import { SportMonksResponse } from "../../integrations/sportmonks/sportmonks.types";
import { SportMonksCountry } from "../../integrations/sportmonks/sportmonks.entities";
import "dotenv/config";

export const seedCountries = async () => {
  const client = new SportMonksClient();
  const response = await client.get<SportMonksResponse<SportMonksCountry[]>>(
    "/core/countries"
  );

  const values = response.data.map((c) => ({
    id: c.id,
    name: c.name,
    iso2: c.iso2,
    continent: c.continent,
    flag: c.image_path,
  }));

  if (values.length === 0) return;

  await db
    .insert(countries)
    .values(values)
    .onConflictDoUpdate({
      target: countries.id,
      set: {
        name: countries.name,
        iso2: countries.iso2,
        continent: countries.continent,
        flag: countries.flag,
        updatedAt: new Date(),
      },
    });
};
