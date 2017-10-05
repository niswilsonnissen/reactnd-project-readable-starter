import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import MainView from "./components/MainView";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={({ history }) => <MainView />} />
      </div>
    );
  }
}

export default App;
