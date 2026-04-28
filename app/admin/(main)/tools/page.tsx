import ToolsClient from "@/app/(main)/tools/ToolClient";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <ToolsClient></ToolsClient>
    </Suspense>
  );
};

export default Page;
