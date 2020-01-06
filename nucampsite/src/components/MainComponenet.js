import React, { Component } from 'react';
import Directory from './Directory';
import CampsiteInfoComponent from './CampsiteInfoComponent';
import { CAMPSITES } from '../components/shared/campsites';
import HeaderComponent from './HeaderComponent';
import HomeComponent from './HomeComponent';
import { Switch, Route, Redirect} from 'react-router-dom';
import FooterComponent from './FooterComponent';

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
    }
  }
 
  render() {

    const HomePage = () => {
      return (
        <HomeComponent />
      )
    }
    return (
      <div className="App">
            <HeaderComponent />
              <Switch>
                <Route path="/home" component={HomePage} />
                <Route exact path="/directory" render={() => <Directory campsites={this.state.campsites}/>} />
                <Redirect to="/home" />
              </Switch>
            <FooterComponent />
      </div>
    )
  }
}

export default MainComponent;
