
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Loaded");

    // Render name typing

    if (window.location.pathname == "/things") {
        typeText("typed-text-thingsdone", string_things_done, charlist_things_done)
    }
    else if (window.location.pathname == "/about") {
        typeText("typed-text-whoiam", string_whoiam, charlist_things_done)
    }
    else if (window.location.pathname == "/") { // index 
        typeText("typed-text", string_whoiam, charlist_whoaim)
    }

    // console.log(window.location.pathname)
});

const name_text = "Oliver Ling";
const string_things_done = "What I've done";
const string_whoiam = "About me";
const charlist_name = name_text.split('');
const charlist_things_done = string_things_done.split('');
const charlist_whoaim = string_things_done.split('');

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

let description_data = {
    "patient_assistance": "Allows patients to get assistance from their carers quickly and for any reason. Made for my mother after surgery.",
}