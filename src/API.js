import Router from "./router/Router";

const router = new Router();

router.add("get", "/hi", (req, res) => {
    res.reply(new Response("Hi there!"));
});

router.add("post", "/hello", (req, res) => {
    res.reply(new Response("Hello there!"));
});

export const API = router;
