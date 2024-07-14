/*****  Packages  *****/
import cors from "cors";
import express from "express";
import winston from "winston";
import bodyParser from "body-parser";
/*****  Modules  *****/
import connectDB from "./src/config/db.js";
import logger from "./src/utils/logger.js";
import routes from "./src/routes/index.js";
import { envConfig } from "./src/utils/env.js";
import { Storage } from "@google-cloud/storage";
import { serviceAccount } from "./firebase-private-key.js";
import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://cavapoops-8aaab.appspot.com",
});

export const bucket = admin.storage().bucket();

envConfig();

connectDB();
logger();

const app = express();
const PORT = process.env.PORT || 5000;

/*****  Middlewares  *****/
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200, // some legacy browsers choke on 204
  })
);
app.use(bodyParser.json({ limit: "50mb" }));

//routes
routes(app);

app.listen(PORT, () => winston.info(`Server is Listening on port ${PORT}.`));
