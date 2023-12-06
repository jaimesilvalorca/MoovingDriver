import { Car } from "./Car";

export interface Driver {
    id?:             string;
    name?:           string;
    lastname?:        string;
    phone?:           string;
    email:           string;
    image?:          string;
    car:             Car
    role:            string;
    con:             boolean;
    password:        string;
    confirmPassword: string;
    session_token?:  string;
}

