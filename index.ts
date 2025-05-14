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
<head>
    <title>Protected Content</title>
</head>
<body>
    <h1>Login</h1>
    <form>
        <label for="auth_token">auth_token:</label><br>
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
    document.cookie = \`auth_token=\${auth_token}; path=/;\`;

    console.log("redirecting to /");
    window.location.href = "/";
}

</script>
`

// Default unauthorised page (expected)
var unauthorised_page = `<!DOCTYPE html>
<head>
    <title>Unauthorised</title>
</head>
<body>
    <h1>Unauthorised</h1>
    <p>You are not authorised to view this page.</p>
    <p>You may be able to login <a href="/login">here</a>.</p>
</body>
`


export default {
  async fetch(request, env, ctx) {

    // check login route first
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/login") {
        return new Response( login_page, {
            headers: {"Content-Type": "text/html"}
        })
    }

    if (path === "/authenticate") {
        // expecting the query string to be in the format of ?auth_token for some reason
        const auth_token = url.searchParams.get("auth_token");
        if (auth_token === "draggie") { // hardcoded expected input auth_token
            return new Response(JSON.stringify(
                {
                    "auth_token": "some_token_here",
                    "status": 200,
                }
            ));
        } else {
            return new Response("Unauthorized", { status: 401 });
        }
    }

    // if auth auth_token cookie
    const auth_cookie = request.headers.get("Cookie")?.split("; ").find(row => row.startsWith("auth_token="));
    const given_token_value = auth_cookie ? auth_cookie.split("=")[1] : null;

    if (!given_token_value) {
        return new Response(unauthorised_page, {
            headers: {"Content-Type": "text/html"},
            status: 401,
        });
    } if (given_token_value !== "some_token_here") {
        return new Response(unauthorised_page, {
            headers: {"Content-Type": "text/html"},
            status: 401,
        });
    }


    // Return the html
    return env.ASSETS.fetch(request);
    // return new Response( html_content, {
    //     headers: {"Content-Type": "text/html"}
    // })
  },
};


