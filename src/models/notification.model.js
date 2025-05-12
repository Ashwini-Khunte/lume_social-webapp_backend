import { Schema, model } from "mongoose";

const notificationSchema = new Schema({}, {timestamps: true})

export const Notification = model("Notification", notificationSchema)