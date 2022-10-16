const pokedex$$ = document.querySelector('#pokedex');
console.log(pokedex$$);
const ALL_POKEMONS_INFO = [];// Cuando una variable se declara en scope global para ser usada por otros, se hace en mayúsculas.

function getAllPokemons () {
    return fetch ('https://pokeapi.co/api/v2/pokemon/?limit=151')
    .then((response) => response.json())
    .then((response) => {
        return response.results
    })
    .catch((error) => console.log('Error obteniendo todos los pokemons', error));
};

function getOnePokemon (url) {
    return fetch (url)
    .then((response) => response.json())
    .then((response) => {
        return response
    })
    .catch((error) => console.log ('Error obteniendo pokemon individualmente', error))
};

/** Aquí hago la prueba directamente en el html y me sirve luego de guía pasándolo a este archivo
 * <li class="card">
          <img class="card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="">
          <p class="card-title">Bulbasur</p>
          <div class="card-subtitle">Tipo Fuego</div>
        </li>} pokemons 
 */


function renderPokemons(pokemons) {

    pokemons.forEach((poke) => {
    
    const li$$ = document.createElement('li');
    li$$.classList.add('card');

    const img$$ = document.createElement('img');
    img$$.src = poke.sprites.front_default;
    img$$.alt = poke.name;

    const p$$ = document.createElement('p');
    p$$.classList.add('card-title');
    p$$.textContent = poke.name;

    const div$$ = document.createElement('div');
    div$$.classList.add('card-subtitle');
    div$$.textContent = poke.types[0].type.name;

    li$$.appendChild(img$$);
    li$$.appendChild(p$$);
    li$$.appendChild(div$$);

    pokedex$$.appendChild(li$$);

    });

}

//esta función es la que me va a generar todo. Creo funciones fuera y las llamo aquí.
async function init () {
    console.log('Ejecutando peticiones pokédex');

    const allPokemons = await getAllPokemons();//hemos guardado en allPokemons el array de objetos con name y url de cada pokemon
    // console.log('allPokemons:', allPokemons);

    for (const pokemon of allPokemons) {
        const pokemonInfo = await getOnePokemon(pokemon.url);
        ALL_POKEMONS_INFO.push(pokemonInfo);
    }
    console.log('allPokemonsInfo', ALL_POKEMONS_INFO);
    renderPokemons(ALL_POKEMONS_INFO);
}


window.onload = init;


