import { Suspense } from "react";
import { History } from "./historyClient";

const PageHistory = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <History />
    </Suspense>
  );
};
export default PageHistory;