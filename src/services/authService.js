import http from './httpServices';
import jwtDecode from 'jwt-decode';
import { apiUrl } from '../config.json';
// import { jwtDecode } from 'jwt-decode';
// import { getCurrentUser } from './authService';

const dbcon = apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
    const { data: jwt } = await http.post(dbcon, { email, password });
    localStorage.setItem(tokenKey, jwt);

}
export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}
export function logout() {
    localStorage.removeItem(tokenKey);
}
export function getJwt() {
    return localStorage.getItem(tokenKey);
}
export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);

    } catch (ex) {
        return null;
    }
}

export default {
    login,
    loginWithJwt,
    logout,
    getJwt,
    getCurrentUser
}