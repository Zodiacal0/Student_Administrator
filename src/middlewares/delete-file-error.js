import fs from "fs/promises";
import {join} from "path";

export const deleteFileOnError = async(err, req, res, next) =>{
    if(req.file && req.filePath){
        const filePath = join(req.filePath, req.file.filename);
        try{
            await fs.unlink(filePath);
        }catch(unlinkError){
            console.log(`Deleting dile: ${unlinkError}`)
        }
    } 
    if(err.status === 400 || err.errors){
        return res.status(400).json({
            succes: false,
            message: "Bad Request",
            error: err.errors
        })
    }
    return res.status(500).json({
        succes: false,
        message: err.message
    })
}