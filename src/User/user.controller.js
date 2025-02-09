import { hash } from "argon2";
import User from "./user.model.js"

export const getUserById = async (req,res) =>{
    try{
        const {uid} = req.params;
        const user = await User.findById(uid);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            user
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error to obtain the user",
            error: err
        })
    }
}

export const getUsers = async(req, res) =>{
    try{
        const {limite = 5 , desde = 0} = req.query
        const query = {status:true}
        
        const [total, users] = await Promise.all([
            User.countDocuments(),
            User.find(query).skip(Number(desde)).limit(Number(limite)),

        ])

        return res.status(200).json({
            success: true,
            total,
            users
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error to obtain the users",
            error: err
        })
    }
}

export const deleteUser = async(req, res) =>{
    try{
        
        const {uid} = req.params
        const user = await User.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            succes: true,
            message: "User deleted",
            user
        })

    }catch(err){
        return res.status(500).json({
            succes: false,
            message: "Error to delete the user",
            error: err.message
        })
    }
}

export const updatePassword = async (req, res) => {
    try {
        
        const {uid} = req.params;
        const {newPassword} = req.body;
        
        const encryptedPass = await hash(newPassword);
        await User.findByIdAndUpdate(uid,{password: encryptedPass}, {new:true})

        return res.status(200).json({
            succes: true,
            message: "Password updated"
        })

    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Error to change the password",
            error: err.message
        })
    }
};


export const updateUser = async (req, res) => {
    try {
        const { updateUid } = req.params; 
        const data = req.body; 

        const updatedUser = await User.findByIdAndUpdate(updateUid, data, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User with the given updateUid not found",
                error: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Information of Student updated successfully",
            updatedUser
        });

    } catch (err) {
        return res.status(500).json({
            message: "Error updating the Student",
            error: err.message
        });
    }
};
