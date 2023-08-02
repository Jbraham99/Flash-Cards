import React from "react";
import {Link} from "react-router-dom";
import { deleteDeck, deleteCard } from "../utils/api";
function DeckView({deck}) {
    const deleteHandler = (e) => {
        e.preventDefault();
        deleteDeck(e.target.id)
        window.location.reload(true)
    }
    return (
        <div className="border">
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
            <div className="row">
            <div className="col">
                <Link to={`/decks/${deck.id}`}>
                <button className="btn btn-secondary" key={deck.id}>View</button>
                </Link>
                <Link to={`/decks/${deck.id}/study`}>
                    <button className="btn btn-primary" key={deck.id}>Study</button>
                </Link>
            </div>
            <div className="col">
            <button className="btn btn-danger" onClick={deleteHandler} id={deck.id}>🗑️</button>
            </div>
            </div>
        </div>
    )
}

export default DeckView