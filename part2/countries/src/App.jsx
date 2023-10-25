import { useState, useEffect } from 'react'
import countries from './services/countries';
import './App.css'

function App() {
  const [countrySearch, setcountrySearch] = useState('');
  const [allCountries, setAllCountries] = useState(null);
  const [countryDisplay, setcountryDisplay] = useState([]);
  const [tooManyMatches, setTooManyMatches] = useState(true);

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
    let countryData;
    
    switch (true) {
      case searchResults.length > 10:
        //setcountryDisplay(['Too many matches. Please specify further'].concat([]))
        setTooManyMatches(true)
        break;
      case searchResults.length > 1:
        setcountryDisplay(searchResults.concat([]))
        setTooManyMatches(false)
        break
      case searchResults.length === 1:
        countries
          .getCountryByName(searchResults[0])
          .then(country => {
            countryData = {
              name: country.name.common,
              capital: country.capital[0],
              area: country.area,
              languages: country.languages,
              flag: country.flags.svg
            }
            setcountryDisplay([countryData].concat([]))
          });
        break;
      default:
        setcountryDisplay(['No country found'].concat([]))
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
      {typeof countryDisplay[0] !== 'object'
      ? <SearchList searchResults={countryDisplay} />
      : <CountryCard  {...countryDisplay[0]} />
      }
      {/* {!tooManyMatches
      ? <SearchList searchResults={countryDisplay} />
      : <CountryCard  {...countryDisplay[0]} />
      } */}
      {
        tooManyMatches && <p>Too many matches. Please specify further</p>
      }
    </>
  )
}

const SearchList = ({ searchResults }) => {
  const countriesList = searchResults.map(countryName =>
    <div key={countryName}>
      <span style={{margin: 0, padding: '.5em 0'}}>{countryName}</span>
      <Button text={'Show country'} handleClick={() => null} />
    </div>
  )

  return countriesList
}

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const CountryCard = ({ name, capital, area, languages, flag}) => {
  const languagesList =  Object.values(languages).map(language => <li key={language}>{language}</li>);

  return (
    <div>
      <h1>{name}</h1>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <p><b>Languages:</b></p>
      <ul>
      {languagesList}
      </ul>
      <img 
        src={flag}
        alt="flag"
        style={{
          height: 200,
          width: 200
        }}
      />
    </div>
  )
}

export default App
