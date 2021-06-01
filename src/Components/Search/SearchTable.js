import React from "react";
import { Col, Row, Button, Container, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Backend from "../../model/backend.js";
import Modalview from "../Modal";
import { Redirect } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./SearchForm.css";

class SearchTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      document: props.document,
      showModal: false,
      index: -1,
    };
  }

  handleClick = (index) => {
    this.setState({ showModal: true, index: index });
  };

  handleModal = (isOpen) => {
    this.setState({ showModal: isOpen });
  };

  render() {
    const { document, showModal, index } = this.state;

    if (showModal) {
      return (
        <Modalview
            formData={document.Items[index]}
            handleModal2={this.handleModal.bind(this)}
            isOpen={showModal}
        />
      )
    }

    return (
      <Container>
        <Row>
          <Table striped bordered hover className="search result-table mt-3 ml-auto mr-auto">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Date</th>
                <th>Signature</th>
              </tr>
            </thead>
            <tbody>
              {document.Items.map((item, i) => (
                <tr key={i}>
                  <td>
                    {i}
                  </td>
                  <td>
                    <Button onClick={() => this.setState({ showModal: true, index: i })}>
                      {item.productName}
                    </Button>
                  </td>
                  <td>{item.date}</td>
                  <td>{item.signature}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
        <Row>
          <Button variant="secondary" className="mb-3" onClick={() => this.props.handleTable(false)}>
            Return to Search Criteria
          </Button>
        </Row>
      </Container>
    )
  }
}

export default SearchTable;