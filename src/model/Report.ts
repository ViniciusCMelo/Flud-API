import Hazard from "./Hazard";
import Image from "./Image";

export default class Report {
    id: string;
    floodId: string;
    latitude: number;
    longitude: number;
    description: string;
    waterLevel: string;
    source: string;
    reportDate: string;
    status: boolean;
    range: number;
    images: {
        path: string
    };
    hazards: {
        type: string,
        status: true,
    };

    constructor(id: string = '',
                floodId: string,
                latitude: number,
                longitude: number,
                source: string,
                description: string,
                waterLevel: string,
                reportDate: string,
                status: boolean,
                range: number,
                images: any,
                hazards: any,
    ) {
        this.id = id;
        this.floodId = floodId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
        this.waterLevel = waterLevel;
        this.source = source;
        this.reportDate = reportDate;
        this.status = status;
        this.range = range;
        this.images = images;
        this.hazards = hazards;
    }
}
