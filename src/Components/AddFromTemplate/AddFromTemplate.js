import React, { Component } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import Button from "react-bootstrap/Button";
import "./AddFromTemplate.css";
import Backend from "../../model/backend";

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
      selectRow: {
        mode: "radio",
        bgColor: "LightBlue",
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
          this.setState({ selectedIndex: rowIndex });
        },
      },
    };
  }

  componentDidMount() {
    this.fetchTemplates();
    this.setRowData();
  }

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
    const { templates, columns, selectRow, selectedIndex, rowData } =
      this.state;
    return (
      <>
        {rowData && templates ? (
          <>
            <BootstrapTable
              keyField="id"
              data={rowData}
              columns={columns}
              selectRow={selectRow}
            />
            <Button type="submit" onSubmit={console.log(selectedIndex)}>
              Use Selected Template
            </Button>
          </>
        ) : (
          "loading"
        )}
      </>
    );
  }
}
