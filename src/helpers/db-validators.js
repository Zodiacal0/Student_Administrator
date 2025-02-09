import User from "../User/user.model.js";
import Matter from "../matters/matter.model.js"

export const emailExist = async(email = "") =>{
    const exist = await User.findOne({email});
    if(exist){
        throw new Error(`The email ${email} is already registered`);
    }

};

export const uidExist = async(uid = "") =>{
    const exist = await User.findById(uid);
    if(!exist){
        throw new Error("No exixte el ID proporcionado");
    }
};

export const uidMatterExist = async(uid = "") =>{
    const exist = await Matter.findById(uid);
    if(!exist){
        throw new Error("No existe el ID proporcionado");
    }
}
