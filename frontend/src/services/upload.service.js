import api from "./api";

export const uploadExcel =
  async (
    projectId,
    file
  ) => {

    const formData =
      new FormData();

    formData.append(
      "excel",
      file
    );

    const response =
      await api.post(

        `/uploads/projects/${projectId}/excel`,

        formData,

        {

          headers: {

            "Content-Type":
              "multipart/form-data",

          },

        }

      );

    return response.data;

};

export const uploadFrontTemplate =
  async (
    projectId,
    file
  ) => {

    const formData =
      new FormData();

    formData.append(
      "template",
      file
    );

    const response =
      await api.post(

        `/uploads/projects/${projectId}/template/front`,

        formData,

        {

          headers: {

            "Content-Type":
              "multipart/form-data",

          },

        }

      );

    return response.data;

};

export const uploadBackTemplate =
  async (
    projectId,
    file
  ) => {

    const formData =
      new FormData();

    formData.append(
      "template",
      file
    );

    const response =
      await api.post(

        `/uploads/projects/${projectId}/template/back`,

        formData,

        {

          headers: {

            "Content-Type":
              "multipart/form-data",

          },

        }

      );

    return response.data;

};

export const uploadPhotosZip=
  async(
    projectId,
    file
  )=>{

    const formData=
      new FormData();

    formData.append(
      "photos",
      file
    );

    const response=
      await api.post(

        `/uploads/projects/${projectId}/photos`,

        formData,

        {
          headers:{
            "Content-Type":
              "multipart/form-data",
          },
        }

      );

    return response.data;

};