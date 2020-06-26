import http from './httpServices';
import { apiUrl } from '../config.json';
// import { register } from './../serviceWorker';

const dbcon = apiUrl + "/users";
export function registerUser(user) {
    return http.post(dbcon, {
        email: user.username,
        password: user.password,
        name: user.name
    });
}