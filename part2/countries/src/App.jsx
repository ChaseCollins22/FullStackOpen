import { useState, useEffect } from 'react'
import countries from './services/countries';
import './App.css'

function App() {
  const [countrySearch, setCountrySearch] = useState('');
  const [allCountries, setAllCountries] = useState(null);
  const [countryDisplay, setCountryDisplay] = useState([]);
  const [tooManyMatches, setTooManyMatches] = useState(false);

  useEffect(() => {
    countries
      .getAllCountries()
      .then(countryData => {
        const countryNames = countryData.map(country => country.name.common)
        setAllCountries(countryNames);
      });
  }, []);

  const getCountryData = async (countryName) => {
    const country = await countries.getCountryByName(countryName);
    return {
      name: country.name.common,
      capital: country.capital[0],
      area: country.area,
      languages: country.languages,
      flag: country.flags.svg
    }
  }

  const handleCountryChange = (event) => {
    setCountrySearch(event.target.value)
    const searchResults = searchCountriesByName(event.target.value);
  
    if (searchResults.length > 10) {
      setTooManyMatches(true)
      setCountryDisplay([])
    } else if (searchResults.length > 1) {
      setTooManyMatches(false)
      setCountryDisplay([...searchResults])
    } else if (searchResults.length === 1) {
      getCountryData(searchResults[0])
        .then(countryData => {
          setCountryDisplay([countryData])
          setTooManyMatches(false)
        })
    } else {
      setCountryDisplay([])
      setTooManyMatches(false)
    }
  }

  const searchCountriesByName = (countrySearchValue) => {
    return allCountries.filter(countryName => {
      countryName = countryName.toLowerCase();
      return countryName.includes(countrySearchValue)
    })
  }

  const handleShowCountry = async () => {
    const countryData = await getCountryData(event.target.id)
    if (countryData) setCountryDisplay([countryData])
  }

  const display = () => {
    if (countryDisplay.length === 1) return <CountryCard  {...countryDisplay[0]} />
    else if (countryDisplay.length === 0 && !tooManyMatches) return <p>No country found</p>
    else return <SearchList searchResults={countryDisplay} handleButtonClick={() => handleShowCountry()} />
  }
   
  return (
    <>
      <span>{!allCountries && 'Loading...'}</span>
      <div>
        <label htmlFor="countries">Find countries: </label>
        <input type='text' name='countries' value={countrySearch} onChange={handleCountryChange}></input>
      </div>
      { tooManyMatches && <p>Too many matches. Please specify further</p> }
      {display()}
    </>
  )
}


const SearchList = ({ searchResults, handleButtonClick }) => {
 return searchResults.map(countryName =>
    <div key={countryName}>
      <span style={{margin: 0, padding: '.5em 0'}}>{countryName}</span>
      <Button id={countryName} text={'Show country'} handleClick={handleButtonClick} />
    </div>
  )
}

const Button = ({ text, handleClick, id }) => <button id={id} onClick={handleClick}>{text}</button>

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
