import React, { useState, useEffect } from 'react';
import Card from './Card';

function Cards() {
  const [cards, setCards] = useState([]);

  // you need intall the json server to run the backend api
  // npm i json-server -g
  // once installed globally, run the following code in terminal
  // json-server --watch --port 4000 ./api/info.json
  const fetchData = () => {
    fetch('http://localhost:4000/cards')
      .then(res => res.json())
      .then(data => {
        setCards(data);
      })
      .catch(e => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {cards &&
        cards.length > 0 &&
        cards.map(card => <Card key={card._id} card={card} />)}
    </>
  );
}

export default Cards;
