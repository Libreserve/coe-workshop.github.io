import { Suspense } from "react";
import ToolsClient from "./ToolClient.tsx";

const Page = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <ToolsClient></ToolsClient>
    </Suspense>
  );
};

export default Page;
