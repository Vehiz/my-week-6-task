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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovies = exports.deleteFile = exports.writeUpdate = exports.postMovie = void 0;
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const postMovie = function (userId, movieData) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = [];
        const database = JSON.parse(fs_1.default.readFileSync('database.json', 'utf-8'));
        //Create unique Id
        const movieId = (0, uuid_1.v4)();
        if (movieData) {
            movieData["id"] = movieId;
        }
        for (let data of database) {
            if (data.User.email === userId) {
                if (movieData) {
                    delete movieData.email;
                }
                data.Movies.push(movieData);
            }
        }
        fs_1.default.writeFileSync('database.json', JSON.stringify(database, null, 3), 'utf-8');
    });
};
exports.postMovie = postMovie;
const writeUpdate = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        const chunk = JSON.parse(fs_1.default.readFileSync('database.json', 'utf-8'));
        if (data) {
            const { title, description, image, price, email } = data;
            console.log(email);
            for (let movie of chunk) {
                if (movie.User.email === email) {
                    const movies = movie.Movies;
                    for (let movie of movies) {
                        movie["title"] = title || movie.title;
                        movie["description"] = description || movie.description;
                        movie["image"] = image || movie.image;
                        movie["price"] = price || movie.price;
                    }
                }
            }
        }
        fs_1.default.writeFileSync('database.json', JSON.stringify(chunk, null, 3), 'utf-8');
        return chunk;
    });
};
exports.writeUpdate = writeUpdate;
const deleteFile = function (id, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const chunk = JSON.parse(fs_1.default.readFileSync('database.json', 'utf-8'));
        for (let userDetails of chunk) {
            if (userDetails.User.email === email) {
                const movies = userDetails.Movies;
                for (let i in movies) {
                    const movie = movies[i];
                    if (movie.id === id) {
                        movies.splice(i, 1);
                    }
                }
            }
        }
        // console.log('IndexOf',chunk.indexOf(`${id}`))
        fs_1.default.writeFileSync('database.json', JSON.stringify(chunk, null, 3), 'utf-8');
        return chunk;
    });
};
exports.deleteFile = deleteFile;
const getMovies = function (userId, movieData) {
    return __awaiter(this, void 0, void 0, function* () {
        const chunk = JSON.parse(fs_1.default.readFileSync('database.json', 'utf-8'));
        // fs.writeFileSync('database.json', JSON.stringify(chunk, null, 3), 'utf-8');
        return chunk;
    });
};
exports.getMovies = getMovies;
