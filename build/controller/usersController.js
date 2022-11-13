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
exports.getSignupPage = exports.getLoginPage = exports.loginUser = exports.registerUser = exports.createUser = void 0;
const userUtils_1 = require("../utils/userUtils");
const createUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            console.log(data);
            const result = yield (0, userUtils_1.postUser)(data);
            res.status(201).send({
                message: 'success',
                data: result
            });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(400).send({
                message: 'failure',
                data: 'User already exists'
            });
            return;
        }
    });
};
exports.createUser = createUser;
const registerUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { fullname, email, username, password } = req.body;
            const newUserData = {
                fullname,
                email,
                username,
                password
            };
            const result = yield (0, userUtils_1.register)(newUserData);
            if (result) {
                const { token } = result;
                res.cookie('token', token);
                res.status(201).redirect('/users/login');
            }
        }
        catch (error) {
            res.status(201).send({
                message: 'failed',
                data: `${error.message}`
            });
        }
    });
};
exports.registerUser = registerUser;
const loginUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = req.body;
            const result = yield (0, userUtils_1.login)(userData);
            if (result) {
                console.log('I am here ooo');
                const { token } = result;
                res.cookie('token', token);
                res.status(200).redirect('/movies');
                // res.status(200).render('movies', { title: 'Movies', token})
                return;
            }
        }
        catch (error) {
            throw new Error(`${error.message}`);
        }
    });
};
exports.loginUser = loginUser;
const getLoginPage = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(200).render('login', { title: 'Movie-Land', token: "" });
            return;
        }
        catch (error) {
            throw new Error(`${error.message}`);
        }
    });
};
exports.getLoginPage = getLoginPage;
const getSignupPage = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(200).render('register', { title: 'Signup', token: "" });
            return;
        }
        catch (error) {
            throw new Error(`${error.message}`);
        }
    });
};
exports.getSignupPage = getSignupPage;
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
