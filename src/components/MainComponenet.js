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
import { postFeedback } from '../redux/ActionCreator';
import { actions } from 'react-redux-form';
import { postComment, fetchCampsites, fetchComments, fetchPromotions, fetchPartners } from '../redux/ActionCreator';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
const mapStateToProps = state => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions,
  }
}

const mapDispatchToProps = {
  postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text) ),
  fetchCampsites: () => (fetchCampsites()),
  resetFeedbackForm: () => (actions.reset('feedbackForm')),
  fetchComments: () => (fetchComments()),
  fetchPromotions: () => (fetchPromotions()),
  fetchPartners: () => (fetchPartners()),
  postFeedback: (feedback) => (postFeedback(feedback)),

};

class MainComponent extends Component {
  
  componentDidMount() {
    this.props.fetchCampsites();
    this.props.fetchComments();
    this.props.fetchPromotions();
    this.props.fetchPartners();

  }
 
  render() {

    const HomePage = () => {
      return (
        <HomeComponent 
          campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
          campsitesLoading={this.props.campsites.isLoading}
          campsitesErrMess={this.props.campsites.errMess}
          promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
          promotionsLoading={this.props.promotions.isLoading}
          promotionsErrMess={this.props.promotions.errMess}
          partner={this.props.partners.partners.filter(partner => partner.featured)[0]}
          partnersLoading={this.props.partners.isLoading}
          partnersErrMess={this.props.partners.errMess}
      
      />
      )
    }

    const CampsiteWithId = ({ match }) => {
      return (
        <CampsiteInfoComponent 
        campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
        isLoading={this.props.campsites.isLoading}
        errMess={this.props.campsites.errMess}
        comments={this.props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
        commentsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment}
    />
      )
    }

    return (
      <div className="App">
            <HeaderComponent />
              <TransitionGroup>
                <CSSTransition timeout={300} classNames="page" key={this.props.location.key}>
                  <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/aboutus" render={() => <About partners={this.props.partners} />} />
                    <Route exact path="/directory" render={() => <Directory campsites={this.props.campsites}/>} />
                    <Route exact path="/contactus" render={() => <Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm} />} />
                    <Route path="/directory/:campsiteId" component={CampsiteWithId} />
                    <Redirect to="/home" />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            <FooterComponent />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));
