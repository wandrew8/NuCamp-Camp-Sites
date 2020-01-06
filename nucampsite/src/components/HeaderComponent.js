import React, { Component } from 'react'
import { Navbar, NavbarBrand, Jumbotron } from 'reactstrap';

export class HeaderComponent extends Component {
    render() {
        return (
            <React.Fragment>
            <Jumbotron fluid>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1>NuCamp</h1>
                            <h2>A Better Way to Camp!</h2>
                        </div>
                    </div>
                </div>
            </Jumbotron>
                <Navbar dark sticky="top">
                    <div className="container">
                        <NavbarBrand href="/">NuCamp</NavbarBrand>
                    </div>
                </Navbar>
            </React.Fragment>
        )
    }
}

export default HeaderComponent
