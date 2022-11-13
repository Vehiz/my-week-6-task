import fs from 'fs';
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';
import { isJSDocUnknownTag } from 'typescript';
import jwt from 'jsonwebtoken';



export const postUser = async function(userdata: IUser) {
    try {
        console.log(" i am here")
        if (!fs.existsSync('database.json')) {
            fs.writeFile('database.json', JSON.stringify([], null, 3 ), (err) => {
              if (err) {
                // res.end({ message: "An error Occured." });
                return;
              } else {
                console.log("file Created Successfully.");
              }})}
        //Read file
        const database = JSON.parse(fs.readFileSync('database.json', 'utf-8'))
        for (let userDetails of database){
            const user = userDetails.User;
            if(user.email === userdata.email){
                throw Error('User already exists')
            }
        }
        const newUser: IUserProfile = {
            User: userdata,
            Movies: []
        }    

        database.push(newUser)
        fs.writeFileSync('database.json', JSON.stringify(database, null, 3), 'utf-8');
        return database

        }catch(error: any){
            console.log(error)
            throw new Error(`${error.message}`)
        }
 
}  


export const register = async function(data: IUser){
    try {
        const allData = await getAllData();
        for(let user of allData){
            if(user.User.email === data.email){
                throw new Error('User already exists')
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt)

        const token = generateToken(data.email)
        const User = {
            fullname: data.fullname,
            email: data.email,
            password: hashedPassword,
            username: data.username,
        }
        
        const newUser: IUserProfile = {
            User,
            Movies: []
        }

        allData.push(newUser)

        fs.writeFileSync('database.json', JSON.stringify(allData, null, 3), 'utf-8');

        return {User, token};
        
    } catch (error: any) {
        throw Error(`${error.message}`)
    }
}

export const login = async function(data: ILoginData){
    try {
        const { email, password } = data;
       
        const allData = await getAllData();
        for(let user of allData){
            if(user.User.email === email && (await bcrypt.compare(password, user.User.password))){
                const token =  generateToken(email);
                return { token }
    
            }
        }

        return
        
    } catch (error: any) {
        throw new Error(`${error.message}`)
    }
 
}









export function getAllData(){
    try {
        const database = JSON.parse(fs.readFileSync('database.json', 'utf-8'));
        return database;
    } catch (error: any) {
        throw new Error(`${error.message}`)
    }
}


const generateToken = function(email: string){
    if( process.env.JWT_SECRET ){
        return jwt.sign({email}, process.env.JWT_SECRET, {
            expiresIn: '1day'
        })
    }
}