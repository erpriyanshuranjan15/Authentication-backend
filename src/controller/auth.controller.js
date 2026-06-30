import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

 export async function register(req,res){
    const { username, email, password } = req.body;

    const isAlreadyRegisterd = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (isAlreadyRegisterd){
        return res.status(409).json({
            message:"Username or email already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    });

    res.status(201).json({
        message:"User registered successfully"
    });
}


export async function getall(req, res){
    const user =await userModel.find();
    res.status(200).json({
         success: true,
         count: user.length,
         data: user
      });
}
export async function getone(req, res) {
   try {
      const user = await userModel.findOne({
         username: req.body.username
      });

      if (!user) {
         return res.status(404).json({
            message: "User not found"
         });
      }

      res.status(200).json({
         message: "User found successfully",
         user
      });

   } catch (error) {
      res.status(500).json({
         message: error.message
      });
   }
}
export async function updateUser(req, res) {
   try {
      const user = await userModel.findOneAndUpdate(
         { username: req.body.username }, 
         {
            email: req.body.email,
            password: req.body.password
         }, 
         { new: true } 
      );

      if (!user) {
         return res.status(404).json({
            message: "User not found"
         });
      }

      res.status(200).json({
         message: "User updated successfully",
         user
      });

   } catch (error) {
      res.status(500).json({
         message: error.message
      });
   }
}
export async function deleteUser(req, res) {
   try {
      const user = await userModel.findOneAndDelete({
         username: req.body.username
      });

      if (!user) {
         return res.status(404).json({
            message: "User not found"
         });
      }

      res.status(200).json({
         message: "User deleted successfully",
         user
      });

   } catch (error) {
      res.status(500).json({
         message: error.message
      });
   }
}
export const login = async (req, res) => {
   try {
      const { email, password } = req.body;

      // check user exists
      const user = await userModel.findOne({ email });

      if (!user) {
         return res.status(404).json({
            message: "User not found"
         });
      }

      // compare password
      const isMatch = await bcrypt.compare(
         password,
         user.password
      );

      if (!isMatch) {
         return res.status(400).json({
            message: "Invalid password"
         });
      }

      // create token
      const token = jwt.sign(
         { id: user._id },
         "SECRET_KEY",
         { expiresIn: "1d" }
      );

      res.status(200).json({
         message: "Login successful",
         token
      });

   } catch (error) {
      res.status(500).json({
         message: error.message
      });
   }
};