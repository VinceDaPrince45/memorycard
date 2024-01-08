import getPokemon from "./Images";
import React, { useEffect,useState } from "react";

function shuffleArray(array) {
    console.log(array.length)
    if (array == undefined || array.length == 0) {
        // call function to call API and get an arbitrary number of items
        const pokemonArray = [];
        getPokemon(pokemonArray);
        array = pokemonArray;
        console.log("nothing");
    }
    else {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        console.log("shuffling")
    }
    console.log(array)
}


export default function Test() {
    const [cards,setCards] = useState([1,2,3,4]);
    const [selected,setSelected] = useState([]);
    let lost = false;

    useEffect(
        () => {
            // execute side effect
            // check if chosen card is in selected
                // if so, rerender so game is over
                // else, add chosen card to selected ; setSelected([...chosen card]) and shuffle cards and setCards to shuffled
            return () => {
                // cleanup function
                if (lost) {
                    <div>Lost</div>
                } else {
                    cards.map((item) => {
                        <div key={item}>item</div>
                    })
                }
            }
        },
        [] // dependencies
    )
}
// move fetch data functions into useeffect inside Test 
// have dependencies by an array that tracks the card user clicks
// on first render useeffect will fetch data and setstate so that it rerenders new cards
// after that, the second dependency will be when the array of tracked cards changes, which will setstate to shufled array