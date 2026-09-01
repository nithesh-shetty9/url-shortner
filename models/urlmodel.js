const mongoose = require("mongoose");
const urlSchema =mongoose.Schema(
  {
    originalUrl: {
      type: String,
      unique: true,
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
  },
  {
    timestamps: true,
  },
);
const Url= mongoose.model("Url", urlSchema);
module.exports = Url;
