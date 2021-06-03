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
            success: false,
            error: false,
            disabled: false
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
            this.setState({ success: true, disabled: true })
        } else {
            this.setState({ error: true, disabled: true })
        }
    }

    render() {
        const { 
            formulationOther, 
            productName, 
            redirect,
            success,
            disabled,
            error,
        } = this.state;

        if (redirect) {
            return <Redirect to="/Templates" />
        }

        return (
        <Container>
            <Row className='justify-content-center align-self-center'>
            <Alert variant="success" hidden={!success} dismissible onClose={() => this.setState({ success: false, disabled: true, redirect: true})} className="fade-out position-absolute top-50 start-50 w-50 h-10">Template Saved!</Alert>
            <Alert variant="danger" hidden={!error} dismissible onClose={() => this.setState({ success: false, disabled: true, redirect: true})} className="fade-out position-absolute top-50 start-50 w-50 h-10">Template was not saved due to an error</Alert>
                <Form className="templateForm" preventDefault onSubmit={this.handleSubmit}>
                    <div className='d-flex justify-content-center'>
                        <h3>Create Template Form</h3>
                    </div>
                    <Row>
                        <Col>
                            <Form.Group hasValidation controlId="productName">
                                <Form.Label>Product Name<span class="required"> (Required) </span></Form.Label>
                                <Form.Control
                                disabled={disabled}
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
                                disabled={disabled}
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
                                        disabled={disabled}
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
                                        disabled={disabled}
                                        type="checkbox"
                                        className="options"
                                        onChange={this.handleInputChange}
                                    />
                                    <Form.Check
                                        name="formulationWet"
                                        disabled={disabled}
                                        inline
                                        label="Wettable Powder"
                                        type="checkbox"
                                        className="options"
                                        onChange={this.handleInputChange}
                                    />
                                    <Form.Check
                                        name="formulationEmul"
                                        inline
                                        disabled={disabled}
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
                                        disabled={disabled}
                                        className="options"
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <Form.Control
                                    type="text"
                                    name="formulationOtherVal"
                                    placeholder="Other Formulation"
                                    hidden={!formulationOther}
                                    disabled={disabled}
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
                                        disabled={disabled}
                                        label="Caution"
                                        type="checkbox"
                                        className="options"
                                        onChange={this.handleInputChange}
                                    />
                                    <Form.Check
                                        name="signalWordWarning"
                                        inline
                                        label="Warning"
                                        type="checkbox"
                                        className="options"
                                        disabled={disabled}
                                        onChange={this.handleInputChange}
                                    />
                                    <Form.Check
                                        name="signalWordDanger"
                                        disabled={disabled}
                                        inline
                                        label="Danger"
                                        type="checkbox"
                                        className="options"
                                        onChange={this.handleInputChange}
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
                                disabled={disabled}
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
                                disabled={disabled}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <a href="/Templates">
                                <Button variant='secondary'disabled={disabled} className='btn-block'>Cancel</Button>
                            </a>
                        </Col>
                        <Col>
                            <Button type='submit' variant='primary' disabled={disabled} className='btn-block'>Create Template</Button>
                        </Col>
                    </Row>
                </Form>
            </Row>
        </Container>
        )
    }
}

export default CreateTemplate;