document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Loaded");

    enableHoverEffects();


    // Render name typing

    if (window.location.pathname == "/") // index
    {
        typeText("typed-text", name_text, charlist_name)
    }
    else if (window.location.pathname == "/things") {
        typeText("typed-text-thingsdone", string_things_done, charlist_things_done)
    }
    console.log(window.location.pathname)
});

const name_text = "Oliver Ling";
const string_things_done = "Things I've done";
const charlist_name = name_text.split('');
const charlist_things_done = string_things_done.split('');

let i = 0;
const speed = 100;

/**
 * 
 * @param {*} id element ID
 * @param {*} charlist split string to type
 */
function typeText(id, charlist) {
    if (i < charlist.length) {
        document.getElementById(id).innerHTML += charlist[i];
        i++;

        // Sorcery from https://stackoverflow.com/a/1190656
        setTimeout(function () {
            typeText(id, charlist)
        }, speed);
    } else {
        //document.querySelector(".cursor").style.display = "none"; // Hide cursor after typing
    }

    setTimeout(() => {
        document.querySelector(".cursor").style.display = "none";
    }, 5500);
}

document.addEventListener('DOMContentLoaded', () => {
    // Add all the project cards to main-grid-layout depending on order, default to "coolness" order
    const mainGridLayout = document.getElementById("main-grid-layout");
    if (!mainGridLayout) {
        console.error("Main grid layout not found");
        return;
    }

    projects.sort(compare, "coolness").reverse();
    console.log("Sorted projects by coolness:", projects);

    projects.forEach(element => {
        // Create many children under main-grid-layout
        const projectCard = mainGridLayout.appendChild(document.createElement("div"));
        projectCard.classList.add("main-grid-project-card");

        // disgusting but it works
        projectCard.innerHTML = `<img src="${element.imgUrl ? element.imgUrl : 'assets/images/placeholder.png'}" alt="${element.imgAlt ? element.imgAlt : element.name}">
                                <h2>${element.name}</h2>
                                <h3 class="project-desc">${element.desc}</h3>
                                <div id="${element.name}ButtonContainer" class="projectButtonContainer">
                                    <button id ="${element.name}Repo" ${element.isRepoDisabled ? 'disabled' : ''} class="repo-button animation-hover">View Repository</button>
                                    <button id ="${element.name}Site" ${element.isSiteDisabled ? 'disabled' : ''} class="site-button animation-hover">Open site</button>
                                    </div>
                                </div>`;
    });

    const finalElem = mainGridLayout.appendChild(document.createElement("div"));
    finalElem.classList.add("main-grid-more");
    finalElem.innerHTML = `<div class="main-grid-more">
                <p class="more-text">... and more coming soon!</p>
            </div>`;
    console.log("Added project cards to main grid layout");
    enableHoverEffects();
});

function compare( a, b, term = "coolness" ) {
    if ( a.ratings[term] < b.ratings[term] ){
        return -1;
    }
    if ( a.ratings[term] > b.ratings[term] ){
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
        "imgUrl": "assets/images/stories.png",
        ratings: {
            "coolness": 7,
            "dateAdded": 1739035050,
            "stars": 1,
            "popularity": 15 // Jess counts for a lot
        },
        isRepoDisabled: false,
        isSiteDisabled: false
    },
    {
        "name": "Study",
        "desc": "Coming soon. A revolutionary new study platform for UK students, using the latest full-stack web tech like React and Next.js. It allows users to upload, browse, search and learn from real, marked exam papers. It's the only comprehensive repository of NEAs, EPQs and personal statements.",
        "imgUrl": "assets/images/study.png",
        ratings: {
            "coolness": 7,
            "dateAdded": 1750334052,
            "stars": 3,
            "popularity": 34
        },
        isRepoDisabled: false,
        isSiteDisabled: false
    },
    {
        "name": "Draggie Games",
        "desc": "My A Level project - a platform to create, download, and test games and programs, featuring a desktop download and daemon process, full auth functionality, games licensing and backend storage hosting.",
        "imgUrl": null,
        ratings: {
            "coolness": 7,
            "dateAdded": 1713961932,
            "stars": 0,
            "popularity": 0
        },
        isRepoDisabled: false,
        isSiteDisabled: false
    },
    {
        "name": "Cheat Sheets",
        "desc": "A revision resource site full of hand-crafted notes for entire GCSEs and A Level subjects, with all the information needed to get top grades. Used by over 10,000 students annually.",
        "imgUrl": null,
        ratings: {
            "coolness": 7,
            "dateAdded": 1654116442,
            "stars": 8,
            "popularity": 42000
        },
        isRepoDisabled: false,
        isSiteDisabled: false
    },
    {
        "name": "Project Saturnian",
        "desc": "My A Level project - a Unity-based water simulation game. Avoid the rising water, collect tokens, escape. Also has cryptographically secure login functionality, inventory systems and dynamic asset downloading.",
        "imgUrl": null,
        ratings: {
            "coolness": 6.5,
            "dateAdded": 1713961932,
            "stars": 0,
            "popularity": 0
        },
        isRepoDisabled: false,
        isSiteDisabled: false
    },
    {
        "name": "Patient Assistance",
        "desc": "An installable webapp allowing medical patients requiring care to quickly request and receive help. Tried and tested!",
        "imgUrl": null,
        ratings: {
            "coolness": 6,
            "dateAdded": 1720799194,
            "stars": 1,
            "popularity": 2
        },
        isRepoDisabled: false,
        isSiteDisabled: false
    },
    {
        "name": "Remembling",
        "desc": "A new approach to language and information learning with novel psychological research built right in. Currently in beta!",
        "imgUrl": null,
        ratings: {
            "coolness": 6,
            "dateAdded": 1739035050,
            "stars": 0,
            "popularity": 0
        },
        isRepoDisabled: false,
        isSiteDisabled: false
    },
    {
        "name": "YouTube Channel",
        "desc": "My monetised YouTube channel, showcasing UHD video game soundtracks, academic achievements, and more. >2k subscribers and over 2M views.",
        "imgUrl": "assets/images/youtube.png",
        ratings: {
            "coolness": 6,
            "dateAdded": 0,
            "stars": 0,
            "popularity": 2000
        }
    },
    {
        "name": "Infinite Ping Test",
        "desc": "AKA Infiniping. It's a utility used to measure and analyse realtime ping RTT, but for an indefinite duration. Built with the websockets API and Cloudflare Workers.",
        "imgUrl": "assets/images/ping.png",
        ratings: {
            "coolness": 5.5,
            "dateAdded": 1719237285,
            "stars": 0,
            "popularity": 0
        },
        isRepoDisabled: false,
        isSiteDisabled: false
    },
    {
        "name": "geog.uk",
        "desc": "Inspired by my multi-disciplinary love for many subjects, this is a platform to connect and collaborate with passionate geographers across the UK.",
        "imgUrl": "assets/images/geog.uk.png",
        ratings: {
            "coolness": 5,
            "dateAdded": 1707672360,
            "stars": 0,
            "popularity": 3
        },
        isRepoDisabled: false,
        isSiteDisabled: false
    },
    {
        "name": "iBaguette",
        "desc": "My biggest and first website with articles, revision guides, information and more. Monetised by Adsense. Runs on Cloudflare. Sees 30k+ users and transfers >400GB/year.",
        "imgUrl": null,
        ratings: {
            "coolness": 5,
            "dateAdded": 1580423674,
            "stars": 3,
            "popularity": 10000
        },
        isRepoDisabled: false,
        isSiteDisabled: false
    },
    {
        "name": "Kaspersky to CSV",
        "desc": "A practical utility program that uses rule-based evaluation to convert Kaspersky Password Manager's unfriendly exported files into Chromium-compatible CSV datasets for importing or exporting accounts.",
        "imgUrl": "assets/images/kaspersky.png",
        ratings: {
            "coolness": 4,
            "dateAdded": 17035141830,
            "stars": 8,
            "popularity": 65
        },
        isRepoDisabled: false,
        isSiteDisabled: false
    },
    {
        "name": "BaguetteBot",
        "desc": "A multi-purpose Discord.py bot for server management, currency, role distibution, bulk updates and administration.",
        "imgUrl": null,
        ratings: {
            "coolness": 3,
            "dateAdded": 1609108635,
            "stars": 1,
            "popularity": 45
        }
    }
];