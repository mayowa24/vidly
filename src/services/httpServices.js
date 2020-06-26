import axios from 'axios';
import { toast } from 'react-toastify'
// import auth from './authService';
// import Raven from 'raven-js'

import logger from './logService';
// import { Raven } from 'raven-js';



axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500

    if (!expectedError)
        toast("unexpected error occured");
    logger.log(error);
    // console.log("unexpected error", error);
    // toast can be use as a methor or function such as toast.error, toast.info, toast.success etc
    return Promise.reject(error);
});

function setJwt(jwt) {
    axios.defaults.headers.common["x-auth-token"] = jwt
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
}