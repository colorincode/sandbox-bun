
// gsap imports
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

// // jquery import/export, will need this for build to compile correctly 
// import * as jquery from 'jquery';
// (window as any).$ = (window as any).jQuery = jquery;

// gsap.registerPlugin(Flip);
// gsap.registerPlugin(ScrollTrigger); 
// gsap.registerPlugin(TweenLite, TweenMax, TimelineMax, TimelineLite, SteppedEase);
// gsap.registerPlugin(TextPlugin);
// console.log("gsap controller loaded");


// let timeline = gsap.timeline();
// let webDevBox = document.getElementById('webdev');



// let timeline = gsap.timeline();
// let webDevBox = document.getElementById('webdev');
// let servicesWrap = document.querySelector('.cc__serviceswrapper--outer');

// const killScrub = (trigger: { getTween: () => any; animation: { progress: (arg0: any) => void; }; progress: any; }) => {
//   let scrub = trigger.getTween ? trigger.getTween() : gsap.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
//   scrub && scrub.pause();
//   trigger.animation.progress(trigger.progress);
// };



// document.addEventListener('DOMContentLoaded', () => {
//   homeScroll;
//   getintouchScroll();
//   scrollLead();
//   scrollServices();
//   scrollPricing();
// });


// const homeScroll = ScrollTrigger.defaults({
//   toggleActions: "restart pause resume pause",
//   scroller: ".homepage",
//   onRefresh: killScrub,
// });

// const { webDevAnimate, marketingBox, seoBox, designBox } = animateBoxes();

// const { portfolioOne, portfolioTwo, portfolioThree, portfolioFour } = animateportfolioBoxes();








// function getintouchScroll() {
//   timeline.to(".cc__serviceswrapper--outer", {
//     scrollTrigger: {
//       trigger: ".cc__serviceswrapper--inner", // when section enters viewport (once)
//       start: "top center", // top of viewport
//       end: "bottom 20%-=200px", // bottom of viewport
//       // end: "bottom 20%-=300px", // bottom of viewport
//       pause: true,
//       //  pin: true,
//       scrub: 1,
//       toggleActions: 'play pause resume reset',
//       // markers: true,
//       onEnter: () => {
//         // console.log("enter");
//         webDevAnimate.play();
//         marketingBox.play();
//         seoBox.play();
//         designBox.play();
//       },
//       onLeave: () => {
//       //  console.log("leave");
//         webDevAnimate.reverse();
//         marketingBox.reverse();
//         seoBox.reverse();
//         designBox.reverse();
//         webDevAnimate.reset();
//         marketingBox.reset();
//         seoBox.reset();
//         designBox.reset();
//       },
//       onEnterBack: () => {
//       //  console.log("enter back");
//         webDevAnimate.play();
//         marketingBox.play();
//         seoBox.play();
//         designBox.play();
       
//       },
//       onLeaveBack: () => {
//         // console.log("leave back");
//         // webDevAnimate.reset();
//         // marketingBox.reset();
//         // seoBox.reset();
//         // designBox.reset();
//         webDevAnimate.reverse();
//         marketingBox.reverse();
//         seoBox.reverse();
//         designBox.reverse();
//       },
//     }, 
//     duration: 1,
//     ease: Power4.easeInOut,
//     stagger: 0.2,
//     delay: 0.5,
//     opacity: 1, 
//   });
// }

// function scrollLead() {
//   timeline.to(".cc__pricinghome--outer", {
//     scrollTrigger: {
//       trigger:".cc__serviceswrapper--outer",
//       start: "top center",
//       // pin:true,
//       // pinSpacing: false,
//       // invalidateOnRefresh: true,
//       scrub: 1,
//       end: "bottom 50%-=200px",
//       // toggleActions: 'play pause resume reset',
//     },
//     duration: 2,
//     ease: Power4.easeInOut,
//     stagger: 0.2,
//     delay: 0.5,
//     opacity: 1, 
//     // smooth: 1

//     // rotation: 360
//   });
// }

// function scrollServices() {
//   timeline.to(".cc__serviceswrapper--outer", {
//     scrollTrigger: {
//       trigger:".cc__serviceswrapper--outer",
//       // pin:true,
//       // pinSpacing: false,
//       scrub: 1,
//       start: "top center",
//       end: "bottom 20%-=200px",
//       // toggleActions: 'play pause resume reset',
//     },
//     duration: 2,
//     ease: Power4.easeInOut,
//     stagger: 0.2,
//     delay: 0.5,
//     opacity: 1,
//     // smooth: 1
//     // rotation: 360
//   });
// }

// function scrollPricing() {
//   timeline.to(".cc__portfoliohome--outer", {
//     scrollTrigger: {
//       trigger:".cc__portfoliohome--inner",
//       // pin:true,
//       // pinSpacing: false,
//       scrub: 1,
//       start: "top center",
//       // end: "bottom 10%-=200px",
//       toggleActions: 'play pause resume reset',
//       markers: true,
//       onEnter: () => {
//         console.log("enter");
//         portfolioOne.play();
//         portfolioTwo.play();
//         portfolioThree.play();
//         portfolioFour.play();
//       },
//       onLeave: () => {
//        console.log("leave");
      
//         portfolioOne.reset();
//         portfolioTwo.reset();
//         portfolioThree.reset();
//         portfolioFour.reset();
//       },
//       onEnterBack: () => {
//        console.log("enter back");
//         // portfolioOne.play();
//         // portfolioTwo.play();
//         // portfolioThree.play();
//         // portfolioFour.play();
//          portfolioOne.reverse();
//         portfolioTwo.reverse();
//         portfolioThree.reverse();
//         portfolioFour.reverse();
//       },
//       onLeaveBack: () => {
//         console.log("leave back");
//           portfolioOne.play();
//         portfolioTwo.play();
//         portfolioThree.play();
//         portfolioFour.play();
//         // portfolioOne.reset();
//         // portfolioTwo.reset();
//         // portfolioThree.reset();
//         // portfolioFour.reset();
//         // portfolioOne.reverse();
//         // portfolioTwo.reverse();
//         // portfolioThree.reverse();
//         // portfolioFour.reverse();
//       },
//     }, 
//     duration: 1,
//     ease: Power4.easeInOut,
//     stagger: 0.45,
//     delay: 0.35,
//     opacity: 1, 
    
//   });
// }
// // timeline.to(".red", {
// //   scrollTrigger: {
// //     trigger: ".red",
// //     toggleActions: "restart pause reverse pause"
// //   }, 
// //   duration: 1, 
// //   backgroundColor: "#FFA500", 
// //   ease: "none"
// // });

// // timeline.to(".yoyo p", {
// //   scrollTrigger: ".yoyo", 
// //   scale: 2, 
// //   repeat: -1, 
// //   yoyo: true, 
// //   ease: "power2"
// // });
// // // is any part of the element in the viewport?
// // if (ScrollTrigger.isInViewport(element)) {
// //   // you can use selector text
// //   // do stuff
// // }


// function animateBoxes() {
//   const webDevAnimate = timeline.from('#webdev', 1, {
//     // ScrollTrigger: webDevBox,
//     x: 400,
//     opacity: 0,
//     stagger: 0.2,
//     delay: 0.5,
//     ease: Power4.easeInOut
//   }, '=-1');
//   const marketingBox = timeline.from('#marketing', 1, {
//     x: -300,
//     opacity: 0,
//     stagger: 0.4,
//     ease: Power4.easeInOut
//   }, '=-0.75');

//   const seoBox = timeline.from('#seo', 1, {
//     y: 100,
//     opacity: 0,
//     stagger: 0.6,
//     ease: Power4.easeInOut
//   }, '=-0.5');
//   const designBox = timeline.from('#design', 1, {
//     y: -200,
//     opacity: 0,
//     stagger: 0.8,
//     ease: Power4.easeInOut
//   }, '=-0.75');
//   return { webDevAnimate, marketingBox, seoBox, designBox };
// }


// function animateportfolioBoxes() {
//   const portfolioOne = timeline.from('#portfolioOne', 1, {
//     // ScrollTrigger: webDevBox,
//     y: -25,
//     opacity: 1,
//     stagger: 0.2,
//     delay: 0.25,
//     ease: Power4.ease
//   }, '=-0.75');
//   const portfolioTwo = timeline.from('#portfolioTwo', 1, {
//     y: 25,
//     opacity: 1,
//     stagger: 0.4,
//     ease: Power4.easeInOut
//   }, '=-0.75');

//   const portfolioThree = timeline.from('#portfolioThree', 1, {
//    y: -25,
//     opacity: 1,
//     stagger: 0.6,
//     ease: Power4.easeInOut
//   }, '=-0.75');
//   const portfolioFour = timeline.from('#portfolioFour', 1, {
//     y: 25,
//     opacity: 1,
//     stagger: 0.8,
//     ease: Power4.easeInOut
//   }, '=-0.75');
//   return { portfolioOne, portfolioTwo, portfolioThree, portfolioFour };
// }
// class ScrollComponent {
//   timeline: any;

//   constructor() {
//     this.timeline = gsap.timeline();
//     this.killScroll();
//     this.createScroll();
//     this.onLoad();
//   }
 
//   killScroll(): void {
//     (ScrollTrigger as any).create({
//       toggleActions: "play pause resume reset",
//       onRefresh: () => {
//         this.timeline.progress((ScrollTrigger as any).progress());
//       },
//     });
//   }

//   createScroll(): void {
//     ScrollTrigger.defaults({
//       toggleActions: "play pause resume reset",
//       onRefresh: this.killScroll.bind(this),
//     });
//   }
//   onLoad(): void {
//     document.addEventListener('DOMContentLoaded', () => {
//       console.log('DOM fully loaded and parsed');
//       this.wordsAnimation();
//       this.webDevMove();
//       this.designMove();
//       this.marketingMove();
//       this.seoMove();
//       this.scrollAbout();
//       this.scrollServices();
//       this.scrollPricing();
//       this.scrollPortfolio();
//       this.scrollContact();
//     });
//   }

//   wordsAnimation(): void {
//     let timeline = gsap.timeline({paused:true}) as any;
//     let words = gsap.utils.toArray("svg text");
//     let timePerCharacter = 0.075;
//     words.forEach((el: { innerHTML: string | any[]; }) => {
//       timeline.from(el, {
//           text: "",
//           duration: el.innerHTML.length * timePerCharacter,
//           ease: Power4.easeOut
//       }, 0);
//   });
//   }

//     webDevMove(): void { 
//       console.log("webdev move");
//       let timeline = gsap.timeline() as any;
//       let webDevBox = document.getElementById('webdev') as HTMLElement;
//       timeline.from(webDevBox, 1, {
//       ScrollTrigger: webDevBox,
//       x: 400,
//       opacity: 0,
//       stagger: 0.2,
//       delay: 0.5,
//       ease: Power4.easeInOut
//     }, '=-1');
//   }
//   designMove(): void { 
//     let timeline = gsap.timeline() as any;
//     let designBox = document.getElementById('design') as HTMLElement;
//     timeline.from(designBox, 1, {
//     y: -200,
//     opacity: 0,
//     stagger: 0.8,
//     ease: Power4.easeInOut
//   }, '=-0.75');
//   }
//   marketingMove(): void { 
//     console.log("marketing move");
//     let timeline = gsap.timeline() as any;
//     let marketingBox = document.getElementById('marketing') as HTMLElement;
//     timeline.from(marketingBox, 1, {
//     x: -300,
//     opacity: 0,
//     stagger: 0.4,
//     ease: Power4.easeInOut
//   }, '=-0.75');
//   }
//   seoMove(): void { 
//     let timeline = gsap.timeline() as any;
//     let seoBox = document.getElementById('seo') as HTMLElement;
//     timeline.from(seoBox, 1, {
//     y: 100,
//     opacity: 0,
//     stagger: 0.6,
//     ease: Power4.easeInOut
//   }, '=-0.5');
// }

//   scrollAbout (): void {
//     let timeline = gsap.timeline() as any;
//     let aboutBox = document.querySelector('.cc__abouthome--outer') as HTMLElement;
//     timeline.from(aboutBox, 1, {
//     y: -200,
//     opacity: 0,
//     stagger: 0.8,
//     ease: Power4.easeInOut
//   }, '=-0.75');
//     }
//   scrollServices (): void {
//     let timeline = gsap.timeline() as any;
//     let servicesBox = document.querySelector('.cc__serviceswrapper--outer') as HTMLElement;
//     timeline.from(servicesBox, 1, {
//     y: -200,
//     opacity: 0,
//     stagger: 0.8,
//     ease: Power4.easeInOut
//   }, '=-0.75');
//     }
//     scrollPricing (): void {
//       let timeline = gsap.timeline() as any;
//       let pricingBox = document.getElementById('pricing') as HTMLElement;
//       timeline.from(pricingBox, 1, {
//       y: -200,
//       opacity: 0,
//       stagger: 0.8,
//       ease: Power4.easeInOut
//     }, '=-0.75');
//       }
//   scrollPortfolio (): void {  
//     let timeline = gsap.timeline() as any;
//     let aboutBox = document.querySelector('.cc__portfoliohome--outer') as HTMLElement;
//     timeline.from(aboutBox, 1, {
//     y: -200,
//     opacity: 0,
//     stagger: 0.8,
//     ease: Power4.easeInOut
//   }, '=-0.75');
//     }
//   scrollContact (): void {  
//     let timeline = gsap.timeline() as any;
//     let contactBox = document.querySelector('.cc__getintouchhome--outer') as HTMLElement;
//     timeline.from(contactBox, 1, {
//     y: -200,
//     opacity: 0,
//     stagger: 0.8,
//     ease: Power4.easeInOut
//   }, '=-0.75');
//     }
// }


// class HomeBoxes extends ScrollComponent {
//   constructor() {
//     super();
//   }
// }

// class SectionBoxes extends ScrollComponent {
//   constructor() {
//     super();
//   }
// }

// // Instantiate the components
// new ScrollComponent();
// new HomeBoxes();
// new SectionBoxes();