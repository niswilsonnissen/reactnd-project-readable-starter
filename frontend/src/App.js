import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import MainView from "./components/MainView";
import PostDetail from "./components/PostDetail";
import CategoryView from "./components/CategoryView";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route
          path="/:category/:page"
          render={({ history, match }) => (
            <PostDetail
              category={match.params.category}
              page={match.params.page}
            />
          )}
        />
        <Route
          exact
          path="/:category"
          render={({ history, match }) => (
            <CategoryView category={match.params.category} />
          )}
        />
        <Route exact path="/" render={({ history }) => <MainView />} />
      </div>
    );
  }
}

export default App;
