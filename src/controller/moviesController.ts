import { Request, Response, NextFunction } from "express";
import { postMovie, writeUpdate, deleteFile, getMovies } from '../utils/movieUtils'

export const createMovie = function(req:Request, res:Response){
    const data = req.body
    if (req.file){
        data["image"] = req.file.path;
        data["email"] = req.user?.email;
        console.log('Email', req.user)
    }
    console.log(data)
    postMovie(data.email, data)
    console.log("all good")
    if(data){
        // res.status(201).send({message: "file successfully posted"})
        res.status(201).redirect('/movies')
    }

}

export const movieUpdate = function(req:Request, res:Response){
    const data = req.body
    console.log('User details', req.user)
    console.log('Files',req.file)
    if(req.file){
        data["image"] = req.file.path;
        data["email"] = req.user?.email
    }

    if(data){
        console.log('I am happy',data)
        writeUpdate(data) 
        res.status(203).send({message: 'Movie succesfully updated'});
        return;
    }
    // console.log("it is working") 

}

export const movieDelete = async function(req:Request, res:Response){
const { email } = req.user!;
const {id} = req.params;
const result = await deleteFile(id, email)
console.log("File deleted successfully")  
if (result){
    res.status(204).send({
        message: 'Movie successfully deleted'
    })
    return
}
}

export const getMoviesDeletePage = async function(req: Request, res: Response){
    try {
        const { id } = req.params;
        const { fullname } = req.user!;
        const { token } = req.cookies;
        res.status(200).render('delete-movie', {title: 'Delete Movie', id, user: fullname, token})
    } catch (error: any) {
        throw new Error(`${error.message}`)
    }
}

export const getAllMovies =  async function(req:Request, res:Response){
    try {
        const data = req.body
        const { token } = req.cookies
        const { fullname } = req.user!;
        const result = await getMovies(data)
        res.status(200).render('movies', {title: 'Movies', data: result, token, fullname})
        return
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }

}

export const getCreateMoviesPage = async function(req: Request, res: Response){
    try {
        
        const { fullname, email } = req.user!
        const { token } = req.cookies;
        res.status(200).render('post-movie', {title: 'Create a Movie', email, fullname, token})
        return;
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
}

export const getUpdateMoviesPage = async function(req: Request, res: Response){
    try {
        const { id } = req.params;
        const { fullname } = req.user!
        const { token } = req.cookies
        res.status(200).render('update-movie', {title: 'Update Movie', fullname, movieid: id, token} );
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
}

