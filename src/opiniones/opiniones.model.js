import { Schema, model } from "mongoose";

const opinionesSchema = Schema({
    titulo:{
        type: String,
        required: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    text:{
        type: String,
        required: true
    },
    autor:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
},{
    versionKey: false
})

export default model('opiniones', opinionesSchema)