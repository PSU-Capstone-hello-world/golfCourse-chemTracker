import React from "react";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Backend from "../../model/backend";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Redirect } from "react-router-dom";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import "./AddForm.css";
import "react-datepicker/dist/react-datepicker.css";

// Resources:
//   React Forms --> https://reactjs.org/docs/forms.html
//   React Bootstrap Forms --> https://react-bootstrap.github.io/components/forms/

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    const today = new Date();
    // Everyting from the original Gresham Golf Course Form
    this.state = {
      // Product
      productName: this.props.productName ? this.props.productName : "",
      supplier: this.props.supplier ? this.props.supplier : "",
      formulationFlow: this.props.formulationFlow
        ? this.props.formulationFlow
        : false,
      formulationGran: this.props.formulationGran
        ? this.props.formulationGran
        : false,
      formulationWet: this.props.formulationWet
        ? this.props.formulationWet
        : false,
      formulationEmul: this.props.formulationEmul
        ? this.props.formulationEmul
        : false,
      formulationOther: this.props.formulationOther
        ? this.props.formulationOther
        : false,
      formulationOtherVal: this.props.formulationOtherVal
        ? this.props.formulationOtherVal
        : "",
      sigWordCaution: this.props.signalWordCaution
        ? this.props.signalWordCaution
        : false,
      sigWordWarning: this.props.signalWordWarning
        ? this.props.signalWordWarning
        : false,
      sigWordDanger: this.props.signalWordDanger
        ? this.props.signalWordDanger
        : false,
      epaRegNum: this.props.epaRegNum ? this.props.epaRegNum : "",
      epaEstNum: this.props.epaEstNum ? this.props.epaEstNum : "",
      location: "",
      locOtherVal: "",
      target: "",

      // Equipment and Rates
      vehicle: "",
      gear: "",
      rpm: "",
      mph: "",
      sprayer: "",
      nozzle: "",
      pressure: "",
      tankAmt: "",
      tankWater: "",
      adjuvant: "",
      totalApplied: "",
      appRateOz: "",
      appRateLbs: "",
      wateredIn: "",
      wateredMin: "",

      // Weather and Precautions
      temp: "",
      humidity: "",
      wind: "",
      date: new Date(today.getTime()),
      purs: "",
      timeStart: new Date("2000-01-01T12:00:00"),
      timeEnd: new Date("2000-01-01T12:00:00"),
      protectiveLong: false,
      protectiveShoes: false,
      protectiveBoots: false,
      protectiveGloves: false,
      protectiveHat: false,
      protectiveEye: false,
      protectiveOther: false,
      protectiveOtherVal: "",
      disposed: "",
      cleaned: "",
      msds: "",
      lbsN: "",
      lbsP2O5: "",
      lbsK2O: "",
      signature: "",
      sigDate: new Date(today.getTime()),
      disabled: false,
      success: false,
      error: false,
      missingRequiredField: false,
      redirect: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSigDate = this.handleSigDate.bind(this);
    this.handleStartTime = this.handleStartTime.bind(this);
    this.handleEndTime = this.handleEndTime.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  // Dates from date picker are handled seperatley, they also need a math conversion or else the day can be off by one
  // A thread about the issue and the workaround were found at: https://github.com/Hacker0x01/react-datepicker/issues/1018
  handleDateChange(newDate) {
    if (newDate) {
      this.setState({
        date: new Date(newDate.getTime()),
      });
    } else {
      this.setState({
        sigDate: null,
      });
    }
  }

  handleSigDate(newDate) {
    if (newDate) {
      this.setState({
        sigDate: new Date(newDate.getTime()),
      });
    } else {
      this.setState({
        sigDate: null,
      });
    }
  }

  handleStartTime(time) {
    this.setState({
      timeStart: time,
    });
  }

  handleEndTime(time) {
    this.setState({
      timeEnd: time,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (
      !(
        this.state.location === "Greens" ||
        this.state.location === "Tees" ||
        this.state.location === "Fairways" ||
        this.state.location === "Other"
      )
    ) {
      this.setState({ missingRequiredField: true, disabled: true });
    } else {
      // Copy the state, so we can format the individual fields before sending to backend
      let output = JSON.parse(JSON.stringify(this.state));

      // Format Dates
      output.date = JSON.stringify(output.date).slice(1, 11);
      output.sigDate = JSON.stringify(output.sigDate).slice(1, 11);

      // Format Times
      output.timeStart = new Date(output.timeStart).toTimeString().slice(0, 5);
      output.timeEnd = new Date(output.timeEnd).toTimeString().slice(0, 5);

      // Format Other Location
      if (output.location === "Other") {
        output.location = output.locOtherVal;
      }

      // Logging the output, this will go to backend later
      console.log(JSON.stringify(output));
      output = JSON.stringify(output);

      let backend = new Backend();
      let response = await backend.put(output);

      if (response.ResponseMetadata.HTTPStatusCode === 200) {
        this.setState({ success: true, disabled: true });
        // event.target.reset();
      } else {
        this.setState({ error: true, disabled: true });
      }
    }
  }

  render() {
    const {
      success,
      error,
      disabled,
      missingRequiredField,
      redirect,
      epaEstNum,
      epaRegNum,
      formulationEmul,
      formulationFlow,
      formulationGran,
      formulationOther,
      formulationOtherVal,
      formulationWet,
      productName,
      sigWordCaution,
      sigWordDanger,
      sigWordWarning,
      supplier,
    } = this.state;

    if (redirect) {
      return <Redirect to="/FormHome" />;
    }

    return (
      <Container>
        <Row>
          <Form className="new-form" onSubmit={this.handleSubmit}>
            <div className="d-flex justify-content-center fixed-top">
              <Alert
                variant="success"
                hidden={!success}
                dismissible
                onClose={() =>
                  this.setState({ success: false, redirect: true })
                }
                className="fade-out w-50 h-10"
              >
                Form Saved!
              </Alert>
            </div>
            <div className="d-flex justify-content-center fixed-top">
              <Alert
                variant="danger"
                hidden={!error}
                dismissible
                onClose={() => this.setState({ error: false, redirect: true })}
                className="fade-out w-50 h-10"
              >
                Form could not be saved due to an error
              </Alert>
            </div>
            <div className="d-flex justify-content-center fixed-top">
              <Alert
                variant="secondary"
                hidden={!missingRequiredField}
                dismissible
                onClose={() =>
                  this.setState({
                    missingRequiredField: false,
                    disabled: false,
                  })
                }
                className="fade-out w-50 h-10"
              >
                Please fill out all required fields
              </Alert>
            </div>
            <Row>
              <Col>
                <Form.Group controlId="productName">
                  <Form.Label>
                    Product Name <span className="required">(required)</span>
                  </Form.Label>
                  <Form.Control
                    disabled={disabled}
                    type="text"
                    required
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
                    disabled={disabled}
                    name="supplier"
                    value={supplier}
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
                name="formulationFlow"
                label="Flowable"
                type="checkbox"
                checked={formulationFlow}
                disabled={disabled}
                onChange={this.handleInputChange}
              ></Form.Check>

              <Form.Check
                inline
                name="formulationGran"
                disabled={disabled}
                label="Granular"
                type="checkbox"
                checked={formulationGran}
                onChange={this.handleInputChange}
              ></Form.Check>

              <Form.Check
                inline
                name="formulationWet"
                label="Wettable Powder"
                type="checkbox"
                checked={formulationWet}
                disabled={disabled}
                onChange={this.handleInputChange}
              ></Form.Check>

              <Form.Check
                inline
                name="formulationEmul"
                label="Emulsified Concrete"
                type="checkbox"
                disabled={disabled}
                checked={formulationEmul}
                onChange={this.handleInputChange}
              ></Form.Check>

              <Form.Check
                inline
                name="formulationOther"
                label="Other"
                disabled={disabled}
                type="checkbox"
                checked={formulationOther}
                onChange={this.handleInputChange}
              ></Form.Check>

              <Form.Control
                type="text"
                name="formulationOtherVal"
                disabled={disabled}
                placeholder="Other Formulation"
                hidden={!formulationOther}
                value={formulationOtherVal}
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="signalWord">
              <Form.Label>Signal Word</Form.Label>

              <Form.Check
                inline
                name="sigWordCaution"
                disabled={disabled}
                label="Caution"
                type="checkbox"
                checked={sigWordCaution}
                onChange={this.handleInputChange}
              ></Form.Check>

              <Form.Check
                inline
                name="sigWordWarning"
                disabled={disabled}
                label="Warning"
                type="checkbox"
                checked={sigWordWarning}
                onChange={this.handleInputChange}
              ></Form.Check>

              <Form.Check
                inline
                name="sigWordDanger"
                disabled={disabled}
                label="Danger"
                type="checkbox"
                checked={sigWordDanger}
                onChange={this.handleInputChange}
              ></Form.Check>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group controlId="epaRegNum">
                  <Form.Label>EPA Registration #</Form.Label>
                  <Form.Control
                    type="text"
                    name="epaRegNum"
                    value={epaRegNum}
                    disabled={disabled}
                    placeholder="EPA Registration #"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="epaEstNum">
                  <Form.Label>EPA Est. #</Form.Label>
                  <Form.Control
                    disabled={disabled}
                    type="text"
                    name="epaEstNum"
                    value={epaEstNum}
                    placeholder="EPA Est. #"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="location">
              <Form.Label>
                Location <span className="required">(required)</span>
              </Form.Label>

              <Form.Check
                inline
                name="location"
                disabled={disabled}
                label="Greens"
                type="radio"
                value="Greens"
                checked={this.state.location === "Greens"}
                onChange={this.handleInputChange}
              ></Form.Check>

              <Form.Check
                inline
                name="location"
                disabled={disabled}
                label="Tees"
                type="radio"
                value="Tees"
                checked={this.state.location === "Tees"}
                onChange={this.handleInputChange}
              ></Form.Check>

              <Form.Check
                inline
                name="location"
                label="Fairways"
                type="radio"
                disabled={disabled}
                value="Fairways"
                checked={this.state.location === "Fairways"}
                onChange={this.handleInputChange}
              ></Form.Check>

              <Form.Check
                inline
                name="location"
                disabled={disabled}
                label="Other"
                type="radio"
                value="Other"
                checked={this.state.location === "Other"}
                onChange={this.handleInputChange}
              ></Form.Check>

              <Form.Control
                type="text"
                name="locOtherVal"
                placeholder="Other Location"
                hidden={this.state.location === "Other" ? false : true}
                disabled={disabled}
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="target">
              <Form.Label>Target</Form.Label>
              <Form.Control
                type="text"
                name="target"
                disabled={disabled}
                placeholder="Target"
                onChange={this.handleInputChange}
              />
            </Form.Group>

            {/* TODO Add a seperator that says "APPLICATION EQUIPMENT AND RATES" */}

            <Row>
              <Col>
                <Form.Group controlId="vehicle">
                  <Form.Label>Vehicle</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicle"
                    disabled={disabled}
                    placeholder="Vehicle"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="gear">
                  <Form.Label>Gear</Form.Label>
                  <Form.Control
                    type="text"
                    disabled={disabled}
                    name="gear"
                    placeholder="Gear"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="rpm">
                  <Form.Label>RPM</Form.Label>
                  <Form.Control
                    type="text"
                    disabled={disabled}
                    name="rpm"
                    placeholder="RPM"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="mph">
                  <Form.Label>MPH</Form.Label>
                  <Form.Control
                    type="text"
                    name="mph"
                    disabled={disabled}
                    placeholder="MPH"
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
                    type="text"
                    disabled={disabled}
                    name="sprayer"
                    placeholder="Sprayer/Spreader"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="nozzle">
                  <Form.Label>Nozzles/Setting</Form.Label>
                  <Form.Control
                    type="text"
                    name="nozzle"
                    disabled={disabled}
                    placeholder="Nozzles/Setting"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="pressure">
                  <Form.Label>Pressure Number</Form.Label>
                  <Form.Control
                    type="text"
                    disabled={disabled}
                    name="pressure"
                    placeholder="Pressure Number"
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
                    type="text"
                    disabled={disabled}
                    name="tankAmt"
                    placeholder="Amount of Product"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="tankWater">
                  <Form.Label>Gallons of Water</Form.Label>
                  <Form.Control
                    type="text"
                    name="tankWater"
                    disabled={disabled}
                    placeholder="Gallons of Water"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="adjuvant">
              <Form.Label>Adjuvant/Dye</Form.Label>
              <Form.Control
                type="text"
                name="adjuvant"
                disabled={disabled}
                placeholder="Adjuvant/Dye"
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="totalApplied">
              <Form.Label>Total Amount of Product Applied</Form.Label>
              <Form.Control
                type="text"
                name="totalApplied"
                disabled={disabled}
                placeholder="Total Amount of Product Applied"
                onChange={this.handleInputChange}
              />
            </Form.Group>

            {/* TODO Combine these application rates and make them look better */}
            <Row>
              <Col>
                <Form.Group controlId="appRateOz">
                  <Form.Label>Application Rate (oz. / lbs.)</Form.Label>
                  <Form.Control
                    disabled={disabled}
                    type="text"
                    name="appRateOz"
                    placeholder="Application Rate (oz. / lbs.)"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="appRateLbs">
                  <Form.Label>Application Rate (gal. / lbs.) </Form.Label>
                  <Form.Control
                    type="text"
                    disabled={disabled}
                    name="appRateLbs"
                    placeholder="Application Rate (gal. / lbs.)"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="wateredIn">
              <Form.Label>Was Product Watered In?</Form.Label>

              <Form.Check
                inline
                name="wateredIn"
                disabled={disabled}
                label="Yes"
                type="radio"
                value="Yes"
                checked={this.state.wateredIn === "Yes"}
                onChange={this.handleInputChange}
              ></Form.Check>

              <Form.Check
                inline
                name="wateredIn"
                label="No"
                disabled={disabled}
                type="radio"
                value="No"
                checked={this.state.wateredIn === "No"}
                onChange={this.handleInputChange}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId="wateredMin">
              <Form.Label>Minutes Watered</Form.Label>
              <Form.Control
                type="text"
                name="wateredMin"
                disabled={disabled}
                placeholder="Minutes Watered"
                onChange={this.handleInputChange}
              />
            </Form.Group>

            {/* // Weather and Precautions */}

            <Row>
              <Col>
                <Form.Group controlId="temp">
                  <Form.Label>Temperature</Form.Label>
                  <Form.Control
                    type="text"
                    disabled={disabled}
                    name="temp"
                    placeholder="Temperature"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="humidity">
                  <Form.Label>Humidity</Form.Label>
                  <Form.Control
                    type="text"
                    disabled={disabled}
                    name="humidity"
                    placeholder="Humidity"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="wind">
                  <Form.Label>Wind</Form.Label>
                  <Form.Control
                    type="text"
                    disabled={disabled}
                    name="wind"
                    placeholder="Wind"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* date: "", */}
            <Form.Group controlId="date">
              <Form.Label>
                Date Applied <span className="required">(required)</span>
              </Form.Label>
              <DatePicker
                required
                selected={this.state.date}
                onChange={this.handleDateChange}
                disabled={disabled}
                name="date"
                dateFormat="MM/dd/yyyy"
              />
            </Form.Group>

            <Form.Group controlId="purs">
              <Form.Label>PURS</Form.Label>
              <Form.Control
                type="text"
                name="purs"
                placeholder="PURS"
                disabled={disabled}
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group controlId="timeStart">
                  <Form.Label>
                    Start Time <span className="required">(required)</span>
                  </Form.Label>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                      className="time-picker"
                      margin="normal"
                      name="timeStart"
                      value={this.state.timeStart}
                      disabled={disabled}
                      required={true}
                      onChange={this.handleStartTime}
                    />
                  </MuiPickersUtilsProvider>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="timeEnd">
                  <Form.Label>
                    End Time <span className="required">(required)</span>
                  </Form.Label>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                      className="time-picker"
                      disabled={disabled}
                      margin="normal"
                      name="timeEnd"
                      value={this.state.timeEnd}
                      required={true}
                      onChange={this.handleEndTime}
                    />
                  </MuiPickersUtilsProvider>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="protective">
              <Form.Label>Protective Equipment Used</Form.Label>
              <Form.Check
                inline
                name="protectiveLong"
                disabled={disabled}
                label="Long Pants & Shirt"
                type="checkbox"
                checked={this.state.protectiveLong}
                onChange={this.handleInputChange}
              ></Form.Check>

              <Form.Check
                inline
                name="protectiveShoes"
                disabled={disabled}
                label="Shoes & Socks"
                type="checkbox"
                checked={this.state.protectiveShoes}
                onChange={this.handleInputChange}
              ></Form.Check>

              <Form.Check
                inline
                name="protectiveBoots"
                label="Rubber Boots"
                disabled={disabled}
                type="checkbox"
                checked={this.state.protectiveBoots}
                onChange={this.handleInputChange}
              ></Form.Check>

              <Form.Check
                inline
                name="protectiveGloves"
                label="5 mil. Nitrile Gloves"
                type="checkbox"
                disabled={disabled}
                checked={this.state.protectiveGloves}
                onChange={this.handleInputChange}
              ></Form.Check>

              <Form.Check
                inline
                name="protectiveHat"
                disabled={disabled}
                label="Hard Hat"
                type="checkbox"
                checked={this.state.protectiveHat}
                onChange={this.handleInputChange}
              ></Form.Check>

              <Form.Check
                inline
                name="protectiveEye"
                disabled={disabled}
                label="Protective Eye Wear"
                type="checkbox"
                checked={this.state.protectiveEye}
                onChange={this.handleInputChange}
              ></Form.Check>

              <Form.Check
                inline
                name="protectiveOther"
                label="Other"
                type="checkbox"
                checked={this.state.protectiveOther}
                disabled={disabled}
                onChange={this.handleInputChange}
              ></Form.Check>

              <Form.Control
                type="text"
                name="protectiveOtherVal"
                disabled={disabled}
                placeholder="Other Protective Equipment"
                hidden={!this.state.protectiveOther}
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="disposed">
              <Form.Label>How Was Container Disposed?</Form.Label>
              <Form.Control
                type="text"
                name="disposed"
                disabled={disabled}
                placeholder="How Was Container Disposed?"
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="cleaned">
              <Form.Label>How Was Equipment Cleaned</Form.Label>
              <Form.Control
                type="text"
                name="cleaned"
                disabled={disabled}
                placeholder="How Was Equipment Cleaned"
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="msds">
              <Form.Label>Did you read the MSDS?</Form.Label>

              <Form.Check
                inline
                name="msds"
                disabled={disabled}
                label="Yes"
                type="radio"
                value="Yes"
                checked={this.state.msds === "Yes"}
                onChange={this.handleInputChange}
              ></Form.Check>

              <Form.Check
                inline
                name="msds"
                label="No"
                disabled={disabled}
                type="radio"
                value="No"
                checked={this.state.msds === "No"}
                onChange={this.handleInputChange}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId="lbsN">
              <Form.Label>Actual lbs of N applied per 1000 sqft.</Form.Label>
              <Form.Control
                type="text"
                disabled={disabled}
                name="lbsN"
                placeholder="Actual lbs of N applied per 1000 sqft."
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="lbsP2O5">
              <Form.Label>Actual lbs of P2O5 applied per 1000 sqft.</Form.Label>
              <Form.Control
                type="text"
                name="lbsP2O5"
                disabled={disabled}
                placeholder="Actual lbs of P2O5 applied per 1000 sqft."
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="lbsK2O">
              <Form.Label>Actual lbs of K2O applied per 1000 sqft.</Form.Label>
              <Form.Control
                type="text"
                disabled={disabled}
                name="lbsK2O"
                placeholder="Actual lbs of K2O applied per 1000 sqft."
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group controlId="signature">
                  <Form.Label>
                    Signature <span className="required">(required)</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    disabled={disabled}
                    name="signature"
                    placeholder="Signature"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>

              {/* sigDate: "", */}
              <Col>
                <Form.Group controlId="sigDate">
                  <Form.Label>
                    Today's Date <span className="required">(required)</span>
                  </Form.Label>
                  <DatePicker
                    required
                    selected={this.state.sigDate}
                    onChange={this.handleSigDate}
                    name="sigDate"
                    disabled={disabled}
                    dateFormat="MM/dd/yyyy"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row style={{ paddingBottom: "20px" }}>
              <Col>
                <Button
                  type="reset"
                  disabled={disabled}
                  variant="secondary"
                  style={{ width: "80px" }}
                >
                  Reset
                </Button>
              </Col>
              <Col>
                <Button
                  type="submit"
                  disabled={disabled}
                  style={{ width: "80px" }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </Container>
    );
  }
}

export default AddForm;
