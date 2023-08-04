import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link, Route } from "react-router-dom";
import { updateCard, readCard, readDeck, createCard } from "../utils/api";
// import CardForm from "./CardForm";
//This function will be used for filling out new flashcards as well as editting existing ones
function CardForm() {
  //initializing variables
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const [card, setCard] = useState();
  const [deck, setDeck] = useState();
  const initFormData = {
    front: "",
    back: "",
  };
  const [formData, setFormData] = useState(initFormData);
  //useEffect to make calls to API
  useEffect(() => {
    async function getCard() {
      const deck = await readDeck(deckId);
      const cardToEdit = await readCard(cardId);
      setDeck(deck);
      setCard(cardToEdit);
    }
    if (cardId) {
      getCard();
    }
  }, []);
  //NewCard Event handlers
  const doneHandler = (e) => {
    e.preventDefault();
    history.push(`/decks/${deckId}`);
    window.location.reload(true);
  };
  const changeHandler = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const newSubmitHandler = (e) => {
    e.preventDefault();
    createCard(Number(deckId), formData);
    setFormData(initFormData);
  };
  //EditCard EventHandlers
  const editHandler = (e) => {
    e.preventDefault();
    setCard({
      ...card,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    updateCard(card);
    history.push(`/decks/${Number(deckId)}`);
    window.location.reload(true);
  };
  return (
    <React.Fragment>
      {card ? (
        <form onSubmit={submitHandler}>
          <label htmlFor="front">Front</label>
          <div>
            <textarea
              name="front"
              id="front"
              onChange={editHandler}
              value={card.front}
            ></textarea>
          </div>
          <label htmlFor="back">Back</label>
          <div>
            <textarea
              name="back"
              id="back"
              onChange={editHandler}
              value={card.back}
            ></textarea>
          </div>
          <Link to={`/decks/${Number(deckId)}`}>
            <button className="btn btn-secondary">Cancel</button>
          </Link>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      ) : (
        <form onSubmit={newSubmitHandler}>
          <h4>Front</h4>
          <textarea
            name="front"
            placeholder="Front side of card"
            onChange={changeHandler}
            value={formData.front}
            required
          ></textarea>
          <h4>Back</h4>
          <textarea
            name="back"
            placeholder="Back side of card"
            onChange={changeHandler}
            value={formData.back}
            required
          ></textarea>
          <div>
            <button className="btn btn-secondary" onClick={doneHandler}>
              Done
            </button>
            <button type="submit" className="btn btn-primary m-2">
              Save
            </button>
          </div>
        </form>
      )}
    </React.Fragment>
  );
}

export default CardForm;
