/**
 * @typedef Req
 * @property {URL} url
 * @property {Object.<string, string>} params
 * @property {Object.<string, string>} headers
 * @property {Request} original
 */

/**
 * @typedef Res
 * @property {function} reply
 */

/**
 * @callback Callback
 * @param {Req} req
 * @param {Res} res
 */

/**
 * @typedef RouterMethod
 * @param {string} path
 * @param {Callback} callback
 */

class Router {
    /**@type {Object.<string, Object.<string, Callback>>}*/
    #routes = {};

    add(/**@type {string}*/ method, /**@type {string}*/ path, /**@type {Callback}*/ callback) {
        if (this.#routes[method.toLowerCase()] == undefined) this.#routes[method.toLowerCase()] = {};
        this.#routes[method.toLowerCase()][path] = callback;
    }

    shouldHandle(/**@type {Request}*/ request) {
        return this.#routes[request.method.toLowerCase()]?.[new URL(request.url).pathname] != undefined;
    }

    handle(/**@type {Request}*/ request) {
        return new Promise((resolve, reject) => {
            const url = new URL(request.url);

            const callback = this.#routes[request.method.toLowerCase()][url.pathname];
            const req = {
                url,
                params: Object.fromEntries(Array.from(url.searchParams.entries())),
                headers: request.headers,
                original: request,
            };
            const res = {
                reply: resolve,
            };

            try {
                callback(req, res);
            } catch (exception) {
                reject(new Response("An Error occured"));
            }
        });
    }
}

export default Router;
