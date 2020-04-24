import React from "react";
import Header from "./components/Header";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
// import { StoreProvider } from "../src/utils/GlobalState";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.sass";

function App() {
  return (
    <div className="App">
      {/* <StoreProvider> */}
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
      {/* </StoreProvider> */}
    </div>
  );
}

export default App;
