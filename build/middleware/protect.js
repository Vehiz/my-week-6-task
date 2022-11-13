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
exports.isLoggedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userUtils_1 = require("../utils/userUtils");
exports.isLoggedIn = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.cookies.token) {
        try {
            token = req.cookies.token;
            if (process.env.JWT_SECRET) {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                const allData = yield (0, userUtils_1.getAllData)();
                if (typeof (decoded) !== "string") {
                    for (let data of allData) {
                        if (data.User.email === decoded.email) {
                            req.user = data.User;
                        }
                    }
                }
                next();
            }
        }
        catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized');
        }
    }
    else if (((req.headers.authorization !== undefined) && (req.headers.authorization.startsWith('Bearer')))) {
        try {
            token = req.headers.authorization.split(' ')[1];
            if (process.env.JWT_SECRET) {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                const allData = yield (0, userUtils_1.getAllData)();
                if (typeof (decoded) !== "string") {
                    for (let data of allData) {
                        if (data.User.email === decoded.email) {
                            req.user = data;
                        }
                    }
                    console.log(req.user);
                }
                next();
            }
        }
        catch (error) {
            res.status(401);
            throw new Error('Not authorized');
        }
    }
    if (!token) {
        res.status(401);
        res.redirect('/users/login');
    }
}));
