import React from "react";
import { Row, Col } from "reactstrap";
import DataTable from "react-data-table-component";
const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#f2f2f2",
    },
  },
};
export const CustomerPotentialForm = ({
  TerritoryDropdown,
  handleChange,
  territoryId,
  employeeList,
  subHeaderComponentMemo,
}) => {
  const renderInputColumn = (row) => {
    return (
      <span>
        <input
          name="PotentialValue"
          type="number"
          onChange={(e) => handleChange(e, row)}
          value={parseInt(row.PotentialValue)}
        />
      </span>
    );
  };
  const colummns = [
    {
      name: "S.NO",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Customer Code",
      selector: (row) => row.CustomerCode,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.CustomerName,
      sortable: true,
    },

    {
      name: "Dealer Category",
      selector: (row) => row.DealerCategory,
      sortable: true,
    },

    {
      name: "Potential",
      cell: renderInputColumn,
      width: "200px",
    },
  ];

  return (
    <>
      <Row>
        <Col xl={3} lg={3} md={6} sm={12} xs={12}>
          <label className="formlabel">Territory*</label>
          <select
            className="from_dropDownCss"
            name="territoryId"
            onChange={handleChange}
            value={territoryId}
          >
            <option value="0">Select</option>
            {TerritoryDropdown()}
          </select>
          {/* {errors.role_id && (
                <span style={{ color: "red" }}>{errors.role_id}</span>
              )} */}
        </Col>
      </Row>
      <div className="tbl-container" style={{ marginTop: "10px" }}>
        <DataTable
          columns={colummns}
          data={employeeList}
          className="datatable"
          fixedHeader={true}
          fixedHeaderScrollHeight="400px"
          subHeader
          pagination
          customStyles={customStyles}
          subHeaderComponent={subHeaderComponentMemo}
          subHeaderAlign="left"
          // subHeaderComponent={
          //   <button
          //     type="button"
          //     className="btn btn-primary"
          //     // onClick={() => handleSave()}
          //   >
          //     <i className="fa fa-plus"></i> Save
          //   </button>
          // }
        />
      </div>
    </>
  );
};
