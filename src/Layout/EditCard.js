import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { updateCard, readCard, readDeck } from "../utils/api";

function EditCard({data}) {
    const history = useHistory();
    const {deckId, cardId} = useParams();
    const [card, setCard] = useState()
    const [deck, setDeck] = useState()
    useEffect(()=>{
        async function getCard() {
            const card = await readCard(cardId);
            setCard(card)
        }
        getCard()
    }, [])
    
    console.log(card)
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
            <h2>Edit Card</h2>
            {card ? <form onSubmit={submitHandler}>
                <label htmlFor="front">Front</label>
                <div>
                    <textarea name="front" id="front" onChange={changeHandler} value={card.front}></textarea>
                </div>
                <label htmlFor="back">Back</label>
                <div>
                    <textarea name="back" id="back" onChange={changeHandler} value={card.back}></textarea>
                </div>
                <Link to={`/decks/${Number(deckId)}`}>
                    <button className="btn btn-secondary">Cancel</button>
                </Link>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form> : <p>Loading...</p>}
            
        </React.Fragment>
    )
}

export default EditCard