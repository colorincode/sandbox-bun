//imports
import * as any from 'reveal.js';
import gsap from 'gsap' ;
import Draggable from 'gsap/Draggable';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Flip from 'gsap/Flip';
import { TextPlugin} from 'gsap/all';
import { EasePack } from 'gsap/EasePack';
import Reveal from 'reveal.js';



gsap.registerPlugin(
    TextPlugin,
    EasePack,
    Flip,
    Draggable,
    ScrollTrigger
);
//vars 
let firstofDeck = document.querySelector('.portfoliopagegrid__wrapper') as HTMLElement;
let mainportfolioDeck = document.querySelector('.mainportfoliodeck') as HTMLElement;
let revealSelector = document.querySelector('.reveal') as HTMLElement;
// let Reveal.Options as any;
let timeline = gsap.timeline();
// const Draggable = gsap.Draggable;
// let draggable = gsap.utils.toArray(".honeycomb .cell");
//reveal init

// let mainportfolioDeck = document.querySelector('.reveal') as HTMLElement;
console.log('reveal init');
Reveal.initialize({
  center: true,
  hash: true,
  // plugins: [ RevealHighlight ]
});

let deck = new Reveal(
  {
    
    disableLayout: true,
    center: false,
    hash: true,
    mouseWheel: false,
    transition: 'slide',
    transitionSpeed: 'slow',
    backgroundTransition: 'slide',
    // width:'100%', //needs-fix
    // height: '100%', //needs-fix
    // scroll: true,
    margin: 0,
    minScale: 1,
    maxScale: 2
})

deck.initialize();
console.log('be a deck');

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

function nextState() {
  const state = Flip.getState(".row", {
    props: "marginLeft, display, transform, opacity",
    // absolute: true,
  //  normal: true,
    simple: true
  });

  Flip.to(state, {
    duration: 1.8,
    ease: "power4.inOut",
    stagger: 0.5,
    absolute: true,
    // scale:false,
    // style: { 
    //   transform: "scale(0.5)", 
    //   marginLeft: "0px",
    //   display: "flex",
    // },
    fade: true,

    // absoluteOnLeave: true,
    // toggleClass: "odd-row",
    // onEnter: (elements:any, animation:any) => timeline.from(elements, {
    //   opacity: 0,
    //   duration: 0.5,
    //   delay: animation.duration() - 0.1
    // }),
    // onLeave: (elements: any) => timeline.to(elements, { opacity: 0 })
  });
}

// window.addEventListener("load", nextState);
// console.log('next state called');

window.addEventListener("resize", onResize);

function onResize() {

  const state = Flip.getState(".row", {
    props: "marginLeft, display, transform, opacity",
    // absolute: true,
    // normal: true,
    // simple: true
  });

  Flip.from(state, {
    duration: 1.8,
    ease: "power4.inOut",
    stagger: 0.85,
    absolute: true,
    scale:true,
    // style: { 
    //   transform: "scale(0.5)", 
    //   marginLeft: "0px",
    //   display: "flex",
    // },
    fade: true,

    // absoluteOnLeave: true,
    toggleClass: "row-mobile",
    // onEnter: (elements:any, animation:any) => timeline.from(elements, {
    //   opacity: 0,
    //   duration: 0.5,
    //   // delay: animation.duration() - 0.1
    // }),
    // onLeave: (elements: any) => timeline.to(elements, { opacity: 0 })
  });
  // Flip.fit(".honeycomb", {
  //   // absolute: true,
  //   // simple: true
  // });
  // Flip.fit(".row", { 
    
  //   absolute: true, 
  //   simple: true });
}
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