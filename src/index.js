//@tscheck

import { API } from "./API";

addEventListener("fetch", (event) => {
    if (!API.shouldHandle(event.request)) {
        event.respondWith(
            new Response("404 - Not Found", {
                status: 404,
            })
        );
    } else event.respondWith(API.handle(event.request));
});
