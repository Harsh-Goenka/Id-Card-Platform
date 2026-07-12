import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  createProject,
  getProjects,
  deleteProject,
} from "../services/project.service";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import CreateProjectCard from "../components/dashboard/CreateProjectCard";
import CreateProjectModal from "../components/dashboard/CreateProjectModal";
import ProjectList from "../components/dashboard/ProjectList";

export default function DashboardPage() {

  const navigate = useNavigate();

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [openModal, setOpenModal] =
    useState(false);

  useEffect(() => {

    const fetchProjects =
      async () => {

        try {

          const response =
            await getProjects();

          setProjects(
            response.data
          );

        } catch (error) {

          console.error(error);

          toast.error(
            "Unable to load projects"
          );

        } finally {

          setLoading(false);

        }

      };

    fetchProjects();

  }, []);

  const handleCreateProject =
    async (project) => {

      try {

        const response =
          await createProject(
            project
          );
          setProjects((previousProjects) => [
          response.data,
          ...previousProjects,
          ]);

        toast.success(
          "Project created successfully"
        );

        navigate(

          `/projects/${response.data._id}`,

          {
            replace: true,
          }

        );

      } catch (err) {

        toast.error(

          err.response?.data?.message ||

          "Unable to create project"

        );

      }

    };
    

    const handleDeleteProject =
  async (projectId) => {

    const confirmed =
      window.confirm(
        "Delete this project?"
      );

    if (!confirmed) {
      return;
    }

    try {

      await deleteProject(
        projectId
      );

      setProjects((previous) =>
        previous.filter(
          (project) =>
            project._id !== projectId
        )
      );

      toast.success(
        "Project deleted"
      );

    } catch (error) {

      toast.error(
        "Unable to delete project"
      );

    }

};
const totalProjects =
  projects.length;

const activeProjects =
  projects.filter(
    project =>
      project.status === "active"
  ).length;

const draftProjects =
  projects.filter(
    project =>
      project.status === "draft"
  ).length;

const defaultCardSize = "54 x 86 mm";
  if (loading) {

    return (

      <div
  className="flex min-h-screen items-center justify-center"
  style={{
    background:"var(--background)",
    color:"var(--heading)",
  }}
>

  <div className="text-lg">

    Loading Dashboard...

  </div>

</div>

    );

  }

  return (

<div
  className="min-h-screen"
  style={{
    background:"var(--background)",
  }}
>

  <DashboardHeader />
<main className="mx-auto max-w-7xl px-6 pb-20 pt-8">
  

    {/* Hero */}

    <section className="mb-12">

      <p

        className="text-sm font-medium"

        style={{
          color:"var(--primary)",
        }}

      >

        Dashboard

      </p>

      <h1

        className="mt-3 text-5xl font-bold"

        style={{
          color:"var(--heading)",
        }}

      >

        My Projects

      </h1>

      <p

        className="mt-5 max-w-2xl text-lg"

        style={{
          color:"var(--muted)",
        }}

      >

        Create, manage and generate
        professional ID card projects.

      </p>

    </section>

    {/* Stats */}

    <section className="mb-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

      {[
        {
          label:"Projects",
          value:totalProjects,
        },
        {
          label:"Active",
          value:activeProjects,
        },
        {
          label:"Draft",
          value:draftProjects,
        },
        {
          label:"Default Card",
          value:defaultCardSize,
        },
      ].map(card=>(

        <div

          key={card.label}

          className="rounded-[24px] p-7"

          style={{

            background:"var(--surface)",

            border:"1px solid var(--border)",

            boxShadow:"var(--shadow-sm)",

          }}

        >

          <p

            style={{
              color:"var(--muted)",
            }}

          >

            {card.label}

          </p>

          <h2

            className="mt-4 text-3xl font-bold"

            style={{
              color:"var(--heading)",
            }}

          >

            {card.value}

          </h2>

        </div>

      ))}

    </section>

    <CreateProjectCard

      onClick={()=>
        setOpenModal(true)
      }

    />

    <div className="mt-12">

      <ProjectList

        projects={projects}

        onDelete={
          handleDeleteProject
        }

      />

    </div>

  </main>

  <CreateProjectModal

    open={openModal}

    onClose={()=>
      setOpenModal(false)
    }

    onCreate={
      handleCreateProject
    }

  />

</div>

);

}