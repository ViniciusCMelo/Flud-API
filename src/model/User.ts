import {db} from '../database/connection';


export default class User {
    id: string;
    name: string;
    email: string;
    profilePictureUrl: string;
    city: string;
    state: string;

    constructor(id: string, name: string, email: string, profilePictureUrl: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.profilePictureUrl = profilePictureUrl;
        this.city = '';
        this.state = '';
    }

}
