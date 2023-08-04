import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function NewCards() {
    const history = useHistory();
    const {deckId} = useParams();
    const [deck, setDeck] = useState(null)
    const initFormData = {
        front: "",
        back: "",
    }
    const [formData, setFormData] = useState(initFormData)    
    useEffect(()=>{
        async function getDeck(){
            const deck = await readDeck(deckId)
            setDeck(deck)
        }
        getDeck()
    }, [])
    const changeHandler = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        createCard(Number(deckId), formData)
        setFormData(initFormData)
    }
    const doneHandler = (e) => {
        e.preventDefault();
        history.push("/")
        window.location.reload(true)
    }
    console.log(formData)
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