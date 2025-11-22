import { ModalContainerProps } from "./types";
import styles from "./modal.module.scss";

const ModalContainer = ({ opened, onClose, children }: ModalContainerProps) => {
  if (opened) {
    return (
      <div className={styles.modalContainer}>
        <div className={styles.content}>{children}</div>

        <div
          className={styles.background}
          onClick={() => {
            onClose();
            console.log("hello");
          }}
        ></div>
      </div>
    );
  } else {
    return;
  }
};

export default ModalContainer;
