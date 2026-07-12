import api from "./api";

export const createProject =
  async (project) => {

    const response =
      await api.post(

        "/projects",

        project

      );

    return response.data;

};

export const getProjects =
  async () => {

    const response =
      await api.get(

        "/projects"

      );

    return response.data;

};

export const getProject =
  async (projectId) => {

    const response =
      await api.get(

        `/projects/${projectId}`

      );

    return response.data;

};

export const saveLayout =
  async (

    projectId,

    objects

  ) => {

    const response =
      await api.put(

        `/projects/${projectId}/layout`,

        {

          objects,

        }

      );

    return response.data;

};

export const deleteProject =
  async (projectId) => {

    const response =
      await api.delete(

        `/projects/${projectId}`

      );

    return response.data;

};