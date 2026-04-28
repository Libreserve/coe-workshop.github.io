import ToolDetailClient from "./ToolDetailClient";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <ToolDetailClient></ToolDetailClient>
    </Suspense>
  );
};

export default Page;
