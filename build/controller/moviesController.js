"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdateMoviesPage = exports.getCreateMoviesPage = exports.getAllMovies = exports.getMoviesDeletePage = exports.movieDelete = exports.movieUpdate = exports.createMovie = void 0;
const movieUtils_1 = require("../utils/movieUtils");
const createMovie = function (req, res) {
    var _a;
    const data = req.body;
    if (req.file) {
        data["image"] = req.file.path;
        data["email"] = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
        console.log('Email', req.user);
    }
    console.log(data);
    (0, movieUtils_1.postMovie)(data.email, data);
    console.log("all good");
    if (data) {
        // res.status(201).send({message: "file successfully posted"})
        res.status(201).redirect('/movies');
    }
};
exports.createMovie = createMovie;
const movieUpdate = function (req, res) {
    var _a;
    const data = req.body;
    console.log('User details', req.user);
    console.log('Files', req.file);
    if (req.file) {
        data["image"] = req.file.path;
        data["email"] = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    }
    if (data) {
        console.log('I am happy', data);
        (0, movieUtils_1.writeUpdate)(data);
        res.status(203).send({ message: 'Movie succesfully updated' });
        return;
    }
    // console.log("it is working") 
};
exports.movieUpdate = movieUpdate;
const movieDelete = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.user;
        const { id } = req.params;
        const result = yield (0, movieUtils_1.deleteFile)(id, email);
        console.log("File deleted successfully");
        if (result) {
            res.status(204).send({
                message: 'Movie successfully deleted'
            });
            return;
        }
    });
};
exports.movieDelete = movieDelete;
const getMoviesDeletePage = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { fullname } = req.user;
            const { token } = req.cookies;
            res.status(200).render('delete-movie', { title: 'Delete Movie', id, user: fullname, token });
        }
        catch (error) {
            throw new Error(`${error.message}`);
        }
    });
};
exports.getMoviesDeletePage = getMoviesDeletePage;
const getAllMovies = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const { token } = req.cookies;
            const { fullname } = req.user;
            const result = yield (0, movieUtils_1.getMovies)(data);
            res.status(200).render('movies', { title: 'Movies', data: result, token, fullname });
            return;
        }
        catch (error) {
            throw new Error(`${error.message}`);
        }
    });
};
exports.getAllMovies = getAllMovies;
const getCreateMoviesPage = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { fullname, email } = req.user;
            const { token } = req.cookies;
            res.status(200).render('post-movie', { title: 'Create a Movie', email, fullname, token });
            return;
        }
        catch (error) {
            throw new Error(`${error.message}`);
        }
    });
};
exports.getCreateMoviesPage = getCreateMoviesPage;
const getUpdateMoviesPage = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { fullname } = req.user;
            const { token } = req.cookies;
            res.status(200).render('update-movie', { title: 'Update Movie', fullname, movieid: id, token });
        }
        catch (error) {
            throw new Error(`${error.message}`);
        }
    });
};
exports.getUpdateMoviesPage = getUpdateMoviesPage;
