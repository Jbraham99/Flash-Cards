import React from "react";
import {Route, Link, useRouteMatch} from "react-router-dom";
import DeckView from "./DeckView";

function ListDecks({data}) {
    const {path} = useRouteMatch();
    return (
        <div>
            <Route exact path={path}>
            <Link to={`/decks/new`}>
                <button className="btn btn-lg btn-secondary">+ Create Deck</button>
            </Link>
            {data.map((deck)=>{
                return (
                <DeckView deck={deck} key={deck.id}/>
                )   
            })}
            </Route>
        </div>
    )
}

export default ListDecks