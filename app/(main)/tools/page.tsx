import { Suspense } from "react";
import ToolsClient from "./ToolClient";

export const Page = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <ToolsClient></ToolsClient>
    </Suspense>
  );
};
