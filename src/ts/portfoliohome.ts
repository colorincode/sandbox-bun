// //imports
// import Reveal from 'reveal.js';
// import './nav.ts';
// import './loader.ts';
// // gsap and scrollmagic imports
// import gsap from 'gsap' ;
// import Draggable from 'gsap/Draggable';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Flip from 'gsap/Flip';
// import { TextPlugin} from 'gsap/all';
// import { EasePack } from 'gsap/EasePack';
// import { loader } from './loader';
// gsap.registerPlugin(
//     TextPlugin,
//     EasePack,
//     Flip,
//     Draggable,
//     ScrollTrigger
// );

//vars 

// const loaderInstance = new loader();
// let timeline = gsap.timeline();
// function initLoader() {
//   // Initialize the loader
//   loaderInstance();

//   // Set initial state of the loader and content
//   gsap.set("#loader", { 
//     opacity: 1, 
//     display: "flex", 
//     position: 'fixed', // Changed to 'fixed' for better positioning
//     top: 0, 
//     left: 0, 
//     width: '100%', 
//     height: '100%',
//     zIndex: 9999 // Ensure loader is on top
//   });
//   gsap.set(".portfoliohomepagegrid__wrapper", { 
//     opacity: 0, 
//     display: "none",
//     scale: 0.95 // Start slightly scaled down for a nice reveal effect
//   });

//   // Start loading content
//   loadContent();
//   console.log("load content");
// }
// function loadContent() {
//   const loadingTime = Math.random() * 4 + 1; // Between 1 and 5 seconds
  
//   timeline.to({}, { 
//     duration: loadingTime, 
//     onComplete: hideLoader 
//   });
// }
// function hideLoader() {
//   let loader = document.querySelector("#loader") as HTMLElement;
  
//   timeline.to("#loader", {
//     duration: 0.9,
//     opacity: 0,
//     ease: "power4.inOut",
//     onComplete: () => {
//       loader.style.display = "none";
//       showContent();
//     }
//   });
// }
// function showContent() {
//   gsap.set(".portfoliohomepagegrid__wrapper", { display: "inherit" });
  
//   timeline.to(".portfoliohomepagegrid__wrapper", {
//     duration: 0.8,
//     scale: 1,
//     opacity: 1,
//     ease: "power4.out",
//     stagger: {
//       each: 0.1,
//       grid: "auto",
//       from: "start",
//       amount: 0.5
//     },
//     onComplete: () => {
//       timeline.kill();
//     }
//   });
// }

// window.addEventListener('load', initLoader);
// document.addEventListener("DOMContentLoaded", animateHexagonsIn);
// document.addEventListener("onready", hideLoader);



// let hexbox = gsap.utils.toArray(".hex--item");
// function animateHexagonsIn() {
// hexbox.forEach(() => {
//     gsap.to(".ccportfoliohome__grid--hexagon", {
//         delay: 0.3,
//         duration: 0.5,
//         scale: 1,
//         // autoAlpha: true,
//         x: 30,
//         y: -10,
//         ease: "power4.inOut",
//         opacity: 1,
//         stagger: {
//           each: 0.1,
//           grid: [2,8],
//           from: "start",
//           amount: 1.5
//         }
//       }); 
// })
// }
// function reorderHexagons() {

//   const state = Flip.getState(hexbox);
  
//   // Shuffle the array
//   gsap.utils.shuffle(hexbox);
  
//   // Reorder the elements in the DOM based on the shuffled array
//   hexbox.forEach((item, index) => {
//     item.style.order = index;
//   });
  
//   // Animate to the new state
//   Flip.from(state, {
//     duration: 0.5,
//     ease: "power1.inOut",
//     stagger: 0.05,
//     onComplete: () => {
//       gsap.to(".ccportfoliohome__grid--hexagon", {
//         duration: 0.3,
//         scale: 1,
//         x: 30,
//         y: -10,
//         ease: "power4.inOut",
//         opacity: 1,
//         stagger: {
//           each: 0.1,
//           grid: [2, 8],
//           from: "start",
//           amount: 1.5
//         }
//       });
//     }
//   });
// }


// function debounce(func, wait) {
//   let timeout;
//   return function executedFunction(...args) {
//     const later = () => {
//       clearTimeout(timeout);
//       func(...args);
//     };
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// }
// const debouncedResize = debounce(() => {
//   // animateHexagonsResize();
//   reorderHexagons();
// }, 250);

// window.addEventListener("resize", debouncedResize);



// //second grid
// let cell = gsap.utils.toArray(".cell");

// cell.forEach(() => {
//     gsap.from(".cell", {

//         duration: 0.5,
//         scale: 0.1,
//         ease: "none",
//         // opacity:0.5,
//         stagger: {
//           each: 0.1,
//           grid: 'auto',
//           from: "edges",
//           amount: 1.5
//         }
//       }); 
//     gsap.to(".cell", {
//         delay: 0.5,
//         duration: 0.75,
//         // scale: 1.2,
//         // autoAlpha: true,
//         x: 10,
//         // y: -20,
//         scale: 1.2,
//         ease: "none",
//         // opacity: 1,
//         stagger: {
//           each: 0.1,
//           grid: 'auto',
//           from: "edges",
//           amount: 1.5
//         }
//       }); 
// })   

// let deck = new Reveal(
//   {
//       // Parallax background image
//   parallaxBackgroundImage: '../../assets/desat-prod-invert-bg.jpg', // e.g. "https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg"

//   // Parallax background size
//   parallaxBackgroundSize: '1632px 780px', // CSS syntax, e.g. "2100px 900px" - currently only pixels are supported (don't use % or auto)

//   // Number of pixels to move the parallax background per slide
//   // - Calculated automatically unless specified
//   // - Set to 0 to disable movement along an axis
//   parallaxBackgroundHorizontal: 200,
//   parallaxBackgroundVertical: 50,
//     disableLayout: true,
//     center: false,
//     hash: true,
//     mouseWheel: false,
//     transition: 'fade',
//     embedded: true,
//     // transitionSpeed: 'medium',
//     backgroundTransition: 'slide',
//     // width:'100%', //needs-fix
//     // height: '100%', //needs-fix
//     // scroll: true,
//     // width:1620 , //needs-fix
//     // height: 980, //needs-fix
//     touch: true,
//     margin: 0,
//     minScale: 1,
//     maxScale: 2
// })
// deck.initialize();
// console.log('be a deck');



// console.log(Reveal);

// const bannerEL = document.querySelector('#slideInThingyColor') as HTMLElement;

// // Function to update the banner with the current slide name
// function updateBanner(slideName: string) {
//     if (bannerEL) {
//         bannerEL.textContent = slideName;
//     }
// }
// function updateBannerColor(slideColor: string) {
//     if (bannerEL) {
//         bannerEL.style.color = slideColor;
//     }
// }

// // Listen for slide changes
// Reveal.addEventListener('slidechanged', function(event) {
//     // Get all elements with the class 'present'
//     const presentElements = document.getElementsByClassName('present');
//     console.log(presentElements);
//     // Check if there are any elements with the 'present' class
//     if (presentElements.length > 0) {
//         // Assuming the first element with 'present' class is the current slide
//         const currentSlideElement = presentElements[0] as HTMLElement;
//         const slideName = currentSlideElement?.getAttribute('data-slide-name');
//         const slideColor = currentSlideElement?.getAttribute('data-slide-color');
//         if (slideName) {
//             // Update the banner with the slide name
//             updateBanner(slideName as string);
//             updateBannerColor(slideColor as string);
//         } else {
//             const defaultSlideName = 'PORTFOLIO' as string;
//             const defaultSlideColor = 'rgb(32, 35, 36)' as string;
//             updateBanner(defaultSlideName as string);
//             updateBannerColor(defaultSlideColor as string);
//         }
//     }
    
// });


// // Initial update to set the banner for the first slide
// const firstSlideElement = Reveal.getSlides()[0];
// const firstSlideName = firstSlideElement?.getAttribute('data-slide-name');
// const firstSlideNameString = firstSlideName?.toString();

// updateBanner(firstSlideNameString as string);



// function updateTargetElement(slideName: string) {
//      let currentClass = document.querySelectorAll('.present');


//     if (currentClass === currentClass) {
//         console.log('current class selected');
//     }
//     // if (bannerEL) {
//     //         bannerEL.textContent = slideName;
//     //     }
//     // }

//     const observer = new MutationObserver((mutationsList) => {
//         mutationsList.forEach((mutation) => {
//             if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
//                 const target = mutation.target as HTMLElement;
//                 if (target.classList.contains('present')) {
//                     const pagenameswapEl = target.querySelector('.pagenameswap');
//                     if (pagenameswapEl) {
//                         if (pagenameswapEl.textContent !== null) {
//                             updateTargetElement(pagenameswapEl.textContent);
//                         } else {
//                             console.log('uh oh, stinkeyyyyyy!');
//                         }
//                     }
//                 }
//             }
//         });
//     });


//     slides.forEach(slide => observer.observe(slide, { attributes: true }));

//resize functions


// poop
// document.addEventListener('DOMContentLoaded', () => {

//     const bannerEL = document.querySelector('#slideInThingyColor');

//     function updateTargetElement(slideName: string) {
//         if (bannerEL) {
//             bannerEL.textContent = slideName;
//         }
//     }

//     const observer = new MutationObserver((mutationsList) => {
//         mutationsList.forEach((mutation) => {
//             if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
//                 const target = mutation.target as HTMLElement;
//                 if (target.classList.contains('present')) {
//                     const pagenameswapEl = target.querySelector('.pagenameswap');
//                     if (pagenameswapEl) {
//                         if (pagenameswapEl.textContent !== null) {
//                             updateTargetElement(pagenameswapEl.textContent);
//                         } else {
//                             console.log('uh oh, stinkeyyyyyy!');
//                         }
//                     }
//                 }
//             }
//         });
//     });

//     const slides = document.querySelectorAll('.slide-selector');
//     slides.forEach(slide => observer.observe(slide, { attributes: true }));
// });
// poop

// document.addEventListener('DOMContentLoaded', () => {

//     // Get all elements with the data-pagename attribute
//     const pageElements = document.querySelectorAll('[data-pagename]') as NodeListOf<HTMLElement>;
//     // const linkElements = document.querySelectorAll('[data-pagename]') as NodeListOf<HTMLElement>;
//     const pageAndLinkElements = document.querySelectorAll('[data-pagename], [data-linkname]') as NodeListOf<HTMLElement>;
//     // Loop through each element and generate the template literals

//     pageAndLinkElements.forEach((element, index) => {
//         // Get the current attribute value
//         const currentPagename = element.dataset.pagename;
    
//         // function convertPageNames(string: any) {
//         //     document.querySelector("[data-pagename]")!.textContent = currentLinkName;
//         //     return string.toLowerCase();
//         //   }
//         //   const currentPagename = convertPageNames(currentPagenames);

        
//         const currentLinknames = element.dataset.linkname;
//         function convertLinks(string: any) {
//           return string.toLowerCase();
//         }
//         const currentLinkName = convertLinks(currentLinknames);
    
//         // Generate the template literal with the modified value
//         const template = `<li><a href="${currentLinkName}.html" target="_blank" data-linkname=""><span class="global__headerwrapper--text" data-pagename="">${currentPagename}</span></a></li>`;
//         console.log(template);
//         // Insert the template literal before the current element
//         element.insertAdjacentHTML('beforebegin', template);
//         // Remove the current element
//         element.remove();
      
      
//       });
    
// });

// traceSvg();
// function traceSvg() {
//   TweenMax.set(".hexboyclip", {
//     drawSVG: '0% 0%'
//   });
// let tm = TimelineMax();
// tm.staggerTo(".hexboyclip", 1, { drawSVG: "100%", ease: Linear.easeNone, delay: 0.5 }, 0.5);
//   // let tl = new TimelineMax() ;
//   // tl.to(".hexboyclip", 2, {
//   //   drawSVG: '0% 100%',
//   //   ease: Power4.easeInOut
//   // });
// }

// let deck2 = new Reveal( mainportfolioDeck, {
//   // embedded: true,
//   // disableLayout: true,
//   center: false,
//   hash: true,
//   // mouseWheel: false,
//   transition: 'slide',
//   transitionSpeed: 'slow',
//   backgroundTransition: 'slide',
//   width:'100%' , //needs-fix
//   height: '100%', //needs-fix
//   margin: 0,
//   scroll: true,
//   // minScale: 1,
//   // maxScale: 1
// } );
// deck2.initialize();
// console.log('reveal loaded');
// let portfoliodeckWrapper = document.querySelector('.portfoliopagegrid__wrapper') as HTMLElement;

// let deck1 = new Reveal( firstofDeck, {
//   embedded: true,
//  disableLayout: true,
//   center: false,
//   hash: true,
//   // mouseWheel: false,
//   transition: 'slide',
//   transitionSpeed: 'fast',
//   width:1620 , //needs-fix
//   height: 980, //needs-fix
//   // backgroundTransition: 'slide',
//   // width:100, //needs-fix
//   // height: 100, //needs-fix
//   margin: 0,
//   minScale: 1,
//   maxScale: 1,
//   // view: 'scroll',
//   keyboardCondition: 'focused' // only react to keys when focused
// } );
// deck1.initialize();
// console.log('deck1 initialized');
// let deck2 = new Reveal( mainportfolioDeck, {
//   embedded: true,
//   disableLayout: true,
//   center: false,
//   hash: true,
//   mouseWheel: false,
//   transition: 'slide',
//   transitionSpeed: 'slow',
//   backgroundTransition: 'slide',
//   width:'100%' , //needs-fix
//   height: '100%', //needs-fix
//   margin: 0,
//   // minScale: 1,
//   // maxScale: 1
// } );
// deck2.initialize();
// console.log('deck2 initialized');

// if (mainportfolioDeck) {
//   deck1.destroy();
//   revealSelector.style.width = '100vw';
//   revealSelector.style.height = '100vh';
//   Reveal.layout();
//   console.log('reveal layout called');
// } else {
//   deck2.destroy();
// }
// if (firstofDeck) {
//   deck2.destroy();
//   revealSelector.style.width = '100vw';
//   revealSelector.style.height = '100vh';
//   Reveal.layout();
// } else {
//   deck1.destroy();
// }
// console.log('decks destroyed');
// console.log('portfoliodeckWrapper');
// let portfoliodeck = new Reveal(
  
//   {
//     disableLayout: true,
//     center: false,
//     hash: true,
//     mouseWheel: false,
//     transition: 'slide',
//     transitionSpeed: 'slow',
//     backgroundTransition: 'slide',
//     width:100, //needs-fix
//     height: 100, //needs-fix
//     margin: 0,
//     minScale: 1,
//     maxScale: 1
// })



// portfoliodeck.initialize();
// console.log('be a deck');

// let mainportfolioDeck = new Reveal().initialize({
//   hash: true,
//   mouseWheel: false,
//   transition: 'slide',
//   transitionSpeed: 'slow',
//   backgroundTransition: 'slide',
//   width:100, //needs-fix
//   height: 100, //needs-fix
//   margin: 0,
//   minScale: 1,
//   maxScale: 1
// });
// console.log('big deck loaded');
// reveal layout first slide
// if (firstofDeck) {
//     firstofDeck.style.width = '100vw';
//     firstofDeck.style.height = '100%';
//     firstofDeck.style.display = 'flex !important';
//     console.log('first of deck resized');
//     Reveal.layout();
// }

// gsap.registerPlugin(Flip);
// Intro animation
//const timeline = gsap.timeline();
//  gsap: {
//   registerPlugin: (...args: any[]) => void;
//   timeline: (vars: any) => any;
//   getTweensOf: (targets: any, onlyActive: any) => any;
//   getProperty: (target: any, property: any, unit: any, uncache: any) => any;
//   to: (targets: any, vars: any) => any;
//   from: (targets: any, vars: any) => any;
//   set: (targets: any, vars: any) => any;
//   utils: {
//     toArray: (value: any) => any;
//   };
//  }
// let to: (targets: any, vars: any) => any;

// window.addEventListener("load", () => {
//   gsap.to(".grid", { autoAlpha: 1, duration: 0.4 });
//   gsap.from(".grid .item", {
//     autoAlpha: 0,
//     yPercent: 30,
//     stagger: 0.04
//   });
// });

// function nextState() {
//   const state = Flip.getState(".row", {
//     props: "marginLeft, display, transform, opacity",
//     // absolute: true,
//    normal: true,
//     simple: true
//   });

//   Flip.to(state, {
//     duration: 1.8,
//     ease: "power4.inOut",
//     stagger: 0.5,
//     absolute: true,
//     // scale:false,
//     // style: { 
//     //   transform: "scale(0.5)", 
//     //   marginLeft: "0px",
//     //   display: "flex",
//     // },
//     fade: true,

//     // absoluteOnLeave: true,
//     // toggleClass: "odd-row",
//     onEnter: (elements:any, animation:any) => timeline.from(elements, {
//       opacity: 0,
//       duration: 0.5,
//       delay: animation.duration() - 0.1
//     }),
//     // onLeave: (elements: any) => timeline.to(elements, { opacity: 0 })
//   });
// }

// window.addEventListener("load", nextState);
// console.log('next state called');


// dragHoneycomb();

// const bgs = gsap.utils.toArray(".bg1, .bg2, .bg3");
// const honeycomb = document.querySelector(".honeycomb") as any;
// const hexagons = document.querySelector(".cell") as any;
// function dragHoneycomb() {
//   Draggable.create(( hexagons), {
//     type: "x",
//     edgeResistance: 0.5,
//     snap: { x: [0, -360, -680] },
//     zIndexBoost: false,
//     onDragEnd: function () {
//       let index = this.endX === 0 ? 2 : this.endX === -360 ? 1 : 0;
//       timeline.to(bgs, {
//         scale: (i: number) => i === index ? 1 : 2,
//         opacity: (i: number) => i === index ? 1 : 0
//       });
//     },
//     onClick(e: { target: { closest: (arg0: string) => any; }; }) {
//       // activate(items.indexOf(e.target.closest(".item")));
//     },
//     inertia: true,
//     allowContextMenu: false,
//     bounds: {
//       minX: -hexagons.offsetWidth + honeycomb.offsetWidth,
//       maxX: 0
//     },
//   });
// }
// function nextState() {
//   const state = Flip.getState(".honeycomb .cell", {props: "color,backgroundColor", simple: true}); // capture current state

//   Flip.from(state, {
//     absolute: true,
//     stagger: 0.07,
//     duration: 0.7,
//     ease: "power2.inOut",
//     simple: true,
//     onEnter: (elements: any, animation: any) => timeline.from(elements, {opacity: 0}, {opacity: 1, delay: animation.duration() - 0.1}),
//     onLeave: (elements: any) => timeline.to(elements, {opacity: 0})
//   });
// }

// class HoneycombAlign {
//   private cells: HTMLElement[];

//   constructor() {
//     this.cells = Array.from(document.querySelectorAll<HTMLElement>('.honeycomb .cell'));
//     console.log(`Total cells: ${this.cells.length}`);
//     this.arrangeInHoneycomb();
//     window.addEventListener('resize', () => this.arrangeInHoneycomb()); // Adjusting the event listener
//   }

//   private arrangeInHoneycomb(): void {
//     const cellWidth = this.cells[0].getBoundingClientRect().width;
//     const cellHeight = this.cells[0].getBoundingClientRect().height;
//     const containerWidth = document.querySelector('.honeycomb')?.getBoundingClientRect().width || 0;

//     const cellsPerRow = Math.floor(containerWidth / cellWidth);
//     const verticalSpacing = cellHeight * 0.75;

//     this.cells.forEach((cell, index) => {
//       const row = Math.floor(index / cellsPerRow);
//       const isEvenRow = row % 2 === 0;
//       const col = isEvenRow ? index % cellsPerRow : cellsPerRow - 1 - (index % cellsPerRow);

//       const leftOffset = col * cellWidth + (isEvenRow ? 0 : cellWidth / 2);
//       const topOffset = row * verticalSpacing;

//       cell.style.position = 'absolute';
//       cell.style.left = `${leftOffset}px`;
//       cell.style.top = `${topOffset}px`;

//       console.log(`Cell ${index + 1}: Left: ${leftOffset}px, Top: ${topOffset}px`);
//     });
//   }
// }

// const honeycomb = new HoneycombAlign();




// let tl = anime.timeline({
//     easing: 'easeInOutSine',
//     duration: 3000,
//     loop: false,
//   });
//   tl.add({
//     targets: '#name-g path',
//     opacity: [0, 1],
//   })
//     .add({
//     delay: 1000,
//     duration: 2700,
//     targets: '.line-away',
//     opacity: [1, 0]
//   }, 2700)
//     .add({
//     targets: '.brackets-animation',
//     opacity: [1, 0]
//   });


  // (() => {
  //   const isoddlen = (i:any) => i % 2;
  //   const align = () => {
  //     console.log('align function called');
  //     const cells = document.querySelectorAll('.honeycomb .cell') as any;
  //     let lastLeft = -500;
  //     let is_odd = false;
  
  //     for (let i = 0; i < cells.length; i++) {
  //       const pos = cells[i].getBoundingClientRect();
  
  //       if (pos.left < lastLeft) {
  //         is_odd = !is_odd;
  //         console.log('is_odd:', is_odd);
  //       }
  
  //       if (is_odd) {
  //         cells[i].classList.add('odd-row');
  //       } else {
  //         cells[i].classList.remove('odd-row');
  //       }
  
  //       lastLeft = pos.left;
  //     }
  //   };
  
  //   align();
  //   window.addEventListener('resize', align, false);
  // })();
  
  // (() => {
  //   function isoddlen(i: number) {
  //     return i % 2;

  //   }
  
  //   const align = () => {
  //     const cells = document.querySelectorAll('.honeycomb .cell') as any;
  //     let lastLeft = -500;
  //     let is_odd = false;
  //     let rows: Element[][] = [[]];
  //     let j = 0;
  //     for(let i = 0; i < cells.length; i++) {
  //       const pos = cells[i].getBoundingClientRect();
  //       if( pos.left < lastLeft ) {
  //         is_odd = !is_odd;
  //         j++;
  //         rows[j] = [];
  //       }
  //       rows[j].push( cells[i] );
  //       lastLeft = pos.left;
  //       if( is_odd ) {
  //         cells[i].classList.add('odd-row');
  //       } else {
  //         cells[i].classList.remove('odd-row');
  //       }
  //     }
  //     for( let i = 0; i < rows.length - 1; i++ ) {
  //       if( isoddlen( rows[i].length ) !== isoddlen( rows[i+1]?.length ) ) {
  //         for( let j = 0; j < rows[i+1]?.length; j++ ) {
  //           rows[i+1][j].classList.toggle('odd-row');
  //           console.log(isoddlen);
  //         }
  //       }
  //     }
  //   };
  //   align();
  //   window.addEventListener('resize', align, false);
  // })();
  
  

// bracketsMove();


// function bracketsMove() {
//   var elements = document.querySelectorAll('.brackets-animation');
//   anime({
//     easing: 'easeInOutQuad',
//     delay: 4000,
//     duration: 2500,
//     loop: false,
//     targets: elements,
//     translateX: { value: 1512 },
//     translateY: { value: 685 },
//     scale: [1, .13]
//   });
// }

//old imports
// import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
// import { style } from './@splidejs/utils/dom/style/style';
// import { addClass } from './@splidejs/utils/dom/addClass/addClass';


// old funcs 
// lineAway();

// function lineAway() {
//   var lineAwayVar = document.querySelectorAll('.line-away');
//   anime({

//     easing: 'easeOutSine',
//     duration: 5000,
//     loop: false,
//     targets: lineAwayVar,
//     delay: 6500,
//     translateX: 10000
//   });
//   console.log("it worky");
// }