import mongoose from "mongoose";

const objectSchema =
  new mongoose.Schema(

    {

      id: {

        type: String,

        required: true,

      },

      type: {

        type: String,

        enum: [

          "text",

          "image",

        ],

        required: true,

      },

      x: {

        type: Number,

        required: true,

      },

      y: {

        type: Number,

        required: true,

      },

      width: {

        type: Number,

        required: true,

      },

      height: {

        type: Number,

        required: true,

      },

      rotation: {

        type: Number,

        default: 0,

      },

      binding: {

        type: String,

        default: "",

      },
      staticText: {

      type: String,

      default: "",

      },

      fontFamily: {

        type: String,

        default: "Arial",

      },

      fontSize: {

        type: Number,

        default: 22,

      },

      bold: {

        type: Boolean,

        default: false,

      },

      italic: {

        type: Boolean,

        default: false,

      },

      underline: {

        type: Boolean,

        default: false,

      },

      color: {

        type: String,

        default: "#000000",

      },
      textAlign: {

        type: String,

        enum: [

          "left",

          "center",

          "right",

        ],

        default: "left",

      },
      textMode: {

  type: String,

  enum: [

    "normal",

    "fit",

    "wrap",

  ],

  default: "normal",

},

      fitMode: {

        type: String,

        default: "cover",

      },

    },

    {

      _id: false,

    }

  );

const projectSchema =
  new mongoose.Schema(

    {

      owner: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

        index: true,

      },

      name: {

        type: String,

        required: true,

        trim: true,

        maxlength: 100,

      },

      description: {

        type: String,

        default: "",

        trim: true,

      },

      status: {

        type: String,

        enum: [

          "draft",

          "ready",

          "processing",

          "completed",

        ],

        default: "draft",

      },

      card: {

        width: {

          type: Number,

          required: true,

        },

        height: {

          type: Number,

          required: true,

        },

        dpi: {

          type: Number,

          default: 300,

        },

        unit: {

          type: String,

          enum: [

            "mm",

            "inch",

          ],

          default: "mm",

        },

      },

      storage: {

        folderName: {

          type: String,

          required: true,

        },

      },

      excel: {

        uploaded: {

          type: Boolean,

          default: false,

        },

        originalName: {

          type: String,

          default: "",

        },

        headers: {

          type: [String],

          default: [],

        },

      },
      photos: {
        uploaded: {
          type: Boolean,
          default: false,
        },
        count: {
          type: Number,
          default: 0,
        },
        indexFile: {
          type: String,
          default: "",
        },
      },

      template: {

        front: {

          uploaded: {

            type: Boolean,

            default: false,

          },

          originalName: {

            type: String,

            default: "",

          },

          fileName: {

            type: String,

            default: "",

          },

        },

        back: {

          uploaded: {

            type: Boolean,

            default: false,

          },

          originalName: {

            type: String,

            default: "",

          },

          fileName: {

            type: String,

            default: "",

          },

        },

      },

      layout: {

        objects: {

          type: [

            objectSchema,

          ],

          default: [],

        },

      },

      export: {

        pageSize: {

          type: String,

          default: "A4",

        },

        margin: {

          type: Number,

          default: 5,

        },

        spacing: {

          type: Number,

          default: 2,

        },

      },

    },

    {

      timestamps: true,

    }

  );

projectSchema.index({

  owner: 1,

  createdAt: -1,

});

export const Project =
  mongoose.model(

    "Project",

    projectSchema

  );