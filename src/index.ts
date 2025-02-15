import "reflect-metadata";
import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


// user routes
import userRoutes from './route/user.route'
app.use("/v1/api/auth",userRoutes)

// gadgets route
import gadgetRouter from "./route/gadget.route";
app.use("/v1/api/gadget",gadgetRouter)

app.listen(3000, () => {
    console.log('Server started on port 3000');
});