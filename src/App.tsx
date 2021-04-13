import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/home";
import Profile from "./Pages/profile";

const App = (): JSX.Element => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
