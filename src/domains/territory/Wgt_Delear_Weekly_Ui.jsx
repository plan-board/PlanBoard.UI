import { useEffect, useState, useRef } from "react";
import axiosInstance from "../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import { useDispatch } from "react-redux";
import ExportExcel from "../ExportExcel";
import { Row, Col } from "reactstrap";
import {
  GridComponent,
  Inject,
  ColumnDirective,
  ColumnsDirective,
  Edit,
  CommandColumn,
  Freeze,
  Page,
  Filter,
  AggregateColumnDirective,
  Toolbar,
  ExcelExport,
  Sort,
} from "@syncfusion/ej2-react-grids";
import {
  AggregateColumnsDirective,
  AggregateDirective,
  AggregatesDirective,
} from "@syncfusion/ej2-react-grids";
import { Aggregate } from "@syncfusion/ej2-react-grids";
import Loader from "../../common/Loader";

const Wgt_Delear_Weekly_Ui = ({ data }) => {
  const dispatch = useDispatch();
  let Wgt_Delear_Weekly_Instance = useRef();
  const [weekdata, setWeekdata] = useState([]);
  const [reload, setReload] = useState(false);
  // const currentDate = new Date("2023-10-22");
  const currentDate = new Date();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[currentDate.getMonth()];

  const payload = {
    Token: localStorage.getItem("access_token"),
    CustomerId: 0,
    TerritoryId: data,
    Month: "Aug",
  };
  const fetchDepotSalesPlan = async () => {
    try {
      const response = await axiosInstance.post(
        "CustomerMonthWeekPlan",
        payload
      );

      if (response?.status === 200) {
        setWeekdata(response?.data?.Data);
        setReload(false);
      }
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
      setReload(false);
    }
  };

  useEffect(() => {
    if (data !== 0) {
      fetchDepotSalesPlan(); // Call the API when component mounts
    }
  }, [data]);

  useEffect(() => {
    if (reload) {
      setReload(false);
      fetchDepotSalesPlan();
    }
  }, [reload]);

  const monthHeaderTemp = () => {
    return (
      <>
        <span style={{ textAlign: "center" }}>{month}</span>
      </>
    );
  };
  const toolbar = ["ExcelExport", "Search"];
  const toolbarClick = (args) => {
    if (
      Wgt_Delear_Weekly_Instance.current &&
      args.item.id === "CustomerMonthWeekPlan_id_excelexport"
    ) {
      const arrObj = weekdata.map((element, index) => ({
        "S.No": index + 1,
        "Dealer Name": element.dealer_name,
        "Dealer Code": element.dealer_code,
        Sales: element.month_value,
        "Week 1": element.week1,
        "Week 2": element.week2,
        "Week 3": element.week3,
        "Week 4": element.week4,
      }));

      ExportExcel("Dealer-Week-Wise-Monthly-Plan-Achievement", arrObj);
    }
  };

  return (
    <>
      <div className="w-100">
        {reload && <Loader />}
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <GridComponent
              locale="en-Us"
              id="CustomerMonthWeekPlan_id"
              key="CustomerMonthWeekPlan_id"
              allowTextWrap={true}
              allowResizing={false}
              dataSource={weekdata}
              toolbar={toolbar}
              toolbarClick={toolbarClick}
              // enableStickyHeader={true}
              height={"400px"}
              ref={Wgt_Delear_Weekly_Instance}
              allowPaging={true}
              allowSelection={true}
              gridLines="Both"
              rowHeight={30}
              pageSettings={{ pageSize: 15, pageCount: 15 }}
              allowFiltering={true}
              filterSettings={{ type: "Excel" }}
              // frozenColumns={2}
              allowExcelExport={true}
              allowSorting={true}
            >
              <ColumnsDirective>
                <ColumnDirective
                  field="dealer_name"
                  headerText={"Delear Name"}
                  width="130"
                  visible={true}
                  textAlign="left"
                  allowEditing={false}
                  Freeze={true}
                />
                <ColumnDirective
                  field="dealer_code"
                  headerText={"Delear Code"}
                  width="130"
                  visible={true}
                  textAlign="left"
                  allowEditing={false}
                  Freeze={true}
                />
                <ColumnDirective
                  columns={[
                    {
                      field: "month_value",
                      headerText: "Sales",
                      width: 90,
                      textAlign: "Center",
                      allowEditing: false,
                      allowFiltering: false,
                    },
                    {
                      field: "week1",
                      headerText: "Week-1",
                      width: 90,
                      textAlign: "Center",
                      allowEditing: false,
                      allowFiltering: false,
                    },
                    {
                      field: "week2",
                      headerText: "Week-2",
                      width: 90,
                      textAlign: "Center",
                      allowEditing: false,
                      allowFiltering: false,
                    },
                    {
                      field: "week3",
                      headerText: "Week-3",
                      width: 90,
                      textAlign: "Center",
                      allowEditing: false,
                      allowFiltering: false,
                    },
                    {
                      field: "week4",
                      headerText: "Week-4",
                      width: 90,
                      textAlign: "Center",
                      allowEditing: false,
                      allowFiltering: false,
                    },
                  ]}
                  headerTemplate={monthHeaderTemp}
                  textAlign="center"
                  headerTextAlign="Center"
                />
              </ColumnsDirective>

              <Inject services={[Page, Filter, Toolbar, ExcelExport, Sort]} />
            </GridComponent>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Wgt_Delear_Weekly_Ui;
