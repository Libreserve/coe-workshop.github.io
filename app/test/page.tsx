"use client";

import { useRef, useState } from "react";
import { useToast } from "../Context/Toast/ToastProvider";
import Toast from "../components/Toast/Toast";

function Page() {
  const [count, setCount] = useState(0);
  const { toastStack, addToastStack } = useToast();
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
      <Toast Position="top-right"></Toast>
      <button type="button" onClick={() => onToastClick()}>
        ADD
      </button>
    </div>
  );
}

export default Page;
