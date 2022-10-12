function fetchCountries(searchQuery) {
  const link = `https://restcountries.com/v3.1/name/${searchQuery}`;
  return fetch(link).then(response => {
    return response.json();
  });
}

export { fetchCountries };
