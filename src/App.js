import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LebonProvider } from "./context/LebonContext";

import LandingPage from "./pages/Landing";
import SearchPage from "./pages/Search";

function App() {
  return (
    <LebonProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={LandingPage} exact={true} />
          <Route path="/search" component={SearchPage} exact={true} />
        </Switch>
      </BrowserRouter>
    </LebonProvider>
  );
}

export default App;
