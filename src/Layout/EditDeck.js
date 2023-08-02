import React, {useState} from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { updateDeck } from "../utils/api";
function EditDeck({data}) {
    const history = useHistory();
    const {deckId} = useParams();
    const deck = data.find((deck)=> deck.id === Number(deckId))
    const [formData, setFormData] = useState(deck);
    const changeHandler = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        updateDeck(formData)
        history.push("/")
        window.location.reload(true);
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
                        <li className="breadcrumb-item active">Edit Deck</li>
                    </ol>
                </nav>
                <h2>Edit Deck</h2>
                <form onSubmit={submitHandler}>
                    <label htmlFor="name">Name</label>
                    <div>
                        <input type="text" name="name" id="name" placeholder={deck.name} onChange={changeHandler} value={formData.name}/>
                    </div>
                    <label htmlFor="description">description</label>
                    <div>
                        <textarea name="description" id="description" placeholder={deck.description} onChange={changeHandler} value={formData.description}></textarea>
                    </div>
                    <button className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div> : <p>Loading...</p>}
        </React.Fragment>
    )
}
export default EditDeck;