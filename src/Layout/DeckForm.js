import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { updateDeck, readDeck, createDeck, listDecks } from "../utils/api";

function DeckForm(){
    const history = useHistory();
    const { deckId } = useParams();
    const [deck, setDeck] = useState();
    const [editFormData, setEditFormData] = useState(deck);
    const [deckID, setDeckID] = useState(null);
    const initFormData = {
        name: "",
        description: ""
    }
    const [formData, setFormData] = useState(initFormData)
    useEffect(() => {
      async function getDeck() {
        const deck = await readDeck(deckId);
        const deckList = await listDecks();
        setDeckID(deckList + 1);
        setDeck(deck);
        setEditFormData(deck);
      }
      if(deckId){
        getDeck();}
    }, []);
    //CreateDeck Event Handlers
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
    //EditDeck Event Handlers
    const editChangeHandler = (e) => {
      e.preventDefault();
      setEditFormData({
        ...editFormData,
        [e.target.id]: e.target.value,
      });
    };
    const editSubmitHandler = (e) => {
      e.preventDefault();
      updateDeck(editFormData);
      history.push("/");
      window.location.reload(true);
    };
    return (
        <React.Fragment>
            {editFormData && deck ? <form onSubmit={editSubmitHandler}>
            <label htmlFor="name">Name</label>
            <div>
              <input
                type="text"
                name="name"
                id="name"
                placeholder={deck.name}
                onChange={editChangeHandler}
                value={formData.name}
              />
            </div>
            <label htmlFor="description">description</label>
            <div>
              <textarea
                name="description"
                id="description"
                placeholder={deck.description}
                onChange={editChangeHandler}
                value={formData.description}
              ></textarea>
            </div>
            <button className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form> : <form onSubmit={submitHandler}>
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
                
                
            </form>}
        </React.Fragment>
    )
}

export default DeckForm;