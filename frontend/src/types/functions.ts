import type * as React from "react";

export type toggleDrawerType = (
  open: boolean
) => (event: React.KeyboardEvent | React.MouseEvent) => void;
