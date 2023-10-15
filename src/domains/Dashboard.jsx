import { useSelector } from "react-redux";
const Dashboard = () => {
  const sidebarStatus = useSelector((state) => state.sidebarStatus.flag);
  return (
    <div
      className=" main "
      style={{ marginLeft: sidebarStatus ? "150px" : "0px" }}
    >
      Welcome To Planboard
    </div>
  );
};

export default Dashboard;
