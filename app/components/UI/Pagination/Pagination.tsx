import { PaginationProps } from "./Pagination.type";
import styles from "./Pagination.module.scss";
export const Pagination = ({
  total,
  currentState,
  setCurrentState,
}: PaginationProps) => {
  const pageCount = Math.ceil(total / 10);
  return (
    <div className={styles.action}>
      <button>previous</button>
      <button type="button" onClick={() => setCurrentState(1)}>
        1
      </button>
      {currentState < 3 && <button>...</button>}

      <div className={styles.navigation}>
        {Array.from({ length: pageCount }, (_, index) => {
          {
            if (index < 5) {
              if (currentState < 2) {
                return (
                  <div>
                    <button
                      type="button"
                      onClick={() => setCurrentState(index + 2)}
                    >
                      {index + 2}
                    </button>
                  </div>
                );
              }
              return (
                <button
                  type="button"
                  onClick={() => setCurrentState(index + 2)}
                >
                  {index + 2}
                </button>
              );
            }
          }
        })}
      </div>
      {currentState > total - 3 && <button>...</button>}
      <button>{pageCount}</button>
      <button type="button" onClick={() => setCurrentState(1)}>
        next
      </button>
    </div>
  );
};
