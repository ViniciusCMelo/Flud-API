import Report from "./Report";
import Image from './Image';
import Hazard from "./Hazard";

export default class Flood {
    id: string;
    latitude: number;
    longitude: number;
    type: string;
    source: string;
    description: string;
    waterLevel: string;
    startDate: string;
    finishDate: string;
    status: boolean;
    range: number;
    reports: string[];
    images: {
        path: string
    };
    hazards: {
        type: string,
        status: true,
    };

    constructor(id: string,
                latitude: number,
                longitude: number,
                type: string,
                source: string,
                description: string,
                waterLevel: string,
                startDate: string,
                finishDate: string,
                status: boolean = true,
                range: number,
                reports: any,
                images: any,
                hazards: any,
    ) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
        this.waterLevel = waterLevel;
        this.source = source;
        this.type = type;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.status = status;
        this.range = range;
        this.reports = reports;
        this.images = images;
        this.hazards = hazards;
    }
}
