import {db} from "../database/connection";
import {Request, Response} from "express";
import Flood from "../model/Flood";
import User from "../model/User";
import Report from "../model/Report";

export default {
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
            reports,
            images,
            hazards,
        } = request.body;
        const report = new Report('',floodId, latitude, longitude,source, description, reportDate, status, range, images, hazards);
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
