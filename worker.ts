/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


// Default login page
let login_page = `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Protected Content</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
    <h1>Login</h1>
    <form>
        <label for="auth_token">Valid tester auth_token required:</label><br>
        <input type="text" id="auth_token" name="auth_token"><br><br>
    </form>
    <button onclick="handleSubmit()">Submit</button>
</body>
<script>
    async function handleSubmit() {
        let auth_token = document.getElementById("auth_token").value;

        let response = await fetch(\`/authenticate?auth_token=\${auth_token}\`);

        // prevent object already being read
        let response_text = await response.text();
        console.log(response_text);

        if (response.status !== 200) {
            alert("Invalid auth_token");
            return;
        }

        auth_token = JSON.parse(response_text).auth_token;
        console.log("auth_token: " + auth_token);

        // passed the check!
        document.cookie = \`auth_token=\${auth_token}; path=/;s\`;

        console.log("redirecting to /");
        window.location.href = "/";
    }

</script>

</html>
`

// Default unauthorised page (expected)
var unauthorised_page = `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Unauthorised</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>Unauthorised</h1>
    <p>You are not authorised to view this page.</p>
    <p>To view the beta version of this page, you may be able to login <a href="/login">here</a>.</p>
</body>
</html>
`


export default {
    async fetch(request, env, ctx) {

        // Check login route first: early returns
        const url = new URL(request.url);
        const path = url.pathname;

        if (path === "/login") {
            return new Response(login_page, {
                headers: { "Content-Type": "text/html" }
            })
        }

        // Also return early if path is part of the login
        if (path === "/authenticate") {

            // With a client-side GET request, the URL will contain ?auth_token=XXX. Parse this
            const auth_token = url.searchParams.get("auth_token");

            // Hardcoded for now
            if (auth_token === "draggie") {
                return new Response(JSON.stringify(
                    {
                        "auth_token": "some_token_here",
                        "status": 200,
                    }
                ));
            }
            
            // For all other cases, return 401
            return new Response("Unauthorized", { status: 401 });
        }

        // If not a login request, check if there is a cookie with the auth_token
        const auth_cookie = request.headers.get("Cookie")?.split("; ").find(row => row.startsWith("auth_token="));
        const given_token_value = auth_cookie ? auth_cookie.split("=")[1] : null;

        if (!given_token_value) {
            return new Response(unauthorised_page, {
                headers: { "Content-Type": "text/html" },
                status: 401,
            });
        } if (given_token_value !== "some_token_here") {
            return new Response(unauthorised_page, {
                headers: { "Content-Type": "text/html" },
                status: 401,
            });
        }

        // By now, it has passed all checks, so the user has logged in successfully before.
        // Therefore, return their requested static asset.

        return env.ASSETS.fetch(request);
        // return new Response( html_content, {
        //     headers: {"Content-Type": "text/html"}
        // })
    },
};


