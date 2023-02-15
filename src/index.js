import './css/styles.css';

import fetchCountries from "./fetchCountries.js";
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
// const newsWrapper = document.getElementById("newsWrapper");

inputEl.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const value = inputEl.value.trim();
  console.log("value", value);

  if (value === "") {
    clear();
    return;
  }

  fetchCountries(value)
    .then(name => {
      console.log("data", name);

      createMarkup(name);
    })
    .catch(onError)
}

function onError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
  clear();
}

function createMarkup(countries) {
  if (countries.length > 10) {
    countryInfo.innerHTML = "";
    countryList.innerHTML = "";
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length >= 2 && countries.length <= 10) {
    const countriesItems = countries.map(({ name, flags }) => `
      <li class="country-cards">
        <img src=${flags.svg} class="flag" width=40px height=30px/>
        <p class="country-names">${name.official}</p>
      </li>
    `);
    countryInfo.innerHTML = "";
    countryList.innerHTML = countriesItems.join("");
  } else if (countries.length === 1) {
    const { name, capital, population, flags, languages } = countries[0];
    const country = `
      <div>
        <div class="country-card">
          <img src=${flags.svg} class="flag" width=40px height=30px/>
          <p class="country-name">${name.official}</p>
        </div>
        <p class="country-names"><b>Capital: </b>${capital}</p>
        <p class="country-names"><b>Population: </b>${population}</p>
        <p class="country-names"><b>Languages: </b>${Object.values(languages).join(", ")}</p>
      </div>
    `;
    countryInfo.innerHTML = country;
    countryList.innerHTML = "";
  } 
  
}

function clear() {
  countryInfo.innerHTML = "";
  countryList.innerHTML = "";
};