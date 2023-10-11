import { useSelector } from "react-redux";
const Dashboard = () => {
  const { sidebarStatus } = useSelector((state) => state);
  return (
    <div
      className=" main "
      style={{ marginLeft: sidebarStatus.flag ? "150px" : "0px" }}
    >
      Welcome To Planboard
    </div>
  );
};

export default Dashboard;
