import styles from "./information.module.scss";

export interface Questions {
    Title: string;
}

function Information({ Title }: Questions) {
  return (
      <>
          <div className={styles.box}>
              <p className={styles.mark}>+</p>
              <p className={styles.title} >{Title}</p>
          </div>
          <div className={styles.line}>
          </div>
      </>
  )
}

export default Information;