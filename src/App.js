import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Welcome from "./component/welcome/Welcome";
import Contact from "./component/contact/Contact";
import Clock from "./component/clock/Clock";
import Error from "./component/error/Error";
import Navigation from "./component/navigation/Navigation";
import Jeopardy from "./component/Jeopardy/Jeopardy";

//cite: Bob Ziroll
function App() {
  return (
    <div className="App">
      <h1>Routing React</h1>
      <Navigation />
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Welcome {...props} name="Damiean" />}
          />
          <Route
            path="/welcome/:name"
            render={(props) => (
              <Welcome {...props} name={props.match.params.name} />
            )}
          />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/clock" component={Clock} />
          <Route exact path="/jeopardy" component={Jeopardy} />
          <Route component={Error} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
