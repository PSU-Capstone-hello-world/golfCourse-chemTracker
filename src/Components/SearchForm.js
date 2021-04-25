import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Students from "./data.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SearchForm.css";
//import SearchResult from "./test";
import { axios } from "axios";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      startDate: new Date(),
      endDate: new Date(),
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const apiUrl =
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => console.log("This is your data", data));
    //.then((data) => displayData(data));
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
      startDate: newDate,
    });
  }

  handleEndDateChange(newDate) {
    this.setState({
      endDate: newDate,
    });
  }

  handleSubmit(event) {
    console.log(JSON.stringify(this.state));
    event.preventDefault();
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
            <Col className={"table"}>
              <table border="2">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Age</th>
                    <th>rollno</th>
                  </tr>

                  {Students.students.map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.department}</td>
                      <td>{item.age}</td>
                      <td>{item.rollno}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
          <table border="2">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Age</th>
                <th>rollno</th>
              </tr>

              {Students.students.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.department}</td>
                  <td>{item.age}</td>
                  <td>{item.rollno}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Form>
      </div>
    );
  }
}

export default SearchForm;
