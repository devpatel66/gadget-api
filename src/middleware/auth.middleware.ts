import jwt from "jsonwebtoken";
import userRepo from "../repo/userRepo";
import { Request, Response, NextFunction } from "express";


interface CustomRequest extends Request {
    user?: any
}
const veriifyJwt = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        // console.log(req.body)   
        // console.log(req.cookies);
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json(
                { msg: "Unauthorized User" }
            )
        }
        console.log("Token : ", token)
        const secretKey: string | undefined = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            return res.status(500).json({
                msg: "Internal Server Error"
            })
        }
        const decode = jwt.verify(token, secretKey);
        if (typeof decode !== "object") {
            return res.status(401).json(
                { msg: "Unauthorized User" }
            )
        }
        const repo = await userRepo()
        const user = await repo.findOneBy({ id: decode.id })
        // console.log(user)
        if (!user) {
            return res.status(401).json(
                { msg: "Unauthorized User" }
            )
        }

        req.user = user;
        next()
    }
    catch (error) {
        return res.status(500).json({
            statusCode: 500,
            msg: "Internal Server Error"
        })
    }
}

export default veriifyJwt