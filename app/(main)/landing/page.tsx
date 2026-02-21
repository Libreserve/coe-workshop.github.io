import { Suspense } from "react";
import LandingClient from "./LandingClient";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LandingClient />
    </Suspense>
  );
};

export default Page;
