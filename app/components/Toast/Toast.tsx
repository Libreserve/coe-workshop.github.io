import React from "react";
import { positionStyle, ToastProps, VariantStyle } from "./types";
import Image from "next/image";
import styles from "./Toast.module.scss";
import { useToast } from "@/app/Context/Toast/ToastProvider";

function Toast({ Title, Description, Variant, Position }: ToastProps) {
  const { toastStack } = useToast();
  return (
    <div className={styles.toast_background} style={positionStyle[Position]}>
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
            width={30}
            height={30}
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
    </div>
  );
}

export default Toast;
