import { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import LoadingPlaceholder from "../../components/LoadingPlaceholder";
import ExportExcel from "../ExportExcel";
import { GetPercent, fNWCommas, getMonths } from "../../utils/utils";
import { Row, Col } from "reactstrap";
import {
  GridComponent,
  Inject,
  ColumnDirective,
  ColumnsDirective,
  Sort,
  CommandColumn,
  Freeze,
  Page,
  Filter,
  AggregateColumnDirective,
  Toolbar,
  ExcelExport,
} from "@syncfusion/ej2-react-grids";
import {
  AggregateColumnsDirective,
  AggregateDirective,
  AggregatesDirective,
} from "@syncfusion/ej2-react-grids";
import { Aggregate } from "@syncfusion/ej2-react-grids";
import Loader from "../../common/Loader";
const monthArr = [
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
];

const NationalZoneMonthSale = ({ selectedZone }) => {
  const { AuthData } = useSelector((state) => state?.auth);

  const dispatch = useDispatch();
  let NationalZoneGridInstance = useRef();
  const [isLoading, setLoading] = useState(true);
  const [zoneMonthPlan, setZoneMonthPlan] = useState([]);

  useEffect(() => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      ZoneId: selectedZone,
    };
    const getZoneMonthPlan = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.post("ZoneMonthPlan", payload);

        if (response?.status === 200) {
          setZoneMonthPlan(
            response.data.Data != null ? response.data.Data : []
          );
        }
        setLoading(false);
      } catch (error) {
        // Handle errors
        dispatch({ type: SHOW_TOAST, payload: error.message });
      }
    };

    const secondPayload = {
      Token: localStorage.getItem("access_token"),
      SegmentId: selectedZone,
    };

    const getSegmentMonthPlan = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.post(
          "SegmentMonthPlan",
          secondPayload
        );

        if (response?.status === 200) {
          setZoneMonthPlan(
            response.data.Data != null ? response.data.Data : []
          );
        }
        setLoading(false);
      } catch (error) {
        // Handle errors
        dispatch({ type: SHOW_TOAST, payload: error.message });
      }
    };

    if (
      AuthData.Data[0].EmployeeTpye == "IH" ||
      AuthData.Data[0].EmployeeTpye == "SH"
    ) {
      getSegmentMonthPlan();
    } else {
      getZoneMonthPlan();
    }
  }, [selectedZone]);
  const CyPlanYtdTemplate = (args) => {
    return (
      <>
        {fNWCommas(args?.CY_ValuePlanV1)} <hr className="hr0" />
        {fNWCommas(args?.YTD_Value)}
        {GetPercent(args?.YTD_Value, args?.CY_ValuePlanV1)}
      </>
    );
  };
  const AprTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`Apr_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`Apr_Month_Sale_act`])}
        {GetPercent(args[`Apr_Month_Sale_act`], args[`Apr_Month_Value_v1`])}
      </>
    );
  };
  const MayTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`May_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`May_Month_Sale_act`])}
        {GetPercent(args[`May_Month_Sale_act`], args[`May_Month_Value_v1`])}
      </>
    );
  };
  const JunTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`Jun_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`Jun_Month_Sale_act`])}
        {GetPercent(args[`Jun_Month_Sale_act`], args[`Jun_Month_Value_v1`])}
      </>
    );
  };
  const JulTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`Jul_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`Jul_Month_Sale_act`])}
        {GetPercent(args[`Jul_Month_Sale_act`], args[`Jul_Month_Value_v1`])}
      </>
    );
  };
  const AugTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`Aug_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`Aug_Month_Sale_act`])}
        {GetPercent(args[`Aug_Month_Sale_act`], args[`Aug_Month_Value_v1`])}
      </>
    );
  };
  const SepTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`Sep_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`Sep_Month_Sale_act`])}
        {GetPercent(args[`Sep_Month_Sale_act`], args[`Sep_Month_Value_v1`])}
      </>
    );
  };
  const OctTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`Oct_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`Oct_Month_Sale_act`])}
        {GetPercent(args[`Oct_Month_Sale_act`], args[`Oct_Month_Value_v1`])}
      </>
    );
  };
  const NovTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`Nov_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`Nov_Month_Sale_act`])}
        {GetPercent(args[`Nov_Month_Sale_act`], args[`Nov_Month_Value_v1`])}
      </>
    );
  };
  const DecTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`Dec_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`Dec_Month_Sale_act`])}
        {GetPercent(args[`Dec_Month_Sale_act`], args[`Dec_Month_Value_v1`])}
      </>
    );
  };
  const JanTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`Jan_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`Jan_Month_Sale_act`])}
        {GetPercent(args[`Jan_Month_Sale_act`], args[`Jan_Month_Value_v1`])}
      </>
    );
  };
  const FebTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`Feb_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`Feb_Month_Sale_act`])}
        {GetPercent(args[`Feb_Month_Sale_act`], args[`Feb_Month_Value_v1`])}
      </>
    );
  };
  const MarTemplate = (args) => {
    return (
      <>
        {fNWCommas(args[`Mar_Month_Value_v1`])}
        <hr className="hr0" />
        {fNWCommas(args[`Mar_Month_Sale_act`])}
        {GetPercent(args[`Mar_Month_Sale_act`], args[`Mar_Month_Value_v1`])}
      </>
    );
  };
  const headerTemplateForCy = () => {
    let Year = new Date().getFullYear();

    return (
      <>
        <span>Plan {Year} / YTD</span>
      </>
    );
  };
  const headerTemplateForLy = () => {
    let Year = new Date().getFullYear();
    let lastTwoDigits = Year.toString().slice(2);
    let lastTwoDigitPLusOne = parseInt(lastTwoDigits) - 1;

    return (
      <>
        <span>{`LY ${lastTwoDigitPLusOne} - ${lastTwoDigits}`}</span>
      </>
    );
  };
  const customTotalFooter = () => {
    return <span style={{ fontSize: "20px" }}>Total</span>;
  };
  const customTotalLly = () => {
    if (NationalZoneGridInstance.current) {
      let shownData = NationalZoneGridInstance.current.getCurrentViewRecords();
      let totalLlyValue = shownData.reduce(
        (acc, item) => acc + (parseInt(item.LLY_Value.toFixed(0)) || 0),
        0
      );

      return <>{fNWCommas(totalLlyValue)}</>;
    } else {
      return "Calculating";
    }
  };

  const customTotalLy = () => {
    if (NationalZoneGridInstance.current) {
      let shownData = NationalZoneGridInstance.current.getCurrentViewRecords();
      let totalLYValue1 = shownData.reduce(
        (acc, item) => acc + (parseInt(item.LY_Value.toFixed(0)) || 0),
        0
      );

      return <>{fNWCommas(totalLYValue1)}</>;
    } else {
      return "Calculating";
    }
  };

  const customTotalCYPlanYTD = () => {
    if (NationalZoneGridInstance.current) {
      let shownData = NationalZoneGridInstance.current.getCurrentViewRecords();
      let totalCYValue1 = shownData.reduce(
        (acc, item) => acc + (parseInt(item.CY_ValuePlanV1.toFixed(0)) || 0),
        0
      );
      let totalYTDValue1 = shownData.reduce(
        (acc, item) => acc + (parseInt(item.YTD_Value.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalCYValue1)}
          <hr className="hr0" />
          {fNWCommas(totalYTDValue1)}
          {GetPercent(totalYTDValue1, totalCYValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };

  const customTotalApr = () => {
    if (NationalZoneGridInstance.current) {
      let shownData = NationalZoneGridInstance.current.getCurrentViewRecords();
      let totalAprValue1 = shownData.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Apr_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      let totalAprValue_v2 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Apr_Month_Sale_act.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalAprValue1)}
          <hr className="hr0" />
          {fNWCommas(totalAprValue_v2)}
          {GetPercent(totalAprValue_v2, totalAprValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };

  const customTotalMay = () => {
    if (NationalZoneGridInstance.current) {
      let shownData = NationalZoneGridInstance.current.getCurrentViewRecords();
      let totalMayValue1 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.May_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      let totalMayValue_v2 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.May_Month_Sale_act.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalMayValue1)}
          <hr className="hr0" />
          {fNWCommas(totalMayValue_v2)}
          {GetPercent(totalMayValue_v2, totalMayValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };

  const customTotalJun = () => {
    if (NationalZoneGridInstance.current) {
      let shownData = NationalZoneGridInstance.current.getCurrentViewRecords();
      const totalJunValue1 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Jun_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      const totalJunValue_v2 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Jun_Month_Sale_act.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalJunValue1)}
          <hr className="hr0" />
          {fNWCommas(totalJunValue_v2)}
          {GetPercent(totalJunValue_v2, totalJunValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };

  const customTotalJul = () => {
    if (NationalZoneGridInstance.current) {
      let shownData = NationalZoneGridInstance.current.getCurrentViewRecords();
      const totalJulValue1 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Jul_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      const totalJulValue_v2 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Jul_Month_Sale_act.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalJulValue1)}
          <hr className="hr0" />
          {fNWCommas(totalJulValue_v2)}
          {GetPercent(totalJulValue_v2, totalJulValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const customTotalAug = () => {
    if (NationalZoneGridInstance.current) {
      let shownData = NationalZoneGridInstance.current.getCurrentViewRecords();
      const totalAugValue1 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Aug_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      const totalAugValue_v2 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Aug_Month_Sale_act.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalAugValue1)}
          <hr className="hr0" />
          {fNWCommas(totalAugValue_v2)}
          {GetPercent(totalAugValue_v2, totalAugValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const customTotalSep = () => {
    if (NationalZoneGridInstance.current) {
      let shownData = NationalZoneGridInstance.current.getCurrentViewRecords();
      const totalSepValue1 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Sep_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      const totalSepValue_v2 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Sep_Month_Sale_act.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalSepValue1)}
          <hr className="hr0" />
          {fNWCommas(totalSepValue_v2)}
          {GetPercent(totalSepValue_v2, totalSepValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };

  const customTotalOct = () => {
    if (NationalZoneGridInstance.current) {
      let shownData = NationalZoneGridInstance.current.getCurrentViewRecords();
      const totalOctValue1 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Oct_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      const totalOctValue_v2 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Oct_Month_Sale_act.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalOctValue1)}
          <hr className="hr0" />
          {fNWCommas(totalOctValue_v2)}
          {GetPercent(totalOctValue_v2, totalOctValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const customTotalNov = () => {
    if (NationalZoneGridInstance.current) {
      let shownData = NationalZoneGridInstance.current.getCurrentViewRecords();
      const totalNovValue1 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Nov_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      const totalNovValue_v2 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Nov_Month_Sale_act.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalNovValue1)}
          <hr className="hr0" />
          {fNWCommas(totalNovValue_v2)}
          {GetPercent(totalNovValue_v2, totalNovValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const customTotalDec = () => {
    if (NationalZoneGridInstance.current) {
      let shownData = NationalZoneGridInstance.current.getCurrentViewRecords();
      const totalDecValue1 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Dec_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      const totalDecValue_v2 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Dec_Month_Sale_act.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalDecValue1)}
          <hr className="hr0" />
          {fNWCommas(totalDecValue_v2)}
          {GetPercent(totalDecValue_v2, totalDecValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const customTotalJan = () => {
    if (NationalZoneGridInstance.current) {
      let shownData = NationalZoneGridInstance.current.getCurrentViewRecords();
      const totalJanValue1 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Jan_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      const totalJanValue_v2 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Jan_Month_Sale_act.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalJanValue1)}
          <hr className="hr0" />
          {fNWCommas(totalJanValue_v2)}
          {GetPercent(totalJanValue_v2, totalJanValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const customTotalFeb = () => {
    if (NationalZoneGridInstance.current) {
      let shownData = NationalZoneGridInstance.current.getCurrentViewRecords();
      const totalFebValue1 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Feb_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      const totalFebValue_v2 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Feb_Month_Sale_act.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalFebValue1)}
          <hr className="hr0" />
          {fNWCommas(totalFebValue_v2)}
          {GetPercent(totalFebValue_v2, totalFebValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const customTotalMar = () => {
    if (NationalZoneGridInstance.current) {
      let shownData = NationalZoneGridInstance.current.getCurrentViewRecords();
      const totalMarValue1 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Mar_Month_Value_v1.toFixed(0)) || 0),
        0
      );
      const totalMarValue_v2 = shownData?.reduce(
        (acc, item) =>
          acc + (parseInt(item?.Mar_Month_Sale_act.toFixed(0)) || 0),
        0
      );

      return (
        <>
          {fNWCommas(totalMarValue1)}
          <hr className="hr0" />
          {fNWCommas(totalMarValue_v2)}
          {GetPercent(totalMarValue_v2, totalMarValue1)}
        </>
      );
    } else {
      return "Calculating";
    }
  };
  const Rows = useMemo(() => {
    const rows = [
      {
        field:
          AuthData?.Data[0]?.EmployeeTpye == "IH" ||
          AuthData?.Data[0]?.EmployeeTpye == "SH"
            ? "segmentname"
            : "zone_name",
        headerText:
          AuthData?.Data[0]?.EmployeeTpye == "IH" ||
          AuthData?.Data[0]?.EmployeeTpye == "SH"
            ? "Segment"
            : "Zone",
        width: "130",
        visible: true,
        textAlign: "left",
        allowEditing: false,
        freeze: "Left",
      },
      {
        field: "LY_Value",
        headerTemplate: headerTemplateForLy,
        width: "130",
        visible: true,
        textAlign: "center",
        allowEditing: false,
      },
      {
        headerTemplate: headerTemplateForCy,
        field: "cyPLan/ytd",
        width: "130",
        visible: true,
        allowFiltering: false,
        textAlign: "center",
        template: CyPlanYtdTemplate,
      },
      {
        columns: [
          {
            field: "Apr",
            headerText: "Apr",
            width: 120,
            allowEditing: false,
            allowFiltering: false,
            textAlign: "center",
            template: AprTemplate,
          },
          {
            field: "May",
            headerText: "May",
            width: 120,
            allowEditing: false,
            allowFiltering: false,
            textAlign: "center",
            template: MayTemplate,
          },
          {
            field: "Jun",
            headerText: "Jun",
            width: 120,
            allowEditing: false,
            allowFiltering: false,
            textAlign: "center",
            template: JunTemplate,
          },
          {
            field: "Jul",
            headerText: "Jul",
            width: 120,
            allowEditing: false,
            allowFiltering: false,
            textAlign: "center",
            template: JulTemplate,
          },
          {
            field: "Aug",
            headerText: "Aug",
            width: 120,
            allowEditing: false,
            allowFiltering: false,
            textAlign: "center",
            template: AugTemplate,
          },
          {
            field: "Sep",
            headerText: "Sep",
            width: 120,
            allowEditing: false,
            allowFiltering: false,
            textAlign: "center",
            template: SepTemplate,
          },
          {
            field: "Oct",
            headerText: "Oct",
            width: 120,
            allowEditing: false,
            allowFiltering: false,
            textAlign: "center",
            template: OctTemplate,
          },
          {
            field: "Nov",
            headerText: "Nov",
            width: 120,
            allowEditing: false,
            allowFiltering: false,
            textAlign: "center",
            template: NovTemplate,
          },
          {
            field: "Dec",
            headerText: "Dec",
            width: 120,
            allowEditing: false,
            allowFiltering: false,
            textAlign: "center",
            template: DecTemplate,
          },
          {
            field: "Jan",
            headerText: "Jan",
            width: 120,
            allowEditing: false,
            allowFiltering: false,
            textAlign: "center",
            template: JanTemplate,
          },
          {
            field: "Feb",
            headerText: "Feb",
            width: 120,
            allowEditing: false,
            allowFiltering: false,
            textAlign: "center",
            template: FebTemplate,
          },
          {
            field: "Mar",
            headerText: "Mar",
            width: 120,
            allowEditing: false,
            allowFiltering: false,
            textAlign: "center",
            template: MarTemplate,
          },
        ],
        headerText: "Month Wise Plan",
        textAlign: "center",
      },
    ];

    return rows;
  }, [zoneMonthPlan]);
  const toolbar = ["ExcelExport", "Search"];
  const toolbarClick = (args) => {
    if (
      NationalZoneGridInstance.current &&
      args.item.id === "nationZoneMonthSaleGrid_id_excelexport"
    ) {
      const arrObj = [];
      zoneMonthPlan.map((element, index) => {
        let obj = {};
        if (
          AuthData?.Data[0]?.EmployeeTpye == "IH" ||
          AuthData?.Data[0]?.EmployeeTpye == "SH"
        ) {
          obj = {
            "S.No": index + 1,
            Segment: element.segmentname,
            "LY 22-23": parseInt(element.LY_Value).toFixed(0),
            "Plan 2023": parseInt(element.CY_ValuePlanV1).toFixed(0),
            YTD: parseInt(element.YTD_Value).toFixed(0),
            Apr: parseInt(element.Apr_Month_Value_v1).toFixed(0),
            "Apr Sale": parseInt(element.Apr_Month_Sale_act).toFixed(0),
            May: parseInt(element.May_Month_Value_v1).toFixed(0),
            "May Sale": parseInt(element.May_Month_Sale_act).toFixed(0),
            Jun: parseInt(element.Jun_Month_Value_v1).toFixed(0),
            "Jun Sale": parseInt(element.Jun_Month_Sale_act).toFixed(0),
            Jul: parseInt(element.Jul_Month_Value_v1).toFixed(0),
            "Jul Sale": parseInt(element.Jul_Month_Sale_act).toFixed(0),
            Aug: parseInt(element.Aug_Month_Value_v1).toFixed(0),
            "Aug Sale": parseInt(element.Aug_Month_Sale_act).toFixed(0),
            Sep: parseInt(element.Sep_Month_Value_v1).toFixed(0),
            "Sep Sale": parseInt(element.Sep_Month_Sale_act).toFixed(0),
            Oct: parseInt(element.Oct_Month_Value_v1).toFixed(0),
            "Oct Sale": parseInt(element.Oct_Month_Sale_act).toFixed(0),
            Nov: parseInt(element.Nov_Month_Value_v1).toFixed(0),
            "Nov Sale": parseInt(element.Nov_Month_Sale_act).toFixed(0),
            Dec: parseInt(element.Dec_Month_Value_v1).toFixed(0),
            "Dec Sale": parseInt(element.Dec_Month_Sale_act).toFixed(0),
            Jan: parseInt(element.Jan_Month_Value_v1).toFixed(0),
            "Jan Sale": parseInt(element.Feb_Month_Sale_act).toFixed(0),
            Feb: parseInt(element.Feb_Month_Value_v1).toFixed(0),
            "Feb Sale": parseInt(element.Feb_Month_Sale_act).toFixed(0),
            Mar: parseInt(element.Mar_Month_Value_v1).toFixed(0),
            "Mar Sale": parseInt(element.Mar_Month_Sale_act).toFixed(0),
          };
        } else {
          obj = {
            "S.No": index + 1,
            Zone: element.zone_name,
            "LY 22-23": parseInt(element.LY_Value).toFixed(0),
            "Plan 2023": parseInt(element.CY_ValuePlanV1).toFixed(0),
            YTD: parseInt(element.YTD_Value).toFixed(0),
            Apr: parseInt(element.Apr_Month_Value_v1).toFixed(0),
            "Apr Sale": parseInt(element.Apr_Month_Sale_act).toFixed(0),
            May: parseInt(element.May_Month_Value_v1).toFixed(0),
            "May Sale": parseInt(element.May_Month_Sale_act).toFixed(0),
            Jun: parseInt(element.Jun_Month_Value_v1).toFixed(0),
            "Jun Sale": parseInt(element.Jun_Month_Sale_act).toFixed(0),
            Jul: parseInt(element.Jul_Month_Value_v1).toFixed(0),
            "Jul Sale": parseInt(element.Jul_Month_Sale_act).toFixed(0),
            Aug: parseInt(element.Aug_Month_Value_v1).toFixed(0),
            "Aug Sale": parseInt(element.Aug_Month_Sale_act).toFixed(0),
            Sep: parseInt(element.Sep_Month_Value_v1).toFixed(0),
            "Sep Sale": parseInt(element.Sep_Month_Sale_act).toFixed(0),
            Oct: parseInt(element.Oct_Month_Value_v1).toFixed(0),
            "Oct Sale": parseInt(element.Oct_Month_Sale_act).toFixed(0),
            Nov: parseInt(element.Nov_Month_Value_v1).toFixed(0),
            "Nov Sale": parseInt(element.Nov_Month_Sale_act).toFixed(0),
            Dec: parseInt(element.Dec_Month_Value_v1).toFixed(0),
            "Dec Sale": parseInt(element.Dec_Month_Sale_act).toFixed(0),
            Jan: parseInt(element.Jan_Month_Value_v1).toFixed(0),
            "Jan Sale": parseInt(element.Feb_Month_Sale_act).toFixed(0),
            Feb: parseInt(element.Feb_Month_Value_v1).toFixed(0),
            "Feb Sale": parseInt(element.Feb_Month_Sale_act).toFixed(0),
            Mar: parseInt(element.Mar_Month_Value_v1).toFixed(0),
            "Mar Sale": parseInt(element.Mar_Month_Sale_act).toFixed(0),
          };
        }
        arrObj.push(obj);
      });
      if (
        AuthData?.Data[0]?.EmployeeTpye == "IH" ||
        AuthData?.Data[0]?.EmployeeTpye == "SH"
      ) {
        ExportExcel("Segment-Wise-Monthly-Plan-Achievement", arrObj);
      } else {
        ExportExcel("Zone-Wise-Monthly-Plan-Achievement", arrObj);
      }
    }
  };

  return (
    <>
      <div className="full">
        {AuthData && (
          <Row>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <GridComponent
                locale="en-Us"
                id="nationZoneMonthSaleGrid_id"
                key="nationZoneMonthSaleGrid_id"
                allowTextWrap={true}
                allowResizing={false}
                dataSource={zoneMonthPlan}
                toolbar={toolbar}
                toolbarClick={toolbarClick}
                height={"250px"}
                ref={NationalZoneGridInstance}
                gridLines="Both"
                rowHeight={45}
                // allowFiltering={true}
                // filterSettings={{ type: "Excel" }}
                allowExcelExport={true}
                allowPaging={true}
                allowSorting={true}
                pageSettings={{ pageSize: 15, pageCount: 15 }}
                columns={Rows}
                frozenColumns={1}
              >
                <AggregatesDirective>
                  <AggregateDirective>
                    <AggregateColumnsDirective>
                      <AggregateColumnDirective
                        field="zone_name"
                        type="Custom"
                        footerTemplate={customTotalFooter}
                      />

                      <AggregateColumnDirective
                        field="LY_Value"
                        type="Custom"
                        footerTemplate={customTotalLy}
                      />
                      <AggregateColumnDirective
                        field="cyPLan/ytd"
                        type="Custom"
                        footerTemplate={customTotalCYPlanYTD}
                      />
                      <AggregateColumnDirective
                        field="Apr"
                        type="Custom"
                        footerTemplate={customTotalApr}
                      />
                      <AggregateColumnDirective
                        field="May"
                        type="Custom"
                        footerTemplate={customTotalMay}
                      />
                      <AggregateColumnDirective
                        field="Jun"
                        type="Custom"
                        footerTemplate={customTotalJun}
                      />
                      <AggregateColumnDirective
                        field="Jul"
                        type="Custom"
                        footerTemplate={customTotalJul}
                      />
                      <AggregateColumnDirective
                        field="Aug"
                        type="Custom"
                        footerTemplate={customTotalAug}
                      />
                      <AggregateColumnDirective
                        field="Sep"
                        type="Custom"
                        footerTemplate={customTotalSep}
                      />
                      <AggregateColumnDirective
                        field="Oct"
                        type="Custom"
                        footerTemplate={customTotalOct}
                      />
                      <AggregateColumnDirective
                        field="Nov"
                        type="Custom"
                        footerTemplate={customTotalNov}
                      />
                      <AggregateColumnDirective
                        field="Dec"
                        type="Custom"
                        footerTemplate={customTotalDec}
                      />
                      <AggregateColumnDirective
                        field="Jan"
                        type="Custom"
                        footerTemplate={customTotalJan}
                      />
                      <AggregateColumnDirective
                        field="Feb"
                        type="Custom"
                        footerTemplate={customTotalFeb}
                      />
                      <AggregateColumnDirective
                        field="Mar"
                        type="Custom"
                        footerTemplate={customTotalMar}
                      />
                    </AggregateColumnsDirective>
                  </AggregateDirective>
                </AggregatesDirective>
                <Inject
                  services={[
                    CommandColumn,
                    Page,
                    Filter,
                    Aggregate,
                    Toolbar,
                    ExcelExport,
                    Sort,
                    Freeze,
                  ]}
                />
              </GridComponent>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default NationalZoneMonthSale;
