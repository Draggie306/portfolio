/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


export default {
    async fetch(request, env, ctx) {

        // Check login route first: early returns
        const url = new URL(request.url);
        const path = url.pathname;

        if (path === "/login") {
            const loginURL = new URL(request.url);
            loginURL.pathname = "/protected/login.html";
            return env.ASSETS.fetch(loginURL.toString());

        }

        // Also return early if path is part of the login
        if (path === "/authenticate") {

            // With a client-side GET request, the URL will contain ?auth_token=XXX. Parse this
            const auth_token = url.searchParams.get("auth_token");

            // Hardcoded for now
            if (auth_token === env.SUPER_SECRET_AUTH_TOKEN) {
                return new Response(JSON.stringify(
                    {
                        "auth_token": env.SUPER_SECRET_AUTH_TOKEN,
                        "status": 200,
                    }
                ));
            } else {
                console.log(`${auth_token} is not ${env.SUPER_SECRET_AUTH_TOKEN}!`)
            }

            // For all other cases, return 401
            return new Response("Unauthorized", { status: 401 });
        }

        // If not a login request, check if there is a cookie with the auth_token
        const auth_cookie = request.headers.get("Cookie")
            ?.split("; ")
            .find(row => row.startsWith("auth_token="));

        const given_token_value = auth_cookie ? auth_cookie.split("=")[1] : null;

        if ((!given_token_value) || (given_token_value !== env.SUPER_SECRET_AUTH_TOKEN)) {
            console.log("cookie not entered or is invalid");
            return await return_protected(request, env, 2);
        }

        // By now, it has passed all checks, so the user has logged in successfully before.
        // Therefore, return their requested static asset.

        console.log("returning static asset")
        return env.ASSETS.fetch(request);
        // return new Response( html_content, {
        //     headers: {"Content-Type": "text/html"}
        // })
    },
};

async function return_protected(request: Request, env, protected_page: Number) {
    const loginURL = new URL(request.url);

    if (protected_page == 1) {
        loginURL.pathname = "/protected/login.html";
        return env.ASSETS.fetch(loginURL.toString());
    } else {
        loginURL.pathname = "/protected/unauthorised.html";
        const asset = await env.ASSETS.fetch(loginURL.toString())
        console.log("returning altered response");
        return new Response (asset.body, {
            status: 401,
            headers: asset.headers
        })
    }
}
