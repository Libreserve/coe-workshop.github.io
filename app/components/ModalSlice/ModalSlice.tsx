import styles from "./Modal.module.scss";
import { ModalSliceProps } from "./ModalSlice.types";

const ModalSlice = ({ opened, onClose, children }: ModalSliceProps) => {
  if (opened) {
    return (
      <div className={styles.modalContainer}>
        <div className={styles.children}>{children}</div>
        <div
          className={styles.background}
          onClick={() => {
            onClose();
          }}
        ></div>
      </div>
    );
  } else {
    return;
  }
};

export default ModalSlice;
