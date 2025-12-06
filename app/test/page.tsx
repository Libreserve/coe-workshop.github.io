"use client";

import { useState } from "react";
import { useToast } from "../Context/Toast/ToastProvider";
import styles from "./test.module.scss";
function Page() {
  const [add, setAdd] = useState(false);
  const [count, setCount] = useState(0);
  const { addToastStack } = useToast();
  const onToastClick = () => {
    addToastStack(
      "Hello Toast" + count,
      "psum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      "success"
    );

    setCount((prev) => prev + 1);
  };

  return (
    <div>
      {/* {Toast.map((item, index) => (
        <h1 key={index}>{item.Content}</h1>
      ))} */}
      <div
        className={`${add ? styles.boxred : styles.boxblue} ${styles.add}`}
      ></div>
      <button type="button" onClick={() => setAdd((perv) => !perv)}>
        here
      </button>
      <button type="button" onClick={() => onToastClick()}>
        ADD
      </button>
    </div>
  );
}

export default Page;
