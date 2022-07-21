import {Schema, model, models} from 'mongoose';

const newSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
        }
})

export default models.Task || model('Task', newSchema);