import ToolDetailClient from "@/app/(main)/tools/[slug]/ToolDetailClient";
import { Suspense } from "react";
import AdminToolDetail from "./AdminToolDetail";

const Page = () => {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <AdminToolDetail></AdminToolDetail>
    </Suspense>
  );
};

export default Page;
