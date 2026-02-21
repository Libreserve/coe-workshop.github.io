import { Suspense } from "react";
import LandingClient from "./LandingClient";

export const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LandingClient />
    </Suspense>
  );
};
