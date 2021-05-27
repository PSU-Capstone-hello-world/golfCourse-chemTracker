import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Modal } from "react-bootstrap";
import "./AddForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Modal.css";
import Backend from "../model/backend";

//import Document from "../model/document";

// Resources:
//   React Forms --> https://reactjs.org/docs/forms.html
//   React Bootstrap Forms --> https://react-bootstrap.github.io/components/forms/
class Modalview extends React.Component {
  constructor(props) {
    super(props);

    //const today = new Date();
    // Everyting from the original Gresham Golf Course Form
    this.state = {
      isOpen: props.isOpen,
      isEdit: false,
      formData: props.formData,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSigDate = this.handleSigDate.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    //console.log(value);
    //console.log(name);

    this.setState((prevState) => ({
      formData: { ...prevState.formData, [name]: value },
    }));
  }
  // Dates from date picker are handled seperatley, they also need a math conversion or else the day can be off by one
  // A thread about the issue and the workaround were found at: https://github.com/Hacker0x01/react-datepicker/issues/1018
  handleDateChange(newDate) {
    this.setState((prevState) => ({
      formData: { ...prevState.formData, date: newDate.getTime() },
    }));
  }

  handleSigDate(newDate) {
    this.setState((prevState) => ({
      formData: { ...prevState.formData, sigDate: newDate.getTime() },
    }));
  }

  async handleSubmit(event) {
    const { formData } = this.state;
    event.preventDefault();
    if (formData.location === "") {
      alert("Location is required");
      return false;
    }

    console.log("form", formData);
    // Copy the state, so we can format the individual fields before sending to backend
    let output = JSON.parse(JSON.stringify(formData));
    console.log("output", output);
    console.log("date", output.date);
    // Format Dates
    output.date = JSON.stringify(output.date).slice(1, 11);
    output.sigDate = JSON.stringify(output.sigDate).slice(1, 11);
    if (output.location === "Other") {
      output.location = output.locOtherVal;
    }

    // Logging the output, this will go to backend later
    //console.log(JSON.stringify(output));
    //console.log("form Data", JSON.stringify(formData.id));
    output = JSON.stringify(output);
    //console.log("output", output);

    let backend = new Backend();
    let response = await backend.put(output);

    //console.log(response);
    alert("Your form has been submitted");
    event.target.reset();
    return true;
  }
  openModal = () => this.setState({ isOpen: true });
  closeModal = (e) => {
    const { formData } = this.state;
    this.props.handleModal2(false);
    //this.setState({ isOpen: false });
    formData.date = JSON.stringify(formData.date).slice(1, 11);
    formData.sigDate = JSON.stringify(formData.sigDate).slice(1, 11);
  };
  editMode = () => this.setState({ isEdit: true });

  render() {
    const { formData, isEdit } = this.state;
    //console.log("form v1", formData);
    //console.log(formData.formulation);

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
            {isEdit ? <p>Edit Modal </p> : <p>Read Only Modal</p>}
          </Modal.Title>
          <Modal.Body>
            <Form className="new-form" onSubmit={this.handleSubmit}>
              <Row>
                <Col>
                  <Form.Group controlId="productName">
                    <Form.Label>
                      Product Name <span>(required)</span>
                    </Form.Label>
                    <Form.Control
                      required
                      disabled={!isEdit}
                      type="text"
                      name="productName"
                      value={formData.productName}
                      placeholder="Product Name"
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="supplier">
                    <Form.Label>Supplier</Form.Label>
                    <Form.Control
                      disabled={!isEdit}
                      type="text"
                      name="supplier"
                      value={formData.supplier}
                      placeholder="Supplier"
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="formulation">
                <Form.Label>Formulation</Form.Label>

                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="formulationFlow"
                  label="Flowable"
                  type="checkbox"
                  checked={formData.formulationFlow}
                  onChange={this.handleInputChange}
                ></Form.Check>

                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="formulationGran"
                  label="Granular"
                  type="checkbox"
                  checked={formData.formulationGran}
                  onChange={this.handleInputChange}
                ></Form.Check>

                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="formulationWet"
                  label="Wettable Powder"
                  type="checkbox"
                  checked={formData.formulationWet}
                  onChange={this.handleInputChange}
                ></Form.Check>

                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="formulationEmul"
                  label="Emulsified Concrete"
                  type="checkbox"
                  checked={formData.formulationEmul}
                  onChange={this.handleInputChange}
                ></Form.Check>

                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="formulationOther"
                  label="Other"
                  type="checkbox"
                  checked={formData.formulationOther}
                  onChange={this.handleInputChange}
                ></Form.Check>

                <Form.Control
                  disabled={!isEdit}
                  type="text"
                  name="formulationOtherVal"
                  placeholder="Other Formulation"
                  value={formData.formulationOtherVal}
                  hidden={!formData.formulationOther}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="signalWord">
                <Form.Label>Signal Word</Form.Label>

                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="sigWordCaution"
                  label="Caution"
                  type="checkbox"
                  checked={formData.sigWordCaution}
                  onChange={this.handleInputChange}
                ></Form.Check>

                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="sigWordWarning"
                  label="Warning"
                  type="checkbox"
                  checked={formData.sigWordWarning}
                  onChange={this.handleInputChange}
                ></Form.Check>

                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="sigWordDanger"
                  label="Danger"
                  type="checkbox"
                  checked={formData.sigWordDanger}
                  onChange={this.handleInputChange}
                ></Form.Check>
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group controlId="epaRegNum">
                    <Form.Label>EPA Registration #</Form.Label>
                    <Form.Control
                      disabled={!isEdit}
                      type="text"
                      name="epaRegNum"
                      placeholder="EPA Registration #"
                      value={formData.epaRegNum}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="epaEstNum">
                    <Form.Label>EPA Est. #</Form.Label>
                    <Form.Control
                      disabled={!isEdit}
                      type="text"
                      name="epaEstNum"
                      placeholder="EPA Est. #"
                      value={formData.epaEstNum}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="location">
                <Form.Label>
                  Location <span>(required)</span>
                </Form.Label>

                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="locGreens"
                  label="Greens"
                  type="radio"
                  checked={formData.location === "greens"}
                  onChange={this.handleInputChange}
                ></Form.Check>

                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="locTees"
                  label="Tees"
                  type="radio"
                  checked={formData.location === "tees"}
                  onChange={this.handleInputChange}
                ></Form.Check>

                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="locFairways"
                  label="Fairways"
                  type="radio"
                  checked={formData.location === "fairways"}
                ></Form.Check>

                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="locOther"
                  label="Other"
                  type="radio"
                  checked={
                    formData.location === "greens" ||
                    formData.location === "tees" ||
                    formData.location === "fairways"
                      ? false
                      : true
                  }
                  onChange={this.handleInputChange}
                ></Form.Check>

                <Form.Control
                  disabled={!isEdit}
                  type="text"
                  name="locOtherVal"
                  placeholder="Other Location"
                  hidden={
                    !(formData.location === "greens" ||
                    formData.location === "tees" ||
                    formData.location === "fairways"
                      ? false
                      : true)
                  }
                  value={formData.location}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="target">
                <Form.Label>Target</Form.Label>
                <Form.Control
                  disabled={!isEdit}
                  type="text"
                  name="target"
                  placeholder="Target"
                  value={formData.target}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              {/* TODO Add a seperator that says "APPLICATION EQUIPMENT AND RATES" */}

              <Row>
                <Col>
                  <Form.Group controlId="vehicle">
                    <Form.Label>Vehicle</Form.Label>
                    <Form.Control
                      disabled={!isEdit}
                      type="text"
                      name="vehicle"
                      placeholder="Vehicle"
                      value={formData.vehicle}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="gear">
                    <Form.Label>Gear</Form.Label>
                    <Form.Control
                      disabled={!isEdit}
                      type="text"
                      name="gear"
                      placeholder="Gear"
                      value={formData.gear}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="rpm">
                    <Form.Label>RPM</Form.Label>
                    <Form.Control
                      disabled={!isEdit}
                      type="text"
                      name="rpm"
                      placeholder="RPM"
                      value={formData.rpm}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="mph">
                    <Form.Label>MPH</Form.Label>
                    <Form.Control
                      disabled={!isEdit}
                      type="text"
                      name="mph"
                      placeholder="MPH"
                      value={formData.rpm}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="sprayer">
                    <Form.Label>Sprayer/Spreader</Form.Label>
                    <Form.Control
                      disabled={!isEdit}
                      type="text"
                      name="sprayer"
                      placeholder="Sprayer/Spreader"
                      value={formData.sprayer}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="nozzle">
                    <Form.Label>Nozzles/Setting</Form.Label>
                    <Form.Control
                      disabled={!isEdit}
                      type="text"
                      name="nozzle"
                      placeholder="Nozzles/Setting"
                      value={formData.nozzle}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="pressure">
                    <Form.Label>Pressure Number</Form.Label>
                    <Form.Control
                      disabled={!isEdit}
                      type="text"
                      name="pressure"
                      placeholder="Pressure Number"
                      value={formData.pressure}
                      onChange={this.handleInputChange}
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
                      disabled={!isEdit}
                      type="text"
                      name="tankAmt"
                      placeholder="Amount of Product"
                      value={formData.tankAmt}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="tankWater">
                    <Form.Label></Form.Label>
                    <Form.Control
                      disabled={!isEdit}
                      type="text"
                      name="tankWater"
                      placeholder="Gallons of Water"
                      value={formData.tankWater}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="adjuvant">
                <Form.Label>Adjuvant/Dye</Form.Label>
                <Form.Control
                  disabled={!isEdit}
                  type="text"
                  name="adjuvant"
                  placeholder="Adjuvant/Dye"
                  value={formData.adjuvant}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="totalApplied">
                <Form.Label>Total Amount of Product Applied</Form.Label>
                <Form.Control
                  disabled={!isEdit}
                  type="text"
                  name="totalApplied"
                  placeholder="Total Amount of Product Applied"
                  value={formData.totalApplied}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              {/* TODO Combine these application rates and make them look better */}
              <Row>
                <Col>
                  <Form.Group controlId="appRateOz">
                    <Form.Label>Application Rate (oz. / lbs.)</Form.Label>
                    <Form.Control
                      disabled={!isEdit}
                      type="text"
                      name="appRateOz"
                      placeholder="Application Rate (oz. / lbs.)"
                      value={formData.appRateOz}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="appRateLbs">
                    <Form.Label>Application Rate (gal. / lbs.) </Form.Label>
                    <Form.Control
                      disabled={!isEdit}
                      type="text"
                      name="appRateLbs"
                      placeholder="Application Rate (gal. / lbs.)"
                      value={formData.appRateLbs}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="wateredIn">
                <Form.Label>Was Product Watered In?</Form.Label>

                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="wateredIn"
                  label="Yes"
                  type="radio"
                  value="Yes"
                  checked={formData.wateredIn === "Yes"}
                  onChange={this.handleInputChange}
                ></Form.Check>

                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="wateredIn"
                  label="No"
                  type="radio"
                  value="No"
                  checked={formData.wateredIn === "No"}
                  onChange={this.handleInputChange}
                ></Form.Check>
              </Form.Group>

              <Form.Group controlId="wateredMin">
                <Form.Label>Minutes Watered</Form.Label>
                <Form.Control
                  disabled={!isEdit}
                  type="text"
                  name="wateredMin"
                  placeholder="Minutes Watered"
                  value={formData.wateredMin}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              {/* // Weather and Precautions */}

              <Row>
                <Col>
                  <Form.Group controlId="temp">
                    <Form.Label>Temperature</Form.Label>
                    <Form.Control
                      disabled={!isEdit}
                      type="text"
                      name="temp"
                      placeholder="Temperature"
                      value={formData.temp}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="humidity">
                    <Form.Label>Humidity</Form.Label>
                    <Form.Control
                      disabled={!isEdit}
                      type="text"
                      name="humidity"
                      placeholder="Humidity"
                      value={formData.humidity}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="wind">
                    <Form.Label>Wind</Form.Label>
                    <Form.Control
                      disabled={!isEdit}
                      type="text"
                      name="wind"
                      placeholder="Wind"
                      value={formData.wind}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* date: "", */}
              <Form.Group controlId="date">
                <Form.Label>
                  Date Applied <span>(required)</span>
                </Form.Label>
                <DatePicker
                  required
                  disabled={!isEdit}
                  type="text"
                  name="date"
                  placeholder="date"
                  selected={(formData.date = new Date(formData.date))}
                  onChange={this.handleDateChange}
                />
              </Form.Group>

              <Form.Group controlId="purs">
                <Form.Label>PURS</Form.Label>
                <Form.Control
                  disabled={!isEdit}
                  type="text"
                  name="purs"
                  placeholder="PURS"
                  value={formData.purs}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group controlId="timeStart">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                      disabled={!isEdit}
                      type="text"
                      name="timeStart"
                      placeholder="Start Time"
                      value={formData.timeStart}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="timeEnd">
                    <Form.Label>End Time</Form.Label>
                    <Form.Control
                      disabled={!isEdit}
                      type="text"
                      name="timeEnd"
                      placeholder="End Time"
                      value={formData.timeEnd}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="protective">
                <Form.Label>Protective Equipment Used</Form.Label>
                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="protectiveLong"
                  label="Long Pants & Shirt"
                  type="checkbox"
                  checked={formData.protectiveLong}
                  onChange={this.handleInputChange}
                ></Form.Check>

                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="protectiveShoes"
                  label="Shoes & Socks"
                  type="checkbox"
                  checked={formData.protectiveShoes}
                  onChange={this.handleInputChange}
                ></Form.Check>

                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="protectiveBoots"
                  label="Rubber Boots"
                  type="checkbox"
                  checked={formData.protectiveBoots}
                  onChange={this.handleInputChange}
                ></Form.Check>

                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="protectiveGloves"
                  label="5 mil. Nitrile Gloves"
                  type="checkbox"
                  checked={formData.protectiveGloves}
                  onChange={this.handleInputChange}
                ></Form.Check>

                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="protectiveHat"
                  label="Hard Hat"
                  type="checkbox"
                  checked={formData.protectiveHat}
                  onChange={this.handleInputChange}
                ></Form.Check>

                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="protectiveEye"
                  label="Protective Eye Wear"
                  type="checkbox"
                  checked={formData.protectiveEye}
                  onChange={this.handleInputChange}
                ></Form.Check>

                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="protectiveOther"
                  label="Other"
                  type="checkbox"
                  checked={formData.protectiveOther}
                  onChange={this.handleInputChange}
                ></Form.Check>

                <Form.Control
                  type="text"
                  name="protectiveOtherVal"
                  placeholder="Other Protective Equipment"
                  hidden={!formData.protectiveOther}
                  value={formData.protectiveOtherVal}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="disposed">
                <Form.Label>How Was Container Disposed?</Form.Label>
                <Form.Control
                  disabled={!isEdit}
                  type="text"
                  name="disposed"
                  placeholder="How Was Container Disposed?"
                  value={formData.disposed}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="cleaned">
                <Form.Label>How Was Equipment Cleaned</Form.Label>
                <Form.Control
                  disabled={!isEdit}
                  type="text"
                  name="cleaned"
                  placeholder="How Was Equipment Cleaned"
                  value={formData.cleaned}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="msds">
                <Form.Label>Did you read the MSDS?</Form.Label>

                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="msds"
                  label="Yes"
                  type="radio"
                  value="Yes"
                  checked={formData.msds === "Yes"}
                  onChange={this.handleInputChange}
                ></Form.Check>

                <Form.Check
                  inline
                  disabled={!isEdit}
                  name="msds"
                  label="No"
                  type="radio"
                  value="No"
                  checked={formData.msds === "No"}
                  onChange={this.handleInputChange}
                ></Form.Check>
              </Form.Group>

              <Form.Group controlId="lbsN">
                <Form.Label>Actual lbs of N applied per 1000 sqft.</Form.Label>
                <Form.Control
                  disabled={!isEdit}
                  type="text"
                  name="lbsN"
                  placeholder="Actual lbs of N applied per 1000 sqft."
                  value={formData.lbsN}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="lbsP2O5">
                <Form.Label>
                  Actual lbs of P2O5 applied per 1000 sqft.
                </Form.Label>
                <Form.Control
                  disabled={!isEdit}
                  type="text"
                  name="lbsP2O5"
                  placeholder="Actual lbs of P2O5 applied per 1000 sqft."
                  value={formData.lbsP2O5}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="lbsK2O">
                <Form.Label>
                  Actual lbs of K2O applied per 1000 sqft.
                </Form.Label>
                <Form.Control
                  disabled={!isEdit}
                  type="text"
                  name="lbsK2O"
                  placeholder="Actual lbs of K2O applied per 1000 sqft."
                  value={formData.lbsK2O}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group controlId="signature">
                    <Form.Label>
                      Signature <span>(required)</span>
                    </Form.Label>
                    <Form.Control
                      disabled={!isEdit}
                      required
                      type="text"
                      name="signature"
                      placeholder="Signature"
                      value={formData.signature}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>

                {/* sigDate: "", */}
                <Col>
                  <Form.Group controlId="sigDate">
                    <Form.Label>
                      Date <span>(required)</span>
                    </Form.Label>
                    <DatePicker
                      required
                      disabled={!isEdit}
                      type="text"
                      name="sigDate"
                      placeholder="sigDate."
                      selected={(formData.sigDate = new Date(formData.sigDate))}
                      onChange={this.handleSigDate}
                    />
                  </Form.Group>
                </Col>
              </Row>
              {isEdit ? (
                <Modal.Footer>
                  <Button
                    type="submit"
                    style={{ width: "80px" }}
                    variant="primary"
                  >
                    Submit
                  </Button>
                </Modal.Footer>
              ) : (
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.closeModal}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={this.editMode}>
                    Make Edits
                  </Button>
                </Modal.Footer>
              )}
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Modalview;
