import React from "react";
import Col from "react-bootstrap/Col";
//import Image from 'react-bootstrap/Image';
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Students from "./data.json";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      startDate: "",
      endDate: "",
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
      <div className={"SearchForm"}>
        <Row>
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
                <Col xs={3}>Product Name</Col>
                <Col>
                  <Form.Group controlId="productName">
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
                <Col xs={3}>Date Range</Col>
                <Col>
                  <Form.Group controlId="startDate">
                    <Form.Control
                      type="text"
                      name="startDate"
                      placeholder="Start Date"
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <p>-</p>
                <Col>
                  <Form.Group controlId="endDate">
                    <Form.Control
                      type="text"
                      name="endDate"
                      placeholder="End Date"
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Button type="submit">Submit</Button>
              </Form.Row>
            </Col>
            <Col>
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
        </Form>
      </div>
    );
  }
}

export default SearchForm;
