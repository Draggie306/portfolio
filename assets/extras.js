"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
document.addEventListener('DOMContentLoaded', () => {
    console.log(`DOM Loaded on ${window.location.pathname}`);
    // Render name typing
    if (window.location.pathname == "/things") {
        typeText(document.querySelector("#typed-text-thingsdone"), charlist_things_done);
    }
    else if (window.location.pathname == "/about") {
        console.log("Starting photo rotator on about page");
        cyclePortraitPhotos(); // Start the photo rotator
    }
    else {
        console.log("No typing animation on this page");
    }
    // console.log(window.location.pathname)
});
const charlist_name = "Oliver Ling".split('');
const charlist_things_done = "What I've done".split('');
const charlist_whoaim = "About me".split('');
let i = 0;
const speed = 100;
/**
 * Types out text on an element one char at a time.
 * @param {*} element The individual element
 * @param {*} charlist split string to type
 */
function typeText(element, charlist) {
    if (i < charlist.length) {
        element.innerHTML += charlist[i];
        i++;
        // Sorcery from https://stackoverflow.com/a/1190656
        setTimeout(function () {
            typeText(element, charlist);
        }, speed);
    }
    else {
        //document.querySelector(".cursor").style.display = "none"; // Hide cursor after typing
    }
    setTimeout(() => {
        document.querySelector(".cursor").style.display = "none";
    }, 5500);
}
// Order: cycles every 5 seconds from top -> bottom, see function typeText
const photos = [
    "/assets/images/optimised/features/headshot.webp", // Main classic photo - awards
    "/assets/images/optimised/features/djanogly.webp", // Outside Jubilee DLRC (notts)
    "/assets/images/optimised/features/jess.webp", // Inside Caius! (Cambs)
    "/assets/images/optimised/features/computerphile.webp", // near Play Button (notts)
    "/assets/images/optimised/features/caribou.webp", // below Canadian Caribou
    "/assets/images/optimised/features/kings-square.webp", // inside King's College (cambs)
];
/**
 * awful function to load an img into cache
 * @param {string} url
 */
function preloadImage(url) {
    var img = new Image();
    img.src = url;
    console.log("Preloaded image: " + url);
}
for (let i = 0; i < photos.length; i++) {
    preloadImage(photos[i]);
}
function sleep(ms) {
    console.log(`Sleeping for ${ms}ms`);
    return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * repeatedly cycle through the portrait photos (for the about page)
 */
async function cyclePortraitPhotos() {
    const element = document.getElementById("portrait-photo-rotator");
    const element_next = document.getElementById("portrait-photo-rotator-next");
    let currentIndex = 0;
    element.src = photos[currentIndex];
    await element.decode();
    console.log(`Starting photo rotator with photo: ${element.src}`);
    setInterval(async () => {
        // const start_ms = Date.now();
        element_next.src = photos[(currentIndex + 1) % photos.length];
        await element_next.decode();
        // const end_ms = Date.now();
        // console.log(`Decoded next photo: ${element_next.src} in ${end_ms - start_ms}ms`);
        // swap current to next
        // element_next.src = photos[(currentIndex + 1) % photos.length];
        // console.log(`Now swapped next photo to: ${element_next.src}`);
        // increment position in photos array
        currentIndex = (currentIndex + 1) % photos.length;
        element.animate([{ transform: "translateY(0)" }, { transform: "translateX(-100%)" }], { duration: 1000, easing: "ease-in-out" });
        const animation = element_next.animate([{ transform: "translateX(-100%)" }], { duration: 1000, easing: "ease-in-out" });
        setTimeout(() => {
            element.src = photos[currentIndex];
            console.log(`Changed current photo to: ${element.src}`);
        }, 950); // Must wait for animation to finish
        element_next.src = photos[currentIndex];
        console.log(`Now swapped next photo to: ${element_next.src}`);
        // New way to sleep for remaining time for non-blocking
        // await sleep(5000+(end_ms - start_ms));
        // repeat every 5 seconds
    }, 5000);
}
//# sourceMappingURL=extras.js.map