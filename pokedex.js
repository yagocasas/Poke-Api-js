const pokedex$$ = document.querySelector("#pokedex");
const ALL_POKEMONS_INFO = [];

const getAllPokemons = () =>
  fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
    .then((response) => response.json())
    .then((response) => response.results)
    .catch((error) =>
      console.log("Error obteniendo todos los pokemons", error)
    );

const getOnePokemon = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();

    const pokemon = {
      name: result.name,
      id: result.id,
      types: result.types.map((element) => element.type.name),
      image: result.sprites.other.dream_world.front_default,
    };

    return pokemon;
  } catch (error) {
    console.log("Error obteniendo cada pokemon " + url, error);
  }
};

const renderTypes = (types, container) => {
  const div$$ = document.createElement("div");
  div$$.classList.add("card-subtitle", "types-container");

  types.forEach((type) => {
    const typeContainer$$ = document.createElement("p");
    typeContainer$$.setAttribute("pokemon-type", type);
    typeContainer$$.style.backgroundColor = typeColors[type];
    typeContainer$$.classList.add("type");
    typeContainer$$.textContent = type;

    div$$.appendChild(typeContainer$$);
  });

  container.appendChild(div$$);
};

const cleanPokedex = () => (pokedex$$.innerHTML = "");

const renderNoResults = () => {
  const li$$ = document.createElement("li");

  const p$$ = document.createElement("p");
  p$$.classList.add("card-title");
  p$$.textContent = "No se encuentran resultados";

  li$$.appendChild(p$$);
  pokedex$$.appendChild(li$$);
};

const renderPokemonCard = (poke) => {
  const li$$ = document.createElement("li");
  li$$.classList.add("card");

  const img$$ = document.createElement("img");
  img$$.src = poke.image;
  img$$.alt = poke.name;
  img$$.classList.add("imagen");

  // const divInfo$$ = document.createElement("div");
  // divInfo$$.classList.add("divInfo");

  const h5$$ = document.createElement("h5");
  h5$$.classList.add("card-title");
  h5$$.textContent = poke.name;

  const divId$$ = document.createElement("div");
  divId$$.classList.add("card-subtitle");
  divId$$.textContent = "#" + poke.id;

  li$$.appendChild(img$$);
  li$$.appendChild(divId$$);
  li$$.appendChild(h5$$);

  renderTypes(poke.types, li$$);

  pokedex$$.appendChild(li$$);
};

const renderPokemons = (pokemons) => {
  cleanPokedex();
  if (!pokemons.length) renderNoResults();
  pokemons.forEach((pokemon) => renderPokemonCard(pokemon));
};



const init = async () => {
  const allPokemons = await getAllPokemons();

  for (const pokemon of allPokemons) {
    const pokemonInfo = await getOnePokemon(pokemon.url);
    ALL_POKEMONS_INFO.push(pokemonInfo);
  }
  console.log("allPokemonsInfo", ALL_POKEMONS_INFO);
  renderPokemons(ALL_POKEMONS_INFO);
};

window.onload = init;
