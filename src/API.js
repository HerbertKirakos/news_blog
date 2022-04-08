import axios from "axios";

export const API = axios.create({
    baseURL: 'https://newsapi.org/v2/',
    headers: {
        'Authorization': 'e17ac8695ee84cb1a038f4c75321f940'
    }
});


