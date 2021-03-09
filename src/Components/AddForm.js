import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./AddForm.css";

// Resources:
//   React Forms --> https://reactjs.org/docs/forms.html
//   React Bootstrap Forms --> https://react-bootstrap.github.io/components/forms/

class AddForm extends React.Component {
  constructor(props) {
    super(props);

    // Everyting from the original Gresham Golf Course Form
    this.state = {
      // Product
      productName: "",
      supplier: "",
      formulation: "",
      signalWord: "",
      epaRegNum: "",
      epaEstNum: "",
      location: "",
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
      date: "",
      purs: "",
      timeStart: "",
      timeEnd: "",
      protectiveEq: "",
      disposed: "",
      cleaned: "",
      msds: "",
      lbsN: "",
      lbsP2O5: "",
      lbsK2O: "",
      signature: "",
      sigDate: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    console.log(JSON.stringify(this.state));
    event.preventDefault();
  }

  render() {
    return (
      <Form className="new-form" onSubmit={this.handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
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

        {/* TODO Formulation */}

        {/* TODO Signal Word */}

        <Form.Group controlId="epaRegNum">
          <Form.Label>EPA Registration #</Form.Label>
          <Form.Control
            type="text"
            name="epaRegNum"
            placeholder="EPA Registration #"
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="epaEstNum">
          <Form.Label>EPA Est. #</Form.Label>
          <Form.Control
            type="text"
            name="epaEstNum"
            placeholder="EPA Est. #"
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

        <Form.Group controlId="vehicle">
          <Form.Label>Vehicle</Form.Label>
          <Form.Control
            type="text"
            name="vehicle"
            placeholder="Vehicle"
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="gear">
          <Form.Label>Gear</Form.Label>
          <Form.Control
            type="text"
            name="gear"
            placeholder="Gear"
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="rpm">
          <Form.Label>RPM</Form.Label>
          <Form.Control
            type="text"
            name="rpm"
            placeholder="RPM"
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="mph">
          <Form.Label>MPH</Form.Label>
          <Form.Control
            type="text"
            name="mph"
            placeholder="MPH"
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="sprayer">
          <Form.Label>Sprayer/Spreader</Form.Label>
          <Form.Control
            type="text"
            name="sprayer"
            placeholder="Sprayer/Spreader"
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="nozzle">
          <Form.Label>Nozzles/Setting</Form.Label>
          <Form.Control
            type="text"
            name="nozzle"
            placeholder="Nozzles/Setting"
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="pressure">
          <Form.Label>Pressure Number</Form.Label>
          <Form.Control
            type="text"
            name="pressure"
            placeholder="Pressure Number"
            onChange={this.handleInputChange}
          />
        </Form.Group>

        {/* TODO Make a tank mix section & format it like the form */}
        <Form.Group controlId="tankAmt">
          <Form.Label>Tank Mix</Form.Label>
          <Form.Control
            type="text"
            name="tankAmt"
            placeholder="Amount of Product"
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="tankWater">
          <Form.Label>Tank Mix</Form.Label>
          <Form.Control
            type="text"
            name="tankWater"
            placeholder="Gallons of Water"
            onChange={this.handleInputChange}
          />
        </Form.Group>

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
        <Form.Group controlId="appRateOz">
          <Form.Label>Application Rate (oz. lbs.)</Form.Label>
          <Form.Control
            type="text"
            name="appRateOz"
            placeholder="Application Rate (oz. lbs.)"
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="appRateLbs">
          <Form.Label>Application Rate (gal. / lbs.) </Form.Label>
          <Form.Control
            type="text"
            name="appRateLbs"
            placeholder="Application Rate (gal. / lbs.)"
            onChange={this.handleInputChange}
          />
        </Form.Group>

        {/*TODO wateredIn: "", */}

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

        <Form.Group controlId="temp">
          <Form.Label>Temperature</Form.Label>
          <Form.Control
            type="text"
            name="temp"
            placeholder="Temperature"
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="humidity">
          <Form.Label>Humidity</Form.Label>
          <Form.Control
            type="text"
            name="humidity"
            placeholder="Humidity"
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="wind">
          <Form.Label>Wind</Form.Label>
          <Form.Control
            type="text"
            name="wind"
            placeholder="Wind"
            onChange={this.handleInputChange}
          />
        </Form.Group>

        {/* date: "", */}

        <Form.Group controlId="purs">
          <Form.Label>PURS</Form.Label>
          <Form.Control
            type="text"
            name="purs"
            placeholder="PURS"
            onChange={this.handleInputChange}
          />
        </Form.Group>

        {/* timeStart: "", */}
        {/* timeEnd: "", */}
        {/* protectiveEq: "", */}

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

        {/* msds: "", */}

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

        <Form.Group controlId="signature">
          <Form.Label>Signature</Form.Label>
          <Form.Control
            type="text"
            name="signature"
            placeholder="Signature"
            onChange={this.handleInputChange}
          />
        </Form.Group>

        {/* sigDate: "", */}

        {/* </Form>{ <label htmlFor="productName">Product Name</label>
      <input
        id="productName"
        placeholder="Product Name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.productName}
      /> } */}

        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";

// function AddForm(){
//     return(
//         <div className={"Form"}>
//             <Form>
//                 <Form.Row>
//                     <Col>
//                         <Form.Control placeholder="Product Name" />
//                     </Col>
//                 </Form.Row>
//                 <Form.Row>
//                     <Col>
//                         <Form.Control placeholder="Supplier" />
//                     </Col>
//                 </Form.Row>
//                 <Form.Row>
//                     <Col xs={2}>Formulation: </Col>
//                     <Col>
//                         {['checkbox'].map((type) => (
//                             <div key={`inline-${type}`} className="mb-3">
//                                 <Form.Check inline label="Flowable" type={type} id={`inline-${type}-1`} />
//                                 <Form.Check inline label="Granular" type={type} id={`inline-${type}-2`} />
//                                 <Form.Check inline label="Wettable Powder" type={type} id={`inline-${type}-3`}/>
//                             </div>

//                         ))}
//                     </Col>
//                 </Form.Row>
//                 <Form.Row>
//                     <Col>
//                         {['checkbox'].map((type) => (
//                             <div key={`inline-${type}`} className="mb-3">
//                                 <Form.Check inline label="Emulsified Concentrate" type={type} id={`inline-${type}-1`}/>
//                             </div>

//                         ))}
//                     </Col>
//                     <Col>
//                         <Form.Control placeholder="Other"/>
//                     </Col>
//                 </Form.Row>
//                 <Form.Row>
//                     <Col xs={4}>Signal Word: </Col>
//                     <Col>
//                         {['checkbox'].map((type) => (
//                             <div key={`inline-${type}`} className="mb-3">
//                                 <Form.Check inline label="Caution" type={type} id={`inline-${type}-1`} />
//                                 <Form.Check inline label="Warning" type={type} id={`inline-${type}-2`} />
//                                 <Form.Check inline label="Danger" type={type} id={`inline-${type}-3`}/>
//                             </div>

//                         ))}
//                     </Col>
//                 </Form.Row>
//                 <Form.Row>
//                     <Col>
//                         <Form.Control placeholder="EPA Registration" />
//                     </Col>
//                     <Col>
//                         <Form.Control placeholder="EPA Est. #" />
//                     </Col>
//                 </Form.Row>
//                 <Form.Row>
//                     <Col xs={2}>Location: </Col>
//                     <Col>
//                         {['checkbox'].map((type) => (
//                             <div key={`inline-${type}`} className="mb-3">
//                                 <Form.Check inline label="Greens" type={type} id={`inline-${type}-1`} />
//                                 <Form.Check inline label="Tees" type={type} id={`inline-${type}-2`} />
//                                 <Form.Check inline label="Fairways" type={type} id={`inline-${type}-3`}/>
//                             </div>

//                         ))}
//                     </Col>
//                     <Col>
//                         <Form.Control placeholder="Other" />
//                     </Col>
//                 </Form.Row>
//                 <Button variant="primary" type="submit">
//                     Submit
//                 </Button>
//             </Form>
//         </div>
//     );
// }

export default AddForm;
