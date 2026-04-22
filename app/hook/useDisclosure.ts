"use client";
import { useState } from "react";

export default function useDisclosure() {
  const [opened, setOpened] = useState(false);
  const open = () => setOpened(true);
  const close = () => setOpened(false);
  return {
    opened,
    handle: { open, close },
  };
}
