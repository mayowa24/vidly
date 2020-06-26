import React from 'react';
// import * as Sentry from '@sentry/browser';

function init() {

    // Sentry.init({ dsn: "https://6da2690742414e9db86bedd94877f4d6@o399430.ingest.sentry.io/5256532" });


    // <
    // script src = 'https://js.sentry-cdn.com/6da2690742414e9db86bedd94877f4d6.min.js'
    // crossorigin = "anonymous" >
    //     <
    //     /script>
};

function log(error) {
    console.error(error)
        // Sentry.captureException(error)
};

export default {
    init,
    log
};