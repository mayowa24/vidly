import http from './httpServices';
import { apiUrl } from '../config.json'



const db = apiUrl + '/movies'

function movieUrl(id) {
    return `${db}/${id}`;
}

export function getMovies() {
    return http.get(db);

}

export function getMovie(movieId) {
    return http.get(movieUrl(movieId))
}
export function deleteMovie(movieId) {
    return http.delete(movieUrl(movieId));
}

export function saveMovie(movie) {

    if (movie._id) {
        const body = {...movie }
        delete body._id;
        return http.put(movieUrl(movie._id), body)
    }

    return http.post(db, movie)

}