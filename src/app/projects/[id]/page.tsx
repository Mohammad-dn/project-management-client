"use client";
import { useState } from "react";
import ProjectHeaderComponenet from "../ProjectHeader";
import BoardView from "../BoardView";
import List from "../ListView";

type Props = {
  params: { id: string };
};

const Project = ({ params }: Props) => {
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      {/* Modal new task  */}
      <ProjectHeaderComponenet
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === "Board" && (
        <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default Project;
