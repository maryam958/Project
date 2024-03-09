import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "./config/.env") });

import express from 'express';
import * as indexRouter from './src/modules/index.route.js';
import connectDB from "./DB/connection.js";
import { globalError } from "./src/services/asyncHandler.js";

const app = express();

const port = process.env.PORT || 5000;
const baseUrl = process.env.BASEURL

app.use(express.json());

app.use(`${baseUrl}/auth`,indexRouter.authRouter)
app.use(`${baseUrl}/user`,indexRouter.userRouter);
app.use(`${baseUrl}/project`,indexRouter.projectRouter)

app.use("*", (req, res, next) => {
    res.send("In-valid Routing Please check url");
  });

app.use(globalError);



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})