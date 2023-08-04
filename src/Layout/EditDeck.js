import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
function EditDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState();
  useEffect(() => {
    async function getDeck() {
      const deck = await readDeck(deckId);
      setDeck(deck);
    }
    getDeck();
  }, []);
  return (
    <React.Fragment>
      {deck ? (
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">🏠 Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
              </li>
              <li className="breadcrumb-item active">Edit Deck</li>
            </ol>
          </nav>
          <h2>Edit Deck</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </React.Fragment>
  );
}
export default EditDeck;
