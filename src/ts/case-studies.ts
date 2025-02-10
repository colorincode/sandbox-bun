//imports
import Reveal from 'reveal.js';
import gsap from 'gsap' ;
import Draggable from 'gsap/Draggable';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Flip from 'gsap/Flip';
import { TextPlugin} from 'gsap/all';
import { EasePack } from 'gsap/EasePack';

gsap.registerPlugin(
    TextPlugin,
    EasePack,
    Flip,
    Draggable,
    ScrollTrigger
);

// __________________________________________________________________________________________ overlay wrapper
document.addEventListener("DOMContentLoaded", function() {
    const slideIds = ["AIRedTeam", "specialProjectsGroup"];

    // mutation observers for each slide
    slideIds.forEach(id => {
        const slide = document.getElementById(id);
        if (slide) {
            const observer = new MutationObserver((mutations: MutationRecord[]) => {
                if (mutations.some(m => m.target instanceof Element && m.target.classList.contains("present"))) {
                    const overlay = slide.querySelector(".project-info-overlay__wrapper");
                    if (overlay instanceof HTMLElement) {
                        setTimeout(() => {
                            overlay.classList.add("peek-animation");
                        }, 1750);
                    }
                    observer.disconnect();
                }
            });
            observer.observe(slide, { attributes: true, attributeFilter: ["class"] });
        }
    });

    // click events for arrows
    const arrows = document.querySelectorAll(".fa-dropdown--arrow");
    arrows.forEach((arrow) => {
        arrow.addEventListener("click", () => {
            const overlay = arrow.closest(".project-info-overlay__wrapper");
            if (overlay instanceof HTMLElement) {
                overlay.classList.toggle("expanded");
                if (overlay.classList.contains("expanded")) {
                    overlay.classList.remove("slide-out");
                    overlay.classList.add("slide-in");
                } else {
                    overlay.classList.remove("slide-in");
                    overlay.classList.add("slide-out");
                }
            }
        });
    });
});
// __________________________________________________________________________________________ end overlay wrapper


//vars 
let csAwaitDelay = 500;
const bodyEl: HTMLElement = document.querySelector('body');
const revealEl: HTMLElement = document.querySelector('.reveal[data-reveal-type="caseStudies"]');
const headerEl: HTMLElement = document.querySelector('.sitewide--banner__wrapper');
const globalHeaderEl: HTMLElement = document.querySelector('.test--global__headerwrapper');
const globalFooterEl: HTMLElement = document.querySelector(".global__footerwrapper");
const revealContainer: HTMLElement = document.querySelector('.reveal-viewport');
function getCalculatedHeight(element: HTMLElement): number {
    const computedStyle = window.getComputedStyle(bodyEl);
    return parseFloat(computedStyle.height);
}

let deck = new Reveal({
    disableLayout: true,
    center: false,
    embedded: true,
    controls: true,
    hash: true,
    mouseWheel: false,
    transition: 'slide',
    transitionSpeed: 'slow',
    backgroundTransition: 'slide',
    margin: 0,
    minScale: 1,
    maxScale: 1
});

deck.initialize();

function updateLayout() {
    const windowHeight = window.innerHeight;
    const headerHeight = getCalculatedHeight(globalHeaderEl);
    const footerHeight = getCalculatedHeight(globalFooterEl);
    const headerTwoHeight = getCalculatedHeight(headerEl);
    const revealHeight = windowHeight - headerHeight - headerTwoHeight - footerHeight;

    const root = document.documentElement;

    root.style.setProperty('--slide-width', '100%');
    root.style.setProperty('--slide-height', `${revealHeight}px`);
    root.style.setProperty('--slide-scale', '1');
    root.style.setProperty('--viewport-width', `${window.innerWidth}px`);
    root.style.setProperty('--viewport-height', `${windowHeight}px`);
    // root.style.setProperty('--r-controls-spacing', `${footerHeight}px`);
    bodyEl.style.height = '100dvh';
    if (revealContainer) {
    revealContainer.style.width = '100%';
    revealContainer.style.height = `${revealHeight}px`;
    }
    // revealContainer.style.flexGrow = '1';
    // revealContainer.style.minHeight = `${revealHeight}px`;

    revealEl.style.width = '100%';
    revealEl.style.height = `${revealHeight}px`;
    revealEl.style.flexGrow = '1';
    revealEl.style.minHeight = `${revealHeight}px`;
    deck.layout();
}

function initLayout() {
    updateLayout();
    window.addEventListener('resize', updateLayout);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLayout);
} else {
    initLayout();
}

