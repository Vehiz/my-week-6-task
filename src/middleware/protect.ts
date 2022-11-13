import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { getAllData } from '../utils/userUtils'


export const isLoggedIn = asyncHandler(async (req:Request, res:Response, next:NextFunction)=>{
    let token;
    if(req.cookies.token){
        try{
            token = req.cookies.token;
            if(process.env.JWT_SECRET){
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const allData = await getAllData();
                
                if (typeof(decoded) !== "string"){
                   
                    for (let data of allData){
                        if(data.User.email === decoded.email){
                            req.user = data.User
                            
                        }
                       
                    }
                }
                next();
            }
        }catch(error){
            console.log(error)
            res.status(401);
            throw new Error('Not authorized');
        }
    }else if(((req.headers.authorization !==undefined) && (req.headers.authorization.startsWith('Bearer')))

    ){
        try{
            token = req.headers.authorization.split(' ')[1]
            if(process.env.JWT_SECRET){
                const decoded =jwt.verify(token, process.env.JWT_SECRET);
                const allData = await getAllData();
                if(typeof(decoded) !== "string"){
                    
                    for (let data of allData){
                        if(data.User.email === decoded.email){
                            req.user = data
                        }
                    }
                    console.log(req.user) 
                }
                next();
            }
        }catch(error){
            res.status(401);
            throw new Error('Not authorized');
        }
    }
    if(!token){
        res.status(401);
        res.redirect('/users/login')
    }
})