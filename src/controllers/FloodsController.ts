import {db} from "../database/connection";
import {Request, Response} from "express";
import Flood from "../model/Flood";

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
            images,
            hazards,
        } = request.body;
        //const flood = new Flood();
        await db.collection("floods").add({
            latitude: latitude,
            longitude: longitude,
            type: type,
            source: source,
            description: description,
            startDate: startDate,
            finishDate: finishDate,
            status: status,
            range: range,
            reports: reports,
            images: images,
            hazards: hazards,
        });
        return response.status(201).json(request.body);
    }
};
