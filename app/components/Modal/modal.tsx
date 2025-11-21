import { ModalContainerProps } from "./types";
import styles from "./modal.module.scss";

const ModalContainer = ({ opened, onClose, children }: ModalContainerProps) => {
  if (opened) {
    return (
      <div onClick={() => onClose()} className={styles.modalContainer}>
        <div>{children}</div>
      </div>
    );
  } else {
    return;
  }
};

export default ModalContainer;
