import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

function AddForm(){
    return(
        <div className={"Form"}>
            <Form>
                <Form.Row>
                    <Col>
                        <Form.Control placeholder="Product Name" />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Form.Control placeholder="Supplier" />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col xs={2}>Formulation: </Col>
                    <Col>
                        {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check inline label="Flowable" type={type} id={`inline-${type}-1`} />
                                <Form.Check inline label="Granular" type={type} id={`inline-${type}-2`} />
                                <Form.Check inline label="Wettable Powder" type={type} id={`inline-${type}-3`}/>
                            </div>

                        ))}
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check inline label="Emulsified Concentrate" type={type} id={`inline-${type}-1`}/>
                            </div>

                        ))}
                    </Col>
                    <Col>
                        <Form.Control placeholder="Other"/>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col xs={4}>Signal Word: </Col>
                    <Col>
                        {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check inline label="Caution" type={type} id={`inline-${type}-1`} />
                                <Form.Check inline label="Warning" type={type} id={`inline-${type}-2`} />
                                <Form.Check inline label="Danger" type={type} id={`inline-${type}-3`}/>
                            </div>

                        ))}
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Form.Control placeholder="EPA Registration" />
                    </Col>
                    <Col>
                        <Form.Control placeholder="EPA Est. #" />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col xs={2}>Location: </Col>
                    <Col>
                        {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check inline label="Greens" type={type} id={`inline-${type}-1`} />
                                <Form.Check inline label="Tees" type={type} id={`inline-${type}-2`} />
                                <Form.Check inline label="Fairways" type={type} id={`inline-${type}-3`}/>
                            </div>

                        ))}
                    </Col>
                    <Col>
                        <Form.Control placeholder="Other" />
                    </Col>
                </Form.Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default AddForm;