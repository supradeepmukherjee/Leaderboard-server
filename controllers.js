import { tryCatch } from "./middlewares/error.js"
import { User } from "./models/User.js"
import { ErrorHandler } from './util.js'

const createUser = tryCatch(async (req, res, next) => {
    const { name } = req.body
    const userExists = await User.findOne({ name })
    if (userExists) return next(new ErrorHandler(400, 'A user with the same name already exists'))
    const numberOfUsers = await User.countDocuments()
    const user = await User.create({ name, rank: numberOfUsers + 1 })
    res.status(201).json({ success: true, msg: 'User Added Successfully' })
})


const getUserNames = tryCatch(async (req, res, next) => {
    const users = await User.find({}, 'name')
    res.status(200).json({ success: true, users })
})

const rewardPoints = tryCatch(async (req, res, next) => {
    const points = Math.floor(Math.random() * 10) + 1
    const user = await User.findOneAndUpdate(
        { name: req.body.name },
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
    res.status(200).json({ success: true, msg: `WOW! ${user.name} got ${points} point${points > 1 ? 's' : ''}` })
})

const getUsers = tryCatch(async (req, res, next) => {
    const users = await User.find().sort({ rank: 1 })
    res.status(200).json({ success: true, users })
})

export { createUser, getUserNames, rewardPoints, getUsers }