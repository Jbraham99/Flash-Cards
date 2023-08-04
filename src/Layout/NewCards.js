import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
function NewCards() {
    const {deckId} = useParams();
    const [deck, setDeck] = useState(null)
    useEffect(()=>{
        async function getDeck(){
            const deck = await readDeck(deckId)
            setDeck(deck)
        }
        getDeck()
    }, [])
    return (
        <React.Fragment>
            {deck ? <React.Fragment><nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">🏠 Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active">Add Card</li>
                </ol>
            </nav>
             <h2>{deck.name} : Add Card</h2></React.Fragment> : <p>Loading...</p>}
        </React.Fragment>
    )
}

export default NewCards