import express, { application, Request, Response } from "express";
import {createMovie, movieUpdate, movieDelete, getAllMovies, getMoviesDeletePage, getUpdateMoviesPage, getCreateMoviesPage} from "../controller/moviesController";
import { isLoggedIn } from "../middleware/protect";
import multer from 'multer';


const { storage } = require('../services/cloudinary')

const upload = multer({ storage })


// import { deleteFile, writeUpdate } from "../utils/utils";

const router = express.Router()

router.post('/', isLoggedIn, upload.single('image'), createMovie)
router.get('/add', isLoggedIn, getCreateMoviesPage)
router.get('/update/:id', isLoggedIn, getUpdateMoviesPage )
router.put('/update', isLoggedIn, upload.single('image'), movieUpdate)
router.get('/delete/:id', isLoggedIn, getMoviesDeletePage)
router.delete('/delete/:id', isLoggedIn, movieDelete)
router.get('/', isLoggedIn, getAllMovies)
 
module.exports = router