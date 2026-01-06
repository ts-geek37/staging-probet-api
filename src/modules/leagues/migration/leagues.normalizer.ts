import { SportMonksStandingForm } from "../../../integrations/sportmonks/entities";

export type CompetitionType = "league" | "cup";

export const normalizeCompetitionType = (value: unknown): CompetitionType =>
  value === "league" ? "league" : "cup";

export type FixtureStatus = "UPCOMING" | "LIVE" | "FT";

export const normalizeFixtureStatus = (state: unknown): FixtureStatus => {
   if (state === "NS") return "UPCOMING";
  if (state === "FT") return "FT";
  return "LIVE";
};

export type FormValue = "W" | "D" | "L";

export const normalizeForm = (
  SportMonksStandingForm?: SportMonksStandingForm[]
): FormValue[] => {
  if (!SportMonksStandingForm) return [];
  console.log("sp", SportMonksStandingForm);
  return SportMonksStandingForm.sort((a, b) => a.sort_order - b.sort_order)
    .map((form) => {
      if (form.form === "W") return "W";
      if (form.form === "D") return "D";
      return "L";
    })
    .slice(0, 5);
};
