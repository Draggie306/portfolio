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
    async fetch(request: Request, env: { ASSETS: { fetch: (arg0: string) => any; }; SUPER_SECRET_AUTH_TOKEN: string | null; }, ctx: any) {
        const url = new URL(request.url);

        if (url.hostname === "oling.dev" || url.hostname === "www.oling.dev") {
            url.protocol = "https:";
            url.hostname = "oliverling.uk";

            return Response.redirect(url.toString(), 301);
        }

        if (url.hostname === "www.oliverling.uk") {
            url.protocol = "https:";
            url.hostname = "oliverling.uk";

            return Response.redirect(url.toString(), 301);
        }


        const path = url.pathname;
        console.log(`Request for path: ${path}`);

        return env.ASSETS.fetch(request.url);
    },
};

async function return_protected(request: Request, env: { ASSETS: { fetch: (arg0: string) => any; }; }, protected_page: Number) {
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
