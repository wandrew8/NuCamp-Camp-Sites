import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderCampsite({campsite}) {
        return (
            <div className="col-md-5 m-1">
               <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
function RenderComments({comments}) {
        const commentList = comments.map(comment => {
            return (
                <div>
                    <p>{comment.text}
                    <br/>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                </div>
            )
        })
        if (comments) {
            return (
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {commentList}
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

function CampsiteInfoComponent(props) {
        if (props.campsite) {
            return (
                <div className="container">
                <div className="row">
            <div className="col">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/directory">Directory</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        {props.campsite.name}
                    </BreadcrumbItem>
                </Breadcrumb>
                <h2>{props.campsite.name}</h2>
                <hr />
            </div>
        </div>
                    <div className="row my-4"> 
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

export default CampsiteInfoComponent
