import {db} from "../database/connection";
import {Request, Response} from "express";
import Flood from "../model/Flood";
import Report from "../model/Report";

export default {

    async index(request: Request, response: Response) {
        const floodRepository = await db.collection('floods').where('status', '==', true).get();
        const floods: Flood[] = [];
        // @ts-ignore
        floodRepository.forEach((doc) => {
            floods.push(new Flood(doc.id, doc.data().userId, doc.data().latitude, doc.data().longitude, doc.data().type, doc.data().source,
                doc.data().description, doc.data().waterLevel, doc.data().startDate, doc.data().finishDate, doc.data().status, doc.data().range,
                doc.data().reports, doc.data().images, doc.data().hazards));
        });
        return response.status(200).json(floods);
    },

    async create(request: Request, response: Response) {
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            // @ts-ignore
            return {path: image.firebaseUrl}
        });
        let {
            userId,
            latitude,
            longitude,
            type,
            source,
            description,
            waterLevel,
            startDate,
            finishDate,
            status,
            range,
            reports,
            hazards,
        } = request.body;
        const hazardsJson = JSON.parse(hazards);
        // @ts-ignore
        const requestHazards = hazardsJson.map(hazard => {
            return {type: hazard.type, status: hazard.status}
        });
        latitude = parseFloat(latitude);
        longitude = parseFloat(longitude);
        range = parseFloat(range);
        const flood = new Flood('', userId, latitude, longitude, type, source, description, waterLevel, startDate,
            finishDate, status, range, reports, images, requestHazards);
        await db.collection("floods").add({
            userId: flood.userId,
            latitude: flood.latitude,
            longitude: flood.longitude,
            type: flood.type,
            source: flood.source,
            description: flood.description,
            waterLevel: flood.waterLevel,
            startDate: flood.startDate,
            finishDate: flood.finishDate,
            status: Boolean(flood.status),
            range: flood.range,
            reports: flood.reports,
            images: flood.images,
            hazards: flood.hazards,
        });
        return response.status(201).json(flood);
    }
};
