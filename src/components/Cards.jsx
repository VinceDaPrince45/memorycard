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
    const pokemonList = array.map((pokemon) => <img src={pokemon.img} key={pokemon.number} className="pokemon" id={pokemon.number}/>)
    return (
    <>
        <div className="pokemon-list">
            <ul>
                {pokemonList}
            </ul>
        </div>
    </>
    );
}

function Gamestate({array,chosenArray}) {
    return (
        (array.length==chosenArray.length)
        ?
        <div>You Won!</div>
        :
        <div>You Lost!</div>
    );
}

function Scoreboard({array,chosenArray,gamestate}) {
    return (
        (gamestate)
        ?
        <>
            <h1>Game Over</h1>
            <Gamestate array={array} chosenArray={chosenArray} />
            <div>Score: {chosenArray.length}</div>
        </>
        :
        <>
            <div>Score: {chosenArray.length}</div>
        </>
    );
}

export default function Test() {
    const [pokemonList,setPokemonList] = useState([]);
    const [pokemonChosen,setPokemonChosen] = useState([]);
    const [gameover,setGameover] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const pokemonArray = [];
            const url = "https://pokeapi.co/api/v2/pokemon/";
            for (let i = 0; i < 10; i++) { // need to add check so that there r no duplicate pokemon
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

    useEffect(() => {
        // function to detect which card is clicked
        if (pokemonList.length == pokemonChosen.length && pokemonChosen.length != 0) {
            setGameover(true);
        }
        document.querySelector(".pokemon-list").onclick = function(e) {
            if (e.target.className == "pokemon") {
                if (!pokemonChosen.includes(e.target.id)) {
                    console.log(pokemonList);
                    setPokemonChosen([...pokemonChosen,e.target.id]);
                    setPokemonList(shuffleArray(pokemonList));
                } else {
                    setGameover(true);
                }
            }
        }
    }, [pokemonChosen,pokemonList]);

    return (
    (!gameover)
    ?
    <>
        <div>
            <button onClick={()=>{console.log(pokemonList);}}>Display Pokemon</button>
            <button onClick={()=>{console.log(pokemonChosen);}}>Display Pokemon Chosen</button>
            <button onClick={()=>{setPokemonList(shuffleArray(pokemonList));}}>Shuffle Pokemon</button>
        </div>
        <Scoreboard array={pokemonList} chosenArray={pokemonChosen} gamestate={gameover}/>
        <Cards array={pokemonList}/>
    </>
    :
    <>
        <Scoreboard array={pokemonList} chosenArray={pokemonChosen} gamestate={gameover}/>
    </>
    );
}

// move fetch data functions into useeffect inside Test 
// have dependencies by an array that tracks the card user clicks
// on first render useeffect will fetch data and setstate so that it rerenders new cards
// after that, the second dependency will be when the array of tracked cards changes, which will setstate to shufled array