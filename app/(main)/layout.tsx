import { ReactNode } from "react";
import styles from "./layout.module.scss";
import Footer from "../components/Footer/Footer";
const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.mainLayout}>
      <div>
        {children}
        <Footer></Footer>
      </div>
    </div>
  );
};

export default MainLayout;
