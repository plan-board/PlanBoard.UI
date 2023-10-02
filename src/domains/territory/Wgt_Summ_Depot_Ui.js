import { Link } from "react-router-dom";

const Wgt_Summ_Depot_Ui = ({ data }) => {
  return (
    <>
      <div className="w3-row w3-row-padding w3-padding-16 w3-white w3-margin-bottom ">
        <div className="w3-col l2 m2 s3 w3-center">
          <span className="w3-text-gray"> LLY {data.summ_lly_fy} </span>
          <hr className="hr1" />
          <span className=" ">{data.summ_lly_sale_value}</span> Cr.
        </div>

        <div className="w3-col l2 m2 s3 w3-center">
          <span className="w3-text-gray"> LY {data.summ_ly_fy} </span>
          <hr className="hr1" />
          <span className=" "> {data.summ_ly_sale_value} </span> Cr.
        </div>

        <div className="w3-col l6 m3 s3 w3-center w3-row-padding">
          <span className="w3-text-gray"> TARGET {data.summ_cy_fy} </span>
          <hr className="hr1" />

          <div className="w3-col l6 m6 s3 ">
            <span className="  w3-text-gray w3-right ">
              <b>
                {" "}
                [v.1 :{" "}
                <u className=" w3-text-red">
                  {" "}
                  {data.summ_cy_target_v1_value} Cr. (
                  {data.summ_cy_target_v1_percentage}%){" "}
                </u>{" "}
                ]{" "}
              </b>
            </span>
          </div>

          <div className="w3-col l6 m6 s3 ">
            <span className="  w3-text-gray  w3-left ">
              [v.2 :{" "}
              <u className=" w3-text-red">
                {" "}
                {data.summ_cy_target_v2_value} Cr. (
                {data.summ_cy_target_v2_percentage}%){" "}
              </u>{" "}
              ]<i className="fa fa-unlock w3-text-red"> </i>
            </span>
          </div>
        </div>

        <div className="w3-col l2 m2 s3  w3-center">
          <span className="w3-text-gray"> YTD </span>
          <hr className="hr1" />
          <span className=" "> {data.summ_cy_sale_ytd_value} </span> Cr.
          <i className="w3-text-gray">
            {" "}
            ( {data.summ_cy_sale_ytd_percentage} %){" "}
          </i>
        </div>
      </div>
    </>
  );
};

export default Wgt_Summ_Depot_Ui;
