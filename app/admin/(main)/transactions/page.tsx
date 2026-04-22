import { Suspense } from "react";
import { Transaction } from "./transactionsClient";

const PageTransaction = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Transaction />
    </Suspense>
  );
};

export default PageTransaction;