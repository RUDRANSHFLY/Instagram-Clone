"use client";

import React from "react";
import { RecoilRoot } from "recoil";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <RecoilRoot>{children}</RecoilRoot>
    </div>
  );
};

export default StoreProvider;
