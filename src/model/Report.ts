import Hazard from "./Hazard";

export default class Report {
    id: number;
    latitude: number;
    longitude: number;
    description: string;
    source: string;
    startDate: string;
    finishDate: string;
    range: number;
    hazards: Hazard[];
}
