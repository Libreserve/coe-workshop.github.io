import { OptionActionProps } from "./types";
import { useClickOutSide } from "@/app/hook/useClickOutSide";
import styles from "./optionsAction.module.scss";
export const OptionsAction = ({
  id,
  children,
  options,
  lastDelete = false,
}: OptionActionProps) => {
  const { isOpen, setIsopen, ref } = useClickOutSide();
  return (
    <div className={styles.optionsAction} ref={ref}>
      <button onClick={() => setIsopen((prev) => !prev)}>{children}</button>
      {isOpen && (
        <div className={styles.select}>
          {options.map((item, index) =>
            options.length == index + 1 && lastDelete ? (
              <h3
                key={index}
                onClick={() => {
                  setIsopen(false);
                  item.action(id);
                }}
                className={styles.select_last}
              >
                {item.title}
              </h3>
            ) : (
              <h3
                key={index}
                onClick={() => {
                  setIsopen(false);
                  item.action(id);
                }}
                className={styles.select_text}
              >
                {item.title}
              </h3>
            ),
          )}
        </div>
      )}
    </div>
  );
};
