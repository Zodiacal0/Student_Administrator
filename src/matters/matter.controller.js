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
    }catch(err){
        return res.status(500).json({
            message: "Matter registration failed",
            error: err.message
        })
    }
}

export const addUserToMatter = async(req,res) =>{
    try{
        const {uid} = req.params
        const {userUid} = req.body
        const user = await User.findById(userUid);
        const matter = await Matter.findById(uid);

        if (matter.inscribed.includes(userUid)) {
            return res.status(409).json({
                message: "The user is already enrolled in the matter"
            });
        }

        if(user.role !== "TEACHER_ROLE"){
            if (user.matters.length >= 3) {
                return res.status(400).json({
                    message: "Cannot enroll in more than 3 matters"
                });
            }
        }

        const addUser = await Matter.findByIdAndUpdate(uid,{$push: {inscribed: userUid}}, {new: true})

        await User.findByIdAndUpdate(userUid,{ $push: { matters: uid } },{ new: true });

        return res.status(201).json({
            message: "User added to matter",
            addUser
        })

    }catch(err){
        return res.status(500).json({
            message: "User registration failed",
            error: err.message
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

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Matter update failed",
            error: err.message
        });
    }
};

export const deleteMatter = async (req, res) => {
    try {
        const { uid } = req.params;
        const { KeyUserUid } = req.body;
        const user = await User.findById(KeyUserUid);
        const matter = await Matter.findById(uid);
        const inscribedUsers = matter.inscribed;


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

        await User.updateMany({ _id: { $in: inscribedUsers }},{ $pull: { matters: uid }});

        await Matter.findByIdAndUpdate(uid, { inscribed: [] });

        const updateMatter = await Matter.findByIdAndUpdate(uid, {status: false}, { new: true });

        return res.status(200).json({
            success: true,
            message: "Matter deleted successfully",
            updateMatter
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Matter deleted failed",
            error: err.message
        });
    }
};

export const deleteMatterFromUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const { KeyUserUid, userDeleteUid } = req.body;

        const user = await User.findById(KeyUserUid);

        const matter = await Matter.findById(uid);

        if (user.role !== "TEACHER_ROLE") {
            return res.status(403).json({
                success: false,
                message: "Access Denied: You must be a professor of this subject to perform this action."
            });
        }

        if (!matter.inscribed.includes(userDeleteUid)) {
            return res.status(400).json({
                success: false,
                message: "The user is not inscribed in this matter."
            });
        }

        await Matter.findByIdAndUpdate(uid, { $pull: { inscribed: userDeleteUid } });

        await User.findByIdAndUpdate(userDeleteUid, { $pull: { matters: uid } });

        return res.status(200).json({
            success: true,
            message: "User removed from matter successfully."
        });

    }catch(err) {
        return res.status(500).json({
            success: false,
            message: "Failed to remove user from matter.",
            error: err.message
        });
    }    
};

export const getMatter = async (req, res) => {
    try {
        const {uid} = req.params
        const query = { inscribed: { $in: [uid] } };

        const [total, matter] = await Promise.all([
            Matter.countDocuments(query),
            Matter.find(query)  
        ]);

        return res.status(200).json({
            success: true,
            message: "Classes were successfully obtained",
            total,
            matter
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to obtained the Classes",
            error: err.message
        });
    }
};