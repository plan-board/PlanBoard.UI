import { useSelector } from "react-redux";
const Schedule = () => {
  const { sidebarStatus } = useSelector((state) => state);
  return (
    <div
      className=" main "
      style={{ marginLeft: sidebarStatus.flag ? "150px" : "0px" }}
    >
      Schedule
    </div>
  );
};
export default Schedule;
