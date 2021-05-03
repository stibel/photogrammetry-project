import React from "react";
import {BrowserRouter as Router,
  Switch,
  Route,
  Redirect} from "react-router-dom";
import {StyleContextProvider} from "./contexts/StyleContext";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import EquipmentScreen from "./screens/EquipmentScreen";
import NotFoundScreen from "./screens/NotFoundScreen";

const App = () => {
  return (
      <StyleContextProvider>
          <Router>
            <Header destFirst={"Strona Główna"} destSecond={"Wybór sprzętu"} destThird={"Obliczenia"} />
            <Switch>
              <Route exact path={"/"}>
                <HomeScreen />
              </Route>
              <Route exact path={"/equipment"}>
                <EquipmentScreen />
              </Route>
              <Route exact path={'/404'}>
                <NotFoundScreen />
              </Route>
              <Route path={'*'}>
                <Redirect exact to={'/404'}/>
              </Route>
            </Switch>
          </Router>
      </StyleContextProvider>
  )
}

export default App;