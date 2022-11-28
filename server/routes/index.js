import { Router } from "express";
import AuthApi from "./AuthApi.js";
import TransactionsApi from "./TransactionsApi.js";
import UserApi from "./UserApi.js";
const router = Router();
import passport from 'passport'

router.use(
    "/transaction", 
    passport.authenticate('jwt', {session: false}),
    TransactionsApi
 );
router.use("/auth", AuthApi);
router.use("/user", UserApi);

export default router;