import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";
function EditDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState();
  useEffect(() => {
    async function getDeck() {
      const deck = await readDeck(deckId);
      setDeck(deck);
    }
    getDeck();
  }, []);
  const [formData, setFormData] = useState(deck);
  const changeHandler = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    updateDeck(formData);
    history.push("/");
    window.location.reload(true);
  };
  console.log("deck from EditDeck", deck);
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
