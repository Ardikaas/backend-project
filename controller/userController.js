const User = require('../models/userModel.js')

class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await User.find({})
            res.json(users)
        } catch (error) {
            res.status(500).json({ message: "Server Error" })
        }
    }

    static async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id)
            res.json(user)
        } catch (error) {
            res.status(500).json({ message: "Server Error" })
        }
    }
}

module.exports = UserController