import React from "react";
import { Form, Container, Row, Col, Button, Alert } from 'react-bootstrap';
import Backend from "../../../model/backend";
import { Redirect } from "react-router-dom";
import "../Templates.css";

class CreateTemplate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            productName: "",
            supplier: "",
            formulationFlow: false,
            formulationGran: false,
            formulationWet: false,
            formulationEmul: false,
            formulationOther: false,
            formulationOtherVal: "",
            signalWordCaution: false,
            signalWordWarning: false,
            signalWordDanger: false,
            epaRegNum: "",
            epaEstNum: "",
            redirect: false, 
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit = async (event) => {
        const backend = new Backend();
        event.preventDefault();

        const response = await backend.put_template(JSON.stringify(this.state));

        if (response.data.statusCode === 200) {
            alert("template saved successfully!");
        } else {
            alert("template was not saved because an error occurred");
        }

        this.setState({ redirect: true });
    }

    render() {
        const { 
            formulationOther, 
            productName, 
            redirect,
        } = this.state;

        if (redirect) {
            return <Redirect to="/Templates" />
        }

        return (
        <Container>
            <Row className='justify-content-center align-self-center'>
                <Form className="templateForm" preventDefault onSubmit={this.handleSubmit}>
                    <div className='d-flex justify-content-center'>
                        <h3>Create Template Form</h3>
                    </div>
                    <Row>
                        <Col>
                            <Form.Group hasValidation controlId="productName">
                                <Form.Label>Product Name<span class="required"> (Required) </span></Form.Label>
                                <Form.Control
                                type="text"
                                required
                                name="productName"
                                isInvalid={productName ? "" : "true"}
                                isValid={productName ? "true" : ""}
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
                                <Form.Label className="formulationLabel">Formulation:</Form.Label>
                                <div className="d-flex justify-content-center">
                                    <Form.Check
                                        name="formulationFlow"
                                        inline
                                        label="Flowable"
                                        type="checkbox"
                                        className="options"
                                        onChange={this.handleInputChange}
                                    />
                                    <Form.Check
                                        name="formulationGran"
                                        inline
                                        label="Granular"
                                        type="checkbox"
                                        className="options"
                                        onChange={this.handleInputChange}
                                    />
                                    <Form.Check
                                        name="formulationWet"
                                        inline
                                        label="Wettable Powder"
                                        type="checkbox"
                                        className="options"
                                        onChange={this.handleInputChange}
                                    />
                                    <Form.Check
                                        name="formulationEmul"
                                        inline
                                        label="Emulsified Concrete"
                                        type="checkbox"
                                        className="options"
                                        onChange={this.handleInputChange}
                                    />
                                    <Form.Check
                                        name="formulationOther"
                                        inline
                                        label="Other"
                                        type="checkbox"
                                        className="options"
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <Form.Control
                                    type="text"
                                    name="formulationOtherVal"
                                    placeholder="Other Formulation"
                                    hidden={!formulationOther}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="signalWord">
                                <Form.Label className="signalLabel">Signal Word: </Form.Label>
                                <div className="d-flex justify-content-center">
                                    <Form.Check
                                        name="signalWordCaution"
                                        inline
                                        label="Caution"
                                        type="checkbox"
                                        className="options"
                                    />
                                    <Form.Check
                                        name="signalWordWarning"
                                        inline
                                        label="Warning"
                                        type="checkbox"
                                        className="options"
                                    />
                                    <Form.Check
                                        name="signalWordDanger"
                                        inline
                                        label="Danger"
                                        type="checkbox"
                                        className="options"
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="regNum">
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
                            <Form.Group controlId="estNum">
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
                    <Row className="mt-3">
                        <Col>
                            <a href="/Templates">
                                <Button variant='secondary' className='btn-block'>Cancel</Button>
                            </a>
                        </Col>
                        <Col>
                            <Button type='submit' variant='primary' className='btn-block'>Create Template</Button>
                        </Col>
                    </Row>
                </Form>
            </Row>
        </Container>
        )
    }
}

export default CreateTemplate;