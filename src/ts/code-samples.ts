//imports
import Reveal from 'reveal.js';
import TypingAnimation from "./typing_animation";
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
//vars 
const firstofDeck = document.querySelector('.portfoliopagegrid__wrapper') as HTMLElement;
// let timeline = gsap.timeline();
let csAwaitDelay = 500;
const bodyEl: HTMLElement = document.querySelector('body');
const revealEl: HTMLElement = document.querySelector('.reveal');
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

// typing animation section - prod
type TriggerRecord = Record<string, () => void>;
const triggerRecord: TriggerRecord = {
    "first-typing-trigger": getCodeblockOne,
    "second-typing-trigger": getCodeblockTwo,
    "third-typing-trigger": getCodeblockThree,
    "fourth-typing-trigger": getCodeblockFour
}

function revealTypingTriggers(triggerRecord: TriggerRecord) {
    for (const id in triggerRecord) {
        const el = document.getElementById(id);
        if (el === null) throw new Error(`element with id ${id} not found`);
        const observer = new MutationObserver((records, observer) => {
            const found = records.find(slideContainsPresent);
            if (!found) return;
            triggerRecord[id]!();
            observer.disconnect();
        });
        observer.observe(el, { attributes: true });
    }
}
function slideContainsPresent({ type, attributeName, target }: MutationRecord) {
    return (
        type === "attributes" &&
        attributeName === "class" &&
        target instanceof Element &&
        target.classList.contains("present")
    )
}

document.addEventListener('DOMContentLoaded', () => {
    revealTypingTriggers(triggerRecord);
});

// codeblockone
function getCodeblockOne() { // follows the splide slide unique class down to the ID
    const revealSection = document.getElementById('first-typing-trigger') as HTMLElement;
    const codeBlockOne = revealSection.querySelector('#csCodeblockOne') as HTMLPreElement;
    // console.log(codeBlockOne + "_get");
    setTimeout(() => {
        csTypingAnimation();
    }, csAwaitDelay);


    function csTypingAnimation() { // codeBlockOne stores the unique HTML el
    // console.log(codeBlockOne + "_got");
        if (codeBlockOne) {
        const csTypingOne = new TypingAnimation(codeBlockOne as HTMLPreElement, {
            loop: false,
            typingSpeed: 60,
            deletingSpeed: 100,
            targetElementClassname: 'cs--codeblock--text',
        });

        csTypingOne
            .typeString(".circle--card__wrapper:hover ")
            .pauseFor(500)
            .newLine()
            .pauseFor(500)
            .typeString(".circle--hover--effect {")
            .pauseFor(500)
            .newLine()
            .tabIndent()
            .pauseFor(500)
            .typeString("transform: scale(12);")
            .pauseFor(500)
            .newLine()
            .tabIndent()
            .pauseFor(500)
            .typeString("opacity: .8;")
            .pauseFor(500)
            .newLine()
            .pauseFor(500)
            .typeString("}")
            .start();
        }
    };
};
function getCodeblockTwo() { // follows the splide slide unique class down to the ID
    const revealSection = document.getElementById('second-typing-trigger') as HTMLElement;
    const codeBlockTwo = revealSection.querySelector('#csCodeblockTwo') as HTMLPreElement;
    setTimeout(() => {
        csTypingAnimationTwo();
    }, csAwaitDelay);


    function csTypingAnimationTwo() { // codeBlockTwo stores the unique HTML el
        if (codeBlockTwo) {
        const csTypingTwo = new TypingAnimation(codeBlockTwo as HTMLPreElement, {
            loop: false,
            typingSpeed: 60,
            deletingSpeed: 100,
            targetElementClassname: 'cs--codeblock--text',
        });

        csTypingTwo
            .typeString(".circle--card__wrapper:hover ")
            .pauseFor(500)
            .newLine()
            .pauseFor(500)
            .typeString(".first--circle--hover--effect,")
            .pauseFor(500)
            .newLine()
            .pauseFor(500)
            .typeString(".circle--card__wrapper:hover ")
            .pauseFor(500)
            .newLine()
            .pauseFor(500)
            .typeString(".second--circle--hover--effect {")
            .pauseFor(500)
            .newLine()
            .tabIndent()
            .pauseFor(500)
            .typeString("transform: scale(12);")
            .pauseFor(500)
            .newLine()
            .tabIndent()
            .pauseFor(500)
            .typeString("opacity: .8;")
            .newLine()
            .pauseFor(500)
            .typeString("}")
            .start()
        }
    };
};
function getCodeblockThree() { // follows the splide slide unique class down to the ID
    const revealSection = document.getElementById('third-typing-trigger') as HTMLElement;
    const codeBlockThree = revealSection.querySelector('#csCodeblockThree') as HTMLPreElement;
    setTimeout(() => {
        csTypingAnimationThree();
    }, csAwaitDelay);

    function csTypingAnimationThree() { // codeBlockThree stores the unique HTML el
        if (codeBlockThree) {
        const csTypingThree = new TypingAnimation(codeBlockThree as HTMLPreElement, {
            loop: false,
            typingSpeed: 40,
            deletingSpeed: 100,
            targetElementClassname: 'cs--codeblock--text',
        });

        csTypingThree
        .typeString(".square--card__wrapper:hover ")
        .pauseFor(500)
        .newLine()
        .pauseFor(500)
        .typeString(".square--hover--effect {")
        .pauseFor(500)
        .newLine()
        .tabIndent()
        .pauseFor(500)
        .typeString("transform: scale(12);")
        .pauseFor(500)
        .newLine()
        .tabIndent()
        .pauseFor(500)
        .typeString("opacity: .8;")
        .pauseFor(500)
        .newLine()
        .pauseFor(500)
        .typeString("}")
        .start();
        }
    };
};
function getCodeblockFour() { // follows the splide slide unique class down to the ID
    const revealSection = document.getElementById('fourth-typing-trigger') as HTMLElement;
    const codeBlockFour = revealSection.querySelector('#csCodeblockFour') as HTMLPreElement;
    setTimeout(() => {
        csTypingAnimationFour();
    }, csAwaitDelay);


    function csTypingAnimationFour() { // codeBlockFour stores the unique HTML el
        if (codeBlockFour) {
        const csTypingFour = new TypingAnimation(codeBlockFour, {
            loop: false,
            typingSpeed: 60,
            deletingSpeed: 100,
            targetElementClassname: 'cs--codeblock--text',
        });
        
        csTypingFour
            .typeString(".icon--float--wrapper {")
            .pauseFor(350)
            .newLine()
            .tabIndent()
            .pauseFor(350)
            .typeString("transform: translateY(85%);")
            .pauseFor(350)
            .newLine()
            .tabIndent()
            .pauseFor(350)
            .typeString("transition: all .7s ease-in-out;")
            .pauseFor(350)
            .newLine()
            .pauseFor(350)
            .typeString("}")
            .pauseFor(350)
            .newLine()
            .pauseFor(350)
            .typeString(".icon--card__wrapper:hover")
            .pauseFor(350)
            .newLine()
            .pauseFor(350)
            .typeString(".icon--float--wrapper {")
            .pauseFor(350)
            .newLine()
            .tabIndent()
            .pauseFor(350)
            .typeString("transform: translateY(0);")
            .pauseFor(350)
            .newLine()
            .pauseFor(350)
            .typeString("}")
            .start()
        }
    };
};
// typing animation section

let particlesFour = (): void => {
let containerEl = document.querySelector('.particle--section--three') as HTMLElement;
let smallParticlesEl = document.querySelector('.small--rising--particles') as HTMLElement;
let mediumParticlesEl = document.querySelector('.medium--rising--particles') as HTMLElement;
let largeParticlesEl = document.querySelector('.large--rising--particles') as HTMLElement;
let colors = ["#6a040f", "#9d0208", "#d00000", "#dc2f02", "#e85d04", "#f48c06", "#faa307", "#ffba08"];
let numberOfParticles = 700 as number;
let particleSpacing = 3500 as number;

function generateParticles(max: number): string {
    let particleString = "0px 0px " + colors[0];
    for (let i = 2; i <= max; i++) {
      let colorIndex = calculateColorIndex(i);
      let particle = generateParticle(colorIndex);
      particleString += ", " + particle;
    }
    return particleString;
   }
   function calculateColorIndex(i: number): number {
    return (i % colors.length) + 1;
   }
   
   function generateParticle(colorIndex: number): string {
    let hOffset = Math.random() * particleSpacing;
    let vOffset = Math.random() * particleSpacing;
    return hOffset + "px " + vOffset + "px " + colors[colorIndex - 1];
   }

smallParticlesEl.style.boxShadow = generateParticles(numberOfParticles);
mediumParticlesEl.style.boxShadow = generateParticles(numberOfParticles);
largeParticlesEl.style.boxShadow = generateParticles(numberOfParticles);

}
document.addEventListener('DOMContentLoaded', () => {
    particlesFour();
});


function createBubbleDivs(num: number): void {
    // Get a reference to the container div
    let container = document.querySelector('.bottom-particles');
  
    // Ensure the container exists
    if (!container) {
       throw new Error("Container div with class 'bottom-particles' not found.");
    }
  
    for (let i = 0; i < num; i++) {
        let div = document.createElement('div');
        div.className = 'bubble--particles';
        container.appendChild(div);
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
    createBubbleDivs(50);
});