import {Schema, model} from "mongoose";
import { type } from "os";

const mattersSchema = Schema({
    name: {
        type: String,
        required: [true, "Name is requiered"],
        maxLength: [25, "Name cannot exceed 25 characteres"],
        unique: true
    },
    inscribed: {
        type: Array,
        default: []
    },
    description:{
        type: String,
        required: true,
        maxLength: [64, "description cannot exceed 64 characteres"]
    },
    status: {
        type: Boolean,
        default: true,
    },
},
{
    versionKey: false,
    timeStamps: true
});

mattersSchema.methods.toJSON = function(){
    const {_v, _id, ...matters} = this.toObject()
    matters.uid = _id;
    return matters;
};

export default model("Matters", mattersSchema);