import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Modal } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import "./AddForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Modal.css";
import Backend from "../model/backend";
import { Redirect } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "date-fns";
class Modalview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
      isEdit: false,
      formData: props.formData,
      deleteModal: false,
      success: false,
      redirectLocation: this.props.redirectLocation,
      redirect: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSigDate = this.handleSigDate.bind(this);
    /*
    this.handleStartTime = this.handleStartTime.bind(this);
    this.handleEndTime = this.handleEndTime.bind(this);
    */
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState((prevState) => ({
      formData: { ...prevState.formData, [name]: value },
    }));
  }

  handleDateChange(newDate) {
    this.setState((prevState) => ({
      formData: { ...prevState.formData, date: new Date(newDate.getTime()) },
    }));
  }

  handleSigDate(newDate) {
    this.setState((prevState) => ({
      formData: { ...prevState.formData, sigDate: new Date(newDate.getTime()) },
    }));
  }

  // handleStartTime(newDate) {
  //   this.setState((prevState) => ({
  //     formData: {
  //       ...prevState.formData,
  //       timeStart: newDate,
  //     },
  //   }));
  // }

  // handleEndTime(newDate) {
  //   this.setState((prevState) => ({
  //     formData: {
  //       ...prevState.formData,
  //       timeEnd: newDate,
  //     },
  //   }));
  // }

  async handleSubmit(event) {
    const { formData } = this.state;
    event.preventDefault();
    if (formData.location === "") {
      alert("Location is required");
      return false;
    }
    let output = JSON.parse(JSON.stringify(formData));
    // output.timeStart = new Date(output.timeStart).toTimeString().slice(0, 5);
    // output.timeEnd = new Date(output.timeEnd).toTimeString().slice(0, 5);
    output.date = JSON.stringify(output.date).slice(1, 11);
    output.sigDate = JSON.stringify(output.sigDate).slice(1, 11);
    if (output.location === "Other") {
      output.location = output.locOtherVal;
    }
    output = JSON.stringify(output);
    formData.date = JSON.stringify(formData.date).slice(1, 11);
    formData.sigDate = JSON.stringify(formData.sigDate).slice(1, 11);
    let backend = new Backend();
    let response = await backend.put(output);
    this.onSubmitAlert();
    //this.closeModal();
    //this.props.handleModal2(false);

    if (response.ResponseMetadata.HTTPStatusCode === 200) {
      this.setState({ success: true, isEdit: false });
    } else {
    }

    return true;
  }
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => {
    const { formData } = this.state;
    // formData.timeStart = new Date(formData.timeStart)
    //   .toTimeString()
    //   .slice(0, 5);
    // formData.timeEnd = new Date(formData.timeEnd).toTimeString().slice(0, 5);
    formData.date = JSON.stringify(formData.date).slice(1, 11);
    formData.sigDate = JSON.stringify(formData.sigDate).slice(1, 11);
    this.props.handleModal2(false);
  };
  editMode = (event) => {
    event.preventDefault();
    this.setState({ isEdit: true, success: false });
  };
  handleDeleteModal = (status) => this.setState({ deleteModal: status });
  closeDeleteModal = (e) => {
    //const { formData } = this.state;
    this.handleDeleteModal(false);
    //formData.date = JSON.stringify(formData.date).slice(1, 11);
    //formData.sigDate = JSON.stringify(formData.sigDate).slice(1, 11);
  };

  async deleteForm() {
    const { formData } = this.state;
    this.setState({ success: false });
    formData.date = JSON.stringify(formData.date).slice(1, 11);
    formData.sigDate = JSON.stringify(formData.sigDate).slice(1, 11);
    console.log(formData);
    let backend = new Backend();
    let response = await backend.delete(formData.id);
    if (response.status === 200) {
      this.props.handleDeleteAlert(true);
      //this.handleDeleteModal(false);
      this.setState({ redirect: true });
      //this.closeModal();
    }
  }

  onSubmitAlert = () => {
    this.setState({ formsubmitted: true }, () => {
      window.setTimeout(() => {
        this.setState({ formsubmitted: false });
      }, 2500);
    });
  };

  render() {
    const {
      formData,
      isEdit,
      deleteModal,
      isOpen,
      success,
      redirect,
      redirectLocation,
    } = this.state;
    if (redirect) return <Redirect to={redirectLocation} />;
    return (
      <>
        <div className="modalAlert fixed-top d-flex justify-content-center">
          <Alert
            variant="success"
            dismissible
            onClose={() =>
              this.setState({ success: false, isEdit: false }, this.closeModal)
            }
            hidden={!success}
            className="fade-out position-absolute top-70 start-50 w-50 h-10"
          >
            Form Has Been Saved
          </Alert>
        </div>
        <Modal
          className="deleteModal justify-content-center"
          show={deleteModal}
          onHide={this.closeDeleteModal}
        >
          <Modal.Header
            closeButton
            onClick={() => this.handleDeleteModal(false)}
          >
            <Modal.Title>Are You Sure?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              Click Delete to Verify You Want To Delete This Form. Otherwise
              Click Close To Go Back To the Modal
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.handleDeleteModal(false)}
            >
              Close
            </Button>
            <Button variant="danger" onClick={() => this.deleteForm()}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          className="myModal"
          size="lg"
          show={isOpen}
          onHide={this.closeModal}
        >
          <Modal.Header
            closeButton
            onClick={() => this.closeModal}
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

                    {/* <Form.Label>
                      Start Time <span className="required">(required)</span>
                    </Form.Label>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardTimePicker
                        disabled={!isEdit}
                        type="text"
                        name="timeStart"
                        margin="normal"
                        placeholder="Start Time"
                        value={
                          (formData.timeStart = new Date(
                            `2000-01-01T${formData.timeStart}:00`
                          ))
                        }
                        onChange={this.handleStartTime}
                      />
                    </MuiPickersUtilsProvider> */}
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

                    {/* <Form.Label>
                      End Time <span className="required">(required)</span>{" "}
                    </Form.Label>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardTimePicker
                        disabled={!isEdit}
                        type="text"
                        margin="normal"
                        name="timeEnd"
                        placeholder="End Time"
                        value={
                          (formData.timeEnd = new Date(
                            `2000-01-01T${formData.timeEnd}:00`
                          ))
                        }
                        onChange={this.handleEndTime}
                      />
                    </MuiPickersUtilsProvider> */}
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
                  <Button variant="secondary" onClick={this.closeModal}>
                    Close
                  </Button>
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
                  <Button
                    variant="danger"
                    onClick={() => this.handleDeleteModal(true)}
                  >
                    Delete This Form
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
