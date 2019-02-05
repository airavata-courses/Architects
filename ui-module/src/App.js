import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Projects from '../src/containers/addProjects/addProjects'
import Search from "./components/searchbar";
import Login from './containers/Login/Login';
import Register from './containers/Register/Register'

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route exact path="/" component={Search} />
          <Route exact path="/addprojects" component={Projects} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
