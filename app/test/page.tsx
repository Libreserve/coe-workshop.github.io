"use client";

import { useRef, useState } from "react";
import { useToast } from "../Context/Toast/ToastProvider";
import Toast from "../components/Toast/Toast";

function Page() {
  const [count, setCount] = useState(0);
  const { toastStack, addToastStack } = useToast();
  const onToastClick = () => {
    // console.log(toastStack);
    addToastStack("สวัสดีToast" + count, "คำอธิบาย", "success");
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
