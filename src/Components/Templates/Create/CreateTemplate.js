import React from "react";
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import "./CreateTemplate.css"

class CreateTemplate extends React.Component {
    render() {
        return (
        <Container>
            <Row className='justify-content-center align-self-center'>
                <Form className="createTemplate" preventDefault>
                    <div className='d-flex justify-content-center'>
                        <h3>Create Template Form</h3>
                    </div>
                    <Row>
                        <Col>
                            <Form.Group controlId="productName">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                type="text"
                                name="productName"
                                placeholder="Product Name"
                                onChange={this.handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="supplier">
                                <Form.Label>Supplier</Form.Label>
                                <Form.Control
                                type="text"
                                name="supplier"
                                placeholder="Supplier"
                                onChange={this.handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formulation">
                                <Form.Label>Formulation</Form.Label>
                                <div className="justify-content-center align-self-center">
                                    {['Flowable', 'Granular', 'Wettable Powder', 'Emulsified Concrete', 'Other'].map((type) => (
                                        <Form.Check
                                            inline
                                            label={type}
                                            type="checkbox"
                                            className="options ml-3 mr-3"
                                        />
                                    ))}
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="signalWord">
                                <Form.Label>Signal Word: </Form.Label>
                                <div className="justify-content-center align-self-center">
                                    {['Caution', 'Warning', 'Danger'].map((type) => (
                                        <Form.Check
                                            inline
                                            label={type}
                                            type="checkbox"
                                            className="options ml-3 mr-3"
                                        />
                                    ))}
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="epaRegNum">
                                <Form.Label>EPA Registration #</Form.Label>
                                <Form.Control
                                type="text"
                                name="epaRegNum"
                                placeholder="EPA Registration #"
                                onChange={this.handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="epaEstNum">
                                <Form.Label>EPA Est. #</Form.Label>
                                <Form.Control
                                type="text"
                                name="epaEstNum"
                                placeholder="EPA Est. #"
                                onChange={this.handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button type='submit' variant='primary' className='btn-block'>Create Template</Button>
                </Form>
            </Row>
        </Container>
        )
    }
}

export default CreateTemplate;