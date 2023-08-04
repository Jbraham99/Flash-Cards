import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link, Route } from "react-router-dom";
import { updateCard, readCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

function EditCard() {
    const history = useHistory();
    const {deckId, cardId} = useParams();
    const [card, setCard] = useState()
    const [deck, setDeck] = useState()
    useEffect(()=>{
        async function getCard() {
            const deck = await readDeck(deckId);
            const cardToEdit = await readCard(cardId)
            setDeck(deck)
            setCard(cardToEdit)
        }
        getCard()
    }, [])
    // const [formData, setFormData] = useState(card)
    const changeHandler = (e) => {
        e.preventDefault();
        setCard({
            ...card,
            [e.target.name]: e.target.value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        updateCard(card)
        history.push(`/decks/${Number(deckId)}`);
        window.location.reload(true)
    }
    return (
        <React.Fragment>
            {deck && card ? <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name} deck</Link></li>
                    <li className="breadcrumb-item active">{`Edit Card: ${card.id}`}</li>
                </ol>
            </nav> : <p>Loading...</p>}
            
            <h2>Edit Card</h2>
        </React.Fragment>
    )
}

export default EditCard