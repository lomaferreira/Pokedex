const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

fetch(url)
  //acontece quando a promise é cumprida
  .then((response) => response.json())
  //pega dentro do json o results(lista de pokemons)
  .then((jsonBody) => jsonBody.results)
  //recebe o return do jsonBody()
  .then((pokemonList) => {
    debugger;
    console.log(pokemonList);
  })
  .catch((error) => {
    console.error(error);
  });
