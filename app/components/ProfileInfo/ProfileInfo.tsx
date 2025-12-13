import { User } from "../../types/api/user";
import styles from "./ProfileInfo.module.scss";
const ProfileInfo = ({ tel, profileUrl, username, email }: User) => {
  return (
    <div>
      <div></div>
      <h2>{username}</h2>
      <h3>{email}</h3>
      <button type="button">แก้ไขข้อมูล</button>
    </div>
  );
};

export default ProfileInfo;
