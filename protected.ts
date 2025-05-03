/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


let html_content = `<!DOCTYPE html>
<head>
    <title>Oliver Ling | Student, Developer, Full Stack Engineer</title>
    <meta name = "description" content = "An undergrad Year 1 student at the University of Nottingham, studying Computer Science. Experience in full stack development, including TypeScript/JavaScript, React, Next.js, C, C#, Java, Haskell, Python, HTML, CSS, and SQL.">

    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 1.5rem;
            padding: 0;
            background-color: rgb(16, 16, 20);
            color: rgb(233, 233, 233);
            user-select: none;
        }

        /* Top header "navbar" colour */
        .nav a, .bottom-sticky-bar-content a {
            color: #00acff;
            text-decoration: underline;
            font-weight: bold;
            transition: color 0.3s ease;
        }

        header {
            text-align: center;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 10vh;
        }

        .main-grid-layout {
            display: grid;
            grid-template-columns: auto auto auto;
            grid-gap: 20px;
            padding: 10px;
        }

        @media (max-width: 768px) {
            .main-grid-layout {
                grid-template-columns: repeat(1, 1fr);
            }
        }

        .main-grid-project-card {
            outline-color: transparent;
            outline-offset: .75rem;
            outline-style: solid;
            outline-width: 0;
            border-radius: .75rem; /* creates curved corner */
            overflow: hidden; /* keeps content inside the rounded corners */
            position: relative;
            transition: transform 0.4s ease;
            background-color: rgba(30, 30, 34, 0.7);
            padding: 1rem;
            margin: 0.5rem;
            flex: 1 1 calc(26% - 1rem); /* 3 cards per row with subtracted border gap */
        }

        .main-grid-project-card img, 
        .main-grid-project-card h2, 
        .main-grid-project-card p {
            transition: all 0.4s ease;
            transform-origin: center;
            text-align: center;
        }

        /* h3s in the main grid layout for each are the mini descriptions, hidden by default */
        .main-grid-project-card h3 {
            display: none; /* hidden by default */
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.8);
        }

        @keyframes outline-appear {
            0% {
                outline-offset: 1.1rem; /* outwards and coming in */
                outline-color: rgba(255, 255, 255, 0.2); 
                outline-width: 1px;
            }
            40% { 
                outline-offset: 0.4rem; /* Overshoot inward a bit */
                outline-width: 5px;
            }
            100% { 
                outline-offset: 0.5rem; /* Final position */
                outline-color: rgba(255, 255, 255, 0.5);
                outline-width: 4px;
            }
        }

        @keyframes outline-disappear {
            0% {
                outline-offset: 0.5rem; /* Final position */
                outline-color: rgba(255, 255, 255, 0);
                outline-width: 4px;
            }
            60% { 
                outline-offset: 0.4rem; /* Overshoot inward a bit */
                outline-width: 5px;
            }
            100% { 
                outline-offset: 1rem; /* outwards and coming in */
                outline-color: rgba(255, 255, 255, 0.2);
                outline-width: 0rem;
            }
        }
        
        .main-grid-project-card-animator:hover {
            animation: outline-appear 0.4s forwards;
            transform: scale(1.02);
            background-color: rgba(40, 40, 44, 0.8);
        }

        .main-grid-project-card-animator:not(:hover) {
            animation: outline-disappear 0.3s forwards;
            transform: scale(1);
            background-color: rgba(30, 30, 34, 0.7);
        }

        /* Content animations */
        .main-grid-project-card:hover img {
            transform: scale(1.05);
            filter: blur(0.2rem) brightness(1.1);
        }

        .main-grid-project-card:hover h2 {
            color: #ffffff;
            text-shadow: 2 1 28px rgba(177, 177, 177, 0.5);
            transform: translateY(-100px);
        }

        .main-grid-project-card img {
            width: 100%;
            border-radius: 0.5rem;
            transition: transform 0.4s ease, filter 0.4s ease;
        }

        .main-grid-project-card:hover h3 {
            display: inline-block; /* show the description on hover */
            font-size: 0.5rem;
            margin: 0.5rem 0;
            color: rgba(255, 255, 255, 0.8);
            animation: 0.4s move-up forwards;
            transform: translateY(0); /* start from the bottom */
        }

        @keyframes move-up {
            0% { transform: translateY(0); }
            100% { transform: translateY(-100px); }
        }


        /* New: Bottom sticky bar that shows the page */

        .bottom-sticky-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 50px;
            background-color: rgba(30, 30, 34, 0.8);
            color: white;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(0.5rem); /* you're joking */
            border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .bottom-sticky-bar-content {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
        }

        /* typing out effect */
        .cursor {
            animation: blink 1s infinite; /* So simple but effective */
        }

        @keyframes blink {
            50% { opacity: 0; } /* Holy moly, it's that easy */
        }

    </style>
</head>
<body>
    <section>
        <header>
            <h1 id="name-header"><span id="typed-text"></span><span class="cursor">|</span></h2>
            <p>Hello! I'm Oliver, an undergrad CS with AI student at the University of Nottingham. I love making software, websites and utilities that have positive tangible, real-world outcomes. <span><a href="#about">Read more about me ></a><span></p>
            <nav class = "nav">
                <a href = "cv.pdf" target="_blank">CV</a> |
                <a href = "https://github.com/Draggie306" target="_blank">GitHub</a> |
                <a href = "https://www.linkedin.com/in/oliver-ling" target="_blank">LinkedIn</a> |
                <a href = "mailto:o@geog.uk" target="_blank">Email</a>
            </nav>
        </header>
    </section>

    <!-- Main grid layout -->
    <section>
        <h1>My Projects</h1>
        <div class = "main-grid-layout">
            <div class="main-grid-project-card">
                <img src = "assets/images/stories.png" alt = "Stories">
                <h2>iBaguette Stories</h2>
                <h3>A web experience focused on UI and pure HTML and CSS. A playground to publish some of my writing.</h3>
            </div>
            <div class = "main-grid-project-card">
                <img src = "assets/images/stories.png" alt = "Project 2">
                <h2>Study</h2>
            </div> 
            <div class = "main-grid-project-card">
                <img src = "assets/images/stories.png" alt = "Project 3" class="main-grid-project-card-image">
                <h2>Patient Assistance</h2>
            </div>
            <div class = "main-grid-project-card">
                <img src = "assets/images/stories.png" alt = "Project 3" class="main-grid-project-card-image">
                <h2>Kaspersky to CSV</h2>
            </div>
            <div class = "main-grid-project-card">
                <img src = "assets/images/stories.png" alt = "Project 3" class="main-grid-project-card-image">
                <h2>geog.uk</h2>
            </div>
            <div class = "main-grid-project-card">
                <img src = "assets/images/stories.png" alt = "Project 3" class="main-grid-project-card-image">
                <h2>Infinite Ping Test</h2>
            </div>
            <div class = "main-grid-project-card">
                <img src = "assets/images/stories.png" alt = "Project 3" class="main-grid-project-card-image">
                <h2>Draggie Games</h2>
            </div>
            <div class = "main-grid-project-card">
                <img src = "assets/images/stories.png" alt = "Project 3" class="main-grid-project-card-image">
                <h2>Project Saturnian</h2>
            </div>
            <div class = "main-grid-project-card">
                <img src = "assets/images/stories.png" alt = "Project 3" class="main-grid-project-card-image">
                <h2>iBaguette</h2>
            </div>
            <div class = "main-grid-project-card">
                <img src = "assets/images/stories.png" alt = "Project 3" class="main-grid-project-card-image">
                <h2>Cheat Sheets</h2>
            </div>
            <div class = "main-grid-project-card">
                <img src = "assets/images/stories.png" alt = "Project 3" class="main-grid-project-card-image">
                <h2>Remembling</h2>
            </div>
            <div class = "main-grid-project-card">
                <img src = "assets/images/stories.png" alt = "Project 3" class="main-grid-project-card-image">
                <h2>ImageTools</h2>
            </div>
            <div class = "main-grid-project-card">
                <img src = "assets/images/stories.png" alt = "Project 3" class="main-grid-project-card-image">
                <h2>BaguetteBot</h2>
            </div>
        </div>
    </section>

    <footer class="bottom-sticky-bar">
        <div class="bottom-sticky-bar-content">
            <a href="/">What I've made</a>
            <a href="/">What I've done</a>
            <a href="/">Who I am</a>
            <!-- One of: what I've made, what I've done, who I am -->
        </div>
    </footer>

<script>
    // Add a class for each card to tell it to animate
    document.addEventListener('DOMContentLoaded', () => {
        const cards = document.querySelectorAll('.main-grid-project-card');
        cards.forEach(card => {
            card.classList.add('main-grid-project-card-animator');
        });
        typeText(); 
    });
    
    const name_text = "Oliver Ling";
    const text = name_text.split('');
    
    let i = 0;
    const speed = 100;

    function typeText() { 
        if (i < text.length) {
            document.getElementById("typed-text").innerHTML += text[i];
            i++;
            setTimeout(typeText, speed);
        } else {
            //document.querySelector(".cursor").style.display = "none"; // Hide cursor after typing
        }

        setTimeout(() => {
            document.querySelector(".cursor").style.display = "none"; 
        }, 5500); 
    }

    let description_data = {
        "patient_assistance": "Allows patients to get assistance from their carers quickly and for any reason. Made for my mother after surgery.",
    }
</script>


</body>
</html>`

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
    return new Response( html_content, {
        headers: {"Content-Type": "text/html"}
    })
  },
};


