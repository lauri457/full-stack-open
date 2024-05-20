import countryService from "../services/countries";
import { useState, useEffect } from "react";
import Weather from "./Weather";

const CountryDetails = ({ name }) => {
  const [country, setCountry] = useState({});
  useEffect(() => {
    countryService
      .getOne(name)
      .then((countryObject) => setCountry(countryObject));
  }, []);
  if (!country.name) {
    return <div>loading...</div>;
  }
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h2>languages: </h2>
      <ul>
        {Object.keys(country.languages).map((k) => (
          <li key={k}>{country.languages[k]}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
      <Weather city={country.capital[0]}/>
    </>
  );
};

export default CountryDetails;
