import express from "express"
import {create, sendmail } from "../controller/userController.js"

const route = express.Router();

route.post("/create", create);
route.post("/sendEmail", sendmail);

export default route;