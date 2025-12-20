import { GymService } from "../../services";

export class GymOwnerController {
    readonly gymService: GymService;
        
    constructor(gymService: GymService) {
        this.gymService = gymService;
    }
}