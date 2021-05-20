import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Modal } from "react-bootstrap";
import "./AddForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import Backend from "../model/backend";
import "./Modal.css";

//import Document from "../model/document";

// Resources:
//   React Forms --> https://reactjs.org/docs/forms.html
//   React Bootstrap Forms --> https://react-bootstrap.github.io/components/forms/
class Modalview extends React.Component {
  constructor(props) {
    super(props);

    const today = new Date();
    // Everyting from the original Gresham Golf Course Form
    this.state = {
      isOpen: props.isOpen,
      formData: props.formData,
    };
  }

  // Dates from date picker are handled seperatley, they also need a math conversion or else the day can be off by one
  // A thread about the issue and the workaround were found at: https://github.com/Hacker0x01/react-datepicker/issues/1018
  handleDateChange(newDate) {
    const offsetDate = new Date(
      newDate.getTime() - newDate.getTimezoneOffset() * 60000
    );
    this.setState({
      date: offsetDate,
    });
  }

  handleSigDate(newDate) {
    const offsetDate = new Date(
      newDate.getTime() - newDate.getTimezoneOffset() * 60000
    );
    this.setState({
      sigDate: offsetDate,
    });
  }

  openModal = () => this.setState({ isOpen: true });
  closeModal = (e) => {
    this.props.handleModal2(false);
    //this.setState({ isOpen: false });
  };

  render() {
    const { formData } = this.state;
    console.log(formData);
    console.log(formData.formulation);
    return (
      <>
        <Modal
          className="myModal"
          size="lg"
          show={this.state.isOpen}
          onHide={this.closeModal}
        >
          <Modal.Header
            closeButton
            onClick={() => this.handleModalOpen}
          ></Modal.Header>
          <Modal.Title className="modal-title text-center">
            <p>Read Only Modal</p>
          </Modal.Title>
          <Modal.Body>
            <Form className="new-form" onSubmit={this.handleSubmit}>
              <Row>
                <Col>
                  <Form.Group controlId="productName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      required
                      disabled
                      type="text"
                      name="productName"
                      value={formData.productName}
                      placeholder="Product Name"
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="supplier">
                    <Form.Label>Supplier</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="supplier"
                      value={formData.supplier}
                      placeholder="Supplier"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="formulation">
                <Form.Label>Formulation</Form.Label>

                <Form.Check
                  inline
                  disabled
                  name="formulationFlow"
                  label="Flowable"
                  type="checkbox"
                  checked={formData.formulationFlow === "true"}
                  readOnly
                ></Form.Check>

                <Form.Check
                  inline
                  disabled
                  name="formulationGran"
                  label="Granular"
                  type="checkbox"
                  checked={formData.formulationGran === "true"}
                  readOnly
                ></Form.Check>

                <Form.Check
                  inline
                  disabled
                  name="formulationWet"
                  label="Wettable Powder"
                  type="checkbox"
                  checked={formData.formulationWet === "true"}
                  readOnly
                ></Form.Check>

                <Form.Check
                  inline
                  disabled
                  name="formulationEmul"
                  label="Emulsified Concrete"
                  type="checkbox"
                  checked={formData.formulationEmul === "true"}
                  readOnly
                ></Form.Check>

                <Form.Check
                  inline
                  disabled
                  name="formulationOther"
                  label="Other"
                  type="checkbox"
                  checked={formData.formulationOther === "true"}
                ></Form.Check>

                <Form.Control
                  disabled
                  type="text"
                  name="formulationOtherVal"
                  placeholder="Other Formulation"
                  value={formData.formulationOtherVal}
                  hidden={!formData.formulationOther === "true"}
                />
              </Form.Group>

              <Form.Group controlId="signalWord">
                <Form.Label>Signal Word</Form.Label>

                <Form.Check
                  inline
                  disabled
                  name="sigWordCaution"
                  label="Caution"
                  type="checkbox"
                  checked={formData.signalWordCaution === "true"}
                  readOnly
                ></Form.Check>

                <Form.Check
                  inline
                  disabled
                  name="sigWordWarning"
                  label="Warning"
                  type="checkbox"
                  checked={formData.sigWordWarning === "true"}
                  readOnly
                ></Form.Check>

                <Form.Check
                  inline
                  disabled
                  name="sigWordDanger"
                  label="Danger"
                  type="checkbox"
                  checked={formData.sigWordDanger === "true"}
                  readOnly
                ></Form.Check>
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group controlId="epaRegNum">
                    <Form.Label>EPA Registration #</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="epaRegNum"
                      placeholder="EPA Registration #"
                      value={formData.epaRegNum}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="epaEstNum">
                    <Form.Label>EPA Est. #</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="epaEstNum"
                      placeholder="EPA Est. #"
                      value={formData.epaEstNum}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>

                <Form.Check
                  inline
                  disabled
                  name="locGreens"
                  label="Greens"
                  type="radio"
                  checked={formData.location === "Greens"}
                  readOnly
                ></Form.Check>

                <Form.Check
                  inline
                  disabled
                  name="locTees"
                  label="Tees"
                  type="radio"
                  checked={formData.location === "Tees"}
                  readOnly
                ></Form.Check>

                <Form.Check
                  inline
                  disabled
                  name="locFairways"
                  label="Fairways"
                  type="radio"
                  checked={formData.location === "Fairways"}
                  readOnly
                ></Form.Check>

                <Form.Check
                  inline
                  disabled
                  name="locOther"
                  label="Other"
                  type="radio"
                  checked={
                    formData.location !== "Greens" ||
                    formData.location !== "Tees" ||
                    formData.location !== "Fairways"
                      ? true
                      : false
                  }
                  readOnly
                ></Form.Check>

                <Form.Control
                  disabled
                  type="text"
                  name="locOtherVal"
                  placeholder="Other Location"
                  hidden={
                    !(formData.location !== "Greens" ||
                    formData.location !== "Tees" ||
                    formData.location !== "Fairways"
                      ? true
                      : false)
                  }
                  value={formData.location}
                />
              </Form.Group>

              <Form.Group controlId="target">
                <Form.Label>Target</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  name="target"
                  placeholder="Target"
                  value={formData.target}
                />
              </Form.Group>

              {/* TODO Add a seperator that says "APPLICATION EQUIPMENT AND RATES" */}

              <Row>
                <Col>
                  <Form.Group controlId="vehicle">
                    <Form.Label>Vehicle</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="vehicle"
                      placeholder="Vehicle"
                      value={formData.vehicle}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="gear">
                    <Form.Label>Gear</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="gear"
                      placeholder="Gear"
                      value={formData.gear}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="rpm">
                    <Form.Label>RPM</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="rpm"
                      placeholder="RPM"
                      value={formData.rpm}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="mph">
                    <Form.Label>MPH</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="mph"
                      placeholder="MPH"
                      value={formData.rpm}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="sprayer">
                    <Form.Label>Sprayer/Spreader</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="sprayer"
                      placeholder="Sprayer/Spreader"
                      value={formData.sprayer}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="nozzle">
                    <Form.Label>Nozzles/Setting</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="nozzle"
                      placeholder="Nozzles/Setting"
                      value={formData.nozzle}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="pressure">
                    <Form.Label>Pressure Number</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="pressure"
                      placeholder="Pressure Number"
                      value={formData.pressure}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* TODO Make a tank mix section & format it like the form */}
              <Row>
                <Col>
                  <Form.Group controlId="tankAmt">
                    <Form.Label>Tank Mix</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="tankAmt"
                      placeholder="Amount of Product"
                      value={formData.tankAmt}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="tankWater">
                    <Form.Label></Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="tankWater"
                      placeholder="Gallons of Water"
                      value={formData.tankWater}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="adjuvant">
                <Form.Label>Adjuvant/Dye</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  name="adjuvant"
                  placeholder="Adjuvant/Dye"
                  value={formData.adjuvant}
                />
              </Form.Group>

              <Form.Group controlId="totalApplied">
                <Form.Label>Total Amount of Product Applied</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  name="totalApplied"
                  placeholder="Total Amount of Product Applied"
                  value={formData.totalApplied}
                />
              </Form.Group>

              {/* TODO Combine these application rates and make them look better */}
              <Row>
                <Col>
                  <Form.Group controlId="appRateOz">
                    <Form.Label>Application Rate (oz. / lbs.)</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="appRateOz"
                      placeholder="Application Rate (oz. / lbs.)"
                      value={formData.appRateOz}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="appRateLbs">
                    <Form.Label>Application Rate (gal. / lbs.) </Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="appRateLbs"
                      placeholder="Application Rate (gal. / lbs.)"
                      value={formData.appRateLbs}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="wateredIn">
                <Form.Label>Was Product Watered In?</Form.Label>

                <Form.Check
                  inline
                  disabled
                  name="wateredIn"
                  label="Yes"
                  type="radio"
                  value="Yes"
                  checked={formData.wateredIn === "Yes"}
                  readOnly
                ></Form.Check>

                <Form.Check
                  inline
                  disabled
                  name="wateredIn"
                  label="No"
                  type="radio"
                  value="No"
                  checked={formData.wateredIn === "No"}
                  readOnly
                ></Form.Check>
              </Form.Group>

              <Form.Group controlId="wateredMin">
                <Form.Label>Minutes Watered</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  name="wateredMin"
                  placeholder="Minutes Watered"
                  value={formData.wateredMin}
                />
              </Form.Group>

              {/* // Weather and Precautions */}

              <Row>
                <Col>
                  <Form.Group controlId="temp">
                    <Form.Label>Temperature</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="temp"
                      placeholder="Temperature"
                      value={formData.temp}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="humidity">
                    <Form.Label>Humidity</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="humidity"
                      placeholder="Humidity"
                      value={formData.humidity}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="wind">
                    <Form.Label>Wind</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="wind"
                      placeholder="Wind"
                      value={formData.wind}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* date: "", */}
              <Form.Group controlId="date">
                <Form.Label>Date Applied</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  name="date"
                  placeholder="date"
                  value={formData.date}
                />
              </Form.Group>

              <Form.Group controlId="purs">
                <Form.Label>PURS</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  name="purs"
                  placeholder="PURS"
                  value={formData.purs}
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group controlId="timeStart">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="timeStart"
                      placeholder="Start Time"
                      value={formData.timeStart}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="timeEnd">
                    <Form.Label>End Time</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="timeEnd"
                      placeholder="End Time"
                      value={formData.timeEnd}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="protective">
                <Form.Label>Protective Equipment Used</Form.Label>
                <Form.Check
                  inline
                  disabled
                  name="protectiveLong"
                  label="Long Pants & Shirt"
                  type="checkbox"
                  checked={formData.protectiveLong}
                  readOnly
                ></Form.Check>

                <Form.Check
                  inline
                  disabled
                  name="protectiveShoes"
                  label="Shoes & Socks"
                  type="checkbox"
                  checked={formData.protectiveShoes}
                  readOnly
                ></Form.Check>

                <Form.Check
                  inline
                  disabled
                  name="protectiveBoots"
                  label="Rubber Boots"
                  type="checkbox"
                  checked={formData.protectiveBoots}
                  readOnly
                ></Form.Check>

                <Form.Check
                  inline
                  disabled
                  name="protectiveGloves"
                  label="5 mil. Nitrile Gloves"
                  type="checkbox"
                  checked={formData.protectiveGloves}
                  readOnly
                ></Form.Check>

                <Form.Check
                  inline
                  disabled
                  name="protectiveHat"
                  label="Hard Hat"
                  type="checkbox"
                  checked={formData.protectiveHat}
                  readOnly
                ></Form.Check>

                <Form.Check
                  inline
                  disabled
                  name="protectiveEye"
                  label="Protective Eye Wear"
                  type="checkbox"
                  checked={formData.protectiveEye}
                  readOnly
                ></Form.Check>

                <Form.Check
                  inline
                  disabled
                  name="protectiveOther"
                  label="Other"
                  type="checkbox"
                  checked={formData.protectiveOther}
                  readOnly
                ></Form.Check>

                <Form.Control
                  type="text"
                  name="protectiveOtherVal"
                  placeholder="Other Protective Equipment"
                  hidden={!formData.protectiveOther}
                  value={formData.protectiveOtherVal}
                />
              </Form.Group>

              <Form.Group controlId="disposed">
                <Form.Label>How Was Container Disposed?</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  name="disposed"
                  placeholder="How Was Container Disposed?"
                  value={formData.disposed}
                />
              </Form.Group>

              <Form.Group controlId="cleaned">
                <Form.Label>How Was Equipment Cleaned</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  name="cleaned"
                  placeholder="How Was Equipment Cleaned"
                  value={formData.cleaned}
                />
              </Form.Group>

              <Form.Group controlId="msds">
                <Form.Label>Did you read the MSDS?</Form.Label>

                <Form.Check
                  inline
                  disabled
                  name="msds"
                  label="Yes"
                  type="radio"
                  value="Yes"
                  checked={formData.msds === "Yes"}
                  readOnly
                ></Form.Check>

                <Form.Check
                  inline
                  disabled
                  name="msds"
                  label="No"
                  type="radio"
                  value="No"
                  checked={formData.msds === "No"}
                  readOnly
                ></Form.Check>
              </Form.Group>

              <Form.Group controlId="lbsN">
                <Form.Label>Actual lbs of N applied per 1000 sqft.</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  name="lbsN"
                  placeholder="Actual lbs of N applied per 1000 sqft."
                  value={formData.lbsN}
                />
              </Form.Group>

              <Form.Group controlId="lbsP2O5">
                <Form.Label>
                  Actual lbs of P2O5 applied per 1000 sqft.
                </Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  name="lbsP2O5"
                  placeholder="Actual lbs of P2O5 applied per 1000 sqft."
                  value={formData.lbsP2O5}
                />
              </Form.Group>

              <Form.Group controlId="lbsK2O">
                <Form.Label>
                  Actual lbs of K2O applied per 1000 sqft.
                </Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  name="lbsK2O"
                  placeholder="Actual lbs of K2O applied per 1000 sqft."
                  value={formData.lbsK2O}
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group controlId="signature">
                    <Form.Label>Signature</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="signature"
                      placeholder="Signature"
                      value={formData.signature}
                    />
                  </Form.Group>
                </Col>

                {/* sigDate: "", */}
                <Col>
                  <Form.Group controlId="sigDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="sigDate"
                      placeholder="sigDate."
                      value={formData.sigDate}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
            <Button variant="primary">Make Edits</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Modalview;
