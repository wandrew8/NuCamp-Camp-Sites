import React, { Component } from 'react';
import Directory from './Directory';
import Contact from './ContactComponent';
import CampsiteInfoComponent from './CampsiteInfoComponent';
import { CAMPSITES } from '../components/shared/campsites';
import { COMMENTS } from '../components/shared/comments';
import { PARTNERS } from '../components/shared/partners';
import { PROMOTIONS } from '../components/shared/promotions';
import HeaderComponent from './HeaderComponent';
import HomeComponent from './HomeComponent';
import { Switch, Route, Redirect} from 'react-router-dom';
import FooterComponent from './FooterComponent';

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
      comments: COMMENTS,
      partners: PARTNERS,
      promotions: PROMOTIONS,
    }
  }
 
  render() {

    const HomePage = () => {
      return (
        <HomeComponent 
          campsite={this.state.campsites.filter(campsite => campsite.featured)[0]}
          promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
          partner={this.state.partners.filter(partner => partner.featured)[0]}

        />
      )
    }
    return (
      <div className="App">
            <HeaderComponent />
              <Switch>
                <Route path="/home" component={HomePage} />
                <Route exact path="/directory" render={() => <Directory campsites={this.state.campsites}/>} />
                <Route exact path="/contactus" component={Contact} />

                <Redirect to="/home" />
              </Switch>
            <FooterComponent />
      </div>
    )
  }
}

export default MainComponent;
