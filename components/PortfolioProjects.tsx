interface Project {
    projectName: string;
    description: string;
    image: string;
  }
  
  interface PortfolioProjectsProps {
    projects: Project[];
  }
  
  const PortfolioProjects = ({ projects }: PortfolioProjectsProps) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <img src={project.image} alt={project.projectName} className="h-40 w-full object-cover rounded-md mb-4" />
            <h4 className="text-xl font-bold">{project.projectName}</h4>
            <p className="text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default PortfolioProjects;
  