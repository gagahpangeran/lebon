import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={LandingPage} exact={true} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
