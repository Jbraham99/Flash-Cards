import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, Link , Switch, Route, useRouteMatch } from "react-router-dom";
import { readCard } from "../utils/api"
import NewCards from "./NewCards";
import NotFound from "./NotFound";

function StudyDeck({data}) {
    const {deckId} = useParams()
    const {path, url} = useRouteMatch();
    console.log("studyDeck path:", path)//"/decks/:deckId/study"
    // console.log("Cards in deck 1:", data[0].cards)
    console.log(data)
    const [currentCard, setCurrentCard] = useState(0)
    const [cardSide, setCardSide] = useState(true)
    const cardFlipper = (e) => {
        e.preventDefault();
        setCardSide(!cardSide)
    }
    const nextHandler = (e) => {
        e.preventDefault();
        setCurrentCard(currentCard + 1)
        setCardSide(true)
    }
    return (
        <Switch>
            <Route path={path}>
        <div>
            {data.map((deck)=>{
                const cards = deck.cards
                
                if(deck.id === Number(deckId)) {
                    const cardsLength = cards.length
                    return (
                        <div key={deck.id}>
                        <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item" aria-current="page"><Link to="/">🏠 Home</Link></li>
                            <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                            <li className="breadcrumb-item active">Study</li>
                        </ol>
                        </nav>
                        <h1>{deck.name}: Study</h1>
                        {cardsLength < 3 ? 
                        <div>
                            <h4>Not enough cards.</h4>
                            <p>{`You need at least 3 cards to study. There are ${cardsLength} cards in this deck`}</p>
                            <Link to={`/decks/${deck.id}/cards/new`}><button className="btn btn-primary">➕ Add Cards</button></Link>
                        </div> :
                        cards.map((card, index)=>{
                            if(currentCard === index) {
                                return (
                                    <div key={card.id} className="border bg-light p-3">
                                    <h3>{`Card ${index + 1} of ${cardsLength}`}</h3>
                                    {cardSide ? <h5>{card.front}</h5> : <h5>{card.back}</h5>}
                                    <button onClick={cardFlipper} className="btn btn-secondary m-1">Flip</button>
                                    {!cardSide && <button onClick={nextHandler} key={card.id} className="btn btn-primary ms-1">Next</button>}
                                    </div>
                                )
                            }
                        })}
                        </div>
                    )
                }
            })}
        </div>
        </Route>
        </Switch>
    )
}

export default StudyDeck