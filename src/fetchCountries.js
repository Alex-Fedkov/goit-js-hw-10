function fetchCountries(name) {
  // const URL = `https://newsapi.org/v2/everything?q=${query}`;
  // return fetch(URL, options).then((response) => response.json());

    const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  return fetch(url).then((response) => {
    console.log("response", response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
}

export default fetchCountries;