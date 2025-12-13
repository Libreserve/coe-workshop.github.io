import { UserTransaction } from "@/app/components/UserTransaction/UserTransaction";
import styles from "./profile.module.scss";
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
