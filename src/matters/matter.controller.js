import Matter from "../matters/matter.model.js"
import User from "../User/user.model.js"

export const createMatter = async(req,res) =>{
    try{
        const data = req.body

        const matter = await Matter.create(data)

        return res.status(201).json({
            message: "Matter has been created",
            matter
        })
    }catch(error){
        return res.status(500).json({
            message: "Matter registration failed",
            error: error.message
        })
    }
}

export const addUserToMatter = async(req,res) =>{
    try{
        const {uid} = req.params
        const {userUid} = req.body

        const addUser = await Matter.findByIdAndUpdate(uid,{$push: {inscribed: userUid}}, {new: true})

        return res.status(201).json({
            message: "User added to matter",
            addUser
        })

    }catch(error){
        return res.status(500).json({
            message: "User registration failed",
            error: error.message
        })
    }
}

export const updateInfoMatter = async (req, res) => {
    try {
        const { uid } = req.params;
        const { KeyUserUid, newName, newDescription } = req.body;
        const user = await User.findById(KeyUserUid);
        const matter = await Matter.findById(uid);

        if (user.role !== "TEACHER_ROLE") {
            return res.status(403).json({
                success: false,
                message: "Access Denied: You must be a professor of this subject to perform this action.",
                error: "Access Denied",
                permissions: user.role
            });
        }

        if (!matter.inscribed.includes(KeyUserUid)) {
            return res.status(403).json({
                success: false,
                message: "Access Denied: You are not inscribed in this matter."
            });
        }

        const updateFields = {};
        if (newName) {
            updateFields.name = newName
        };
        if (newDescription) {
            updateFields.description = newDescription
        };

        const updateMatter = await Matter.findByIdAndUpdate(uid, updateFields, { new: true });

        return res.status(200).json({
            success: true,
            message: "Matter updated successfully",
            updateMatter
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Matter update failed",
            error: error.message
        });
    }
};