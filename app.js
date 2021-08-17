const fetchPokemon = () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = []

    //pegar todos os pokemons e jogar no array pokemonPromises
    for (let i = 1; i <= 150; i++) {
        // metodo Fetch usado para requisições AJAX Assincrono (buscar dados direto da rede sem a necessidade de recarregar a página)
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))  
    }

    Promise.all(pokemonPromises)
        .then(pokemons => {

            //REDUCE e MAP uitlizam-se quando é necessário transformar um Array em outro tipo de dado
            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)

                accumulator += 
                `<li class="card ${types[0]}">
                <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"/>
                    <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                    <p class= "card-subtitle">${types.join(' | ')}</p>
                </li>`


                return accumulator
            }, '')

            //linkando elementos do HTML no JS
            const ul = document.querySelector ('[data-js="pokedex"]') 

            ul.innerHTML = lisPokemons
        })
}

fetchPokemon()
