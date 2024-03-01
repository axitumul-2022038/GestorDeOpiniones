import { Schema, model } from "mongoose";

const comentarioSchema =  Schema({
    opinion: {
        type: Schema.Types.ObjectId,
        ref: 'opiniones',
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

export default model('comentarios', comentarioSchema)