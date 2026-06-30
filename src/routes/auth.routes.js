import {Router} from  "express";
import * as authController from "../controller/auth.controller.js"




const authRouter =Router();


authRouter.post("/register", authController.register);
authRouter.post("/login",authController.login);
authRouter.get("/getall",authController.getall );
authRouter.get("/getone",authController.getone);
authRouter.put("/update",authController.updateUser)
authRouter.delete("/delete",authController.deleteUser)
// authRouter.get("/logout",authController.logout);


















export default authRouter;
