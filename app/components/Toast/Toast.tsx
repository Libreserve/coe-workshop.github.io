"use client";

import { useToast } from "@/app/Context/Toast/ToastProvider";
import { Variant } from "@/app/Context/Toast/types";
import Image from "next/image";
import React from "react";
import styles from "./Toast.module.scss";
import { positionStyle, ToastProps, VariantStyle, ToastItem } from "./types";
function Toast({ Position }: ToastProps) {
  const { toastStack } = useToast();

  return (
    <div className={styles.toast_background} style={positionStyle[Position]}>
      {toastStack.map((t) => (
        <ToastContent
          key={t.id}
          id={t.id}
          title={t.title}
          description={t.description}
          variant={t.variant}
        ></ToastContent>
      ))}
    </div>
  );
}

const ToastContent = ({ id, title, description, variant }: ToastItem) => {
  const { toastStack } = useToast();

  return (
    <div
      className={`${styles.toast}  ${
        !(id == toastStack[toastStack.length - 1].id) && styles.toast_slide
      }  `}
    >
      <div className={styles.toast_inner}>
        <div className={styles.content}>
          <Image
            width={50}
            height={50}
            src={VariantStyle[variant].icon}
            alt="status"
          ></Image>
          <div className={styles.text}>
            <h1 className={styles.title}>{title}</h1>
            <h2 className={styles.description}>{description}</h2>
          </div>
        </div>
      </div>
      <div
        className={styles.progress}
        style={
          {
            "--primary-color": VariantStyle[variant].color,
          } as React.CSSProperties
        }
      ></div>
    </div>
  );
};

export default Toast;
