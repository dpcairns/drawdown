import { useState } from 'react';
import './App.css';
import cards from './cards.js';

const cardCount = cards.reduce((acc, curr) => {
  if (acc[curr.type]) {
    acc[curr.type]++
  } else {
   acc[curr.type] = 1
  }

  return acc
 }, {});

function App() {
  const [filter, setFilter] = useState('');
  const countNodes = Object.keys(cardCount).map(key => <div>{key}:{cardCount[key]}</div>);

  return (
    <div className="App">
      <h1>{cards.length} total cards</h1>
      <h1> {countNodes} </h1>
      <div>Search: <input value={filter} onChange={e => setFilter(e.target.value)}/></div>
      <header>

        {
          cards
            .filter(card => filter 
                ? card.name.includes(filter) || card.type.includes(filter) || card.text.includes(filter)
                : true
            )
          .map(card => <div 
          className={`card ${card.type}`}>
            <h3>{card.name}</h3>
            <div>{card.text}</div>
            {
              card.pay && <div>To activate, pay {card.pay} and spend an action`</div>
            }
          </div>)
        }
      </header>
    </div>
  );
}

export default App;
