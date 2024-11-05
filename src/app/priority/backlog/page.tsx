import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/src/state/api/api";

const Backlog = () => {
  return (
    <div>
      <ReusablePriorityPage priority={Priority.Backlog} />
    </div>
  );
};

export default Backlog;
