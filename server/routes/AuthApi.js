import { Router } from "express"; 
const router = Router();
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

router.post('/register', async(req, res) => {

    //get all form data
    const {firstName, lastName, email, password} = req.body;
    //check if user exists with same email
    const userExists = await User.findOne({email});
    if(userExists) {
        res.status(406).json({message: 'User already exists.'});
        return;
    }

    // hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    console.log(hashedPassword); 

    const user = await User({firstName, lastName, email, password: hashedPassword});
    await user.save();

    res.status(201).json({message: 'user is created'});
});

router.post('/login', async(req, res) => {
    const {email, password} = req.body

    const userExists = await User.findOne({email});
    if(!userExists) {
        res.status(406).json({message: 'credentials not found'});
        return;
    }

    const matched = await bcrypt.compare(password, userExists.password);
    if(!matched) {
        res.status(406).json({message: 'credentials not found'});
        return;
    }

    //create jwt token
    const payload = {
        username: email,
        _id: userExists._id,
    }

    const token = jwt.sign(payload, 'some secret.');
    res.json({message: 'successfully logged in.', token});
})

export default router;