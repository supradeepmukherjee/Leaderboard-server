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

schema.pre('save', async function (next) {
    if (!this.rank) {
        try {
            const userCount = await mongoose.models.RewardsUser.countDocuments()
            this.rank = userCount + 1
        } catch (error) {
            console.error('Error calculating rank:', error)
        }
    }
    next()
});

export const User = mongoose.models.RewardsUser || model('RewardsUser', schema)