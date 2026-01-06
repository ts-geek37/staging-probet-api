export const countryToCode: Record<string, string> = {
  England: "gb-eng",
  France: "fr",
  Germany: "de",
  Italy: "it",
  Spain: "es",
  Netherlands: "nl",
  Brazil: "br",
  Argentina: "ar",
  Norway: "no",
  Sweden: "se",
  "United States": "us",
  Uruguay: "uy",
  Ecuador: "ec",
  Portugal: "pt",
  Belgium: "be",
  Mexico: "mx",
  Colombia: "co",
  Japan: "jp",
  "South Korea": "kr",
  Morocco: "ma",
  Tunisia: "tn",
};

export const getFlagUrlByName = (
  countryName: string,
  width: number = 40
): string => {
  let code = countryToCode[countryName];
  if (!code) {
    code = countryToCode[0];
  }

  return `https://flagcdn.com/w${width}/${code.toLowerCase()}.png`;
};
