import { NavbarContainerProps } from "./navbarContiner.types";
import styles from "./navbarContainer.module.scss";

const NavbarContainer = ({
  opened,
  onClose,
  children,
  margin,
}: NavbarContainerProps) => {
  if (opened) {
    return (
      <div
        style={{ "--margin-content": margin } as React.CSSProperties}
        className={styles.modalContainer}
      >
        <div
          className={styles.background}
          onClick={() => {
            onClose();
          }}
        ></div>
        {children && <div className={styles.content}>{children}</div>}
      </div>
    );
  } else {
    return;
  }
};

export default NavbarContainer;
