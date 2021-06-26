import {db} from "../database/connection";
import {Request, Response} from "express";
import User from "../model/User";
import Hazard from "../model/Hazard";

export default {
    async create(request: Request, response: Response) {
        const {
            floodId,
            type,
        } = request.body;
        const hazard = new Hazard(floodId, type);
        await db.collection('hazards').add({
            floodId: hazard.floodId,
            type: hazard.type,
            status: hazard.status,
        });
        return response.status(201).json(hazard);
    }
};
