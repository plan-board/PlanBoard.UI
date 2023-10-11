import { useSelector } from "react-redux";
const Account = () => {
  const { sidebarStatus } = useSelector((state) => state);
  return (
    <div
      className=" main "
      style={{ marginLeft: sidebarStatus.flag ? "150px" : "0px" }}
    >
      Account
    </div>
  );
};

export default Account;
