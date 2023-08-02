import React, { useState } from "react";
import {Route, Link, useRouteMatch, Switch} from "react-router-dom";
import { listDecks } from "../utils/api";
import DeckView from "./DeckView";

function ListDecks({data}) {
    const {path, url} = useRouteMatch();
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