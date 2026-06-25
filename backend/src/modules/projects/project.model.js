import mongoose from "mongoose";

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

        unique: false,
        
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

      template: {

        frontBackground: {

          type: String,

          default: "",

        },

        backBackground: {

          type: String,

          default: "",

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

projectSchema.index({
  owner: 1,
  name: "text",
});

export const Project =
  mongoose.model(
    "Project",
    projectSchema
);