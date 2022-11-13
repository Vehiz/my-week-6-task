// var express = require('express');
import {Request, Response, NextFunction, Router} from "express"
import express from 'express'
import { createUser, registerUser, getLoginPage, getSignupPage, loginUser } from "../controller/usersController";
import { isLoggedIn } from "../middleware/protect";
const router = express.Router();

/* GET users listing. */
router.get('/', function(req:Request, res:Response, next:NextFunction) {
  res.send('respond with a resource');
});



router.get('/signup', getSignupPage)
router.post('/signup', registerUser)
router.post('/', isLoggedIn, createUser)
router.get('/login', getLoginPage)

router.post('/login', loginUser);


module.exports = router;
