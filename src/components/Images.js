const pokemonCount = 1302;

function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function getPokemon(array) {
    for (let i = 0; i < 10; i++) {
        const randomNum = randomInt(1,pokemonCount) - 1;
        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0", {mode: 'cors'});
            const pokemonData = await response.json();
            array.push(pokemonData.results[randomNum-1]);
        } catch (errror) {
            console.log("failed");
        }
    }
    console.log(array);
}

export default getPokemon;