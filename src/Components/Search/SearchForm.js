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
      noFormsFound: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.result = null;
  }

  monthDiff(d1, d2) {
    const diff = Math.abs(d2 - d1);
    return diff / (1000 * 60 * 60 * 24 * 30);
  }

  async handleSubmit(event) {
    event.preventDefault();
    let output = JSON.parse(JSON.stringify(this.state));

    if (output.startDate) {
      output.startDate = JSON.stringify(output.startDate).slice(1, 11);
    }
    if (output.endDate) {
      output.endDate = JSON.stringify(output.endDate).slice(1, 11);
    }

    await this.fetchData(output);
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

    if (document !== undefined) {
      this.setState({ search: true, document: document });
    } else {
      this.setState({ search: false, noFormsFound: true}, () => this.onShowNoFormsAlert())
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

  onShowNoFormsAlert = () => {
      this.setState({ noFormsFound: true }, () => {
          window.setTimeout(() => {
              this.setState({ noFormsFound: false })
          }, 2500);
      });
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
      noFormsFound: null
    });
  }

  render() {
    const { search, document, noFormsFound } = this.state;

    if (search) {
      if (document !== undefined) {
        return (
          <SearchTable 
            document={document}
            handleTable={this.handleTable.bind(this)}
          />
        )
      } 
    }

    return (
      <Container fluid>
        <div className="d-flex justify-content-center">
          <Alert variant="secondary" hidden={!noFormsFound} className="fade-out position-absolute top-70 start-50 w-50 h-10">No Forms Found</Alert>
        </div>
        <Form className="search" onSubmit={this.handleSubmit}>
          <div className='d-flex justify-content-center'>
              <h2>Search Criteria</h2>
          </div>
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
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="startDate">
                <Form.Label>Date Range</Form.Label>
                <DatePicker
                  placeholderText="Start Date"
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
                  placeholder="Location"
                  onChange={this.handleInputChange}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Button type="submit">Search</Button>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default SearchForm;

// class SearchForm extends React.Component {
//   constructor(props) {
//     super(props);
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 70);
//     this.state = {
//       productName: "",
//       startDate: null,
//       endDate: null,
//       location: "",
//       search: false,
//       document: "",
//       showModal: false,
//       index: -1,
//     };

//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.handleStartDateChange = this.handleStartDateChange.bind(this);
//     this.handleEndDateChange = this.handleEndDateChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.result = null;
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { document } = this.state;
//     if (prevState.search !== this.state.search) {
//       this.displayData(document);
//     }
//   }

//   monthDiff(d1, d2) {
//     const diff = Math.abs(d2 - d1);
//     return diff / (1000 * 60 * 60 * 24 * 30);
//   }

//   async handleSubmit(event) {
//     event.preventDefault();
//     let output = JSON.parse(JSON.stringify(this.state));
//     if (output.startDate) {
//       output.startDate = JSON.stringify(output.startDate).slice(1, 11);
//     }
//     if (output.endDate) {
//       output.endDate = JSON.stringify(output.endDate).slice(1, 11);
//     }

//     await this.fetchData(output);
//   }

//   async fetchData(search) {
//     let backend = new Backend();

//     let document;
//     if (
//       search.startDate &&
//       search.endDate &&
//       search.productName &&
//       search.location
//     ) {
//       document = await backend.getDateProductLocation(
//         search.productName,
//         search.location,
//         search.startDate,
//         search.endDate
//       );
//     } else if (
//       search.startDate &&
//       search.endDate &&
//       search.productName &&
//       !search.location
//     ) {
//       document = await backend.getDateProduct(
//         search.startDate,
//         search.endDate,
//         search.productName
//       );
//     } else if (
//       !search.productName &&
//       search.startDate &&
//       search.endDate &&
//       search.location
//     ) {
//       document = await backend.getDateLocation(
//         search.startDate,
//         search.endDate,
//         search.location
//       );
//     } else if (
//       !search.startDate &&
//       !search.endDate &&
//       search.productName &&
//       search.location
//     ) {
//       document = await backend.getNameLocation(
//         search.productName,
//         search.location
//       );
//     } else if (
//       search.startDate &&
//       search.endDate &&
//       !search.productName &&
//       !search.location
//     ) {
//       document = await backend.getDateRange(search.startDate, search.endDate);
//     } else if (
//       search.productName &&
//       !search.startDate &&
//       !search.endDate &&
//       !search.location
//     ) {
//       document = await backend.getByName(search.productName);
//     } else if (
//       search.location &&
//       !search.productName &&
//       !search.startDate &&
//       !search.endDate
//     ) {
//       document = await backend.getLocation(search.location);
//     }
//     if (document) console.log("productName", document);

//     this.setState({ search: true, document: document });
//     return document;
//   }


//   handleInputChange(event) {
//     const target = event.target;
//     const value = target.value;
//     const name = target.name;

//     this.setState({
//       [name]: value,
//     });
//   }

//   handleStartDateChange(newDate) {
//     if (newDate) {
//       this.setState({
//         startDate: new Date(newDate.getTime()),
//       });
//     } else {
//       this.setState({
//         startDate: null,
//       });
//     }
//   }

//   handleEndDateChange(newDate) {
//     if (newDate) {
//       this.setState({
//         endDate: new Date(newDate.getTime()),
//       });
//     } else {
//       this.setState({
//         endDate: null,
//       });
//     }
//   }

//   handleModal = (isOpen) => {
//     this.setState({ showModal: isOpen });
//   };

//   render() {
//     const { document, showModal, index } = this.state;
//     return (
//       <Container fluid>
//         <Row className={"header"}>
//           <Col>
//             <h2>Search Criteria</h2>
//           </Col>
//           <Col>
//             <h2>Search Results</h2>
//           </Col>
//         </Row>
//         <hr className={"line"} />
//         <Form className="search-form" onSubmit={this.handleSubmit}>
//           <Row>
//             <Col>
//               <Form.Row>
//                 <Col>
//                   <Form.Group controlId="productName">
//                     <Form.Label>Product Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="productName"
//                       placeholder="Product Name"
//                       onChange={this.handleInputChange}
//                     />
//                   </Form.Group>
//                 </Col>
//               </Form.Row>
//               <Form.Row>
//                 <Form.Label>Date Range</Form.Label>
//               </Form.Row>
//               <Form.Row>
//                 <Col>
//                   <Form.Group controlId="startDate">
//                     <DatePicker
//                       selected={this.state.startDate}
//                       onChange={this.handleStartDateChange}
//                       autoComplete="off"
//                       name="startDate"
//                       dateFormat="MM/dd/yyyy"
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col>
//                   <Form.Group controlId="endDate">
//                     <DatePicker
//                       selected={this.state.endDate}
//                       onChange={this.handleEndDateChange}
//                       autoComplete="off"
//                       name="endDate"
//                       dateFormat="MM/dd/yyyy"
//                     />
//                   </Form.Group>
//                 </Col>
//               </Form.Row>
//               <Form.Row>
//                 <Col>
//                   <Form.Group controlId="location">
//                     <Form.Label>Location</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="location"
//                       placeholder="Location"
//                       onChange={this.handleInputChange}
//                     ></Form.Control>
//                   </Form.Group>
//                 </Col>
//               </Form.Row>
//               <Form.Row>
//                 <Button type="submit">Search</Button>
//               </Form.Row>
//               {showModal ? (
//                 <Modalview
//                   formData={document.Items[index]}
//                   handleModal2={this.handleModal.bind(this)}
//                   isOpen={showModal}
//                 ></Modalview>
//               ) : (
//                 ""
//               )}
//             </Col>
//             <Col className="table">
//               {document ? this.displayData(document) : ""}
//             </Col>
//           </Row>
//         </Form>
//       </Container>
//     );
//   }
// }