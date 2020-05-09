import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Modal,ModalHeader, ModalBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

import { Control, LocalForm, Errors } from 'react-redux-form';


const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;


class CommentForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    handleSubmit(values){
        this.toggleModal();
        console.log('Current State is:', values);
        alert('Current State is:' + JSON.stringify(values));
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"> Submit comment</span>
                </Button>

                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                                <Col className="form-group">
                                    <Row>
                                        <Label htmlFor="rating"> Rating</Label>
                                    </Row>
                                    <Row>
                                        <Control.select model=".rating" name="rating" className="form-control" >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Row>
                                </Col>

                                <Col className="form-group">
                                    <Row>
                                        <Label htmlFor="author"> Your Name</Label>
                                    </Row>
                                    <Row>
                                        <Control.text model=".author" id="author" name="author" placeholder="Author" className="form-control" validators={{ required, minLength:  minLength(3), maxLength: maxLength(15)}} />
                                        <Errors className="text-danger" model=".author" show="touched" messages={{ required: 'Required : ', minLength: 'Must be greater than 3 characters', maxLength: 'Must be 15 charaters or less'}} />
                                    </Row>
                                </Col>

                                <Col className="form-group">
                                    <Row>
                                        <Label htmlFor="feedback"> Comment</Label>
                                    </Row>
                                    <Row>
                                        <Control.textarea model=".message" id="message" name="message" rows="6" className="form-control" validators={{ required }} />
                                        <Errors className="text-danger" model=".message" show="touched" messages={{ required: 'Required : '}} />
                                    </Row>
                                </Col>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
        );
    }
}
    function RenderDish({dish}) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );

    }

    function RenderComments({comments, postComment, dishId}) {
        if (comments == null) {
            return (<div></div>)
        }
        const comm = comments.map(comment => {
            return (
                <div className="container">
                <li key={comment.id} >
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(Date.parse(comment.date)))}
                    </p>
                </li>
                </div>
            );
        });
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {comm}
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );
      
    }

    const  DishDetail = (props) => {
        if (props.dish == null) {
            return (<div></div>)
        }
        return (
            <div className='container'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                <div className="row">
                    <RenderDish  dish={props.dish}/>
                    <RenderComments comments={props.comments} postComment={props.postComment}
            dishId={props.dish.id} />
                </div>
            </div>
        );
      
    }


export default DishDetail;


