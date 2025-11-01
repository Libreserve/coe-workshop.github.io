import React from "react";
import styles from "./welcome_text.module.scss";

function WelcomeText() {
  return (
    <div className={styles.welcome}>
      <div className={styles.title}>
        <strong>Lorem ipsum dolor sit amet</strong> consectetur adipisicing
        elit. Quod, doloremque!
      </div>
      <p className={styles.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </div>
  );
}

export default WelcomeText;
