import { useRef, useState } from "react";

import { toast } from "sonner";

import {
  createTextObject,
  createImageObject,
} from "../../utils/objectFactory";

import {
  uploadFrontTemplate,
  uploadBackTemplate,
  uploadExcel,
  uploadPhotosZip,
} from "../../services/upload.service";

import { useEditor } from "../../context/EditorContext";

export default function LeftSidebar() {

  const {

    addObject,

    project,

    setProject,

  } = useEditor();

  const frontTemplateRef =
    useRef(null);

  const backTemplateRef =
    useRef(null);

  const excelRef =
    useRef(null);

  const photosRef =
    useRef(null);

  const [

    uploading,

    setUploading,

  ] = useState({

    front: false,

    back: false,

    excel: false,

    photos: false,

  });

  const validateImage =
    (file) => {

      if (!file)
        return false;

      const allowed = [

        "image/png",

        "image/jpeg",

        "image/jpg",

      ];

      if (

        !allowed.includes(
          file.type
        )

      ) {

        toast.error(

          "Only PNG/JPG/JPEG allowed"

        );

        return false;

      }

      return true;

    };

  const validateExcel =
    (file) => {

      if (!file)
        return false;

      const allowed = [

        "application/vnd.ms-excel",

        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

      ];

      if (

        !allowed.includes(
          file.type
        )

      ) {

        toast.error(

          "Only Excel files allowed"

        );

        return false;

      }

      return true;

    };

  const validateZip =
    (file) => {

      if (!file)
        return false;

      if (

        file.type !==
          "application/zip" &&

        !file.name
          .toLowerCase()
          .endsWith(".zip")

      ) {

        toast.error(

          "Only ZIP files allowed"

        );

        return false;

      }

      return true;

    };

  const handleFrontTemplate =
    async (event) => {

      const file =
        event.target.files?.[0];

      if (

        !validateImage(file)

      )

        return;

      try {

        setUploading(

          (previous) => ({

            ...previous,

            front: true,

          })

        );

        const response =
          await uploadFrontTemplate(

            project._id,

            file

          );

        setProject(

          response.data

        );

        toast.success(

          "Front template uploaded"

        );

      }

      catch (error) {

        toast.error(

          error.response?.data
            ?.message ||

          "Upload failed"

        );

      }

      finally {

        setUploading(

          (previous) => ({

            ...previous,

            front: false,

          })

        );

        event.target.value =
          "";

      }

    };

  const handleBackTemplate =
    async (event) => {

      const file =
        event.target.files?.[0];

      if (

        !validateImage(file)

      )

        return;

      try {

        setUploading(

          (previous) => ({

            ...previous,

            back: true,

          })

        );

        const response =
          await uploadBackTemplate(

            project._id,

            file

          );

        setProject(

          response.data

        );

        toast.success(

          "Back template uploaded"

        );

      }

      catch (error) {

        toast.error(

          error.response?.data
            ?.message ||

          "Upload failed"

        );

      }

      finally {

        setUploading(

          (previous) => ({

            ...previous,

            back: false,

          })

        );

        event.target.value =
          "";

      }

    };
    

  const handleExcel =
    async (event) => {

      const file =
        event.target.files?.[0];

      if (

        !validateExcel(file)

      )

        return;

      try {

        setUploading(

          (previous) => ({

            ...previous,

            excel: true,

          })

        );

        const response =
          await uploadExcel(

            project._id,

            file

          );

        setProject(

          response.data

        );

        toast.success(

          "Excel uploaded successfully"

        );

      }

      catch (error) {

        toast.error(

          error.response?.data
            ?.message ||

          "Excel upload failed"

        );

      }

      finally {

        setUploading(

          (previous) => ({

            ...previous,

            excel: false,

          })

        );

        event.target.value =
          "";

      }

    };

  const handlePhotos=
  async(event)=>{

    const file=
      event.target.files?.[0];

    if(
      !validateZip(file)
    )
      return;

    try{

      setUploading(
        previous=>({
          ...previous,
          photos:true,
        })
      );

      // const response=
      //   await uploadPhotosZip(
      //     project._id,
      //     file
      //   );

      // setProject(
      //   response.data
      // );
      console.log("Before upload");

const response=
  await uploadPhotosZip(
    project._id,
    file
  );

console.log("After upload",response);

setProject(
  response.data
);//checking

      toast.success(
        `${response.data.photos.count} photos uploaded successfully`
      );
      

    }
    catch(error){

      toast.error(

        error.response?.data?.message ||

        "ZIP upload failed"

      );

    }
    finally{

      setUploading(
        previous=>({
          ...previous,
          photos:false,
        })
      );

      event.target.value="";

    }

};

 const renderStatus=
  (
    uploaded,
    loading,
    count
  )=>{

    if(loading){

      return(
        <span className="text-blue-600">
          Uploading...
        </span>
      );

    }

    if(uploaded){

      return(
        <span className="text-green-600">
          {
            count>0
              ? `Uploaded (${count} photos)`
              : "Uploaded"
          }
        </span>
      );

    }

    return(
      <span className="text-gray-400">
        Not Uploaded
      </span>
    );

};

  return (

<aside
  className="w-72 overflow-y-auto border-r"
  style={{
    background: "var(--surface)",
    borderColor: "var(--border)",
  }}
>
      <div className="space-y-8 p-6">

        
         <div>

  <h2
    className="text-lg font-semibold"
    style={{
      color: "var(--heading)",
    }}
  >
    Objects
  </h2>

  <p
    className="mt-1 text-sm"
    style={{
      color: "var(--muted)",
    }}
  >
    Add elements to your card.
  </p>

</div>

        <button

          onClick={() =>

            addObject(

              createTextObject()

            )

          }

className="mb-3 flex w-full items-center justify-between rounded-2xl px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"style={{
  
  background: "var(--primary)",
  color: "white",
  boxShadow: "var(--shadow-sm)",
}}
        >

          <>
  <span>Add Text</span>
  <span className="text-lg">＋</span>
</>

        </button>

        <button

          onClick={() =>

            addObject(

              createImageObject()

            )

          }

className="flex w-full items-center justify-between rounded-2xl px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0" style={{
  background: "#6E7F6A",
  color: "white",
  boxShadow: "var(--shadow-sm)",
}}        >

          <>
  <span>Add Image</span>
  <span className="text-lg">＋</span>
</>

        </button>

        <div
  className="my-8 h-px"
  style={{
    background: "var(--border)",
  }}
/>

        <div>

  <h2
    className="text-lg font-semibold"
    style={{
      color: "var(--heading)",
    }}
  >
    Assets
  </h2>

  <p
    className="mt-1 text-sm"
    style={{
      color: "var(--muted)",
    }}
  >
    Files used to generate cards.
  </p>

</div>


                <button

          disabled={uploading.front}

          onClick={() =>
            frontTemplateRef.current.click()
          }

          className="w-full border rounded py-3 mb-2 hover:bg-gray-100 disabled:opacity-50"

        >

          Front Template

        </button>

        <div className="text-xs mb-4">

          {renderStatus(

            project.template.front.uploaded,

            uploading.front

          )}

        </div>

        <button

          disabled={uploading.back}

          onClick={() =>
            backTemplateRef.current.click()
          }

          className="w-full border rounded py-3 mb-2 hover:bg-gray-100 disabled:opacity-50"

        >

          Back Template

        </button>

        <div className="text-xs mb-4">

          {renderStatus(

            project.template.back.uploaded,

            uploading.back

          )}

        </div>

        <button

          disabled={uploading.excel}

          onClick={() =>
            excelRef.current.click()
          }

          className="w-full border rounded py-3 mb-2 hover:bg-gray-100 disabled:opacity-50"

        >

          Excel File

        </button>

        <div className="text-xs mb-4">

          {renderStatus(

            project.excel.uploaded,

            uploading.excel

          )}

        </div>

        <button

          disabled={uploading.photos}

          onClick={() =>
            photosRef.current.click()
          }

          className="w-full border rounded py-3 mb-2 hover:bg-gray-100 disabled:opacity-50"

        >

          Photos ZIP

        </button>

        <div className="text-xs">

          {renderStatus(
            project.photos.uploaded,
            uploading.photos,
            project.photos.count
          )}

        </div>

      </div>

      <input

        hidden

        ref={frontTemplateRef}

        type="file"

        accept=".png,.jpg,.jpeg"

        onChange={handleFrontTemplate}

      />

      <input

        hidden

        ref={backTemplateRef}

        type="file"

        accept=".png,.jpg,.jpeg"

        onChange={handleBackTemplate}

      />

      <input

        hidden

        ref={excelRef}

        type="file"

        accept=".xlsx,.xls"

        onChange={handleExcel}

      />

      <input

        hidden

        ref={photosRef}

        type="file"

        accept=".zip"

        onChange={handlePhotos}

      />

    </aside>

  );

}
 