import { useSelector } from "react-redux";
const Profile = () => {
  const { sidebarStatus } = useSelector((state) => state);
  return (
    <div
      className=" main w3-border"
      style={{ marginLeft: sidebarStatus.flag ? "150px" : "0px" }}
    >
      Profile{" "}
    </div>
  );
};

export default Profile;
