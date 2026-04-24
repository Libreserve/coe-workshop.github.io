import { Suspense } from "react";
import { ReportsAdmin } from "./reportsAdminClient";

const PageReportsAdmin = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReportsAdmin />
    </Suspense>
  );
};

export default PageReportsAdmin;