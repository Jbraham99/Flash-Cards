import React from "react";
import {Link} from "react-router-dom";
import { deleteDeck, deleteCard } from "../utils/api";
function DeckView({deck}) {
    const deleteHandler = (e) => {
        e.preventDefault();
        if(window.confirm(`Are you sure you would like to delete this deck?`)) {
            deleteDeck(e.target.id);
            window.location.reload(true)
        }
        
    }
    return (
        <div className="border">
            <div className="row">
                <div className="col">
                    <h2>{deck.name}</h2>
                </div>
                <div className="col">
                    <p>{deck.cards.length} cards</p>
                </div> 
            </div>
            
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