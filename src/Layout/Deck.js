import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory, useRouteMatch } from "react-router-dom";
import { deleteDeck, deleteCard, readDeck } from "../utils/api";

function Deck() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState();
  const [cards, setCards] = useState([]);
  useEffect(() => {
    async function getDeck() {
      const deck = await readDeck(Number(deckId));
      // console.log("****", deck.cards)
      setDeck(deck);
      setCards(deck.cards);
    }
    if(deckId){
      getDeck();}
  }, []);
  // console.log("deck from Deck: ", deck);
  // console.log("cards from Deck", cards);
  const deleteDeckHandler = (e) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to delete this deck?`)) {
      deleteDeck(e.target.id);
      history.push("/");
      window.location.reload(true);
    }
  };
  const deleteCardHandler = (e) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to delete this card?`)) {
      deleteCard(e.target.id);
      window.location.reload(true);
    }
  };
  // console.log("cards from Deck:",cards)
  return (
    <div>
      {deck ? (
        <div key={deckId}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">🏠 Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {deck.name}
              </li>
            </ol>
          </nav>
          <h2>{deck.name}</h2>
          <p>{deck.description}</p>
          <div className="row">
            <div className="col">
              <Link to={`/decks/${deck.id}/edit`}>
                <button className="btn btn-secondary">Edit</button>
              </Link>
              <Link to={`/decks/${deck.id}/study`}>
                <button className="btn btn-primary">Study</button>
              </Link>
              <Link to={`/decks/${deckId}/cards/new`}>
                <button className="btn btn-primary">➕ Add Cards</button>
              </Link>
            </div>
            <div className="col">
              <button
                type="delete"
                className="btn btn-danger"
                onClick={deleteDeckHandler}
                id={deck.id}
              >
                🗑️
              </button>
            </div>
          </div>

          <h1>Cards</h1>
          {cards.map((card) => {
            return (
              <div className="row border bg-light mb-3" key={card.id}>
                <div className="col">
                  <p>{card.front}</p>
                </div>
                <div className="col">
                  <p>{card.back}</p>
                  <Link to={`${url}/cards/${card.id}/edit`}>
                    <button className="btn btn-secondary">Edit</button>
                  </Link>

                  <button
                    type="delete"
                    className="btn btn-danger"
                    onClick={deleteCardHandler}
                    id={card.id}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Deck;
