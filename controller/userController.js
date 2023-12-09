const User = require('../models/userModel.js')

const UserController = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser
}

async function getAllUsers(req, res) {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}
async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

async function createUser(req, res) {
    try {
        const user = await User.create(req.body)
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

async function deleteUser(req, res){
    try{
        const {id} = req.params
        const user = await User.findByIdAndDelete(id)
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

module.exports = UserController