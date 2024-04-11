import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface Props {
  classname?: string;
  children: ReactNode;
}

const MaxWidthWrapper = ({ children, classname }: Props) => {
  return (
    <div>
      <div className={cn("px-2 py-2", classname)}>{children}</div>
    </div>
  );
};

export default MaxWidthWrapper;
