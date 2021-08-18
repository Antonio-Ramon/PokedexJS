const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

// metodo Fetch usado para requisições AJAX Assincrono (buscar dados direto da rede sem a necessidade de recarregar a página)
const generatePokemonPromises = () => Array(150).fill().map((_, index) => 
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

//REDUCE e MAP uitlizam-se quando é necessário transformar um Array em outro tipo de dado
const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
        const elementTypes = types.map(typeInfo => typeInfo.type.name)

        accumulator += `

        <li class="card ${elementTypes[0]}">
        <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"/>
            <h2 class="card-title">${id}. ${name}</h2>
            <p class= "card-subtitle">${elementTypes.join(' | ')}</p>
        </li>`

        return accumulator
    }, '')

//linkando elementos do HTML no JS
const insertPokemonIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonIntoPage)
