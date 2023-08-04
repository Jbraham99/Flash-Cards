import React, {useEffect, useState} from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import {Route, Switch, useRouteMatch, BrowserRouter as Router} from "react-router-dom"
import ListDecks from "./ListDecks"
import StudyDeck from "./StudyDeck";
import NewCards from "./NewCards";
import CreateDeck from "./CreateDeck";
import { listDecks } from "../utils/api";
import Deck from "./Deck";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";
import CardForm from "./CardForm";


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
        <Switch>
          <Route exact path="/">
            <ListDecks data={data} />
          </Route>
          
          <Route path={`/decks/new`}>
            <CreateDeck  setData={setData} /> 
          </Route>

          <Route path="/decks/:deckId/study">
            <StudyDeck />
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
          </Route>

          <Route path={`/decks/:deckId`}>
              <Deck data={data} />
          </Route>

          <Route>
          <NotFound />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Layout;
