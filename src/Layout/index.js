import React, {useEffect, useState} from "react";
import {Route, Switch, useRouteMatch, BrowserRouter as Router} from "react-router-dom"
import { listDecks } from "../utils/api";

import Header from "./Header";
import NotFound from "./NotFound";

import Deck from "./Deck";
import ListDecks from "./ListDecks"
import CreateDeck from "./CreateDeck";
import EditDeck from "./EditDeck";
import DeckForm from "./DeckForm";

import NewCards from "./NewCards";
import CardForm from "./CardForm";
import StudyDeck from "./StudyDeck";
import EditCard from "./EditCard";

function Layout() {
  const [data, setData] = useState([])
  useEffect(()=> {
    async function getData() {
      const dataFromAPI = await listDecks();
      // console.log(dataFromAPI)
      setData([...dataFromAPI])
    }
    getData()
  }, [])
const {path, url} = useRouteMatch();
// console.log(path) Path = "/"
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        {data ? <Switch>
          <Route exact path="/">
            <ListDecks data={data} />
          </Route>
          
          <Route exact path={`/decks/new`}>
            <CreateDeck  setData={setData} />
            <DeckForm />
          </Route>

          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>

          <Route exact path={`/decks/:deckId`}>
            <Deck data={data} />
          </Route>

          <Route path="/decks/:deckId/cards/new">
          <NewCards  />
            <CardForm />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard  />
            <CardForm />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeck  />
            <DeckForm />
          </Route>

          <Route>
          <NotFound />
          </Route>
        </Switch> : <p>Loading...</p>}
      </div>
    </React.Fragment>
  );
}

export default Layout;
