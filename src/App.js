import React from "react";
import {
  BrowserRouter as Router,


  Redirect, Route, Switch
} from "react-router-dom";
import Header from "./components/Header";
import { StyleContextProvider } from "./contexts/StyleContext";
import EquipmentScreen from "./screens/EquipmentScreen";
import HomeScreen from "./screens/HomeScreen";
import NotFoundScreen from "./screens/NotFoundScreen";

const App = () => {
  return (
    <StyleContextProvider>
      <Router>
        <Header destFirst={"Strona Główna"} destSecond={"Obliczenia"} /*destThird={"Wyniki"}*/ />
        <Switch>
          <Route exact path={"/"}>
            <HomeScreen />
          </Route>
          <Route path={"/parameters"}>
            <EquipmentScreen />
          </Route>
          <Route exact path={'/404'}>
            <NotFoundScreen />
          </Route>
          <Route path={'*'}>
            <Redirect exact to={'/404'} />
          </Route>
        </Switch>
      </Router>
    </StyleContextProvider>
  )
}

export default App;