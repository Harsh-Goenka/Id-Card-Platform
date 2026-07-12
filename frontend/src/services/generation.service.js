import api from "./api";

export async function generateProject(
  projectId
) {

  const response =
    await api.post(

      `/generation/projects/${projectId}`,

      {},

      {

        responseType: "blob",

      }

    );

  const blob =
    new Blob(

      [response.data],

      {

        type:
          "application/zip",

      }

    );

  const url =
    window.URL.createObjectURL(
      blob
    );

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "id-cards.zip";

  document.body.appendChild(
    link
  );

  link.click();


  window.URL.revokeObjectURL(
    url
  );
  document.body.removeChild(link);

}