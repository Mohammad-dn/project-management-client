import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/src/state/api/api";

const Low = () => {
  return (
    <div>
      <ReusablePriorityPage priority={Priority.Low} />
    </div>
  );
};

export default Low;
