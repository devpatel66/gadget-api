import userRepo from "../repo/userRepo";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { Request,Response } from "express";
const cookieOptions = {
    httpOnly:true,
    secure:true
}



const registerUser=async (req:Request,res:Response):Promise<any>=>{
    try {
        const repo = await userRepo();
        const {email,name,password} = req.body
    
        if(!email){
            return res.status(400).json({
                msg:"Email is required"
            })
        }
    
        if(!password){
            return res.status(400).json({
                msg:"Password is required"
            })
        }
    
        if(password.length < 7){
            return res.status(400).json({
                msg:"Password length must be more than 7"
            })
        }
    
        const encryptedPassword = await bcrypt.hash(password,10);
    
        const userAlreadyExists = await repo.findOneBy({email})
        console.log(userAlreadyExists)
        if(userAlreadyExists){
            return res.status(401).json({
                msg:"user already exists"
            })
        }
    
        const user = repo.create({
            email,
            password:encryptedPassword
        })
        await repo.save(user);
        if(!user){
            return res.status(500).json({
                msg:"Internal Server Error"
            })
        }
    
        return res.status(200).json({
            msg:"Data Inserted",
            user
        })
    } catch (error) {
        return res.status(500).json({
            msg:"Internal Server Error"
        })
    }

}

const generatesAccessToken = async (id:string) => {
    const payload = {
        id
    }
    const secretKey = process.env.JWT_SECRET_KEY
    // console.log(secretKey)
    if(!secretKey){
       throw new Error("Internal Server Error")
    }
    const token =  jsonwebtoken.sign(payload,secretKey,{expiresIn:"1d"});
    return token
}


const loginUser=async (req:Request,res:Response):Promise<any>=>{
    try {
        const repo = await userRepo();
        const {email,password} = req.body;
        if(!email){
            return res.status(400).json(
                {
                    msg:"Email is Required"
                }
            )
        }
        if(!password){
            return res.status(400).json(
                {
                    msg:"Password is Required"
                }    
            )
        }
    
        const user:{email:string,password:string,id:string} | null = await repo.findOneBy({email});
        if(!user){
            return res.status(400).json(
                {
                    msg:"Invalid User"
                }
            )
        }
        
    
        const decryptedPassword:boolean = await bcrypt.compare(password,user.password);
        // console.log(decryptedPassword)
        if(decryptedPassword === false){
            return res.status(402).json(
                {
                    msg:"Invalid Password"
                }
            )
        }
        const token = await generatesAccessToken(user.id)
        // console.log(token)
        return res.status(200)
        .cookie("token",token,cookieOptions)
        .json(
            {
                msg:"Login Successfully",
            }
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json(
            {
                msg:"Internal Server Error"
            }
        )
    }

}


export {registerUser,loginUser}