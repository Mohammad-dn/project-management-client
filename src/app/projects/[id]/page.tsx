"use client";
import { useState } from "react";
import ProjectHeaderComponenet from "../ProjectHeader";

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
      {/* <ProjectHeaderComponenet
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      /> */}
      {/* {activeTab === "Board" && <Board />} */}
    </div>
  );
};

export default Project;
