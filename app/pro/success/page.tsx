import { Suspense } from "react";
import SuccessPage from "./SuccessPage";
import AppLoader from "@/components/styled/Loader";

export default function SuccessWrapper() {
  return (
    <Suspense fallback={<AppLoader text="Loading ..." />}>
      <SuccessPage />
    </Suspense>
  );
}
