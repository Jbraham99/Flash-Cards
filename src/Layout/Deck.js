import React from "react";
import { useParams, Link, useHistory, useRouteMatch} from "react-router-dom";
import { deleteDeck, deleteCard } from "../utils/api";

function Deck({data}) {
    const {url} = useRouteMatch();
    const history = useHistory();
    const {deckId} = useParams();
    console.log("Deck params: ", Number(deckId))
    console.log("Deck data:", data)
    const deleteDeckHandler = (e) => {
        e.preventDefault();
        deleteDeck(e.target.id)
        history.push("/")
        window.location.reload(true)
    }
    const deleteCardHandler = (e) => {
        e.preventDefault();
        deleteCard(e.target.id)
        window.location.reload(true)
    }
    return (
        <div>
            {data.map((deck)=>{
                if(deck.id === Number(deckId)) {
                    const cards = deck.cards
                    console.log(cards)
                    return (
                        <div>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">🏠 Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
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
                                    <Link to={`/decks/${deck.id}/cards/new`}>
                                        <button className="btn btn-primary">➕ Add Cards</button>
                                    </Link>
                                    
                                </div>
                                <div className="col">
                                    <button type="delete" className="btn btn-danger" onClick={deleteDeckHandler} id={deck.id}>🗑️</button>
                                </div>
                                
                            </div>
                            
                            <h1>Cards</h1>
                            {cards.map((card)=>{
                                return (
                                    <div className="row border bg-light mb-3">
                                        <div className="col">
                                            <p>{card.front}</p>
                                        </div>
                                        <div className="col">
                                            <p>{card.back}</p>
                                            <Link to={`${url}/cards/${card.id}/edit`}>
                                                <button className="btn btn-secondary">Edit</button>
                                            </Link>
                                            
                                            <button type="delete" className="btn btn-danger" onClick={deleteCardHandler} id={card.id}>🗑️</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default Deck;