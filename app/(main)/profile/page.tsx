import { UserTransaction } from "@/app/components/UserTransaction/UserTransaction";
import styles from "./profile.module.scss";
import ProfileInfo from "@/app/components/ProfileInfo/ProfileInfo";
const Profile = () => {
  return (
    <div>
      <div className={styles.wrapper}>
        {/* <ProfileInfo></ProfileInfo> */}
        <UserTransaction></UserTransaction>
      </div>
    </div>
  );
};

export default Profile;
