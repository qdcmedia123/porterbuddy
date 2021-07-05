import { languages } from "assets/languages";

export const GetTableData = (data: any) => {
  const countries = data.map((country: any) => {
    const { name, languages, population } = country;
    const getLan = languages.map((lng: any) => {
      return lng.iso639_1;
    });
    return { name, languages: getLan, population };
  });
  const mapLan = languages.map((language) => {
    let countryArr: any = [];
    let population: any = [];
    countries.map((country: any) => {
      if (country.languages.indexOf(language.alpha2) > -1) {
        countryArr.push(country.name);
        population.push(!isNaN(country.population) ? country.population : 0);
      }
      return countries;
    });
    const newData = {
      language: language.English,
      countries: countryArr,
      population,
    };
    return newData;
  });
  return mapLan;
};
