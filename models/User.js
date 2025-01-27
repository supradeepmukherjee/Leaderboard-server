import mongoose, { model, Schema } from 'mongoose'

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        default: 0,
        min: 0
    },
    rank: {
        type: Number,
        default: 1,
        min: 1
    },
    rewardsHistory: [{
        numberOfPoints: {
            type: Number,
            required: true,
            min: 0,
            max: 10
        },
        time: {
            type: Date,
            required: true,
            default: Date.now
        }
    }]
},
    { timestamps: true }
)

export const User = mongoose.models.RewardsUser || model('RewardsUser', schema)