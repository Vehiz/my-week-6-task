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
exports.getAllData = exports.login = exports.register = exports.postUser = void 0;
const fs_1 = __importDefault(require("fs"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const postUser = function (userdata) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(" i am here");
            if (!fs_1.default.existsSync('database.json')) {
                fs_1.default.writeFile('database.json', JSON.stringify([], null, 3), (err) => {
                    if (err) {
                        // res.end({ message: "An error Occured." });
                        return;
                    }
                    else {
                        console.log("file Created Successfully.");
                    }
                });
            }
            //Read file
            const database = JSON.parse(fs_1.default.readFileSync('database.json', 'utf-8'));
            for (let userDetails of database) {
                const user = userDetails.User;
                if (user.email === userdata.email) {
                    throw Error('User already exists');
                }
            }
            const newUser = {
                User: userdata,
                Movies: []
            };
            database.push(newUser);
            fs_1.default.writeFileSync('database.json', JSON.stringify(database, null, 3), 'utf-8');
            return database;
        }
        catch (error) {
            console.log(error);
            throw new Error(`${error.message}`);
        }
    });
};
exports.postUser = postUser;
const register = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allData = yield getAllData();
            for (let user of allData) {
                if (user.User.email === data.email) {
                    throw new Error('User already exists');
                }
            }
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(data.password, salt);
            const token = generateToken(data.email);
            const User = {
                fullname: data.fullname,
                email: data.email,
                password: hashedPassword,
                username: data.username,
            };
            const newUser = {
                User,
                Movies: []
            };
            allData.push(newUser);
            fs_1.default.writeFileSync('database.json', JSON.stringify(allData, null, 3), 'utf-8');
            return { User, token };
        }
        catch (error) {
            throw Error(`${error.message}`);
        }
    });
};
exports.register = register;
const login = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = data;
            const allData = yield getAllData();
            for (let user of allData) {
                if (user.User.email === email && (yield bcryptjs_1.default.compare(password, user.User.password))) {
                    const token = generateToken(email);
                    return { token };
                }
            }
            return;
        }
        catch (error) {
            throw new Error(`${error.message}`);
        }
    });
};
exports.login = login;
function getAllData() {
    try {
        const database = JSON.parse(fs_1.default.readFileSync('database.json', 'utf-8'));
        return database;
    }
    catch (error) {
        throw new Error(`${error.message}`);
    }
}
exports.getAllData = getAllData;
const generateToken = function (email) {
    if (process.env.JWT_SECRET) {
        return jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: '1day'
        });
    }
};
