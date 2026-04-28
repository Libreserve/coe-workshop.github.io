import { Suspense } from "react";
import { ReportIssue } from "./ReportIssueClient";

const PageReportIssue = () => {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <ReportIssue />
    </Suspense>
  );
};

export default PageReportIssue;
