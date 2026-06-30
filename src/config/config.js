import dotenv from "dotenv";
dotenv.config();
if(!process.env.MONGO_URL){
    throw new Error("MONGO_URL is not defined in env")
}
if (!process.env.JWT_SCERET_KEY){
    throw new Error ("JWT_SCERET_KEY is not defined now")
}
const config ={
    MONGO_URL:process.env. MONGO_URL,
    JWT_SCERET_KEY:process.env.JWT_SCERET_KEY

}
export default config;
