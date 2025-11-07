import React from "react";
import { ToastProps, VariantStyle } from "./types";
import Image from "next/image";
import styles from "./Toast.module.scss";

function Toast({ Title, Description, Variant }: ToastProps) {
  return (
    <div className={styles.toast}>
      <div className={styles.toast_inner}>
        <div className={styles.content}>
          <Image
            width={50}
            height={50}
            src={VariantStyle[Variant].icon}
            alt="status"
          ></Image>
          <div className={styles.text}>
            <h1 className={styles.title}>{Title}</h1>
            <h2 className={styles.description}>{Description}</h2>
          </div>
        </div>
        <Image
          width={40}
          height={40}
          src={"./Toast/close.svg"}
          alt="close"
        ></Image>
      </div>
      <div
        className={styles.progress}
        style={
          {
            "--primary-color": VariantStyle[Variant].color,
          } as React.CSSProperties
        }
      ></div>
    </div>
  );
}

export default Toast;
