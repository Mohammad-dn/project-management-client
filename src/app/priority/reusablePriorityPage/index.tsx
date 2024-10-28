"use client";
import { Priority, useGetUserTasksQuery } from "@/src/state/api/api";
import { useState } from "react";

type Props = {
  priority: Priority;
};

const PriorityPage = ({ Priority }: Props) => {
  [View, setView] = useState("list");
  [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  const userId = 1;
  const {
    data: task,
    isLoading: taskLoading,
    isError: taskErro,
  } = useGetUserTasksQuery(userId, {
    skip: userId == null,
  });
  return <div>PriorityPage</div>;
};

export default PriorityPage;
