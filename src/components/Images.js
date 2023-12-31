const pokemonCount = 1302;

function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function getImages() {
    const randomNum = randomInt(1,pokemonCount) - 1;
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + randomNum, {mode: 'cors'});
        const pokemonData = await response.json();
        console.log(pokemonData);
    } catch (errror) {
        console.log("failed");
    }
}

export default getImages;