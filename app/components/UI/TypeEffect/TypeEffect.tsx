"use client";

import { TypeEffectProps } from "./TypeEffect.types";
import styles from "./TypeEffect.module.scss";
import { useEffect, useState } from "react";
export const TypeEffect = ({ options }: TypeEffectProps) => {
  const [contentIndex, setContentIndex] = useState(0);
  const [isAnimation, setIsAnimation] = useState(true);
  useEffect(() => {
    setIsAnimation(true);
    setTimeout(() => {
      setContentIndex((prev) => prev + 1);
    }, 4000);
    setIsAnimation(false);
  }, [contentIndex]);

  return (
    <div className={styles.wrapper}>
      <h2 className={`${styles.typing} ${isAnimation ? styles.animation : ""}`}>
        {options[contentIndex]}
      </h2>
    </div>
  );
};
