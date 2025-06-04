import { useState } from "react";
import { Link } from "react-router-dom";

const Wgt_Zone_Ui = ({ data , setId}) => {
  console.log("🚀 ~ file: Wgt_Zone_Ui.jsx:5 ~ data:", data)
  return (
    <>
      <div className="w3-quarter w3-margin-top w3-margin-bottom " onClick={(e) => setId(data)}>
        {/* <Link className="link" to={`/zone_detail/${data.id}`}> */}

          <div className={`w3-container w3-padding-16 ` + data.bg} >

            <div className="w3-clear ">
              <span className=" w3-xlarge w3-left">
                {data.title}
              </span>
              <i className="fa fa-bar-chart w3-right"></i>
            </div>
            <div className="w3-col l4 m4 s4 ">
              <span className="w3-xlarge"> {data.ly} </span>
              <br />
              <span className="w3-small h6"> LY
                <br />  22-23  </span>
            </div>
            <div className="w3-col l4 m4 s4  ">
              <span className="w3-xlarge"> {data.target} </span>
              <br />
              <span className="w3-small h6"> Target </span>
              <br />
              <span className="h6">{data.target_percentage}% </span>
            </div>
            <div className="w3-col l4 m4 s4 ">
              <span className="w3-xlarge">{data.achieved}</span>
              <br />
              <span className="w3-small h6"> Achieved </span>
              <br />
              <span className="h6">{data.achieved_percentage}% </span>
            </div>

          </div>
        {/* </Link> */}
      </div>

    </>
  );
};


export default Wgt_Zone_Ui;