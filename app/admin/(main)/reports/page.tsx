import { Suspense } from "react";
import { ReportsAdmin } from "./ReportsAdminClient";

const PageReportsAdmin = () => {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <ReportsAdmin />
    </Suspense>
  );
};

export default PageReportsAdmin;
