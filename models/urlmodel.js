const mongoose = require("mongoose");
const urlSchema = mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },

    shortCode: {
      type: String,
      required: true,
      unique: true,
    },

    clicks: {
      type: Number,
      default: 0,
    },
    createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"users"
    }
  },
  {
    timestamps: true,
  },
);
const Url = mongoose.model("Url", urlSchema);
module.exports = Url;
