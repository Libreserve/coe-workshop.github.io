import { Suspense } from "react";
import { ReportIssue } from "./reportIssueClient";

const PageReportIssue = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReportIssue />
    </Suspense>
  );
};

export default PageReportIssue;