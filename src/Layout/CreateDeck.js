import React, { useEffect, useState } from "react";
import {Link, useRouteMatch, useHistory} from "react-router-dom"
import { createDeck, listDecks } from "../utils/api";

function CreateDeck() {//I DON'T KNOW IF I NEED THESE PROPS YET!!
    return (
        <React.Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">🏠 Home</Link></li>
                    <li className="breadcrumb-item active">Create Deck</li>
                </ol>
            </nav>
            <h2>Create Deck</h2>
        </React.Fragment>
    )
}

export default CreateDeck