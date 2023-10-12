import express from "express";
import {deleteUser,updateUser,getUserListings} from "../controller/usercontroller.js"
import { verifyToken } from "../utils/verifyUser.js";
const router=express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings)

export default router;