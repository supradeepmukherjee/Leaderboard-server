import { tryCatch } from "./middlewares/error.js"
import { User } from "./models/User.js"
import { ErrorHandler } from './util.js'

const createUser = tryCatch(async (req, res, next) => {
    const userExists = await User.findOne({ name: req.body })
    if (!userExists) return next(new ErrorHandler(400, 'A user with the same name already exists'))
    const user = await User.create({ name: req.body })
    res.status(201).json({ success: true, msg: 'User Added Successfully' })
})

const rewardPoints = tryCatch(async (req, res, next) => {
    const points = Math.floor(Math.random() * 10) + 1
    const user = await User.findByIdAndUpdate(
        req.body.id,
        {
            $inc: { points },
            $push: {
                rewardsHistory: {
                    numberOfPoints: points,
                    time: new Date()
                }
            }
        },
        { new: true }
    )
    if (!user) return next(new ErrorHandler(404, 'User not Found'))
    const users = await User.find().sort({ points: -1 });
    await User.bulkWrite(users.map(({ _id }, i) => ({
        updateOne: {
            filter: { _id },
            update: { $set: { rank: i + 1 } }
        }
    })))
    res.status(200).json({ success: true, msg: `WOW! You got ${points} points` })
})

const getUsers = tryCatch(async (req, res, next) => {
    const users = await User.find()
    res.status(200).json({ success: true, users })
})

export { createUser, rewardPoints, getUsers }