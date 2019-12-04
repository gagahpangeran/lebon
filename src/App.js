import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LebonProvider } from "./context/LebonContext";

import LandingPage from "./pages/Landing";
import SearchPage from "./pages/Search";
import AboutPage from "./pages/About";
import NotFoundPage from "./pages/NotFound";

function App() {
  return (
    <LebonProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={LandingPage} exact={true} />
          <Route path="/search" component={SearchPage} exact={true} />
          <Route path="/about" component={AboutPage} exact={true} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </LebonProvider>
  );
}

export default App;
