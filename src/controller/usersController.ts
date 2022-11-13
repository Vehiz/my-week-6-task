import { Request, Response, NextFunction } from "express";
import { postUser, register, login } from '../utils/userUtils'

export const createUser = async function(req:Request, res:Response){
    try {
        const data = req.body
        console.log(data)
        const result = await postUser(data);       
        res.status(201).send({
            message: 'success', 
            data: result
        })
        return   
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: 'failure', 
            data: 'User already exists'
        })
        return
    }
}

export const registerUser = async function(req: Request, res: Response){
    try {
        const { fullname, email, username, password} = req.body;
        const newUserData = {
            fullname,
            email,
            username,
            password
        }
        const result = await register(newUserData);
        if (result){
            const { token } = result;
            res.cookie('token', token);
            res.status(201).redirect('/users/login')
        }
    } catch (error: any) {
        res.status(201).send({
            message: 'failed',
            data: `${error.message}`
        })
    }   
} 

export const loginUser = async function(req: Request, res: Response){
    try {
        const userData  = req.body;
        const result = await login(userData)
        if (result){
            console.log('I am here ooo')
            const { token } = result
            res.cookie('token', token)
            res.status(200).redirect('/movies')
            // res.status(200).render('movies', { title: 'Movies', token})
            return
        }
    } catch (error: any) {
        throw new Error(`${error.message}`)
    }
}

export const getLoginPage = async function(req: Request, res: Response){
    try { 
        res.status(200).render('login', {title: 'Movie-Land', token: ""})
        return 
    } catch (error: any) {
        throw new Error(`${error.message}`)
    }
}

export const getSignupPage = async function(req: Request, res: Response){
    try {
        res.status(200).render('register', {title: 'Signup', token: ""})
        return
    } catch (error: any) {
        throw new Error(`${error.message}`)
    }
}





// export const userUpdate = function(req:Request, res:Response){
//     const data = req.body
//     console.log('I am happy',data)
//     writeUpdate(data)
    // console.log("it is working")

// }

// export const userDelete = function(req:Request, res:Response){
// const data =req.body
// console.log(data)
// deleteFile(data)
// console.log("File deleted successfully")

// }