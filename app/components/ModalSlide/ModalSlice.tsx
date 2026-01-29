import styles from "./ModalSlide.module.scss";
import { ModalSliceProps } from "./ModalSlide.types";

const ModalSlide = ({ opened, onClose, children }: ModalSliceProps) => {
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

export default ModalSlide;
