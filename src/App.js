import React from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./components/Home/HomeComponent/Home"
import { Create } from "./components/Create/CreateComponent/Create";
import { History } from "./components/History/HistoryComponent/History";
import { NotFound } from "./Details/NotFound/NotFound";

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
