import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Projects from '../src/containers/addProjects/addProjects'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Projects></Projects>
      </div>
    );
  }
}

export default App;
