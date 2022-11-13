"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controller/usersController");
const protect_1 = require("../middleware/protect");
const router = express_1.default.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.get('/signup', usersController_1.getSignupPage);
router.post('/signup', usersController_1.registerUser);
router.post('/', protect_1.isLoggedIn, usersController_1.createUser);
router.get('/login', usersController_1.getLoginPage);
router.post('/login', usersController_1.loginUser);
module.exports = router;
