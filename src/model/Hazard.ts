import Report from "./Report";

export default class Hazard {
    floodId: string;
    type: string;
    status: boolean;

    constructor(floodId: string, type: string, status: boolean = true) {
        this.floodId = floodId;
        this.type = type;
        this.status = status;
    }
}
