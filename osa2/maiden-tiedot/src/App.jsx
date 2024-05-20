import { useState, useEffect } from "react";
import countryService from "./services/countries";
import CountryDetails from "./components/CountryDetails";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const countriesVisible =
    filter === ""
      ? []
      : countries.filter(
          (country) => country.toLowerCase().indexOf(filter.toLowerCase()) > -1
        );

  useEffect(() => {
    countryService
      .getAll()
      .then((response) =>
        setCountries(response.map((country) => country.name.common))
      );
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      find countries <input value={filter} onChange={handleFilterChange} />
      {countriesVisible.length === 1 ? (
        <CountryDetails name={countriesVisible} />
      ) : countriesVisible.length <= 10 ? (
        countriesVisible.map((country) => (
            <div key={country}>
              {`${country} `} 
              <button onClick={() => setFilter(country)}>show</button>{" "}
            </div>
        ))
      ) : (
        <div>Too many matches, specify another filter</div>
      )}
    </>
  );
}

export default App;
