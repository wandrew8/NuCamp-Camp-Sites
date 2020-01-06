import React, { Component } from 'react';
import Directory from './Directory';
import CampsiteInfoComponent from './CampsiteInfoComponent';
import { CAMPSITES } from '../components/shared/campsites';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
      selectedCampsite: null,
    }
  }
  onCampSiteSelect(campsiteId) {
    this.setState({selectedCampsite: campsiteId});
}

  render() {
    return (
      <div className="App">
        <HeaderComponent />
            <Directory campsites={this.state.campsites} onClick={(campsiteId) => this.onCampSiteSelect(campsiteId)} />
            <CampsiteInfoComponent campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]} />
            <FooterComponent />
      </div>
    )
  }
}

export default MainComponent;
