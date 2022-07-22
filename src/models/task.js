import { Schema, model, models } from "mongoose";
const date = new Date();
const TaskSchema = new Schema(
  {
    title: {
      type: [String],
      required: true,
    },
    description: {
      type: [String],
      required: true,
    },
    price: {
      type: [Number],
      required: true,
    },
    mesa:{
      type: [String],
      required: true,
    },
  }
);

export default models.Task || model("Task", TaskSchema);
