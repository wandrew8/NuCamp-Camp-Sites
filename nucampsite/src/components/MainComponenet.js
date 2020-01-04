import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './Directory';
import CampsiteInfoComponent from './CampsiteInfoComponent';
import { CAMPSITES } from '../components/shared/campsites';

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
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">NuCamp</NavbarBrand>
          </div>
        </Navbar>
            <Directory campsites={this.state.campsites} onClick={(campsiteId) => this.onCampSiteSelect(campsiteId)} />
            <CampsiteInfoComponent campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]} />
      </div>
    )
  }
}

export default MainComponent;
