import { useEffect, useState, useRef } from "react";
import axiosInstance from "../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import { useDispatch } from "react-redux";
import ExportExcel from "../ExportExcel";
import { GetPercent, fNWCommas, getMonths } from "../../utils/utils";
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
import { getCurrentMonth } from "../../utils/utils";

const itemsPerPage = 10;

const LogSummary = ({ actionType = "HOD", selectedId }) => {
  const dispatch = useDispatch();
  let logHistoryGridInstance = useRef();
  const [logHistory, setLogHistory] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const entityId = actionType == "HOD" ? 0 : selectedId;
  const fetchLogHistory = async () => {
    try {
      const payload = {
        Token: localStorage.getItem("access_token"),
        Type: actionType,
        FYId: 5,
        Month: getCurrentMonth(),
        EntityId: entityId,
      };
      const response = await axiosInstance.post(
        "api/Master/GetIsLockByEntityData",
        payload
      );

      if (response?.status === 200) {
        setLogHistory(response?.data?.Data);
      }
      setLoading(false);
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  useEffect(() => {
    if (actionType == "HOD" || selectedId != 0 || selectedId == 0) {
      setLoading(true);
      fetchLogHistory();
    }
  }, [selectedId]);

  const lockunlockTemplate = (args) => {
    return (
      <>
        {args?.islock ? (
          <>
            <i className="fa fa-lock  w3-text-red"></i>
          </>
        ) : (
          <>
            <i className="fa fa-lock  w3-text-green"></i>
          </>
        )}
      </>
    );
  };
  const toolbar = ["ExcelExport", "Search"];
  const toolbarClick = (args) => {
    if (
      logHistoryGridInstance.current &&
      args.item.id === "lockSummarysInstance_id_excelexport"
    ) {
      const arrObj = logHistory.map((element, index) => ({
        "S.No": index + 1,
        Zone: element.zone_name,
        Depo: element.depot_name,
        Territory: element.territory_name,
        "Area Manager Code": element.employee_name,
        "Area Manager Name": element.employee_code,
        Lock: element.islock,
      }));

      ExportExcel("Log Summary", arrObj);
    }
  };
  return (
    <>
      <div id="mom-north" className="row">
        {isLoading && <Loader />}
        <div className="full">
          <Row>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <GridComponent
                locale="en-Us"
                id="lockSummarysInstance_id"
                key="lockSummarysInstance_id"
                allowTextWrap={true}
                allowResizing={false}
                dataSource={logHistory}
                toolbar={toolbar}
                toolbarClick={toolbarClick}
                enableStickyHeader={true}
                height={"500px"}
                ref={logHistoryGridInstance}
                allowPaging={true}
                allowSelection={true}
                gridLines="Both"
                rowHeight={40}
                pageSettings={{ pageSize: 15, pageCount: 15 }}
                allowFiltering={true}
                filterSettings={{ type: "Excel" }}
                allowExcelExport={true}
                allowSorting={true}
              >
                <ColumnsDirective>
                  <ColumnDirective
                    field="zone_name"
                    headerText={"Zone"}
                    width="130"
                    visible={true}
                    textAlign="left"
                    allowEditing={false}
                  />
                  <ColumnDirective
                    field="depot_name"
                    headerText={"Depot"}
                    width="130"
                    visible={true}
                    textAlign="left"
                    allowEditing={false}
                  />
                  <ColumnDirective
                    field="territory_name"
                    headerText={"Territory"}
                    width="100"
                    format={"N2"}
                    visible={true}
                    textAlign="left"
                    allowEditing={false}
                  />
                  <ColumnDirective
                    field="employee_name"
                    headerText={"Area Manager Name"}
                    width="150"
                    visible={true}
                    textAlign="left"
                    allowEditing={false}
                  />
                  <ColumnDirective
                    field="employee_code"
                    headerText={"Area Manager Code"}
                    width="150"
                    visible={true}
                    textAlign="left"
                    allowEditing={false}
                  />
                  <ColumnDirective
                    headerText={"Lock/Unlock"}
                    width="100"
                    textAlign="center"
                    allowFiltering={false}
                    template={lockunlockTemplate}
                  />
                </ColumnsDirective>

                <Inject
                  services={[
                    CommandColumn,
                    Page,
                    Filter,
                    Aggregate,
                    Toolbar,
                    ExcelExport,
                    Sort,
                  ]}
                />
              </GridComponent>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default LogSummary;

// const LogSummary = ({ data }) => {
//     return (
//         <>
//             <div>Log Summary</div>
//         </>
//     )
// }
// export default LogSummary;
