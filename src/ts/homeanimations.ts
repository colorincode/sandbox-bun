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


// import gsap from 'gsap' ;
// import Draggable from 'gsap/Draggable';
// import {ScrollTrigger} from 'gsap/ScrollTrigger';
// import Flip from 'gsap/Flip';
// import { SteppedEase, TextPlugin} from 'gsap/all';
// jquery import/export, will need this for build to compile correctly 
// import * as jquery from 'jquery';
// import { time } from 'console';
// (window as any).$ = (window as any).jQuery = jquery;

// gsap.registerPlugin(Flip);
// gsap.registerPlugin(ScrollTrigger); 
// gsap.registerPlugin(SteppedEase, Draggable, Power4);
// gsap.registerPlugin(TextPlugin);

// declare module 'gsap/ScrollTrigger';

let timeline = gsap.timeline();
let servicesWrap = document.querySelector('.cc__serviceswrapper--outer');
let focusClass = document.querySelector(".cc__abouthome--inner--text--title") as HTMLElement;
// wordsAnimate();

document.addEventListener('DOMContentLoaded', () => {
 
    // wordsAnimatePlay();
    getintouchScroll();
    scrollLead();
    scrollServices();
    scrollPricing();
    console.log("dom loaded");
    draggableBanner();
    draggablePortfolio();
   
});


// const killScrub = (trigger: { getTween: () => any; animation: { progress: (arg0: any) => void; }; progress: any; }) => {
//   let scrub = trigger.getTween ? trigger.getTween() : gsap.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
//   scrub && scrub.pause();
// //   trigger.animation.progress(trigger.progress); //console log 
// };
const { webDevAnimate, marketingBox, seoBox, designBox } = animateBoxes();
const { portfolioOne, portfolioTwo, portfolioThree, portfolioFour } = animateportfolioBoxes();


function createDraggable(selector: string, bounds: string, options: Partial<Draggable.Vars> = {}) {
    const element = document.querySelector(selector);
    const boundsElement = document.querySelector(bounds);
    
    if (element && boundsElement) {
      Draggable.create(element, {
        bounds: boundsElement,
        edgeResistance: 0.65,
        ...options
      });
    }
  }
  
  function draggableBanner() {
    createDraggable(".one", ".cc__abouthome--outer");
    createDraggable(".two", ".cc__abouthome--outer", {
     edgeResistance: 0.65,
      onDrag: function() {
        this.target.style.mixBlendMode = "difference";
      },
      onDragEnd: function() {
        this.target.style.mixBlendMode = "normal";
      }
    });
    createDraggable(".three", ".cc__abouthome--outer");
    createDraggable(".four", ".cc__abouthome--outer");
  
    window.addEventListener('resize', () => {
      [".one", ".two", ".three", ".four"].forEach(selector => {
        const draggable = Draggable.get(selector);
        if (draggable) draggable.applyBounds(selector);
      });
    });
  }
  


// function draggableBanner() {
//     Draggable.create(".one", {
//         bounds: document.querySelector(".cc__abouthome--outer") as HTMLElement,
//         edgeResistance: 0.65,
              
//     });
//     Draggable.create(".two", {
//         bounds: document.querySelector(".cc__abouthome--outer") as HTMLElement,
//         edgeResistance: 0.65,
//         onDrag: function() {
//             // this.target.style.zIndex = 100;
//             this.target.style.mixBlendMode = "difference";
//         },
//         onDragEnd: function() {
//             // this.target.style.zIndex = 0;
//             this.target.style.mixBlendMode = "normal";
//         },
//     });
//     Draggable.create(".three", {
//         bounds: document.querySelector(".cc__abouthome--outer") as HTMLElement,
//         edgeResistance: 0.65,
       
//     });
//     Draggable.create(".four", {
//         bounds: document.querySelector(".cc__abouthome--outer") as HTMLElement,
//         edgeResistance: 0.65,
       
//     });

//     onresize = function() {
//         Draggable.get(".one").applyBounds(".one");
//         Draggable.get(".two").applyBounds(".two");
//         Draggable.get(".three").applyBounds(".three");
//         Draggable.get(".four").applyBounds(".four");
//     };
// }

// change to on content load
// function wordsAnimate() {
//     let words = gsap.utils.toArray("svg text"), 
//     tl = gsap.timeline({ 
//         // delay: 0.5,
//         // paused:true

//     }), 
//     timePerCharacter = 0.2;
//     words.forEach((el) => {
//         tl.from([1], {
//             text: "",
//             duration: el.innerHTML.length * timePerCharacter,
//             ease: Power4.easeOut
//         }, 0);
//     });
 
// }

// function wordsAnimatePlay() {
//     document.addEventListener('DOMContentLoaded', () => {
//         wordsAnimate();
//         focusClass.classList.add("focus-in-contract-bck");
//     });
// }
// (ScrollTrigger as any).create({
// draggableBanner.kill();

// });

// function createScrollTrigger(triggerSelector: string, options: ScrollTrigger.Vars) {
//     ScrollTrigger.create({
//       trigger: triggerSelector,
//       start: "top center",
//       end: "bottom 20%-=200px",
//       scrub: true,
//       toggleActions: 'play pause resume reset',
//       ...options
//     });
//   }
  
ScrollTrigger.create({
    trigger: ".cc__abouthome--outer",
    start: "top center",
    scrub: true,
        // ease: Power4.easeInOut,
        // stagger: 0.2,
        // delay: 0.85,
        // opacity: 1, 
    // markers: true,
    // endTrigger: ".cc__serviceswrapper--outer",
    end: "bottom 20%-=200px",
    // repeat: -1,
    toggleActions: 'play pause resume reset',
    onLeave: (self:any) => {
        // console.log("left focus");
        focusClass.classList.remove("focus-in-expand");
        focusClass.classList.remove("focus-in-contract-bck");
        // focusClass.classList.toggle("focus-in-exit");
        
    },
    onEnter: (self:any) => {
        // console.log("entered focus");
        timeline.play();
        // focusClass.classList.toggle("focus-in-expand");
    },
    onEnterBack: () => {
        // console.log("entered back focus");
        timeline.pause();
        focusClass.classList.remove("focus-in-exit");
        focusClass.classList.toggle("focus-in-expand");
        // focusClass.classList.remove("focus-in-contract-bck");
    },
    onLeaveBack: () => {
        timeline.reverse();
        // this.reverse();
        // console.log("left back focus");
        focusClass.classList.remove("focus-in-contract-bck");
        focusClass.classList.toggle("focus-in-expand");
    },
//     onUpdate: (self:any) => {
//         timeline.reset();
//     //   console.log(
//     //     "progress:",
//     //     self.progress.toFixed(3),
//     //     "direction:",
//     //     self.direction,
//     //     "velocity",
//     //     self.getVelocity()
//     //   );
//    },
    // duration: 1,

  });

function draggablePortfolio() {
    Draggable.create(".portone", {
        bounds: document.querySelector(".cc__portfoliohome--innergrid") as HTMLElement,
        edgeResistance: 0.65,
        // scale:0.5,
              
    });
    Draggable.create(".porttwo", {
        bounds: document.querySelector(".cc__portfoliohome--innergrid") as HTMLElement,
        edgeResistance: 0.65,
        onDrag: function() {
            // this.target.style.zIndex = 100;
            this.target.style.mixBlendMode = "difference";
        },
        onDragEnd: function() {
            // this.target.style.zIndex = 0;
            this.target.style.mixBlendMode = "normal";
        },
    });
    Draggable.create(".portthree", {
        bounds: document.querySelector(".cc__portfoliohome--innergrid") as HTMLElement,
        edgeResistance: 0.65,
       
    });
    Draggable.create(".portfour", {
        bounds: document.querySelector(".cc__portfoliohome--innergrid") as HTMLElement,
        edgeResistance: 0.65,
       
    });

    onresize = function() {
        Draggable.get(".portone").applyBounds(".portone");
        Draggable.get(".porttwo").applyBounds(".porttwo");
        Draggable.get(".portthree").applyBounds(".portthree");
        Draggable.get(".portfour").applyBounds(".portfour");
        // draggablePortfolio{(scale: 0.5)};
    };
    ontimeupdate = function() {
        Draggable.get(".portone").applyBounds(".portone");
        Draggable.get(".porttwo").applyBounds(".porttwo");
        Draggable.get(".portthree").applyBounds(".portthree");
        Draggable.get(".portfour").applyBounds(".portfour");
    }
}


function getintouchScroll() {
  timeline.to(".cc__serviceswrapper--outer", {
    scrollTrigger: {
      trigger: ".cc__serviceswrapper--inner", // when section enters viewport (once)
      start: "top center", // top of viewport
      end: "bottom 20%-=200px", // bottom of viewport
      // end: "bottom 20%-=300px", // bottom of viewport
    //   pause: true,
    
      //  pin: true,
      scrub: 1,
      toggleActions: 'play pause resume reset',
      // markers: true,
      onEnter: () => {
        // console.log("enter");
        webDevAnimate.play();
        marketingBox.play();
        seoBox.play();
        designBox.play();
      },
      onLeave: () => {
      //  console.log("leave");
        webDevAnimate.reverse();
        marketingBox.reverse();
        seoBox.reverse();
        designBox.reverse();
        // webDevAnimate.reset();
        // marketingBox.reset();
        // seoBox.reset();
        // designBox.reset();
      },
      onEnterBack: () => {
      //  console.log("enter back");
        webDevAnimate.play();
        marketingBox.play();
        seoBox.play();
        designBox.play();
       
      },
      onLeaveBack: () => {
        // console.log("leave back");
        // webDevAnimate.reset();
        // marketingBox.reset();
        // seoBox.reset();
        // designBox.reset();
        webDevAnimate.reverse();
        marketingBox.reverse();
        seoBox.reverse();
        designBox.reverse();
      },
    }, 
    duration: 1,
    ease: Power4.easeInOut,
    stagger: 0.2,
    delay: 0.5,
    opacity: 1, 
  });
}

function scrollLead() {
  timeline.to(".cc__pricinghome--outer", {
    scrollTrigger: {
      trigger:".cc__serviceswrapper--outer",
      start: "top center",
      // pin:true,
      // pinSpacing: false,
      // invalidateOnRefresh: true,
      scrub: 1,
      end: "bottom 50%-=200px",
      // toggleActions: 'play pause resume reset',
    },
    duration: 2,
    ease: Power4.easeInOut,
    stagger: 0.2,
    delay: 0.5,
    opacity: 1, 
    // smooth: 1

    // rotation: 360
  });
}

function scrollServices() {
  timeline.to(".cc__serviceswrapper--outer", {
    scrollTrigger: {
      trigger:".cc__serviceswrapper--outer",
      // pin:true,
      // pinSpacing: false,
      scrub: 1,
      start: "top center",
      end: "bottom 20%-=200px",
      // toggleActions: 'play pause resume reset',
    },
    duration: 2,
    ease: Power4.easeInOut,
    stagger: 0.2,
    delay: 0.5,
    opacity: 1,
    // smooth: 1
    // rotation: 360
  });
}

function scrollPricing() {
  timeline.to(".cc__portfoliohome--outer", {
    scrollTrigger: {
      trigger:".cc__portfoliohome--inner",
      // pin:true,
      // pinSpacing: false,
      scrub: 1,
      start: "top center",
      // end: "bottom 10%-=200px",
      toggleActions: 'play pause resume reset',
    //   markers: true,
      onEnter: () => {
        // console.log("enter");
        portfolioOne.play();
        portfolioTwo.play();
        portfolioThree.play();
        portfolioFour.play();
      },
      onLeave: () => {
    //    console.log("leave");
      
        portfolioOne.reset();
        portfolioTwo.reset();
        portfolioThree.reset();
        portfolioFour.reset();
      },
      onEnterBack: () => {
    //    console.log("enter back");
        // portfolioOne.play();
        // portfolioTwo.play();
        // portfolioThree.play();
        // portfolioFour.play();
         portfolioOne.reverse();
        portfolioTwo.reverse();
        portfolioThree.reverse();
        portfolioFour.reverse();
      },
      onLeaveBack: () => {
        // console.log("leave back");
          portfolioOne.play();
        portfolioTwo.play();
        portfolioThree.play();
        portfolioFour.play();
        // portfolioOne.reset();
        // portfolioTwo.reset();
        // portfolioThree.reset();
        // portfolioFour.reset();
        // portfolioOne.reverse();
        // portfolioTwo.reverse();
        // portfolioThree.reverse();
        // portfolioFour.reverse();
      },
    }, 
    duration: 1,
    ease: Power4.easeInOut,
    stagger: 0.45,
    delay: 0.35,
    opacity: 1, 
    
  });
}
// timeline.to(".red", {
//   scrollTrigger: {
//     trigger: ".red",
//     toggleActions: "restart pause reverse pause"
//   }, 
//   duration: 1, 
//   backgroundColor: "#FFA500", 
//   ease: "none"
// });

// timeline.to(".yoyo p", {
//   scrollTrigger: ".yoyo", 
//   scale: 2, 
//   repeat: -1, 
//   yoyo: true, 
//   ease: "power2"
// });
// // is any part of the element in the viewport?
// if (ScrollTrigger.isInViewport(element)) {
//   // you can use selector text
//   // do stuff
// }


function animateBoxes() {
  const webDevAnimate = timeline.from('#webdev', 1, {
    // ScrollTrigger: webDevBox,
    x: 400,
    opacity: 0,
    stagger: 0.2,
    delay: 0.5,
    ease: Power4.easeInOut
  }, '=-1');
  const marketingBox = timeline.from('#marketing', 1, {
    x: -300,
    opacity: 0,
    stagger: 0.4,
    ease: Power4.easeInOut
  }, '=-0.75');

  const seoBox = timeline.from('#seo', 1, {
    y: 100,
    opacity: 0,
    stagger: 0.6,
    ease: Power4.easeInOut
  }, '=-0.5');
  const designBox = timeline.from('#design', 1, {
    y: -200,
    opacity: 0,
    stagger: 0.8,
    ease: Power4.easeInOut
  }, '=-0.75');
  return { webDevAnimate, marketingBox, seoBox, designBox };
}


function animateportfolioBoxes() {
  const portfolioOne = timeline.from('#portfolioOne', 1, {
    // ScrollTrigger: webDevBox,
    // y: -25,
    opacity: 1,
    stagger: 0.2,
    delay: 0.25,
    ease: Power4.easeInOut
  }, '=-0.75');
  const portfolioTwo = timeline.from('#portfolioTwo', 1, {
    // y: 25,
    opacity: 1,
    stagger: 0.4,
    ease: Power4.easeInOut
  }, '=-0.75');

  const portfolioThree = timeline.from('#portfolioThree', 1, {
//    y: -25,
    opacity: 1,
    stagger: 0.6,
    ease: Power4.easeInOut
  }, '=-0.75');
  const portfolioFour = timeline.from('#portfolioFour', 1, {
    // y: 25,
    opacity: 1,
    stagger: 0.8,
    ease: Power4.easeInOut
  }, '=-0.75');
  return { portfolioOne, portfolioTwo, portfolioThree, portfolioFour };
}

// function stopOverscroll(element: HTMLElement | (Window & typeof globalThis)) {
//     // let scroller = element;
//   element = gsap.utils.toArray(element)[0] || window;
//   (element === document.body || element === document.documentElement) &&
//     (element = window);
//   let lastScroll = 0,
//     lastTouch: number,
//     forcing: boolean,
//     forward = true,
//     isRoot = element === window,
//     scroller = isRoot ? document.scrollingElement : element,
//     ua = window.navigator.userAgent + "",
//     getMax = isRoot
//       ? () => scroller.scrollHeight - window.innerHeight
//       : () => scroller.scrollHeight - scroller.clientHeight,
//     addListener = (type: string, func: { (e: any): void; (e: any): void; (e: any): void; }) =>
//       element.addEventListener(type, func, { passive: false }),
//     revert = () => {
//       scroller.style.overflowY = "auto";
//       forcing = false;
//     },
//     kill = () => {
//       forcing = true;
//       scroller.style.overflowY = "hidden";
//       !forward && scroller.scrollTop < 1
//         ? (scroller.scrollTop = 1)
//         : (scroller.scrollTop = getMax() - 1);
//       setTimeout(revert, 1);
//     },
//     handleTouch = (e: { changedTouches: any[]; type: string; preventDefault: () => void; }) => {
//       let evt = e.changedTouches ? e.changedTouches[0] : e,
//         forward = evt.pageY <= lastTouch;
//       if (
//         ((!forward && scroller.scrollTop <= 1) ||
//           (forward && scroller.scrollTop >= getMax() - 1)) &&
//         e.type === "touchmove"
//       ) {
//         e.preventDefault();
//       } else {
//         lastTouch = evt.pageY;
//       }
//     },
//     handleScroll = (e: { preventDefault: () => void; }) => {
//       if (!forcing) {
//         let scrollTop = scroller.scrollTop;
//         forward = scrollTop > lastScroll;
//         if (
//           (!forward && scrollTop < 1) ||
//           (forward && scrollTop >= getMax() - 1)
//         ) {
//           e.preventDefault();
//           kill();
//         }
//         lastScroll = scrollTop;
//       }
//     };
//   if ("ontouchend" in document && !!ua.match(/Version\/[\d\.]+.*Safari/)) {
//     addListener("scroll", handleScroll);
//     addListener("touchstart", handleTouch);
//     addListener("touchmove", handleTouch);
//   }
//   scroller.style.overscrollBehavior = "none";
// }

// matchMedia("max-width: 768px").addListener(stopOverscroll);
// function observeIntersect () {
//     let options = {
//         root: null,
//         // rootMargin: "0px",
//         rootMargin: "0px",
//         threshold: 1.0
//     };
//     let observer = new IntersectionObserver(callback, options);
//     let target = document.querySelector("section") as HTMLElement;
//     observer.observe(target);
//     function callback(entries: any[], observer: any) {
//         entries.forEach(entry => {
//             console.log(entry);
//         });
//     }
// }
// observeIntersect();

//   var frag = document.createDocumentFragment();
//   var grid = document.querySelector(".grid");
  
//   var rows = 100;
//   var cols = 1;
  
//   var observer = new IntersectionObserver(handleIntersect, {
//     rootMargin: (1 / cols * 1) + "% 0px"
//   });
  
//   TweenLite.set("html", {
//     "--cols": cols,
//     "--rows": rows
//   });
  
//   for (var r = 0; r < rows; r++) {
    
//     var hue = r / rows * 360;
//     var row = createElement("row", frag);
//     var tl = row._timeline = new TimelineLite({ paused: true })
    
//     for (var c = 0; c < cols; c++) {
       
//       var cell = createElement("cell", row);
//       var item = createElement("item", cell);
          
//       TweenLite.set(item, {   
//         autoAlpha: 0,
//         force3D: true,
//         backgroundColor: "hsl(" + hue + ",80%," + random(50, 70) + "%)",
//         scale: Math.random() < 0.8 ? 0 : random(1.1, 1.3),
//         rotationX: random(-180, 180),
//         rotationY: random(-180, 180),
//         rotationZ: random(-180, 180),
//         xPercent: random(-300, 300),
//         yPercent: random(-300, 300)
//       });
      
//       tl.to(item, random(0.4, 1), {
//         autoAlpha: 1,
//         scale: 1,
//         rotationX: 0,
//         rotationY: 0,
//         rotationZ: 0,
//         xPercent: 0,
//         yPercent: 0
//       }, random(0.15));    
//     }  
    
//     tl.progress(1);
//   }
  
// //   grid.appendChild(frag);
  
//   for (var i = 0; i < grid.children.length; i++) {
//     observer.observe(grid.children[i]);
//   }
  
//   function handleIntersect(entries, observer) {
    
//     for (var i = 0; i < entries.length; i++) {
      
//       var entry = entries[i];
      
//       if (entry.isIntersecting) {
//         entry.target._timeline.play();
//       } else {
//         entry.target._timeline.pause(0);
//       } 
//     }
//   }
  
//   function createElement(className, parent) {
//     var element = document.createElement("div");
//     element.className = className;
//     parent.appendChild(element);
//     return element;
//   }
  
//   function random(min, max) {
//     if (max == null) { max = min; min = 0; }
//     if (min > max) { var tmp = min; min = max; max = tmp; }
//     return min + (max - min) * Math.random();
//   }
// function WordsErase () {
//     let words = gsap.utils.toArray("svg text"), 
//     tl = gsap.timeline({ 
//         delay: 0.5, 
//         paused:true 
//     }), timePerCharacter = 0.2;

//     words.forEach((el: { innerHTML: string | any[]; }) => {
//         timeline.to(el, {
//             text: "",
//             duration: el.innerHTML.length * timePerCharacter,
//             ease: Power4.easeOut
//         }, 0);
//         timeline.reverse();
//         // tl.to(el, {
//         //     text: "",
//         //     duration: el.innerHTML.length * timePerCharacter,
//         //     ease: Power4.easeOut
//         // }, 1);
//     });
//   }
// // inside the scroll trigger, add a timeline



    // function WordsErasePlay () {
    //     document.addEventListener('DOMContentLoaded', () => {
    //         WordsErase();
    //         timeline.play();
    //     });

    // }
    // WordsErasePlay();
    