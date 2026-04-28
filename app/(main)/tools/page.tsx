import { Suspense } from "react";
import ToolsClient from "./ToolClient";

const Page = () => {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <ToolsClient></ToolsClient>
    </Suspense>
  );
};

export default Page;
