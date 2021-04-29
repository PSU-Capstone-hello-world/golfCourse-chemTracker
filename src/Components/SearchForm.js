import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import Students from "./data.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SearchForm.css";
//import { getByDisplayValue } from "@testing-library/dom";
//import SearchResult from "./test";
//import { axios } from "axios";
import Backend from "../model/backEnd.js";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      startDate: new Date(),
      endDate: new Date(),
      search: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.result = null;
  }

  async fetchData(search) {
    let backend = new Backend();
    let document = await backend.getByName(search.productName);
    /*
    let document2 = await backend.getDateRange(
      search.startDate,
      search.endDate
    );
    
    console.log("date Search:", document2);
    */
    console.log("productName", document);
    console.log(typeof document);
    //this.setState({ search: "true" });
    this.displayData(document);
  }

  displayData(document) {
    this.result = (
      <table border="2">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Signature</th>
          </tr>
          {document.Items.map((item, i) => (
            <tr key={i}>
              <td>{item.productName}</td>
              <td>{item.date}</td>
              <td>{item.signature}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleStartDateChange(newDate) {
    this.setState({
      //startDate: DateTimeFormat('en-US', {year:'numeric', month: '2-digit', day: '2-digit'}).format(newDate)
      startDate: newDate,
    });
  }

  handleEndDateChange(newDate) {
    this.setState({
      endDate: newDate,
    });
  }

  handleSubmit(event) {
    this.setState({ search: true });
    console.log(JSON.stringify(this.state));
    event.preventDefault();
    this.fetchData(this.state);
  }

  render() {
    return (
      <div className={"SearchForm"}>
        <Row className={"header"}>
          <Col>
            <h2>Search Criteria</h2>
          </Col>
          <Col>
            <h2>Search Results</h2>
          </Col>
        </Row>
        <hr className={"line"} />
        <Form className="search-form" onSubmit={this.handleSubmit}>
          <Row>
            <Col>
              <Form.Row>
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
              </Form.Row>
              <Form.Row>
                <Form.Label>Date Range</Form.Label>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId="startDate">
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleStartDateChange}
                      name="startDate"
                      dateFormat="MM/dd/yyyy"
                    />
                  </Form.Group>
                </Col>
                <p>-</p>
                <Col>
                  <Form.Group controlId="endDate">
                    <DatePicker
                      selected={this.state.endDate}
                      onChange={this.handleEndDateChange}
                      name="endDate"
                      dateFormat="MM/dd/yyyy"
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Button type="submit">Submit</Button>
              </Form.Row>
            </Col>
            <Col className="table">{this.state.search ? this.result : ""}</Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default SearchForm;
