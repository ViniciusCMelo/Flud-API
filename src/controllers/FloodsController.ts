import {db} from "../database/connection";
import {Request, Response} from "express";
import Flood from "../model/Flood";
import Report from "../model/Report";

export default {

   /* async index(request: Request, response: Response) {
        const id = request.body;
        const userRepository = await db.collection('users').get();
        const users: Flood[] = [];
        // @ts-ignore
        userRepository.forEach((doc) => {
            users.push(new Flood(doc.id, doc.data().name, doc.data().email, doc.data().profilePictureUrl));
        });
        return response.status(200).json(users);
    },*/
    async create(request: Request, response: Response) {
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return {path: image.firebaseUrl}
        });
        const {
            latitude,
            longitude,
            type,
            source,
            description,
            startDate,
            finishDate,
            status,
            range,
            reports,
            hazards,
        } = request.body;
        const hazardsJson = JSON.parse(hazards);
        const requestHazards = hazardsJson.map(hazard => {
            return {type: hazard.type, status: hazard.status}
        });
        const flood = new Flood(latitude, longitude,type,source, description, startDate,finishDate, status, range,
            reports,images, requestHazards);
        console.log(flood);
        await db.collection("floods").add({
            latitude: flood.latitude,
            longitude: flood.longitude,
            type: flood.type,
            source: flood.source,
            description: flood.description,
            startDate: flood.startDate,
            finishDate: flood.finishDate,
            status: flood.status,
            range: flood.range,
            reports: flood.reports,
            images: flood.images,
            hazards: flood.hazards,
        });
        return response.status(201).json(request.body);
    }
};
