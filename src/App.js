import React, { Component } from 'react';
import MainComponent from './components/MainComponenet';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import './App.css';

const store = ConfigureStore();

class App extends Component {
   render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <MainComponent />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
