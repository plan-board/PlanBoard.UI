import { useSelector } from "react-redux";
const Logs = () => {
  const flag = useSelector((state) => state.sidebarStatus.flag);
  return (
    <div
      className="main  w3-border"
      style={{ marginLeft: flag ? "150px" : "0px" }}
    >
      Logs
    </div>
  );
};

export default Logs;
