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

                                <Form.Check
                                inline
                                name="formulationFlow"
                                label="Flowable"
                                type="checkbox"
                                // checked={this.state.formulationFlow}
                                onChange={this.handleInputChange}
                                ></Form.Check>

                                <Form.Check
                                inline
                                name="formulationGran"
                                label="Granular"
                                type="checkbox"
                                // checked={this.state.formulationGran}
                                onChange={this.handleInputChange}
                                ></Form.Check>

                                <Form.Check
                                inline
                                name="formulationWet"
                                label="Wettable Powder"
                                type="checkbox"
                                // checked={this.state.formulationWet}
                                onChange={this.handleInputChange}
                                ></Form.Check>

                                <Form.Check
                                inline
                                name="formulationEmul"
                                label="Emulsified Concrete"
                                type="checkbox"
                                // checked={this.state.formulationEmul}
                                onChange={this.handleInputChange}
                                ></Form.Check>

                                <Form.Check
                                inline
                                name="formulationOther"
                                label="Other"
                                type="checkbox"
                                // checked={this.state.formulationOther}
                                onChange={this.handleInputChange}
                                ></Form.Check>

                                <Form.Control
                                type="text"
                                name="formulationOtherValue"
                                placeholder="Other Formulation"
                                // hidden={!this.state.formulationOther}
                                onChange={this.handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="signalWord">
                                <Form.Label>Signal Word</Form.Label>

                                <Form.Check
                                inline
                                name="sigWordCaution"
                                label="Caution"
                                type="checkbox"
                                // checked={this.state.sigWordCaution}
                                onChange={this.handleInputChange}
                                ></Form.Check>

                                <Form.Check
                                inline
                                name="sigWordWarning"
                                label="Warning"
                                type="checkbox"
                                // checked={this.state.sigWordWarning}
                                onChange={this.handleInputChange}
                                ></Form.Check>

                                <Form.Check
                                inline
                                name="sigWordDanger"
                                label="Danger"
                                type="checkbox"
                                // checked={this.state.sigWordDanger}
                                onChange={this.handleInputChange}
                                ></Form.Check>
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