import { Suspense } from "react";
import { History } from "./HistoryClient";

const PageHistory = () => {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <History />
    </Suspense>
  );
};
export default PageHistory;
