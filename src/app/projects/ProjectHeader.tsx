import { useState } from "react";
import Header from "../(componenets)/Header";

type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const ProjectHeaderComponenet = ({ activeTab, setActiveTab }: Props) => {
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);

  return (
    <div className="px-4 xl:px-6">
      {/* Modal new project  */}
      <div className="pt 6 px-6 lg:pb-4 lg:pt-8">
        <Header name="Product design development" />
      </div>
    </div>
  );
};

export default ProjectHeaderComponenet;
