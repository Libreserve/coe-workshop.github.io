"use client";

import { useCallback, useState } from "react";

const useDisclosure = () => {
  const [opened, setOpened] = useState<boolean>(false);

  const open = useCallback(() => {
    setOpened(true);
  }, []);

  const close = useCallback(() => {
    setOpened(false);
  }, []);

  const toggle = useCallback(() => {
    setOpened((prev) => !prev);
  }, []);

  return {
    opened,
    handle: {
      open,
      close,
      toggle,
    },
  };
};

export default useDisclosure;
