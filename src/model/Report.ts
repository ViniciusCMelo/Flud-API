import Hazard from "./Hazard";

export default class Report {
    id: number;
    latitude: number;
    longitude: number;
    description: string;
    startDate: string;
    finishDate: string;
    status: boolean;
    range: number;
    reports: report[];
    hazards: Hazard[];
}
