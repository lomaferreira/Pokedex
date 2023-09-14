function convertPokemonToLi(pokemon) {
  return `
    <li class="pokemon">
      <span class="number">#001</span>
      <span class="name">${pokemon.name}</span>
        <div class="details">
          <ol class="types">
            <li class="type">grass</li>
            <li class="type">poison</li>
          </ol>
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
            alt="${pokemon.name}">
        </div>
    </li>
  `;
}

const pokemonList = document.getElementById("pokemonList");

pokeApi
  .getPokemons()
  //recebe o return do jsonBody(), por default é uma lista vazia
  .then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    //Passa pela lista(obj) e transforma em um item  de lista html e uni tudo
    pokemonList.innerHTML = newHtml;
    // const listItems=[]
    // for (let i = 0; i < pokemons.length; i++) {
    //   const pokemon = pokemons[i];
    //   listItems.push(convertPokemonToLi(pokemon))
    // }
    // console.log(listItems)
  });
