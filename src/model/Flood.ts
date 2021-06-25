import Report from "./Report";
import Image from './Image';
import Hazard from "./Hazard";
export default class Flood {
    id: number;
    latitude: number;
    longitude: number;
    type: string;
    source: string;
    description: string;
    startDate: string;
    finishDate: string;
    status: boolean;
    range: number;
    reports: Report[];
    images: Image[];
    hazards: Hazard[];
}
