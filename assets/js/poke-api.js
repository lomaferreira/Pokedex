const pokeApi = {};

//convertendo o modelo da estrutura do PokeApi para o modelo abaixo
function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.order;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type]=types

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

return pokemon
}


//Requisição de  detalhes do pokemon
pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
};

//Requisiçâo da PokeApi
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
