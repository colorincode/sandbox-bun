// gsap and scrollmagic imports
import gsap from 'gsap' ;
import Draggable from 'gsap/Draggable';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Flip from 'gsap/Flip';
import { TextPlugin} from 'gsap/all';
import { EasePack } from 'gsap/EasePack';
import {ScrollToPlugin} from "gsap/ScrollToPlugin" ;


gsap.registerPlugin(
    TextPlugin,
    EasePack,
    Flip,
    Draggable,
    ScrollTrigger,
    ScrollToPlugin,
);
const requestAnimationFrame = window.requestAnimationFrame ;



let links = gsap.utils.toArray(".susa--side-nav-ul-li-link");

links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        let targetElement = link.getAttribute("href");
        
        gsap.to(window, {
            duration: 2,
            scrollTo: targetElement,
            ease: "power2.out",
            onComplete: () => {
                // Optional: Update active class
                links.forEach(el => el.classList.remove("active"));
                link.classList.add("active");
            }
        });
    });
});





// function scrollTween() {
//   let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);
// let sections =gsap.utils.toArray("section") as [];

// sections.forEach((section, i) => {
//   let sectionBg = document.querySelector(".susa-fs") as HTMLElement;
  
//   // the first image (i === 0) should be handled differently because it should start at the very top.
//   // use function-based values in order to keep things responsive
//   gsap.fromTo(sectionBg, {
//     backgroundPosition: () => i ? `50% ${-window.innerHeight * getRatio(section)}px` : "50% 0px"
//   }, {
//     backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(section))}px`,
//     ease: "none",
//     scrollTrigger: {
//       trigger: section,
//       start: () => i ? "top bottom" : "top top", 
//       end: "bottom top",
//       scrub: true,
//       invalidateOnRefresh: true // to make it responsive
//     }
//   });

// });
  // let sections = gsap.utils.toArray(".susa-fs");
  // let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);
  // let movementFactor = 0.8;
  // sections.forEach((section) => {
  //   let sectionBg = document.querySelector(".susa-fs") as HTMLElement;

  //   gsap.fromTo(sectionBg, {
  //     y: () => section ? -movementFactor * 0.5 * sectionBg.scrollTop : 0
  //   }, {
  //     y: () => movementFactor * 0.5 * sectionBg.scrollTop,
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: sectionBg,
  //       start: () => section ? "top bottom" : "-1px top", 
  //       end: "bottom top",
  //       scrub: true,
  //       invalidateOnRefresh: true // to make it responsive
  //     }
  //   });
  // });
// }
// window.addEventListener("resize", () => scrollTween());
// window.addEventListener("onready", () => {
//   scrollTween();
// })

function flyOut() {
  const gallery = document.querySelector<HTMLElement>(".susa--gallery");
  const expandBtn = document.querySelector<HTMLElement>(".tile-flyout-btn");

  if (!gallery || !expandBtn) {
    console.error("Required elements not found");
    return;
  }

  const thisHeight = gallery.scrollHeight;

  gsap.set(gallery, {
    height: 0,
    autoAlpha: 0,
    display: "none"
  });

  const tl = gsap.timeline({ paused: true });

  tl.to(gallery, {
    duration: 1,
    height: thisHeight,
    autoAlpha: 1,
    display: "grid",
    ease: "cubic.inOut"
  });

  expandBtn.addEventListener("click", () => {
    gallery.classList.toggle("is-expanded");

    if (gallery.classList.contains("is-expanded")) {
      tl.play();
    } else {
      tl.reverse();
    }
  });
}

document.addEventListener("DOMContentLoaded", flyOut);
