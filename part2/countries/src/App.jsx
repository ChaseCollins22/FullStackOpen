import { useState, useEffect } from 'react'
import countries from './services/countries';
import './App.css'

function App() {
  const [countrySearch, setcountrySearch] = useState('');
  const [allCountries, setAllCountries] = useState(null);
  const [testDisplay, setTestDisplay] = useState([]);

  useEffect(() => {
    countries
      .getAllCountries()
      .then(countryData => {
        const countryNames = countryData.map(country => country.name.common)
        setAllCountries(countryNames);
      });
  }, []);

  const handleCountryChange = (event) => {
    setcountrySearch(event.target.value)

    const searchResults = searchCountriesByName(event.target.value);
    console.log(searchCountriesByName(event.target.value));
    switch (true) {
      case searchResults.length > 10:
        setTestDisplay(['Too many matches. Please specify further'].concat([]))
        break;
      case searchResults.length > 1:
        setTestDisplay(searchResults.concat([]))
        break
      case searchResults.length === 1:
        setTestDisplay(searchResults.concat([]))
        break;
      default:
        setTestDisplay(['No country found'].concat([]))
    }
    
  }

  const searchCountriesByName = (countrySearchValue) => {
    return allCountries.filter(countryName => {
      countryName = countryName.toLowerCase();
      return countryName.includes(countrySearchValue)
    })
  }

  return (
    <>
      <span>{!allCountries ? 'Loading...' : ''}</span>

      <div>
        <label htmlFor="countries">Find countries: </label>
        <input type='text' name='countries' value={countrySearch} onChange={handleCountryChange}></input>
      </div>
      {testDisplay.map(countryName => <p key={countryName} style={{margin: 0, padding: '.5em 0'}}>{countryName}</p>)}
    </>
  )
}

export default App
