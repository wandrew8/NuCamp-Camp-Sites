import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text)
    }

    render() {
        return (
            <React.Fragment>

                <div>
                    <Button onClick={this.toggleModal} outline color="secondary">
                    <i className="fa fa-pencil mr-2"></i>Submit Comment
                    </Button>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        placeholder="First Name"
                                        className="form-control"
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                    <Control.text model=".author" id="author" name="lastName"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15),
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Please enter your name',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less',
                                        }}
                                    />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="text">Comment</Label>
                                    <Control.textarea model=".text" id="text" name="text"
                                        placeholder="Write your comment here..."
                                        className="form-control"
                                        rows="6"
                                    />
                            </div>
                            <div className="form-group">
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                        </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>

        )
    }
}

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

function RenderComments({comments, addComment, campsiteId}) {
        const commentList = comments.map(comment => {
            return (
                <div key={comment.id}>
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
                    <CommentForm 
                        campsiteId={campsiteId} 
                        addComment={addComment} 
                        />
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
                        <RenderComments 
                            comments={props.comments}
                            addComment={props.addComment}
                            campsiteId={props.campsite.id}
                             />
                    </div>
                </div>
            )
            } else {
            return (
                <div></div>
            )
        }
    }

export default CampsiteInfoComponent;
