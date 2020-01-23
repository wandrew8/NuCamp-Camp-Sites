import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import Loading from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';

function RenderCard({ item, isLoading, errMess }) {
    if (isLoading) {
        return <Loading />
    }
    if (errMess) {
        return <h4>{errMess}</h4>
    } 
        return (
        <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(50%)'
            }}>
                <Card>
                    <CardImg src={item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
        y</FadeTransform>
    )
}

function HomeComponent(props) {
    return (
        <div className="container">
            <div className="row my-4">
                <div className="col-md m-1">
                    <RenderCard 
                        item={props.campsite}
                        isLoading={props.campsitesLoading}
                        errMess={props.campsitesErrMess}
                    />
                </div>
                <div className="col-md m-1">
                    <RenderCard item={props.promotion} />
                </div>
                <div className="col-md m-1">
                    <RenderCard item={props.partner} />
                </div>
            </div>
        </div>
    )
}

export default HomeComponent
