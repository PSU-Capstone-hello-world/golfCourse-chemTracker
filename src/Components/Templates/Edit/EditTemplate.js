import React from "react";
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import Backend from "../../../model/backend";
import "../Templates.css";


class EditTemplate extends React.Component {
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
            isTemplate: false,
            redirect: false
        }
    }

    getTemplate = async event => {
        const { productName } = this.state;
        const backend = new Backend();
        // Take the given product and retrieve the stored template. If 
        // the template doesn't exist return message displaying "couldn't retrieve template"
        // or something like that
        event.preventDefault();
        console.log(event.target.value);

        const response = await backend.get_template(productName);

        if (response.data.Count === 0) {
            alert("A template for that chemical does not exist!");
            return;
        }

        console.log(response);
        this.populateFormData(response.data.Items[0]);
    }
    
    populateFormData = data => {
        let productName, 
            supplier, 
            formulationFlow,
            formulationGran,
            formulationWet,
            formulationEmul,
            formulationOther, 
            formulationOtherVal,
            signalWordCaution,
            signalWordWarning,
            signalWordDanger,
            epaRegNum,
            epaEstNum;
            
        for (const [key, value] of Object.entries(data)) {
            if (key === "productName") {
                productName = value;
            } else if (key === "supplier") {
                supplier = value;
            } else if (key === "formulationFlow") {
                formulationFlow = value;
            } else if (key === "formulationGran") {
                formulationGran = value;
            } else if (key === "formulationWeb") {
                formulationWet = value;
            } else if (key === "formulationEmul") {
                formulationEmul = value;
            } else if (key === "formulationOther") {
                formulationOther = value;
            } else if (key === "formulationOtherVal") {
                formulationOtherVal = value;
            } else if (key === "signalWordCaution") {
                signalWordCaution = value;
            } else if (key === "signalWordWarning") {
                signalWordWarning = value;
            } else if (key === "signalWordDanger") {
                signalWordDanger = value;
            } else if (key === "epaRegNum") {
                epaRegNum = value;
            } else if (key === "epaEstNum") {
                epaEstNum = value;
            }
        }

        this.setState({
            productName: productName,
            supplier: supplier, 
            formulationFlow: formulationFlow,
            formulationGran: formulationGran,
            formulationWet: formulationWet,
            formulationEmul: formulationEmul,
            formulationOther: formulationOther,
            formulationOtherVal: formulationOtherVal,
            signalWordCaution: signalWordCaution, 
            signalWordWarning: signalWordWarning, 
            signalWordDanger: signalWordDanger, 
            epaRegNum: epaRegNum,
            epaEstNum: epaEstNum,
            isTemplate: true
        })
    }


    handleInputChange = event => {
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

        this.setState({ isTemplate: false, redirect: true });
    };

    render() {
        const { 
            productName, 
            supplier,
            formulationFlow,
            formulationGran,
            formulationWet,
            formulationEmul,
            formulationOther,
            formulationOtherVal,
            signalWordCaution,
            signalWordWarning,
            signalWordDanger,
            epaRegNum,
            epaEstNum,
            isTemplate, 
            redirect
        } = this.state;

        if (redirect) {
            return <Redirect to="/Templates" />
        }

        return (
        <Container>
            <Row className='justify-content-center align-self-center'>
                {isTemplate ? (
                    <Form className="templateForm" onSubmit={this.handleSubmit}>
                        <div className='d-flex justify-content-center'>
                            <h3>Edit Template Form</h3>
                        </div>
                        <Row>
                            <Col>
                                <Form.Group controlId="productName">
                                    <Form.Label>Product Name <span className="required">(Required)</span></Form.Label>
                                    <Form.Control
                                    type="text"
                                    required
                                    isInvalid={productName ? "" : "true"}
                                    isValid={productName ? "true" : ""}
                                    name="productName"
                                    value={productName}
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
                                    value={supplier}
                                    placeholder="Supplier"
                                    onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="formulation">
                                    <Form.Label className="formulationLabel">Formulation: </Form.Label>
                                    <div className="d-flex justify-content-center">
                                        <Form.Check
                                            name="formulationFlow"
                                            inline
                                            label="Flowable"
                                            type="checkbox"
                                            checked={formulationFlow}
                                            className="options"
                                            onChange={this.handleInputChange}
                                        />
                                        <Form.Check
                                            name="formulationGran"
                                            inline
                                            label="Granular"
                                            type="checkbox"
                                            checked={formulationGran}
                                            className="options"
                                            onChange={this.handleInputChange}
                                        />
                                        <Form.Check
                                            name="formulationWet"
                                            inline
                                            label="Wettable Powder"
                                            type="checkbox"
                                            checked={formulationWet}
                                            className="options"
                                            onChange={this.handleInputChange}
                                        />
                                        <Form.Check
                                            name="formulationEmul"
                                            inline
                                            checked={formulationEmul}
                                            label="Emulsified Concrete"
                                            type="checkbox"
                                            className="options"
                                            onChange={this.handleInputChange}
                                        />
                                        <Form.Check
                                            name="formulationOther"
                                            inline
                                            label="Other"
                                            checked={formulationOther}
                                            type="checkbox"
                                            className="options"
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
                                    <Form.Control
                                        type="text"
                                        name="formulationOtherVal"
                                        value={formulationOtherVal}
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
                                            checked={signalWordCaution}
                                            label="Caution"
                                            type="checkbox"
                                            className="options"
                                            onChange={this.handleInputChange}
                                        />
                                        <Form.Check
                                            name="signalWordWarning"
                                            inline
                                            checked={signalWordWarning}
                                            label="Warning"
                                            type="checkbox"
                                            className="options"
                                            onChange={this.handleInputChange}
                                        />
                                        <Form.Check
                                            name="signalWordDanger"
                                            inline
                                            checked={signalWordDanger}
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
                                    value={epaRegNum}
                                    placeholder="EPA Registration #"
                                    onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="estNum">
                                    <Form.Label>EPA Est. #</Form.Label>
                                    <Form.Control
                                    value={epaEstNum}
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
                                <Button type='submit' variant='primary' className='btn-block'>Save Template</Button>
                            </Col>
                        </Row>
                    </Form>
                ) : (
                    <Form className="templateForm" onSubmit={this.getTemplate}>
                        <Row>
                            <Col>
                                <Form.Group controlId="productName">
                                    <Form.Label>Search Templates</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        name="productName"
                                        onChange={this.handleInputChange}
                                        placeholder="Product Name"
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
                                <Button type='submit' variant='primary' className='btn-block'>Search for Template</Button>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Row>
        </Container>
        )
    }
}

export default EditTemplate;