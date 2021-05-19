import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import "./AddForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Backend from "../model/backend";
import Document from "../model/document";

// Resources:
//   React Forms --> https://reactjs.org/docs/forms.html
//   React Bootstrap Forms --> https://react-bootstrap.github.io/components/forms/

class AddForm extends React.Component {
  constructor(props) {
    super(props);

    const today = new Date();
    // Everyting from the original Gresham Golf Course Form
    this.state = {
      // Product
      productName: "",
      supplier: "",
      formulationFlow: false,
      formulationGran: false,
      formulationWet: false,
      formulationEmul: false,
      formulationOther: false,
      formulationOtherVal: "",
      sigWordCaution: false,
      sigWordWarning: false,
      sigWordDanger: false,
      epaRegNum: "",
      epaEstNum: "",
      locGreens: false,
      locTees: false,
      locFairways: false,
      locOther: false,
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
      date: new Date(today.getTime() - today.getTimezoneOffset() * 60000),
      purs: "",
      timeStart: "",
      timeEnd: "",
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
      sigDate: new Date(today.getTime() - today.getTimezoneOffset() * 60000),
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
    console.log(this.value);

    this.setState({
      [name]: value,
    });
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

  async handleSubmit(event) {
    event.preventDefault();
    if (
      !(
        this.state.locGreens ||
        this.state.locTees ||
        this.state.locFairways ||
        this.state.locOther
      )
    ) {
      alert("Location is required");
      return false;
    }
    // Copy the state, so we can format the individual fields before sending to backend
    let output = JSON.parse(JSON.stringify(this.state));

    // Format Dates
    output.date = JSON.stringify(output.date).slice(1, 11);
    output.sigDate = JSON.stringify(output.sigDate).slice(1, 11);

    // Logging the output, this will go to backend later
    console.log(JSON.stringify(output));
    output = JSON.stringify(output);

    let backend = new Backend();
    let response = await backend.put(output);

    console.log(response);
    alert("Your form has been submitted");
    event.target.reset();
    return true;
  }

  render() {
    return (
      <Form className="new-form" onSubmit={this.handleSubmit}>
        <h1>Add Form</h1>
        <Row>
          <Col>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                required
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

        <Form.Group controlId="formulation">
          <Form.Label>Formulation</Form.Label>

          <Form.Check
            inline
            name="formulationFlow"
            label="Flowable"
            type="checkbox"
            checked={this.state.formulationFlow}
            onChange={this.handleInputChange}
          ></Form.Check>

          <Form.Check
            inline
            name="formulationGran"
            label="Granular"
            type="checkbox"
            checked={this.state.formulationGran}
            onChange={this.handleInputChange}
          ></Form.Check>

          <Form.Check
            inline
            name="formulationWet"
            label="Wettable Powder"
            type="checkbox"
            checked={this.state.formulationWet}
            onChange={this.handleInputChange}
          ></Form.Check>

          <Form.Check
            inline
            name="formulationEmul"
            label="Emulsified Concrete"
            type="checkbox"
            checked={this.state.formulationEmul}
            onChange={this.handleInputChange}
          ></Form.Check>

          <Form.Check
            inline
            name="formulationOther"
            label="Other"
            type="checkbox"
            checked={this.state.formulationOther}
            onChange={this.handleInputChange}
          ></Form.Check>

          <Form.Control
            type="text"
            name="formulationOtherVal"
            placeholder="Other Formulation"
            hidden={!this.state.formulationOther}
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="signalWord">
          <Form.Label>Signal Word</Form.Label>

          <Form.Check
            inline
            name="sigWordCaution"
            label="Caution"
            type="checkbox"
            checked={this.state.sigWordCaution}
            onChange={this.handleInputChange}
          ></Form.Check>

          <Form.Check
            inline
            name="sigWordWarning"
            label="Warning"
            type="checkbox"
            checked={this.state.sigWordWarning}
            onChange={this.handleInputChange}
          ></Form.Check>

          <Form.Check
            inline
            name="sigWordDanger"
            label="Danger"
            type="checkbox"
            checked={this.state.sigWordDanger}
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

        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>

          <Form.Check
            inline
            name="locGreens"
            label="Greens"
            type="checkbox"
            checked={this.state.locGreens}
            onChange={this.handleInputChange}
          ></Form.Check>

          <Form.Check
            inline
            name="locTees"
            label="Tees"
            type="checkbox"
            checked={this.state.locTees}
            onChange={this.handleInputChange}
          ></Form.Check>

          <Form.Check
            inline
            name="locFairways"
            label="Fairways"
            type="checkbox"
            checked={this.state.locFairways}
            onChange={this.handleInputChange}
          ></Form.Check>

          <Form.Check
            inline
            name="locOther"
            label="Other"
            type="checkbox"
            checked={this.state.locOther}
            onChange={this.handleInputChange}
          ></Form.Check>

          <Form.Control
            type="text"
            name="locOtherVal"
            placeholder="Other Location"
            hidden={!this.state.locOther}
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="target">
          <Form.Label>Target</Form.Label>
          <Form.Control
            type="text"
            name="target"
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
                name="tankAmt"
                placeholder="Amount of Product"
                onChange={this.handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tankWater">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                name="tankWater"
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
            placeholder="Adjuvant/Dye"
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="totalApplied">
          <Form.Label>Total Amount of Product Applied</Form.Label>
          <Form.Control
            type="text"
            name="totalApplied"
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
                name="wind"
                placeholder="Wind"
                onChange={this.handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* date: "", */}
        <Form.Group controlId="date">
          <Form.Label>Date Applied</Form.Label>
          <DatePicker
            required
            selected={this.state.date}
            onChange={this.handleDateChange}
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
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="timeStart">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="text"
                name="timeStart"
                placeholder="Start Time"
                onChange={this.handleInputChange}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="timeEnd">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="text"
                name="timeEnd"
                placeholder="End Time"
                onChange={this.handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="protective">
          <Form.Label>Protective Equipment Used</Form.Label>
          <Form.Check
            inline
            name="protectiveLong"
            label="Long Pants & Shirt"
            type="checkbox"
            checked={this.state.protectiveLong}
            onChange={this.handleInputChange}
          ></Form.Check>

          <Form.Check
            inline
            name="protectiveShoes"
            label="Shoes & Socks"
            type="checkbox"
            checked={this.state.protectiveShoes}
            onChange={this.handleInputChange}
          ></Form.Check>

          <Form.Check
            inline
            name="protectiveBoots"
            label="Rubber Boots"
            type="checkbox"
            checked={this.state.protectiveBoots}
            onChange={this.handleInputChange}
          ></Form.Check>

          <Form.Check
            inline
            name="protectiveGloves"
            label="5 mil. Nitrile Gloves"
            type="checkbox"
            checked={this.state.protectiveGloves}
            onChange={this.handleInputChange}
          ></Form.Check>

          <Form.Check
            inline
            name="protectiveHat"
            label="Hard Hat"
            type="checkbox"
            checked={this.state.protectiveHat}
            onChange={this.handleInputChange}
          ></Form.Check>

          <Form.Check
            inline
            name="protectiveEye"
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
            onChange={this.handleInputChange}
          ></Form.Check>

          <Form.Control
            type="text"
            name="protectiveOtherVal"
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
            placeholder="How Was Container Disposed?"
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="cleaned">
          <Form.Label>How Was Equipment Cleaned</Form.Label>
          <Form.Control
            type="text"
            name="cleaned"
            placeholder="How Was Equipment Cleaned"
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="msds">
          <Form.Label>Did you read the MSDS?</Form.Label>

          <Form.Check
            inline
            name="msds"
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
            placeholder="Actual lbs of P2O5 applied per 1000 sqft."
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="lbsK2O">
          <Form.Label>Actual lbs of K2O applied per 1000 sqft.</Form.Label>
          <Form.Control
            type="text"
            name="lbsK2O"
            placeholder="Actual lbs of K2O applied per 1000 sqft."
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="signature">
              <Form.Label>Signature</Form.Label>
              <Form.Control
                required
                type="text"
                name="signature"
                placeholder="Signature"
                onChange={this.handleInputChange}
              />
            </Form.Group>
          </Col>

          {/* sigDate: "", */}
          <Col>
            <Form.Group controlId="sigDate">
              <Form.Label>Date</Form.Label>
              <DatePicker
                selected={this.state.sigDate}
                onChange={this.handleSigDate}
                name="sigDate"
                dateFormat="MM/dd/yyyy"
              />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default AddForm;
