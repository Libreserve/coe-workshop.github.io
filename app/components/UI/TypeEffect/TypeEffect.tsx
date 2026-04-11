"use client";

import React, { useEffect, useState } from "react";
import styles from "./TypeEffect.module.scss";
import { TypeEffectProps } from "./TypeEffect.types";
export const TypeEffect = ({ options }: TypeEffectProps) => {
  const [contentIndex, setContentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  useEffect(() => {
  const timeouts: ReturnType<typeof setTimeout>[] = [];

  setDisplayText("");
  const typeSpeed = 2000;
  const deleteSpeed = 400;
  const holdSpeed = 2400;
  const text = options[contentIndex % options.length];
  const chars = Array.from(text);

  for (let i = 0; i < chars.length; i++) {
    timeouts.push(
      setTimeout(() => {
        setDisplayText((prev) => prev + chars[i]);
      }, (i * typeSpeed) / chars.length)
    );
  }

  for (let i = 0; i < chars.length; i++) {
    timeouts.push(
      setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, holdSpeed + typeSpeed + (i * deleteSpeed) / chars.length)
    );
  }

  timeouts.push(
    setTimeout(() => {
      setContentIndex((prev) => prev + 1);
    }, 400 + holdSpeed + typeSpeed + deleteSpeed)
  );

  return () => {
    timeouts.forEach(clearTimeout);
  };
}, [contentIndex, options]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.typing}>
        {displayText}
        <span className={styles.cursor} />
      </h2>
    </div>
  );
};
