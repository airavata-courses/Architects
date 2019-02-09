import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Projects from '../src/containers/addProjects/addProjects'
import Search from "./components/searchbar";
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Appbar from "./components/AppBar/AppBar";
import Logout from './containers/Logout/Logout';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Appbar />
          <Route exact path="/" component={Search} />
          <Route exact path="/addprojects" component={Projects} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
