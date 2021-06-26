import {db} from "../database/connection";
import {Request, Response} from "express";
import Flood from "../model/Flood";
import Report from "../model/Report";

export default {

    // adicionar filtro do FloodID
    async show(request: Request, response: Response) {
        const {floodId} = request.params;
        console.log(floodId);
        const reportsRepository = await db.collection('reports').where('floodId', '==', floodId).get();
        const reports: Report[] = [];
        // @ts-ignore
        reportsRepository.forEach((doc) => {
            reports.push(new Report(doc.id, doc.data().floodId, doc.data().latitude, doc.data().longitude, doc.data().source, doc.data().description, doc.data().reportDate, doc.data().status, doc.data().range, doc.data().images, doc.data().hazards));
        });
        return response.status(200).json(reports);
    },

    async create(request: Request, response: Response) {
        const {
            floodId,
            latitude,
            longitude,
            source,
            description,
            reportDate,
            status,
            range,
            images,
            hazards,
        } = request.body;
        const report = new Report('', floodId, latitude, longitude, source, description, reportDate, status, range, images, hazards);
        const doc = await db.collection("reports").add({
            floodId: report.floodId,
            latitude: report.latitude,
            longitude: report.longitude,
            description: report.description,
            source: report.source,
            reportDate: report.reportDate,
            status: report.status,
            range: report.range,
            images: report.images,
            hazards: report.hazards,
        });
        return response.status(201).json(request.body);
    }
};
