const Wgt_Marketsector_Ui = ({ data }) => {
  return (
    <>
      <div class="w3-row ">
        <span className="w3-small h5  "> {data.marketsector_name}   ({data.marketsector_target_value})  {data.marketsector_target_percentage}% </span><br />
        <div class="w3-light-gray">
          <div class="w3-container w3-center w3-blue w3-small h6 " style={{ width: data.marketsector_target_percentage + "%" }} >
            <span className="w3-right" style={{ fontSize: "9px" }} > . </span>
          </div>

          <div class="w3-container w3-center w3-red w3-small h6 " style={{ width: data.marketsector_target_ytd_percentage + "%" }} >
            <span className="w3-right" style={{ fontSize: "9px" }} > . </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Wgt_Marketsector_Ui;