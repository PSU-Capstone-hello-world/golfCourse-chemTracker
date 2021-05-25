import React from "react";
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import "../Templates.css";


class EditTemplate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            productName: "",
            supplier: "",
            flowable: false,
            granular: false,
            wettable: false,
            emulsified: false,
            other: false,
            otherVal: "",
            caution: false,
            warning: false,
            danger: false,
            regNum: "",
            estNum: "",
            isTemplate: false
        }
    }

    getTemplate = async event => {
        const { productName } = this.state;
        // Take the given product and retrieve the stored template. If 
        // the template doesn't exist return message displaying "couldn't retrieve template"
        // or something like that
        event.preventDefault();
        console.log(event.target.value);

        const url = `https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/template?productName=${productName}`;
        const retrieveTemplate = await fetch(url, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        })
        .then(data => data.json())
        .then(json => console.log(json))
        .catch(error => {
            alert(`Error occured: ${error}`);
        })

        console.log(retrieveTemplate);

        // This is temporary. What will end up happening is once we've gone to the DB and retrieved a tempalte, we'll
        // store the data and isTemplate to true. Otherwise we'll display the error message
        // if (event.currentTarget[0].value) {
        //     this.setState({ productName: event.currentTarget[0].value, isTemplate: true })
        // }
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit = (event) => {
        // Copy the state, so we can format the individual fields before sending to backend
        let output = JSON.parse(JSON.stringify(this.state));

        // Logging the output, this will go to backend later
        console.log(JSON.stringify(output));

        event.preventDefault();

        // Call database and save template 
    }

    render() {
        const { productName, isTemplate, other } = this.state;
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
                                    <Form.Label>Product Name <span>(Required)</span></Form.Label>
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
                                            name="flow"
                                            inline
                                            label="Flowable"
                                            type="checkbox"
                                            className="options"
                                            onChange={this.handleInputChange}
                                        />
                                        <Form.Check
                                            name="granular"
                                            inline
                                            label="Granular"
                                            type="checkbox"
                                            className="options"
                                            onChange={this.handleInputChange}
                                        />
                                        <Form.Check
                                            name="wettable"
                                            inline
                                            label="Wettable Powder"
                                            type="checkbox"
                                            className="options"
                                            onChange={this.handleInputChange}
                                        />
                                        <Form.Check
                                            name="emulsified"
                                            inline
                                            label="Emulsified Concrete"
                                            type="checkbox"
                                            className="options"
                                            onChange={this.handleInputChange}
                                        />
                                        <Form.Check
                                            name="other"
                                            inline
                                            label="Other"
                                            type="checkbox"
                                            className="options"
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
                                    <Form.Control
                                        type="text"
                                        name="otherVal"
                                        placeholder="Other Formulation"
                                        hidden={!other}
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
                                            name="caution"
                                            inline
                                            label="Caution"
                                            type="checkbox"
                                            className="options"
                                        />
                                        <Form.Check
                                            name="warning"
                                            inline
                                            label="Warning"
                                            type="checkbox"
                                            className="options"
                                        />
                                        <Form.Check
                                            name="danger"
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
                                    name="regNum"
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
                                    name="estNum"
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
                                    <Form.Label>Please enter a product name</Form.Label>
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