"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moviesController_1 = require("../controller/moviesController");
const protect_1 = require("../middleware/protect");
const multer_1 = __importDefault(require("multer"));
const { storage } = require('../services/cloudinary');
const upload = (0, multer_1.default)({ storage });
// import { deleteFile, writeUpdate } from "../utils/utils";
const router = express_1.default.Router();
router.post('/', protect_1.isLoggedIn, upload.single('image'), moviesController_1.createMovie);
router.get('/add', protect_1.isLoggedIn, moviesController_1.getCreateMoviesPage);
router.get('/update/:id', protect_1.isLoggedIn, moviesController_1.getUpdateMoviesPage);
router.put('/update', protect_1.isLoggedIn, upload.single('image'), moviesController_1.movieUpdate);
router.get('/delete/:id', protect_1.isLoggedIn, moviesController_1.getMoviesDeletePage);
router.delete('/delete/:id', protect_1.isLoggedIn, moviesController_1.movieDelete);
router.get('/', protect_1.isLoggedIn, moviesController_1.getAllMovies);
module.exports = router;
