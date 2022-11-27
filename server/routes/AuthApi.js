import bcrypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const router = Router();
import {register, login} from '../controller/AuthController.js';

router.post("/register", register);

router.post("/login", login);

export default router;