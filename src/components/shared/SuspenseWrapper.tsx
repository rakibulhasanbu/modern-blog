import React, { Suspense } from "react";
import AppLoading from "../ui/AppLoading";

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<AppLoading />}>{children}</Suspense>;
};

export default SuspenseWrapper;
