import React, { useEffect, useState } from "react";
import {Link, useRouteMatch, useHistory} from "react-router-dom"
import { createDeck, listDecks } from "../utils/api";

function CreateDeck() {//I DON'T KNOW IF I NEED THESE PROPS YET!!
    const history = useHistory();
    const initFormData = {
        name: "",
        description: ""
    }
    const [formData, setFormData] = useState(initFormData)
    const [deckID, setDeckID] = useState(null)
    useEffect(()=>{
        async function getDecksLength() {
            const deckList = await listDecks();
            setDeckID(deckList.length + 1)
        }
        getDecksLength()
    }, [])
    console.log("DeckLength:", deckID)
    const cancelHandler = (e) => {
        e.preventDefault();
        console.log("form canceled")
        setFormData(initFormData)
        history.goBack()
    }
    const changeHandler = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        createDeck(formData)
        history.push(`/decks/${deckID}`)
        window.location.reload(true)
    }
    console.log(formData)
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">🏠 Home</Link></li>
                    <li className="breadcrumb-item active">Create Deck</li>
                </ol>
            </nav>
            <h2>Create Deck</h2>
            <form onSubmit={submitHandler}>
                <label htmlFor="name">Name</label>
                <div>
                <input type="text" id="name" name="name" placeholder="Deck name" onChange={changeHandler} value={formData.name}/>
                </div>
                <label htmlFor="">description</label>
                <div>
                    <textarea onChange={changeHandler} placeholder="Brief description of the deck" id="description" name="description" value={formData.description}></textarea>
                </div>
                <Link to="/">
                <button className="btn btn-lg btn-secondary" onClick={cancelHandler}>Cancel</button>
                </Link>
                
                <button type="submit" className="btn btn-lg btn-primary" >Submit</button>
                
                
            </form>
        </div>
    )
}

export default CreateDeck