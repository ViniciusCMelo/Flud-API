import {NextFunction, Request, Response} from "express";

const admin = require("firebase-admin");
require('dotenv').config();

const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const BUCKET = "flud-reactnative.appspot.com";
const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://flud-reactnative-default-rtdb.firebaseio.com",
    storageBucket: BUCKET,
});

export const db = firebaseApp.firestore();

const bucket = admin.storage().bucket();


/*
export function uploadImage(request: Request, response: Response, next){
    if (!request.file) return next();

    const image = request.file;
    const fileName = Date.now() + "." + image.originalname.split(".").pop();
    // Colocar Id do incidente no diretório
    const file = bucket.file("/images/" + fileName);

    const stream = file.createWriteStream({
        metadata: {
            contentType: image.mimetype,
        },
    });

    stream.on("error", (e) => {
        console.log(e);
    });

    stream.on("finish", async () => {
        await file.makePublic();

        request.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}//images/${fileName}`;

        next();
    });

    stream.end(image.buffer);
};
*/

export function uploadImage(request: Request, response: Response, next){
    if (!request.files) return next();
    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => {
        const fileName = Date.now() + "." + image.originalname.split(".").pop();
        const file = bucket.file("/images/" + fileName);
        const stream = file.createWriteStream({
            metadata: {
                contentType: image.mimetype,
            },
        });
        // @ts-ignore
        stream.on("error", (e) => {
            console.log(e);
        });
        stream.on("finish", async () => {
            await file.makePublic();
        });
        // @ts-ignore
        image.firebaseUrl = `https://storage.googleapis.com/${BUCKET}//images/${fileName}`;
        stream.end(image.buffer);
    });
    next();

};
