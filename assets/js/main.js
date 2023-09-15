const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const limit = 10;
let offset = 0;

const maxRecords = 251;

function loadPokemonItems(offset, limit) {
  function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
      <span class="number">#${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>
        <div class="details">
          <ol class="types">
          ${pokemon.types
            .map((type) => `<li class="type ${type}">${type}</li>`)
            .join("")}
          </ol>
          <img src="${pokemon.photo}"
            alt="${pokemon.name}">
        </div>
    </li>
  `;
  }

  pokeApi
    .getPokemons(offset, limit)
    //recebe o return do jsonBody(), por default é uma lista vazia
    .then((pokemons = []) => {
      //Passa pela lista(obj) e transforma em um item  de lista html e uni tudo
      const newHtml = pokemons.map(convertPokemonToLi).join("");
      //Conacatena as paginas html
      pokemonList.innerHTML += newHtml;
    });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  //limitando os pokemons a 1º geração
  const qtdRecordsNexPage = offset + limit;
  if (qtdRecordsNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(offset, newLimit);

    //removendo o button atraves do pai dele
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(offset, limit);
  }
});
