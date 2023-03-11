import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
    userName:{ type: String, required:true},
    email:{ type: String, required:true, select: false},
    password:{ type: String, required:true , select: false}
})

type User = InferSchemaType<typeof userSchema>;
export default model<User> ("User", userSchema);