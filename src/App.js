import React, { Component } from 'react';
import MainComponent from './components/MainComponenet';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

class App extends Component {
   render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MainComponent />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
