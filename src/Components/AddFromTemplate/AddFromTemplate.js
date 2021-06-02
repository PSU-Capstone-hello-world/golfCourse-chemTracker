import React, { Component } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import Button from "react-bootstrap/Button";
import "./AddFromTemplate.css";
import Backend from "../../model/backend";
import AddForm from "../AddForm";

export default class AddFromTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Columns of the table
      columns: [
        { dataField: "id", text: "Id", hidden: true },
        { dataField: "productName", text: "Product Name", sort: true },
        { dataField: "supplier", text: "Supplier", sort: true },
        { dataField: "formulation", text: "Formulation" },
      ],
      templates: null,
      rowData: null,
      selectedIndex: null,
      templateIsSelected: false,
      selectedTemplate: null,

      // Row select actions and styles
      selectRow: {
        mode: "radio",
        bgColor: "LightBlue",
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
          this.setState({ selectedIndex: row.id });
        },
      },
    };
  }

  // Get the data for the table when the page loads
  componentDidMount() {
    this.fetchTemplates();
    this.setRowData();
  }

  // Display add form page with props based on selected row
  handleSubmit = (e) => {
    e.preventDefault();
    const { templates, selectedIndex } = this.state;
    if (selectedIndex == null) {
      alert("Please select a template");
      return false;
    }
    this.setState({
      selectedTemplate: templates[selectedIndex],
      templateIsSelected: true,
    });
  };

  // Extract the required data from the template and put it into the rowData state
  setRowData = async () => {
    await this.fetchTemplates();
    let rowData = this.state.templates.map(
      ({
        productName,
        supplier,
        formulationEmul,
        formulationFlow,
        formulationGran,
        formulationWet,
        formulationOther,
        formulationOtherVal,
      }) => ({
        productName,
        supplier,
        formulationEmul,
        formulationFlow,
        formulationGran,
        formulationWet,
        formulationOther,
        formulationOtherVal,
      })
    );

    for (const template in rowData) {
      rowData[template].id = template;
      rowData[template].formulation = [];
      if (rowData[template].formulationEmul) {
        rowData[template].formulation.push("Emul. Conc.");
      }
      if (rowData[template].formulationFlow) {
        rowData[template].formulation.push("Flowable");
      }
      if (rowData[template].formulationGran) {
        rowData[template].formulation.push("Granular");
      }
      if (rowData[template].formulationWet) {
        rowData[template].formulation.push("Wettable");
      }
      if (rowData[template].formulationOther && rowData.formulationOtherVal) {
        rowData[template].formulation.push(rowData.formulationOther);
      }
      rowData[template].formulation = rowData[template].formulation.join(", ");
      delete rowData[template].formulationEmul;
      delete rowData[template].formulationFlow;
      delete rowData[template].formulationGran;
      delete rowData[template].formulationWet;
      delete rowData[template].formulationOther;
      delete rowData[template].formulationOtherVal;
    }

    this.setState({ rowData: rowData });
  };

  // Fetches all templates from backend and sets the templates state
  fetchTemplates = async () => {
    const backend = new Backend();
    const response = await backend.get_all_templates();
    // console.log(response);
    this.setState({ templates: response.data.Items });
  };

  render() {
    const {
      templates,
      columns,
      selectRow,
      rowData,
      templateIsSelected,
      selectedTemplate,
    } = this.state;

    return (
      <>
        {/* If we have the templates sved and data for the rows saved */}
        {rowData && templates ? (
          <>
            {/* If we have selected a template and clicked the add from template button */}
            {templateIsSelected && selectedTemplate !== null ? (
              <AddForm {...selectedTemplate} />
            ) : (
              <>
                <BootstrapTable
                  keyField="id"
                  data={rowData}
                  columns={columns}
                  selectRow={selectRow}
                />
                <Button onClick={this.handleSubmit}>
                  Use Selected Template
                </Button>
              </>
            )}
          </>
        ) : (
          // While the data is loading
          "Loading..."
        )}
      </>
    );
  }
}
