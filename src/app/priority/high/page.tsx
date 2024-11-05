import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/src/state/api/api";

const High = () => {
  return (
    <div>
      <ReusablePriorityPage priority={Priority.High} />
    </div>
  );
};

export default High;
