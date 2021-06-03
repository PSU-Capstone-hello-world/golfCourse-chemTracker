import React from "react";
import { Col, Row, Form, Button, Container, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Backend from "../../model/backend.js";
import SearchTable from "./SearchTable";
import "react-datepicker/dist/react-datepicker.css";
import "./SearchForm.css";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 70);

    this.state = {
      productName: "",
      startDate: null,
      endDate: null,
      location: "",
      search: false,
      document: "",
      showModal: false,
      index: -1,
      noFormsFound: null,
      emptySearch: false,
      disabled: false,
      deleteAlert: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.result = null;
  }

  async handleSubmit(event) {
    event.preventDefault();
    let output = JSON.parse(JSON.stringify(this.state));
    if (
      !output.startDate &&
      !output.endDate &&
      !output.productName &&
      !output.location
    ) {
      this.setState({ emptySearch: true, disabled: true });
    } else {
      if (output.startDate) {
        output.startDate = JSON.stringify(output.startDate).slice(1, 11);
      }
      if (output.endDate) {
        output.endDate = JSON.stringify(output.endDate).slice(1, 11);
      }

      await this.fetchData(output);
    }
  }

  async fetchData(search) {
    let backend = new Backend();
    let document;
    if (
      search.startDate &&
      search.endDate &&
      search.productName &&
      search.location
    ) {
      document = await backend.getDateProductLocation(
        search.productName,
        search.location,
        search.startDate,
        search.endDate
      );
    } else if (
      search.startDate &&
      search.endDate &&
      search.productName &&
      !search.location
    ) {
      document = await backend.getDateProduct(
        search.startDate,
        search.endDate,
        search.productName
      );
    } else if (
      !search.productName &&
      search.startDate &&
      search.endDate &&
      search.location
    ) {
      document = await backend.getDateLocation(
        search.startDate,
        search.endDate,
        search.location
      );
    } else if (
      !search.startDate &&
      !search.endDate &&
      search.productName &&
      search.location
    ) {
      document = await backend.getNameLocation(
        search.productName,
        search.location
      );
    } else if (
      search.startDate &&
      search.endDate &&
      !search.productName &&
      !search.location
    ) {
      document = await backend.getDateRange(search.startDate, search.endDate);
    } else if (
      search.productName &&
      !search.startDate &&
      !search.endDate &&
      !search.location
    ) {
      document = await backend.getByName(search.productName);
    } else if (
      search.location &&
      !search.productName &&
      !search.startDate &&
      !search.endDate
    ) {
      document = await backend.getLocation(search.location);
    }
    if (document) console.log("productName", document);

    if (document !== undefined && document.Items[0] !== undefined) {
      this.setState({ search: true, document: document });
    } else {
      this.setState({ search: false, noFormsFound: true, disabled: true });
    }

    return document;
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
    if (newDate) {
      this.setState({
        startDate: new Date(newDate.getTime()),
      });
    } else {
      this.setState({
        startDate: null,
      });
    }
  }

  handleEndDateChange(newDate) {
    if (newDate) {
      this.setState({
        endDate: new Date(newDate.getTime()),
      });
    } else {
      this.setState({
        endDate: null,
      });
    }
  }

  handleTable = (returned) => {
    this.setState({
      productName: "",
      startDate: null,
      endDate: null,
      location: "",
      search: false,
      document: "",
      showModal: false,
      index: -1,
      noFormsFound: null,
    });
  };

  handleDeleteAlert = (status) => {
    this.setState({ deleteAlert: status, search: false, disabled: true });
  };

  render() {
    const {
      search,
      document,
      noFormsFound,
      emptySearch,
      disabled,
      deleteAlert,
    } = this.state;

    if (search) {
      if (document !== undefined) {
        return (
          <SearchTable
            document={document}
            handleTable={this.handleTable.bind(this)}
            handleDeleteAlert={this.handleDeleteAlert.bind(this)}
          />
        );
      }
    }

    return (
      <Container fluid>
        <div className="d-flex justify-content-center">
          <Alert
            variant="secondary"
            dismissible
            onClose={() =>
              this.setState({ noFormsFound: false, disabled: false })
            }
            hidden={!noFormsFound}
            className="fade-out position-absolute top-70 start-50 w-50 h-10"
          >
            No Forms Found
          </Alert>
          <Alert
            variant="warning"
            dismissible
            onClose={() =>
              this.setState({ emptySearch: false, disabled: false })
            }
            hidden={!emptySearch}
            className="fade-out position-absolute top-70 start-50 w-50 h-10"
          >
            Must Search By At Least One Field
          </Alert>
          <Alert
            variant="danger"
            dismissible
            onClose={() =>
              this.setState({ deleteAlert: false, disabled: false })
            }
            hidden={!deleteAlert}
            className="fade-out position-absolute top-70 start-50 w-50 h-10"
          >
            Form Has Been Deleted
          </Alert>
        </div>
        <Form className="search" onSubmit={this.handleSubmit}>
          <div className="d-flex justify-content-center">
            <h2>Search Criteria</h2>
          </div>
          <Row>
            <Col>
              <Form.Group controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  disabled={disabled}
                  name="productName"
                  placeholder="Product Name"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="startDate">
                <Form.Label>Date Range</Form.Label>
                <DatePicker
                  placeholderText="Start Date"
                  disabled={disabled}
                  selected={this.state.startDate}
                  onChange={this.handleStartDateChange}
                  autoComplete="off"
                  name="startDate"
                  dateFormat="MM/dd/yyyy"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="endDate">
                <Form.Label></Form.Label>
                <DatePicker
                  placeholderText="End Date"
                  selected={this.state.endDate}
                  onChange={this.handleEndDateChange}
                  autoComplete="off"
                  name="endDate"
                  dateFormat="MM/dd/yyyy"
                  disabled={disabled}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  disabled={disabled}
                  placeholder="Location"
                  onChange={this.handleInputChange}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Button type="submit" disabled={disabled}>
              Search
            </Button>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default SearchForm;
