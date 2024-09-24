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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 md:p-6">
      {projects.map((project, index) => (
        <div
          key={index}
          className="relative overflow-hidden shadow-lg rounded-xl transition-transform transform hover:-translate-y-2 hover:shadow-xl duration-300"
        >
          <img
            src={project.image}
            alt={project.projectName}
            className="h-48 w-full object-cover rounded-t-xl"
          />
          <div className="p-4 md:p-6">
            <h4 className="text-lg md:text-2xl font-semibold mb-2">
              {project.projectName}
            </h4>
            <p className="text-sm md:text-base">{project.description}</p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-0 hover:opacity-50 transition-opacity duration-300"></div>
        </div>
      ))}
    </div>
    
    
    );
  };
  
  export default PortfolioProjects;
  