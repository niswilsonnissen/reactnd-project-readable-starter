import React from "react";
import { withRouter, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import MainView from "./components/MainView";
import PostDetail from "./components/PostDetail";
import CategoryView from "./components/CategoryView";
import PostForm from "./components/PostForm";

const App = props => {
  return (
    <div className="app">
      <div className="header">
        <div className="identity">
          <h1>
            <Link to="/">Readable</Link>
          </h1>
        </div>
        <div className="toolbar">
          <Link to="/post/" className="add-post-button">
            <span className="icon icon-add" />Add post
          </Link>
        </div>
      </div>
      <Switch>
        <Route exact path="/post/" render={({ history }) => <PostForm />} />
        <Route
          path="/posts/:page/edit"
          render={({ history, match }) => <PostForm page={match.params.page} />}
        />
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
          render={({ history, match }) => {
            if (match.params.category !== "post") {
              return <CategoryView category={match.params.category} />;
            }
            return null;
          }}
        />
        <Route exact path="/" render={({ history }) => <MainView />} />
      </Switch>
      <div className="footer">
        Udacity student project by Nis Wilson Nissen 2017. Icons by{" "}
        <a href="https://thenounproject.com/coquet_adrien/">Adrien Coquet</a> (<a href="https://creativecommons.org/licenses/by/3.0/us/">
          Creative Commons
        </a>)
      </div>
    </div>
  );
};

export default withRouter(App);
