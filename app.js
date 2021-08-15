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
            // console.log(pokemons)

            //reduce uitliza-se quando é necessário transformar um Array em outro tipo de dado
            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                accumulator += 
                `<li class="card">${pokemon.name}</li>`
                return accumulator
            }, '')

            console.log(lisPokemons)
        })
}

fetchPokemon()