document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Loaded");

    enableHoverEffects();

    // Render name typing

    const windowName: string = window.location.pathname;
    if (windowName == "/" || windowName == "/now") // index
    {
        typeText(document.querySelector<HTMLElement>("#typed-text"), charlist_name)
    }
    else if (windowName == "/things") {
        typeText(document.querySelector<HTMLElement>("#typed-text-thingsdone"), charlist_things_done)
    }
    console.log(windowName)
});

const charlist_name: string[] = "Oliver Ling".split('');
const charlist_things_done: string[] = "Things I've done".split('');

let i: number = 0;
const speed: number = 100;

/**
 * Emulate typing out of a string array.
 * @param {HTMLElement} element The individual element
 * @param {string[]} charlist split string to type
 */
function typeText(element: HTMLElement, charlist: string[]) {
    if (i < charlist.length) {
        element.innerHTML += charlist[i];
        i++;

        // Sorcery from https://stackoverflow.com/a/1190656
        setTimeout(function () {
            typeText(element, charlist)
        }, speed);
    } else {
        //document.querySelector(".cursor").style.display = "none"; // Hide cursor after typing
    }

    setTimeout(() => {
        document.querySelector<HTMLElement>(".cursor").style.display = "none";
    }, 5500);
}

document.addEventListener('DOMContentLoaded', () => {
    // Add all the project cards to main-grid-layout depending on order, default to "coolness" order
    const mainGridLayout = document.getElementById("main-grid-layout");
    if (!mainGridLayout) {
        console.log("Main grid layout not found; assuming not on index page");
        return;
    }

    repopulateGrid("coolness");

    const selector = document.querySelector<HTMLInputElement>("#orderByLabel");
    selector.addEventListener('change', function () {
        const selectedValue = this.value;
        console.log("Selected order: " + selectedValue);
        repopulateGrid(selectedValue.toString().toLowerCase());
    });
});

function repopulateGrid(namedOrder: string) {
    const mainGridLayout = document.getElementById("main-grid-layout");
    if (!mainGridLayout) {
        console.log("Main grid layout not found; assuming not on index page");
        return;
    }
    while (mainGridLayout.firstChild) {
        mainGridLayout.removeChild(mainGridLayout.firstChild);
    }

    projects.sort((a, b) => compare(a, b, namedOrder)).reverse(); // wtf?
    console.log("Sorted projects by " + namedOrder + ":", projects);

    // Lighthouse micro-optimisations: the first 3 elements (decided based on desktop viewport in css) should not be lazily loaded, and should be higher priority

    // See https://web.dev/articles/fetch-priority and spec: https://html.spec.whatwg.org/multipage/embedded-content.html#dom-img-fetchpriority
    let element_count: number = 0;
    
    projects.forEach(element => {
        // Create many children under main-grid-layout
        const projectCard = mainGridLayout.appendChild(document.createElement("div"));
        projectCard.classList.add("main-grid-project-card");

        // disgusting but it works
        projectCard.innerHTML = `<img ${element_count > 3 ? "loading=\"lazy\"" : "fetchPriority=\"high\""} src="${element.imgName ? ("assets/images/" + element.imgName) : '/assets/images/placeholder.png'}" alt="${element.imgAlt ? element.imgAlt : element.name}">
                                <h2>${element.name}</h2>
                                <h3 class="project-desc">${element.desc}</h3>
                                <div id="${element.name}ButtonContainer" class="projectButtonContainer">
                                    ${(element.isRepoHidden === false && (element.repoUrl ?? false)) ? `<button id ="${element.name}Repo" ${element.isRepoDisabled ? 'disabled' : ''} class="repo-button animation-hover" onclick="window.open('${element.repoUrl}', '_blank')">Open Repository</button>` : ''}
                                    ${(element.isSiteHidden === false && (element.siteUrl ?? false)) ? `<button id ="${element.name}Site" ${element.isSiteDisabled ? 'disabled' : ''} class="site-button animation-hover" onclick="window.open('${element.siteUrl}', '_blank')">View Site</button>` : ''}
                                    </div>
                                </div>`;

        element_count++;

        // Check which projects have been lazily loaded
        // console.log(element_count > 3 ? element.name : "");
    });

    const finalElem = mainGridLayout.appendChild(document.createElement("div"));
    finalElem.classList.add("main-grid-more");
    finalElem.innerHTML = `<div class="main-grid-more">
                <p class="more-text">... and more coming soon!</p>
            </div>`;
    console.log("Added project cards to main grid layout");
    enableHoverEffects();
}

function compare(a, b, term = "coolness") {
    if (a.ratings[term] < b.ratings[term]) {
        return -1;
    }
    if (a.ratings[term] > b.ratings[term]) {
        return 1;
    }
    return 0;
}

function enableHoverEffects() {
    // Fix: to not show the unfocus event, add a class for it only when DOM is loaded 
    const hover_elements = Array.from(document.querySelectorAll('.animation-hover')).concat(Array.from(document.querySelectorAll('.main-grid-project-card')));
    hover_elements.forEach(domNode => {
        domNode.classList.add('main-grid-project-card-animator');
        // add class on first hover to enable exit animation only afterward
        domNode.addEventListener('mouseenter', function () {

            // cancel pending removal
            if (this._removeTimeout) {
                clearTimeout(this._removeTimeout);
                this._removeTimeout = null;
            }
            this.classList.add('has-been-hovered');
        }
        );

        domNode.addEventListener('mouseleave', function () {
            // schedule removal, but only actually remove if still not hovered
            this._removeTimeout = setTimeout(() => {
                if (!this.matches(':hover')) {
                    this.classList.remove('has-been-hovered');
                }
                this._removeTimeout = null;
            }, 400);
        });
    });


    const generic_hovereffect_items = document.querySelectorAll('.hover-effect');
    generic_hovereffect_items.forEach(node => {
        node.classList.add('hover-effect-animator');
        // add class on first hover to enable exit animation only afterward
        node.addEventListener('mouseenter', function () {
            this.classList.add('has-been-hovered');
        });

    });

    // document.getElementById("orderByLabel").classList.add("animation-hover");
    // document.getElementById("orderByLabel").addEventListener('mouseenter', function () {
    //     this.classList.add('has-been-hovered');
    // });
}

let projects = [
    {
        "name": "Stories",
        "desc": "A web experience, focused on UI and UX, written in pure HTML and CSS with minimal scripting and zero AI use. Also a playground to publish some of my creative writing.",
        "imgName": "stories.png",
        "imgAlt": "iBaguette Stories logo",
        "repoUrl": "https://github.com/Draggie306/stories",
        "siteUrl": "https://stories.ibaguette.com",
        ratings: {
            "coolness": 7.02,
            "added": 1739035050,
            "stars": 1,
            "popularity": 15 // Jess counts for a lot
        },
        isRepoDisabled: false,
        isSiteDisabled: false,
        isRepoHidden: false,
        isSiteHidden: false
    },
    {
        "name": "Study", // Ronaaaaaan
        "desc": "Coming soon. A brand new study platform: upload, browse, search and learn from real, marked exam papers - it's the only database of NEAs, EPQs and personal statements like it. Uses the latest web tech: React and Next.js.",
        "imgName": "study.png",
        "imgAlt": "Study logo",
        "repoUrl": "https://github.com/iBaguette/study",
        "siteUrl": "https://study.ibaguette.com",
        ratings: {
            "coolness": 7.01,
            "added": 1750334052,
            "stars": 3,
            "popularity": 14
        },
        isRepoDisabled: true,
        isSiteDisabled: true,
        isRepoHidden: true,
        isSiteHidden: false
    },
    {
        "name": "Draggie Games",
        "desc": "A platform to create, download, and test games and programs, featuring a desktop download and daemon process, full server-side auth functionality, games licensing and backend storage hosting. Part of my A Level project.",
        "imgName": null,
        "imgAlt": "Draggie Games logo",
        "repoUrl": "https://github.com/Draggie306/draggiegames.com",
        "siteUrl": "https://draggiegames.com",
        ratings: {
            "coolness": 4.1,
            "added": 1713961932,
            "stars": 0,
            "popularity": 13
        },
        isRepoDisabled: true,
        isSiteDisabled: false,
        isRepoHidden: false,
        isSiteHidden: false
    },
    {
        "name": "Cheat Sheets",
        "desc": "A revision resource site full of human-written notes for entire GCSEs and A Level subjects, with all the information needed to get top grades. Used by over 10,000 students annually!",
        "imgName": null,
        "imgAlt": "iBaguette Cheat Sheets logo",
        "repoUrl": "https://github.com/Draggie306/CheatSheets",
        "siteUrl": "https://ibaguette.com/cheatsheets",
        ratings: {
            "coolness": 6.4,
            "added": 1654116442,
            "stars": 8,
            "popularity": 42000
        },
        isRepoDisabled: false,
        isSiteDisabled: false,
        isRepoHidden: false,
        isSiteHidden: false
    },
    {
        "name": "Project Saturnian",
        "desc": "A water simulation game in Unity (C#). Avoid the rising water, collect tokens, escape. Also has cryptographically secure login functionality, inventory systems and dynamic asset downloading. Part of my A Level project.",
        "imgName": "dgames-saturnianbanner.png",
        "imgAlt": "Project Saturnian logo",
        "repoUrl": "https://github.com/Draggie306/project-saturnian",
        "siteUrl": null,
        ratings: {
            "coolness": 6.3,
            "added": 1713961932,
            "stars": 0,
            "popularity": 9
        },
        isRepoDisabled: false,
        isSiteDisabled: true,
        isRepoHidden: false,
        isSiteHidden: true
    },
    {
        "name": "Patient Assistance",
        "desc": "An installable webapp allowing medical patients requiring care to quickly, easily and instantly request and receive help from their carers via a WebSocket connection.",
        "imgName": "patient-assist.png",
        "imgAlt": "Patient Assistance webapp logo",
        "repoUrl": "https://github.com/Draggie306/patient-assistance",
        "siteUrl": "https://patient-assist.ibaguette.com",
        ratings: {
            "coolness": 6.75,
            "added": 1720799194,
            "stars": 1,
            "popularity": 4
        },
        isRepoDisabled: false,
        isSiteDisabled: false,
        isRepoHidden: false,
        isSiteHidden: false
    },
    {
        "name": "Remembling",
        "desc": "A new approach to language and information learning with novel psychological research built right in. Currently in beta.",
        "imgName": null,
        "imgAlt": "Remembling logo",
        "repoUrl": null,
        "siteUrl": "https://remembling.com",
        ratings: {
            "coolness": 6,
            "added": 1739035050,
            "stars": 0,
            "popularity": 0
        },
        isRepoDisabled: true,
        isSiteDisabled: true,
        isRepoHidden: false,
        isSiteHidden: false
    },
    {
        "name": "YouTube Channel",
        "desc": "My monetised YouTube channel, showcasing UHD game soundtracks programatically extracted from game binaries, streams of live events, my academic achievements, and more. >2k subscribers and >2M views.",
        "imgName": "youtube.png",
        "imgAlt": "YouTube channel logo",
        "repoUrl": null,
        "siteUrl": "https://www.youtube.com/@Draggie306",
        ratings: {
            "coolness": 6.5,
            "added": 0,
            "stars": 0,
            "popularity": 2000
        },
        isRepoDisabled: true,
        isSiteDisabled: false,
        isRepoHidden: true,
        isSiteHidden: false
    },
    {
        "name": "Infinite Ping Test",
        "desc": "A browser utility used to measure and analyse realtime ping RTT over an indefinite period to identify network issues/possible WAP optimisations. Built with the websockets API and Cloudflare Workers. Formerly Infiniping.",
        "imgName": "ping.png",
        "imgAlt": "Graph of ping test on the Infinite Ping Test project site",
        "repoUrl": null,
        "siteUrl": "https://draggie306.github.io/ping-test",
        ratings: {
            "coolness": 5.5,
            "added": 1719237285,
            "stars": 0,
            "popularity": 57
        },
        isRepoDisabled: true,
        isSiteDisabled: false,
        isRepoHidden: true,
        isSiteHidden: false
    },
    {
        "name": "geog.uk",
        "desc": "A future platform to connect and collaborate with passionate geographers across the UK, to organise talks, field trips and to share information. Inspired by my multi-disciplinary love for many subjects. Work in progress.",
        "imgName": "geog.uk.png",
        "imgAlt": "geog.uk logo",
        "repoUrl": "https://github.com/Draggie306/geog.uk",
        "siteUrl": "https://geog.uk",
        ratings: {
            "coolness": 5,
            "added": 1707672360,
            "stars": 0,
            "popularity": 18
        },
        isRepoDisabled: false,
        isSiteDisabled: false,
        isRepoHidden: false,
        isSiteHidden: false
    },
    {
        "name": "iBaguette",
        "desc": "My most popular and first website with a range of articles, revision guides, technical blog posts and more. Monetised by Google Adsense. Runs on Cloudflare. Sees 30k+ users and transfers >400GB/year.",
        "imgName": null,
        "imgAlt": "iBaguette logo",
        "repoUrl": "https://github.com/Draggie306/iBaguette",
        "siteUrl": "https://ibaguette.com",
        ratings: {
            "coolness": 6.01,
            "added": 1580423674,
            "stars": 3,
            "popularity": 1000
        },
        isRepoDisabled: false,
        isSiteDisabled: false,
        isRepoHidden: false,
        isSiteHidden: false
    },
    {
        "name": "Kaspersky to CSV",
        "desc": "Uses rule-based evaluation to convert Kaspersky Password Manager's unfriendly exported files into Chromium-compatible CSV datasets for importing or exporting accounts.",
        "imgName": "kaspersky.png",
        "imgAlt": "Kaspersky to CSV page screenshot",
        "repoUrl": "https://github.com/Draggie306/Kaspersky-to-CSV",
        "siteUrl": "https://kaspersky-to-csv.ibaguette.com",
        ratings: {
            "coolness": 4.1,
            "added": 1703514183,
            "stars": 9,
            "popularity": 65
        },
        isRepoDisabled: false,
        isSiteDisabled: false,
        isRepoHidden: false,
        isSiteHidden: false
    },
    {
        "name": "BaguetteBot",
        "desc": "A multi-purpose Discord.py bot for server management and administration, currency and a shop, automatic role distribution, bulk updates and music. Fun fact: a command to chat with OpenAI's GPT-3 models was added before ChatGPT existed!",
        "imgName": "baguettebot.png",
        "imgAlt": "BaguetteBot logo",
        "repoUrl": "https://github.com/Draggie306/BaguetteBot",
        "siteUrl": null,
        ratings: {
            "coolness": 3.5,
            "added": 1609108635,
            "stars": 1,
            "popularity": 45
        },
        isRepoDisabled: false,
        isSiteDisabled: true,
        isRepoHidden: false,
        isSiteHidden: true
    },
    {
        "name": "Tools",
        "desc": "An automatically-updating, terminal-based, installable Windows application, written in Python. Performs a range of tasks, from reverse-engineered game CDN downloads and asset extraction to YouTube downloading.",
        "imgName": "dgames-draggietools-ui-v75.png",
        "imgAlt": "DraggieTools latest version preview.",
        "repoUrl": "https://github.com/Draggie306/DraggieTools",
        "siteUrl": null,
        ratings: {
            "coolness": 3,
            "added": 1650034026,
            "stars": 3,
            "popularity": 8
        },
        isRepoDisabled: false,
        isSiteDisabled: true,
        isRepoHidden: false,
        isSiteHidden: true,
    },
    {
        "name": "Auto-Update Client",
        "desc": "An automatically-updating background installable Windows daemon application, designed to accompany Draggie Games. Reads cryptographically-secure tokens and automatically downloads chunked game assets based on an account and entitlements.",
        "imgName": "dgames-draggietools-ui-v75.png",
        "imgAlt": "DraggieTools latest version preview.",
        "repoUrl": "https://github.com/Draggie306/DraggieTools",
        "siteUrl": null,
        ratings: {
            "coolness": 3,
            "added": 1650034026,
            "stars": 3,
            "popularity": 8
        },
        isRepoDisabled: false,
        isSiteDisabled: true,
        isRepoHidden: false,
        isSiteHidden: true
    },
    {
        "name": "Tutor Programme",
        "desc": "Fully designed the UI/UX and implemented the internal platform for a sixth form \"Tutor Programme\", based on SharePoint with added scripts, to publish PowerPoints, news and information ranging from pastoral support to Oxbridge interview guidance. Used by 500 A Level students and 40 staff per year.",
        "imgName": "tutorprogramme.png",
        "imgAlt": "6th Form tutor programme",
        "repoUrl": null,
        "siteUrl": null,
        ratings: {
            "coolness": 3.5,
            "added": 1693403654,
            "stars": 0,
            "popularity": 300
        },
        isRepoDisabled: false,
        isSiteDisabled: true,
        isRepoHidden: false,
        isSiteHidden: true
    }
];