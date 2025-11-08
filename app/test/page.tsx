"use client";

import { useRef, useState } from "react";

function Page() {
  const Count = useRef(0);
  const [Toast, setToast] = useState<{ Id: number; Content: string }[]>([]);

  const addToastStack = () => {
    const Id = Count.current++;
    setToast((prev) => [...prev, { Id: Id, Content: "Hello Toast" + Id }]);

    setTimeout(() => {
      setToast((prev) => prev.filter((item) => item.Id !== Id));
    }, 2000);
  };

  return (
    <div>
      {Toast.map((item, index) => (
        <h1 key={index}>{item.Content}</h1>
      ))}

      <button type="button" onClick={() => addToastStack()}>
        ADD
      </button>
    </div>
  );
}

export default Page;
