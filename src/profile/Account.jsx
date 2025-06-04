import { useSelector } from "react-redux";
const Account = () => {
  const flag = useSelector((state) => state.sidebarStatus.flag);
  return (
    <div className=" main " style={{ marginLeft: flag ? "150px" : "0px" }}>
      Account
    </div>
  );
};

export default Account;
