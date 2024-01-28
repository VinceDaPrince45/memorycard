import React, { useEffect,useState } from "react";

function shuffleArray(array) {
    const tempArray = [...array]
    if (tempArray == undefined || tempArray.length == 0) {
        // call function to call API and get an arbitrary number of items
        console.log("nothing");
        return [];
    }
    else {
        for (var i = tempArray.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = tempArray[i];
            tempArray[i] = tempArray[j];
            tempArray[j] = temp;
        }
        return tempArray;
    }
}

function Cards({array}) {
    const pokemonList = array.map((pokemon) => <img src={pokemon.img} key={pokemon.number} className="pokemon"/>)
    return (
    <>
        <div>
            <h1>Pokemon:</h1>
            <ul>
                {pokemonList}
            </ul>
        </div>
    </>
    );
}

export default function Test() {
    const [pokemonList,setPokemonList] = useState([]);
    const [pokemonChosen,setPokemonChosen] = useState([]);

    // useEffect for mounting
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const pokemonArray = [];
    //         const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0", {mode: 'cors'});
    //         const pokemonData = await response.json();
    //         for (let i = 0; i < 10; i++) {
    //             const randomNum = Math.floor(Math.random() * (1302 - 1 + 1) + 1) - 1;
    //             pokemonArray.push(pokemonData.results[randomNum]);
    //         }
    //         setPokemonList(pokemonArray);
    //     }
    //     fetchData().catch(console.error);
    // }, []);
    useEffect(() => {
        const fetchData = async () => {
            const pokemonArray = [];
            const url = "https://pokeapi.co/api/v2/pokemon/";
            for (let i = 0; i < 10; i++) {
                const randomNum = Math.floor(Math.random() * (1025 - 1) + 1);
                const pokemonLink = url + randomNum;
                const response = await fetch(pokemonLink, {mode: 'cors'});
                const pokemonData = await response.json();
                pokemonArray.push({number:randomNum,img:pokemonData.sprites.front_default});
            }
            setPokemonList(pokemonArray);
        }
        fetchData().catch(console.error);
    }, []);

    return (<>
    <div>
        <button onClick={()=>{console.log(pokemonList);}}>Display Pokemon</button>
        <button onClick={()=>{setPokemonList(shuffleArray(pokemonList));}}>Shuffle Pokemon</button>
    </div>
    <Cards array={pokemonList} />
    </>);
}

// move fetch data functions into useeffect inside Test 
// have dependencies by an array that tracks the card user clicks
// on first render useeffect will fetch data and setstate so that it rerenders new cards
// after that, the second dependency will be when the array of tracked cards changes, which will setstate to shufled array