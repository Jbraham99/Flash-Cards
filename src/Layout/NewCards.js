import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { createCard } from "../utils/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function NewCards({data}) {
    const history = useHistory();
    console.log("NewCards data:", data)
    const {deckId} = useParams();
    const deck = data.find((deck)=> deck.id === Number(deckId));
    console.log("new card deck: ", deck)
    const initFormData = {
        front: "",
        back: "",
    }
    const [formData, setFormData] = useState(initFormData)
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
            {deck ?
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">🏠 Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active">Add Card</li>
                </ol>
            </nav>
             <h2>{deck.name} : Add Card</h2>
            <form onSubmit={submitHandler}>
                <h4>Front</h4>
                <textarea name="front" placeholder="Front side of card" onChange={changeHandler} value={formData.front} required></textarea>
                <h4>Back</h4>
                <textarea name="back" placeholder="Back side of card" onChange={changeHandler} value={formData.back} required></textarea>
                <div>
                    <button className="btn btn-secondary" onClick={doneHandler}>Done</button>
                    <button type="submit" className="btn btn-primary m-2">Save</button>
                </div>
                
            </form>
            </div> : <p>Loading...</p>}
        </React.Fragment>
        
        
    )
}

export default NewCards