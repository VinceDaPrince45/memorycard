const pokemonCount = 1302;

function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function getPokemon() {
    const pokemonArray = [];
    
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0", {mode: 'cors'});
        const pokemonData = await response.json();
        for (let i = 0; i < 10; i++) {
            const randomNum = randomInt(1,pokemonCount) - 1;
            pokemonArray.push(pokemonData.results[randomNum]);
        }
    } catch (errror) {
        console.log("failed");
    }
    console.log(pokemonArray);
    return pokemonArray;
}

export default getPokemon;