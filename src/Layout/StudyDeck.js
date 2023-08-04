import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

function StudyDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState();
  const [cards, setCards] = useState([]);
  useEffect(() => {
    async function getDeck() {
      const deck = await readDeck(deckId);
      setDeck(deck);
      const cards = await deck.cards;
      setCards(cards);
    }
    getDeck();
  }, []);
  // console.log(deck)
  const [currentCard, setCurrentCard] = useState(0);
  const [cardSide, setCardSide] = useState(true);
  const cardFlipper = (e) => {
    e.preventDefault();
    setCardSide(!cardSide);
  };
  const nextHandler = (e) => {
    e.preventDefault();
    if (Number(e.target.id) < cards.length) {
      setCurrentCard(currentCard + 1);
      setCardSide(true);
    } else if (window.confirm(`would you like to restart?`)) {
      window.location.reload(true);
    } else {
      history.push("/");
    }
  };
  //   console.log(deck);
  const studyCards =
    deck && cards.length < 3 ? (
      <div>
        <h4>Not enough cards.</h4>
        <p>{`You need at least 3 cards to study. There are ${cards.length} cards in this deck`}</p>
        <Link to={`/decks/${deck.id}/cards/new`}>
          <button className="btn btn-primary">➕ Add Cards</button>
        </Link>
      </div>
    ) : (
      cards.map((card, index) => {
        const cardOutOf = index + 1;
        if (currentCard === index) {
          return (
            <div key={card.id} className="border bg-light p-3">
              <h3>{`Card ${cardOutOf} of ${cards.length}`}</h3>
              {cardSide ? <h5>{card.front}</h5> : <h5>{card.back}</h5>}
              <button onClick={cardFlipper} className="btn btn-secondary m-1">
                Flip
              </button>
              {!cardSide && (
                <button
                  id={cardOutOf}
                  onClick={nextHandler}
                  key={cardOutOf}
                  className="btn btn-primary ms-1"
                >
                  Next
                </button>
              )}
            </div>
          );
        }
      })
    );
  return (
    <React.Fragment>
      {deck ? (
        <div key={deck.id}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item" aria-current="page">
                <Link to="/">🏠 Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
              </li>
              <li className="breadcrumb-item active">Study</li>
            </ol>
          </nav>
          <h1>{deck.name}: Study</h1>
          {studyCards}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </React.Fragment>
  );
}

export default StudyDeck;
