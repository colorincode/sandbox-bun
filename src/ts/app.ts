
import './nav.ts';
import '@typeform/embed/build/css/widget.css'
import gsap from 'gsap' ;
// import Draggable from 'gsap/Draggable';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Flip from 'gsap/Flip';
import { TextPlugin} from 'gsap/all';
import { EasePack } from 'gsap/EasePack';
import Reveal from 'reveal.js';
gsap.registerPlugin(
    TextPlugin,
    EasePack,
    Flip,
    // Draggable,
    ScrollTrigger
);


// let loaderInterval: number | null = null;
// const tl: GSAPTimeline = gsap.timeline({ paused: true });
// const loader = document.getElementById("loader");
// const contentContainer = document.getElementById("content-container");
// function showLoader(duration: number = 5000): void {
//     console.log('Showing loader');
//     if (loader && contentContainer) {
//         loader.style.display = "block";
//         contentContainer.style.display = "none";
//         tl.to(loader, {
//           ease: "power4.inOut",
//           "position": "absolute",
//           "width": "100%",
//           "height": "100%",
//           autoAlpha: 1,
//           opacity: 1,
//           onComplete: () => {
//             loader.style.display = "none";
//             loader.style.opacity = "0";
//             loader.style.visibility = "hidden";
//             hideLoader()
//           }
//         });
//         setTimeout(() => hideLoader(), duration);
//     } 
// }

// function hideLoader(): void {
//     console.log('Hiding loader');
//     if (loader && contentContainer) {
//         loader.style.display = "none";
//         contentContainer.style.display = "block";
//         tl.to(contentContainer, {
//           ease: "power4.inOut",
//           yPercent: 0,
//           autoAlpha: 1,
//           opacity: 1,
//           duration: 3,
//         });
//     } 
// }

document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM content loaded, calling showLoader');
    // showLoader();

    console.log('app.ts loaded, WebSocket script should be active');
    let currentYearElement: HTMLElement = document.getElementById("currentYear")!;
    function footerYear() {
      let currentTime = new Date();
      let year = currentTime.getFullYear();
   
      currentYearElement.textContent = year.toString();
      // console.log("current year is " + year);
    }
    if (currentYearElement) {
      footerYear();
  
    }
});

// const hexagon: HTMLElement | null = document.querySelector("#slidein-hexagon");
// const hexagonText: HTMLElement | null = document.querySelector(".text-hexagon-h1");
// if (hexagon) {
//   hexagonText.insertAdjacentHTML("beforeend", `<i class="fa-duotone fa-solid fa-up-right-and-down-left-from-center hexicon-cic"></i>`);

//   tl.to(hexagon, {
//     ease: "none",
//     scale: 1.75,
//     scaleY: 1.75,
//     xPercent: 40,
//     yPercent: -20,
//     opacity: 0.9,
//     duration: 0.5
//   });

//   hexagon.addEventListener("click", () => {
//     console.log("Hexagon clicked"); // Debug log
//     if (tl.progress() === 0 || tl.reversed()) {
//       console.log("Playing animation"); // Debug log
//       tl.play();
//     } else {
//       console.log("Reversing animation"); // Debug log
//       tl.reverse();
//     }
//   });
//   function reverseAnimation(): void {
//     if (tl.progress() > 0 && !tl.reversed()) {
//       tl.reverse();
//     }
//   }
//   document.addEventListener("click", (event: MouseEvent) => {
//     const target = event.target as HTMLElement;
//     if (!target.closest("#slidein-hexagon")) {
//       reverseAnimation();
//       event.stopImmediatePropagation(); //to not break links if hex was interacted
//     }
//   });
// }

//reveal init , need for pages that use it. 


// Event listener for scroll
// window.addEventListener("scroll", gsap.utils.debounce(reverseAllAnimations, 100));




// Get all elements with the data-pagename attr
// const pageElements = document.querySelectorAll('[data-pagename]') as NodeListOf<HTMLElement>;
// const linkElements = document.querySelectorAll('[data-pagename]') as NodeListOf<HTMLElement>;
// const pageAndLinkElements = document.querySelectorAll('[data-pagename], [data-linkname]') as NodeListOf<HTMLElement>;

// Get all elements with the data-pagename attribute
// const elements = document.querySelectorAll('[data-pagename]') as NodeListOf<HTMLElement>;
// const linkElements = document.querySelectorAll('[data-linkname]') as NodeListOf<HTMLElement>;
// // Loop through each element and generate the template literals
// elements.forEach((element, index) => {
//   // Get the current attribute value
// let currentPagenames = element.dataset.pagename;
//   const currentLinknames = element.dataset.linkname;
  
//   function convertLinks(string: any) {
//     return string.toLowerCase();
//   }

//   const currentLinkname = convertLinks(currentLinknames);
//   // Generate the template literal with the modified value
//   const template = `<li  data-pagename="${currentPagenames}"><a href="${currentLinkname}.html" target="_blank" data-linkname="${currentLinkname}"><span class="global__headerwrapper--text">${currentPagenames}</span></a></li>`;
  
//   // Insert the template literal before the current element
//   element.insertAdjacentHTML('beforebegin', template);
  
//   // Remove the current element
//   element.remove();
// });


// pricing page
// button expand icons fucntion
// button expand icons fucntion
const thirdPartybutton = document.querySelector('#thirdPartyButton') as HTMLButtonElement;
function pricingButtonAnimations(): void {
    const languagesButton = document.querySelector('#languagesButton') as HTMLButtonElement;
    const thirdPartyWrapper = document.querySelector('.supported--full--list--section__wrapper') as HTMLElement;
    const languagesWrapper = document.querySelector('.language--full--list--section__wrapper') as HTMLElement;

    thirdPartybutton.addEventListener('click', () => {
      if (thirdPartyWrapper.classList.contains('supported--full--list--animation--forward')) {
        thirdPartyWrapper.classList.remove('supported--full--list--animation--forward');
        thirdPartyWrapper.classList.add('supported--full--list--animation--backward');
      } else {
        thirdPartyWrapper.classList.add('supported--full--list--animation--forward');
        thirdPartyWrapper.classList.remove('supported--full--list--animation--backward');
      }
    });

    languagesButton.addEventListener('click', () => {
        if (languagesWrapper.classList.contains('language--full--list--animation--forward')) {
          languagesWrapper.classList.remove('language--full--list--animation--forward');
          languagesWrapper.classList.add('language--full--list--animation--backward');
        } else {
          languagesWrapper.classList.add('language--full--list--animation--forward');
          languagesWrapper.classList.remove('language--full--list--animation--backward');
        }
    });
}
if (thirdPartybutton) {
pricingButtonAnimations();
}

// pricing page end
