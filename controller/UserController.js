const userModel = require("../Modles/userModel");
const { use } = require("../Routers/userRouter");

module.exports.getUser = async function getUser(req, res) {
    // Read MongoDB Database
    let id = req.params.id;
    let user = await userModel.findById(id);
    if (user) {
        res.json({
            message: 'list of all user',
            data: user
        })
    } else {
        res.json({
            message: 'User Not Found . . .'
        })
    }
}


// Update Operastion
module.exports.updateUser = async function updateUser(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findById(id);
        console.log(user)
        let dataToBeUpdated = req.body;
        if (user) {
            console.log(dataToBeUpdated)
            const keys = [];
            for (let key in dataToBeUpdated) {
                keys.push(key);
            }
            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            user.confirmPassword = user.password;
            const updatedData = await user.save();
            console.log("User1 ", user)
            res.json({
                message: 'list of all user',
                data: updatedData
            })
        } else {
            res.json({
                message: 'User Not Found . . .'
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

// Delete Operastion
module.exports.deleteUser = async function deleteUser(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if (!user) {
            res.json({
                message: 'User Not Found . . .',
                data: user
            })
        } else {
            res.json({
                message: 'data Has been Deleted',
                data: user
            })
        }
    } catch (error) {
        res.json({
            message: err.message
        })
    }
}

// Read Operastion
module.exports.getAllUser = async function getAllUser(req, res) {
    try {
        let users = await userModel.find();
        if (users) {
            res.json({
                message: 'Users Retrieved',
                data: users
            });
        } else {
            res.json({
                message: 'Users Not Found . . .',
            });
        }
    } catch (error) {
        res.json({
            message: err.message
        })
    }
}