import { useSelector } from "react-redux";
const Schedule = () => {
  const flag = useSelector((state) => state.sidebarStatus.flag);
  return (
    <div className=" main " style={{ marginLeft: flag ? "150px" : "0px" }}>
      Schedule
    </div>
  );
};
export default Schedule;
