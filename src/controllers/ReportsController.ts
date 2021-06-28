import {db} from "../database/connection";
import {json, Request, Response} from "express";
import Flood from "../model/Flood";
import Report from "../model/Report";
import Hazard from "../model/Hazard";

export default {

    async show(request: Request, response: Response) {
        const {floodId} = request.params;
        try {
            const reportsRepository = await db.collection('reports').where('floodId', '==', floodId).get();
            const reports: Report[] = [];
            // @ts-ignore
            reportsRepository.forEach((doc) => {
                reports.push(new Report(doc.id, doc.data().userId, doc.data().floodId, doc.data().latitude, doc.data().longitude,
                    doc.data().source, doc.data().description, doc.data().waterLevel, doc.data().reportDate, doc.data().status,
                    doc.data().range, doc.data().images, doc.data().hazards));
            });
            return response.status(200).json(reports);
        } catch (e) {
            return response.status(500).json(e);
        }

    },

    async create(request: Request, response: Response) {
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            // @ts-ignore
            return {path: image.firebaseUrl}
        });
        let {
            userId,
            floodId,
            latitude,
            longitude,
            source,
            description,
            waterLevel,
            reportDate,
            status,
            range,
            hazards
        } = request.body;
        const hazardsJson = JSON.parse(hazards);
        // @ts-ignore
        const requestHazards = hazardsJson.map(hazard => {
            return {type: hazard.type, status: hazard.status}
        });
        latitude = parseFloat(latitude);
        longitude = parseFloat(longitude);
        range = parseFloat(range);

        const report = new Report('', userId, floodId, latitude, longitude, source, description, waterLevel, reportDate, status, range,
            images, requestHazards);
        const doc = await db.collection("reports").add({
            userId: report.userId,
            floodId: report.floodId,
            latitude: report.latitude,
            longitude: report.longitude,
            description: report.description,
            waterLevel: report.waterLevel,
            source: report.source,
            reportDate: report.reportDate,
            status: report.status,
            range: report.range,
            images: report.images,
            hazards: report.hazards,
        });
        return response.status(201).send(report);
    }
};
