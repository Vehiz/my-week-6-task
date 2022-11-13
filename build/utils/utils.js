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
exports.deleteFile = exports.writeUpdate = exports.postMovie = void 0;
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const postMovie = function (obj) {
    return __awaiter(this, void 0, void 0, function* () {
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
        let data = [];
        fs_1.default.readFile(path_1.default.join('database.json'), 'utf-8', (err, chunk) => {
            if (err) {
                console.log(err);
            }
            else {
                data = JSON.parse(JSON.stringify(chunk));
            }
        });
        //Create unique Id
        const movieId = (0, uuid_1.v4)();
        console.log(movieId);
        if (obj) {
            obj["id"] = movieId;
        }
        data.push(obj);
        console.log(data);
        fs_1.default.writeFile('database.json', JSON.stringify(data, null, 3), (err) => {
            if (err) {
                return;
            }
            else {
                console.log("file uploaded successfully");
            }
        });
    });
};
exports.postMovie = postMovie;
const writeUpdate = function (obj) {
    return __awaiter(this, void 0, void 0, function* () {
        let allData = [];
        const chunk = fs_1.default.readFileSync('database.json', 'utf-8');
        console.log(chunk);
        allData = JSON.parse(chunk);
        //  console.log('This is the data', chunk)
        if (obj) {
            const { title, description, image, price, id } = obj;
            // console.log('This',title)
            for (let data of allData) {
                if (data.id === id) {
                    data.title = title || data.title;
                    data["description"] = description || data.description;
                    data["image"] = image || data.image;
                    data["price"] = price || data.price;
                }
            }
        }
        fs_1.default.writeFileSync('database.json', JSON.stringify(allData, null, 3), 'utf-8');
    });
};
exports.writeUpdate = writeUpdate;
const deleteFile = function (obj) {
    return __awaiter(this, void 0, void 0, function* () {
        const chunk = fs_1.default.readFileSync('database.json', 'utf-8');
    });
};
exports.deleteFile = deleteFile;
