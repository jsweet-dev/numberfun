import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [number, setNumber] = useState(42);
  const [direction, setDirection] = useState('ceil');
  const [fact, setFact] = useState("");

  const updateFact = () => {
    //update the fact field
    fetch(`https://numbersapi.com/${number}/trivia?json&notfound=${direction}`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        if(parseInt(data.number) !== number) setNumber(data.number);
        setFact(data.text)
      })
      .catch(setFact(`Couldn't retrieve a fact for ${number}.`));
  }

  const handleNumberChange = (num) => {
    if(num>=Number.MAX_SAFE_INTEGER){
      num = 1;
    }
    num < number ? setDirection("floor") : setDirection("ceil");
    setNumber(num);
  }

  useEffect(updateFact,[number, direction]);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Pick a number for interesting trivia!</h2>
        <h6 style={{
          padding: "0",
          margin: "0"
        }}>(unremarkable numbers will automatically be skipped)</h6>
        <p>
        <input
            id='number'
            type="number"
            min={1}
            step={1}
            value={number}
            onChange={event => {
                handleNumberChange(event.target.valueAsNumber)
            }}
        />
        </p>
        <p id='factDisplay'>
          { fact }
        </p>
      </header>
    </div>
  );
}

export default App;
