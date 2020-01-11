import React, { Component } from 'react';
import Directory from './Directory';
import Contact from './ContactComponent';
import About from './AboutComponent';
import HeaderComponent from './HeaderComponent';
import HomeComponent from './HomeComponent';
import FooterComponent from './FooterComponent';
import CampsiteInfoComponent from './CampsiteInfoComponent';
import { CAMPSITES } from '../components/shared/campsites';
import { COMMENTS } from '../components/shared/comments';
import { PARTNERS } from '../components/shared/partners';
import { PROMOTIONS } from '../components/shared/promotions';
import { Switch, Route, Redirect} from 'react-router-dom';

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

    const CampsiteWithId = ({ match }) => {
      return (
        <CampsiteInfoComponent campsite={this.state.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
        comments={this.state.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)} />
      )
    }

    return (
      <div className="App">
            <HeaderComponent />
              <Switch>
                <Route path="/home" component={HomePage} />
                <Route exact path="/aboutus" render={() => <About partners={this.state.partners} />} />
                <Route exact path="/directory" render={() => <Directory campsites={this.state.campsites}/>} />
                <Route exact path="/contactus" component={Contact} />
                <Route path="/directory/:campsiteId" component={CampsiteWithId} />
                <Redirect to="/home" />
              </Switch>
            <FooterComponent />
      </div>
    )
  }
}

export default MainComponent;
