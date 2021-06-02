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

  componentDidMount() {
    this.fetchTemplates();
    this.setRowData();
  }

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
    console.log(templates[selectedIndex]);
  };

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

    // await this.fetchTemplates();
    // return [
    //   {
    //     id: "1",
    //     productName: "Test Chemical 1",
    //     supplier: "Test Supplier 1",
    //     formulation: "Test Formulation 1",
    //   },
    //   {
    //     id: "2",
    //     productName: "Test Chemical 2",
    //     supplier: "Test Supplier 2",
    //     formulation: "Test Formulation 2",
    //   },
    //   {
    //     id: "3",
    //     productName: "Test Chemical 3",
    //     supplier: "Test Supplier 3",
    //     formulation: "Test Formulation 3",
    //   },
    // ];
  };

  fetchTemplates = async () => {
    const backend = new Backend();
    const response = await backend.get_all_templates();
    console.log(response);
    // this.setState({ templates: response.data.Items });
    this.setState({ templates: response.data.Items });
  };

  //   componentDidMount() {
  //     this.setState({ templates: this.getTemplates(), showTable: true });
  //   }

  //   componentDidUpdate() {
  //     this.setState({ templates: this.getTemplates(), showTable: true });
  //   }

  render() {
    const {
      templates,
      columns,
      selectRow,
      selectedIndex,
      rowData,
      templateIsSelected,
      selectedTemplate,
    } = this.state;
    return (
      <>
        {rowData && templates ? (
          <>
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
          "Loading..."
        )}
      </>
    );
  }
}
