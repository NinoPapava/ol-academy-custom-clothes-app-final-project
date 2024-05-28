import React from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./components/Home/Home"
import { Create } from "./components/Create/Create";
import { History } from "./components/History/History";
import { NotFound } from "./NotFound/NotFound";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/history" component={History} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export { App }
