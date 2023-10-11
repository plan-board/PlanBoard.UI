import { useSelector } from "react-redux";
const Verifyemail = () => {
  const { sidebarStatus } = useSelector((state) => state);
  return (
    <div
      className=" main w3-border"
      style={{ marginLeft: sidebarStatus.flag ? "150px" : "0px" }}
    >
      Verifyemail
    </div>
  );
};

export default Verifyemail;
