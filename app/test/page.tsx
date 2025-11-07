"use client";

import React, { useCallback, useRef, useState } from "react";

interface ToastProps {
  id: number;
  Title: string;
}

function Page() {
  const [Toasts, setToasts] = useState<ToastProps[]>([]);
  const nextiId = useRef<number>(0);
  const timeOutRef = useRef<Map<number, NodeJS.Timeout>>(new Map());
  const MAXTOAST = 5;

  const addToast = useCallback(() => {
    const id = nextiId.current++;

    setToasts((prev) => {
      const update = [...prev, { id, Title: "Toast" + id }];
      if (update.length > MAXTOAST) {
        const removed = update.shift();
        if (removed) {
          const timeOutId = timeOutRef.current.get(removed.id);
          if (timeOutId) {
            clearTimeout(timeOutId);
            timeOutRef.current.delete(removed.id);
          }
        }
      }
      return update;
    });

    const timeOutId = setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
      timeOutRef.current.delete(id);
    }, 2000);

    timeOutRef.current.set(id, timeOutId);
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div className="flex flex-col">
        {Toasts.map((t, i) => (
          <div key={i}>{t.Title}</div>
        ))}
      </div>
      <button type="button" onClick={addToast}>
        click
      </button>
    </div>
  );
}

export default Page;
