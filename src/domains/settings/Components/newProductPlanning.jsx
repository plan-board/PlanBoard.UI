import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import axiosInstance from "./../../../auth/api";
import { SHOW_TOAST } from "../../../store/constant/types";

// import CustomPopup from "../../CustomPopup";
import ResponsePopup from "../../../common/ResponsePopup";
import Loader from "../../../common/Loader";
import { Row, Col } from "reactstrap";
import {
  GridComponent,
  Inject,
  ColumnDirective,
  ColumnsDirective,
  CommandColumn,
  Page,
  Filter,
  Toolbar,
  ExcelExport,
  Sort,
} from "@syncfusion/ej2-react-grids";
import { useSelector } from "react-redux";

const NewProductMaster = ({ toggleState }) => {
  const dispatch = useDispatch();
  const { AuthData } = useSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [ProductList, setProductList] = useState([]);

  const [formDetails, setFormDetails] = useState({
    newproductid: 0,
    categoryId: 0,
    skuCode: "",
    skuname: "",
    packsize: 0,
  });
  const [responseDetails, setResponseDetails] = useState({
    type: "",
    show: false,
    message: "",
  });

  useEffect(() => {
    fetchCategoryList();
    fetchProductList();
  }, [toggleState]);

  const fetchProductList = async () => {
    const payload = {
      ProductId: 0,
    };
    setLoading(true);
    try {
      const res = await axiosInstance.post("GetNewProductList", payload);
      if (res?.status === 200) {
        if (res?.data?.Data.length > 0 && res?.data?.Data != null) {
          res.data.Data.map((val, index) => {
            val.Sno = index + 1;
          });
          setProductList(res.data.Data);
        }
      }
      setLoading(false);
    } catch (err) {
      dispatch({ type: SHOW_TOAST, payload: err.message });
    }
  };

  const fetchCategoryList = async () => {
    setLoading(true);
    const payload = {
      CategoryId: 0,
    };
    try {
      const res = await axiosInstance.post(
        "api/Master/GetCategoryList",
        payload
      );
      if (res?.status === 200) {
        if (res?.data?.Data.length > 0 && res?.data?.Data != null) {
          setCategoryList(res.data.Data);
        }
      }
      setLoading(false);
    } catch (err) {
      dispatch({ type: SHOW_TOAST, payload: err.message });
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormDetails({ ...formDetails, [name]: value });
  };
  const categDropDwn = () => {
    return categoryList.map((item, index) => (
      <option key={item?.categoryid} value={item?.categoryid}>
        {item?.categoryname}
      </option>
    ));
  };

  const handleSave = async () => {
    setLoading(true);
    const payload = {
      newproductid:
        formDetails.newproductid != 0 ? formDetails.newproductid : 0,
      categoryid: parseInt(formDetails.categoryId),
      skuname: formDetails.skuname,
      skucode: formDetails.skuCode,
      packsize: parseFloat(formDetails.packsize),
      userid: parseInt(AuthData.Data[0]?.EmployeeID),
    };

    try {
      const res = await axiosInstance.post("SetNewProductData", payload);
      if (res.status == 200) {
        if (res.data.Status == true || res.data.Status == "true") {
          setResponseDetails({
            show: true,
            message: res.data.Message,
            type: "success",
          });
          setFormDetails({
            newproductid: 0,
            categoryId: 0,
            skuCode: "",
            skuname: "",
            packsize: 0,
          });
          fetchProductList();
        } else {
          setResponseDetails({
            show: true,
            message: res.data.Message,
            type: "error",
          });
        }
      }
      setLoading(false);
    } catch (error) {
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };
  const handleCloseResponse = () => {
    setResponseDetails({ show: false, message: "", type: "" });
  };

  const commmandTemplate = [
    {
      type: "Edit",
      buttonOption: { cssClass: "e-flat", iconCss: "e-edit e-icons" },
    },
  ];

  const getSingleRowData = async (args) => {
    if (args) {
      const payload = {
        ProductId: parseInt(args.rowData.productid),
      };
      setLoading(true);
      try {
        const response = await axiosInstance.post("GetNewProductList", payload);
        if (response?.status === 200) {
          if (response.data.Status && response.data.Data.length > 0) {
            setFormDetails({
              newproductid: response.data.Data[0].productid,
              categoryId: response.data.Data[0].categoryid,
              skuCode: response.data.Data[0].skucode,
              skuname: response.data.Data[0].skuname,
              packsize: response.data.Data[0].packsize,
            });
            // fetchProductList();
          } else {
            setResponseDetails({
              show: true,
              message: response.data.Message,
              type: "error",
            });
          }
          setLoading(false);
        }
      } catch (error) {
        dispatch({ type: SHOW_TOAST, payload: error.message });
      }
    }
  };
  const handleRefresh = () => {
    setFormDetails({
      newproductid: 0,
      categoryId: 0,
      skuCode: "",
      skuname: "",
      packsize: 0,
    });
  };

  return (
    <>
      <section>
        {isLoading && <Loader />}
        <form>
          <table className="table-bordered table-striped equal-width-table">
            <thead style={{ color: "#000", background: "#e0e0e0" }}>
              <tr>
                <th>
                  <label htmlFor="selectionBox" style={{ marginBottom: "0px" }}>
                    Category
                  </label>
                </th>
                <th>
                  <label htmlFor="selectionBox" style={{ marginBottom: "0px" }}>
                    SKU Code
                  </label>
                </th>
                <th>
                  <label htmlFor="selectionBox" style={{ marginBottom: "0px" }}>
                    SKU Name
                  </label>
                </th>
                <th>
                  <label htmlFor="selectionBox" style={{ marginBottom: "0px" }}>
                    Pack Size
                  </label>
                </th>
                <th>
                  <label htmlFor="selectionBox" style={{ marginBottom: "0px" }}>
                    Action
                  </label>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ width: "23%" }}>
                  <select
                    className="form-control"
                    name="categoryId"
                    value={formDetails.categoryId}
                    onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    {categDropDwn()}
                  </select>
                </td>
                <td style={{ width: "23%" }}>
                  <input
                    className="w3-input"
                    type="text"
                    placeholder="SKU Code"
                    name="skuCode"
                    value={formDetails.skuCode}
                    onChange={handleChange}
                  />
                </td>
                <td style={{ width: "23%" }}>
                  <input
                    className="w3-input"
                    type="text"
                    placeholder="SKU Name"
                    name="skuname"
                    value={formDetails.skuname}
                    onChange={handleChange}
                  />
                </td>
                <td style={{ width: "23%" }}>
                  <input
                    className="w3-input"
                    type="number"
                    placeholder="Pack Size"
                    name="packsize"
                    value={formDetails.packsize}
                    onChange={handleChange}
                  />
                </td>

                <td style={{ width: "30px" }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={
                      formDetails.categoryId != 0 &&
                      formDetails.skuCode != "" &&
                      formDetails.skuname != 0 &&
                      formDetails.packsize != 0
                        ? false
                        : true
                    }
                    style={{
                      background: "green",
                      border: "none",
                      marginRight: "5px",
                    }}
                    onClick={() => handleSave()}
                  >
                    <i className="fa fa-plus"></i> Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    // style={{ background: "green" }}
                    onClick={() => handleRefresh()}
                  >
                    <i className="fa fa-refresh"></i> Refresh
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <Row style={{ marginTop: "15px" }}>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <GridComponent
              locale="en-Us"
              id="newProductPlanningGrid_id"
              key="newProductPlanningGrid_id"
              allowTextWrap={true}
              allowResizing={false}
              dataSource={ProductList}
              height={"350px"}
              // ref={zoneMasterInstance}
              toolbar={["ExcelExport", "Search"]}
              allowPaging={true}
              allowSelection={true}
              gridLines="Both"
              rowHeight={30}
              pageSettings={{ pageSize: 15, pageCount: 15 }}
              allowFiltering={true}
              filterSettings={{ type: "Excel" }}
              allowExcelExport={true}
              allowSorting={true}
              commandClick={getSingleRowData}
            >
              <ColumnsDirective>
                <ColumnDirective
                  field="Sno"
                  headerText={"S.No"}
                  visible={true}
                  textAlign="center"
                  width="100"
                  allowEditing={false}
                  allowFiltering={false}
                />
                <ColumnDirective
                  field="categoryname"
                  headerText={"Category Name"}
                  width="130"
                  visible={true}
                  textAlign="left"
                  allowEditing={false}
                  allowFiltering={false}
                />
                <ColumnDirective
                  field="skuname"
                  headerText={"Sku Name"}
                  width="130"
                  visible={true}
                  textAlign="left"
                  allowEditing={false}
                />
                <ColumnDirective
                  field="skucode"
                  headerText={"Sku Code"}
                  width="130"
                  format={"N2"}
                  visible={true}
                  textAlign="center"
                  allowEditing={false}
                />
                <ColumnDirective
                  field="packsize"
                  headerText={"Pack Size"}
                  width="150"
                  visible={true}
                  textAlign="left"
                  allowEditing={false}
                />

                <ColumnDirective
                  headerTemplate="Action"
                  width="100"
                  visible={true}
                  textAlign="center"
                  allowEditing={false}
                  commands={commmandTemplate}
                  allowSorting={false}
                />
              </ColumnsDirective>

              <Inject
                services={[
                  CommandColumn,
                  Page,
                  Filter,
                  Toolbar,
                  ExcelExport,
                  Sort,
                ]}
              />
            </GridComponent>
          </Col>
        </Row>
        <ResponsePopup
          show={responseDetails.show}
          text={responseDetails.message}
          type={responseDetails.type}
          onClose={handleCloseResponse}
        />
      </section>
    </>
  );
};

export default NewProductMaster;
