const pokeApi = {};

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url).then((response) => response.json());
};

pokeApi.getPokemons = (offset = 0, limit = 10) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
  return (
    fetch(url)
      //converte a lista pra json
      .then((response) => response.json())
      //pega dentro do json o results(lista de pokemons)
      .then((jsonBody) => jsonBody.results)
      //Passa pela lista(obj) e transforma em um item  de lista html e uni tudo
      .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
      //lista de promessas de todos os pokemons
      .then((detailRequests) => Promise.all(detailRequests))
      .then((pokemonsDetails) => pokemonsDetails)
      .catch((error) => console.error(error))
  );
};
