import EmptyProjects from "./EmptyProjects";
import ProjectCard from "./ProjectCard";

export default function ProjectList({

  projects,

  onDelete,

}) {

  if (
    projects.length === 0
  ) {

    return <EmptyProjects />;

  }

  return (

<div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
      {projects.map(

        (project) => (

          <ProjectCard

            key={project._id}

            project={project}

            onDelete={onDelete}

          />

        )

      )}

    </div>

  );

}