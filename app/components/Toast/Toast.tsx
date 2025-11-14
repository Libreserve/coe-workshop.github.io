"use client";

import React, { useEffect } from "react";
import { positionStyle, ToastProps, VariantStyle } from "./types";
import Image from "next/image";
import styles from "./Toast.module.scss";
import { useToast } from "@/app/Context/Toast/ToastProvider";

function Toast({ Position }: ToastProps) {
  const { toastStack } = useToast();

  useEffect(() => {
    console.log("Current toastStack:", toastStack);
  }, [toastStack]);

  const isLastIndex = (toastId: number): boolean => {
    return toastStack[toastStack.length].id == toastId;
  };

  return (
    <div className={styles.toast_background} style={positionStyle[Position]}>
      {toastStack.map((t) => (
        <div
          key={t.id}
          className={`${styles.toast}  ${
            !(t.id == toastStack[toastStack.length - 1].id) &&
            styles.toast_slide
          }  `}
        >
          <div className={styles.toast_inner}>
            <div className={styles.content}>
              <Image
                width={50}
                height={50}
                src={VariantStyle[t.variant].icon}
                alt="status"
              ></Image>
              <div className={styles.text}>
                <h1 className={styles.title}>{t.title}</h1>
                <h2 className={styles.description}>{t.description}</h2>
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
                "--primary-color": VariantStyle[t.variant].color,
              } as React.CSSProperties
            }
          ></div>
        </div>
      ))}
    </div>
  );
}

export default Toast;
