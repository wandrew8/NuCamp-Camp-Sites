import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Directory from './Directory';
import Contact from './ContactComponent';
import About from './AboutComponent';
import HeaderComponent from './HeaderComponent';
import HomeComponent from './HomeComponent';
import FooterComponent from './FooterComponent';
import CampsiteInfoComponent from './CampsiteInfoComponent';
import addComment from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions,
  }
}

const mapDispatchToProps = {
  addComment: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text) )
};

class MainComponent extends Component {
  
 
  render() {

    const HomePage = () => {
      return (
        <HomeComponent 
          campsite={this.props.campsites.filter(campsite => campsite.featured)[0]}
          promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
          partner={this.props.partners.filter(partner => partner.featured)[0]}
        />
      )
    }

    const CampsiteWithId = ({ match }) => {
      return (
        <CampsiteInfoComponent 
        campsite={this.props.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
        comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)} 
        addComment={this.props.addComment} 
        />
      )
    }

    return (
      <div className="App">
            <HeaderComponent />
              <Switch>
                <Route path="/home" component={HomePage} />
                <Route exact path="/aboutus" render={() => <About partners={this.props.partners} />} />
                <Route exact path="/directory" render={() => <Directory campsites={this.props.campsites}/>} />
                <Route exact path="/contactus" component={Contact} />
                <Route path="/directory/:campsiteId" component={CampsiteWithId} />
                <Redirect to="/home" />
              </Switch>
            <FooterComponent />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));
