

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
let feTurb = document.querySelectorAll("#feturbulence");
class Ripple {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private quadrants: { [key: string]: HTMLElement };
  private width: number;
  private height: number;
  private lastTime: number;
  private drops: Drop[] = [];

  constructor(private element: HTMLElement) {
    this.canvas = document.getElementById('ripple-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.quadrants = {
      gryffindor: element.querySelector('.sp19--hp--gryffindor')!,
      ravenclaw: element.querySelector('.sp19--hp--ravenclaw')!,
      hufflepuff: element.querySelector('.sp19--hp--hufflepuff')!,
      slytherin: element.querySelector('.sp19--hp--slytherin')!
    };

    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.lastTime = Date.now();

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    element.addEventListener('mouseover', (e) => this.addRipple(e));

    this.animate();
  }

  private resizeCanvas() {
    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  private addRipple(e: MouseEvent) {
    const rect = this.element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const color = this.getQuadrantColor(x, y);
    this.drops.push(new Drop(x, y, color));
  }

  private animate() {
    const currentTime = Date.now();
    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drops = this.drops.filter(drop => {
      drop.update(deltaTime);
      drop.draw(this.ctx);
      return drop.isAlive();
    });

    requestAnimationFrame(() => this.animate());
  }

  private getQuadrantColor(x: number, y: number): string {
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;

    if (x < halfWidth && y < halfHeight) return '#81141f'; // Gryffindor
    if (x >= halfWidth && y < halfHeight) return '#0a4e8b'; // Ravenclaw
    if (x < halfWidth && y >= halfHeight) return '#485344'; // Slytherin
    return '#dc992b'; // Hufflepuff
  }
}

class Drop {
  private radius: number = 0;
  private maxRadius: number;
  private opacity: number = 1;

  constructor(private x: number, private y: number, private color: string) {
    this.maxRadius = Math.max(x, y, window.innerWidth - x, window.innerHeight - y);
  }

  update(deltaTime: number) {
    this.radius += deltaTime * 200;
    this.opacity -= deltaTime * 0.5;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `${this.color}${Math.round(this.opacity * 255).toString(16).padStart(2, '0')}`;
    ctx.fill();
  }

  isAlive(): boolean {
    return this.opacity > 0;
  }
}


const container = document.querySelector('.sp19--hp--flex__wrapper') as HTMLElement;
new Ripple(container);




// const houses = ['gryffindor', 'ravenclaw', 'slytherin', 'hufflepuff'];

// houses.forEach(house => {
//     const box = document.getElementById(`hphouse--box--${house}`);
//     const turbulence = document.getElementById(`feturbulence-${house}`);
    
//     if (box && turbulence) {
//         box.addEventListener('mouseenter', () => {
//             console.log(`Mouse entered ${house}`);
//             customRipple();
//             // gsap.to(turbulence, {
//             //     duration: 0.5,
//             //     attr: { baseFrequency: "0.05" },
//             //     ease: "power2.inOut",
//             //     onStart: () => console.log(`Animation started for ${house}`),
//             //     onComplete: () => console.log(`Animation completed for ${house}`)
//             // });
//         });
        
//         box.addEventListener('mouseleave', () => {
//             console.log(`Mouse left ${house}`);
//             customRipple();
//             // gsap.to(turbulence, {
//             //     duration: 0.5,
//             //     attr: { baseFrequency: "0.01" },
//             //     ease: "power2.inOut",
//             //     onStart: () => console.log(`Reset animation started for ${house}`),
//             //     onComplete: () => console.log(`Reset animation completed for ${house}`)
//             // });
//         });
//     } else {
//         console.error(`Elements not found for ${house}`);
//     }
// });

// customRipple();


// function customRipple() {
//   houses.forEach(house => {
//     const box = document.getElementById(`hphouse--box--${house}`);
//     const turbulence = document.getElementById(`feturbulence-${house}`);


//     let state = Flip.getState(feTurb);
//     // feTurb.classList.toggle("show-filter");
//     Flip.from(state, {
//       // visibility: { visibility: "visible"},
//       attr: { baseFrequency: "0.01 0.02" },
//       duration: 2.8,
//       fade: true,
//       absolute: true,
//       absoluteOnLeave: true,
//       // toggleClass: "turbulence-filter",
//       ease: "power4.easeInOut",
//       nested: true,
//       zIndex: 1,
//       // delay: 1.5,
//       onComplete: function () {
//         box.setAttribute('class', 'show-filter');
//         // feTurb.setAttribute('class', 'show-filter');
//         const bfX = 0.005 + 0.015; // base frequency x
//         const bfY = 0.05 + 0.1; // base frequency y
//         turbulence.setAttribute('baseFrequency', `${bfX} ${bfY}`);
//       }
//     });
//   }
//   );
// }
// console.log("custom ripple loaded");
// function rippleOff() {
//     const gryffindor = document.querySelector('#hphouse--box--gryffindor') as HTMLElement;
//     const slytherin = document.querySelector('#hphouse--box--slytherin') as HTMLElement;
//     const ravenclaw = document.querySelector('#hphouse--box--ravenclaw') as HTMLElement;
//     const hufflepuff = document.querySelector('#hphouse--box--hufflepuff') as HTMLElement;
   
        
 
//     // gryffindor.addEventListener('mouseleave', function() {
//     //     console.log("left gryff");
// //         let state = Flip.getState(this); // This references the current hovered element
// //         // let animating = Flip.getElementState(this);
// //         // console.log("animating", animating);
// //         if (animating) {
// //             // rippleOff();
// //             // house.classList.remove("hpfluidcontainer");
// //             // rippleOff();
// //             console.log("animating");
// //         } else {
// // rippleOff();
// //             console.log("not animating");
// //         }
// //     });

// }

// console.log("ripple off");
// // Function to handle mouse enter event for each house
// function handleMouseEnter(house:any) {
//   return function() {
//     customRipple();
//       // Kill the flip of the current house if it's not the one being hovered over
//       if (currentHouse !== house) {
//     //    Flip.isFlipping();
//           // Flip.killFlipsOf();
//         // Flip.from('feTurb', {
//         //     attr: { baseFrequency: "0.01 0.02" },
//         //     duration: 2.8,
//         //     fade: true,
//         //     absolute: true,
//         //     absoluteOnLeave: true,
//         //     toggleClass: "turbulence-filter",
//         //     ease: "power4.easeInOut",
//         //     delay: 1.5 
//         // });
//       }

//       console.log("hover");
//       // Set the current house to the hovered house
//       currentHouse = house;
//   };
// }

//   // Function to handle mouse leave event for each house
//   function handleMouseLeave(house:any) {
//     return function() {
//         console.log("leave");
//         rippleOff();
//         resetFlipState(house);
//         // let state = Flip.getState(this); // This references the current hovered element
//         // let animating = Flip.getElementState(this);
//       // Reset the current house when the mouse leaves
//       currentHouse = null;
//     };
//   }
//   // Function to reset the flip state for a house
// function resetFlipState(house:any) {
//     if (flipStates.has(house)) {
//         const state = flipStates.get(house);
//         Flip.from(state); // Reset the flip state for the house
//     }
// }

// houseElements.forEach((houseElement, index) => {
//     houseElement.addEventListener('mouseenter', function(event) {
//         // Extract data attributes or classes to identify the specific house
//         const dataFlipId = houseElement.getAttribute('data-flip-id');
//         // You can also add a class to these elements and search for that class
//         const houseId = `auto-${index + 1}`;
//         // Perform your logic based on these identifiers
//         customRipple(); // Custom function to handle the ripple effect
//         // ...
//     });

//     houseElement.addEventListener('mouseleave', function(event) {
//         // Extract data attributes or classes to identify the specific house
//         const dataFlipId = houseElement.getAttribute('data-flip-id');
//         // You can also add a class to these elements and search for that class
//         const houseId = `auto-${index + 1}`;
//         // Perform your logic based on these identifiers
//         rippleOff(); // Function to stop the ripple effect
//         // ...
//     });
// });

//   Add event listeners for each house
// houseElements.forEach(house => {


//     // while (currentHouse = gryffindor) {
//     //     console.log("gryffindor");
//     //     house.addEventListener('mouseenter', handleMouseEnter(house));
//     //     house.addEventListener('mouseleave', handleMouseLeave(house));
//     //     onmouseleave = function() {
//     //         console.log("left gryff");
//     //         rippleOff();
//     //         resetFlipState(house);
//     //         // let state = Flip.getState(this); // This references the current hovered element
//     //         // let animating = Flip.getElementState(this);
//     //       // Reset the current house when the mouse leaves
//     //       currentHouse = null;
//     //     };
//     //     onmouseenter = function() {
//     //         console.log("entered gryff");
//     //         // Kill the flip of the current house if it's not the one being hovered over
//     //         if (currentHouse !== house) {
//     //             customRipple();
//     //             Flip.killFlipsOf();
//     //         }
        
//     //         console.log("hover");
//     //         // Set the current house to the hovered house
//     //         currentHouse = house;
//     //     };
//     // }
//     // while (currentHouse = slytherin) {
//     //     console.log("slytherin");
//     // }
//     // while (currentHouse = ravenclaw) {
//     //     console.log("ravenclaw");
//     // }
//     // while (currentHouse = hufflepuff) {
//     //     console.log("hufflepuff");
//     // }

//     house.addEventListener('mouseenter', handleMouseEnter(house));

//     house.addEventListener('mouseleave', handleMouseLeave(house));
//     // console.log(MouseEvent);

//     // Save the initial Flip state for each house
//     const state = Flip.getState(house);
//     flipStates.set(house, state);

//     // if(house === gryffindor) {
//     //     console.log("gryffindor");
//     // } else if (house === slytherin) {
//     //     console.log("slytherin");
//     // } else if (house === ravenclaw) {
//     //     console.log("ravenclaw");
//     // } else if (house === hufflepuff) {
//     //     console.log("hufflepuff");
//     // }
// });
  // Add event listeners for each house
//   houseElements.forEach(house => {
//     // console.log("house loaded");
//     const otherHouses = getHouses().filter(house => house !== currentHouse);

//     const gryffindor = document.querySelector('#hphouse--box--gryffindor') as HTMLElement;
//     const slytherin = document.querySelector('#hphouse--box--slytherin') as HTMLElement;
//     const ravenclaw = document.querySelector('#hphouse--box--ravenclaw') as HTMLElement;
//     const hufflepuff = document.querySelector('#hphouse--box--hufflepuff') as HTMLElement;
//     house.addEventListener('mouseover', () => handleMouseEnter(house));
// // ravenclaw.addEventListener('mouseover', handleMouseEnter(ravenclaw));
// // ravenclaw.addEventListener('mouseleave', handleMouseLeave(ravenclaw));

// // slytherin.addEventListener('mouseover', handleMouseEnter(slytherin));
// // slytherin.addEventListener('mouseleave', handleMouseLeave(slytherin));

// // gryffindor.addEventListener('mouseover', handleMouseEnter(gryffindor));
// // gryffindor.addEventListener('mouseleave', handleMouseLeave(gryffindor));

// // hufflepuff.addEventListener('mouseover', handleMouseEnter(hufflepuff));
// // hufflepuff.addEventListener('mouseleave', handleMouseLeave(hufflepuff));

// // switch (house) {
// //     case gryffindor:
// //         console.log("gryffindor");
// //         break;
// //     case slytherin: 
// //     console.log("slytherin");
// //     break;
// //     case ravenclaw:
// //         console.log("ravenclaw");
// //         break;
// //     case hufflepuff:
// //         console.log("hufflepuff");
// //         break;
   
// // }

//     // const houseDiv = house.querySelector('.turbulence-filter') as SVGElement;
// //     houseDiv.addEventListener('mouseover', handleMouseEnter(house));
// //    houseDiv.addEventListener('mouseleave', handleMouseLeave(house));
//     // house.addEventListener('mouseover', handleMouseEnter(house));
//     // house.addEventListener('mouseleave', handleMouseLeave(house));
//     // if (currentHouse = gryffindor) {
//     //     // Flip.killFlipsOf(".hpfluidcontainer");
        
//     //     console.log("current house", currentHouse);
//     // }
//     // getHouses().find(house => house !== currentHouse);
//     if (currentHouse = house) {
//         otherHouses.forEach(house => {
//             house.addEventListener('mouseleave', () => handleMouseLeave(house));
//             // house.addEventListener('mouseover', () => handleMouseEnter(house));
//         });
//         // event?.stopPropagation();
//         // Flip.killFlipsOf(slytherin)
//         console.log("you are not on  " + currentHouse);
       
//     } else {
//         console.log("you are on  " + currentHouse);
//     }
//   });
  
//   // Function to get the array of house elements
//   function getHouses() {
//     return houseElements;
//     console.log("houses loaded");
//   }
  
//   // Function to get the current house being hovered
//   function getCurrentHouse() {
//     return currentHouse;
//     console.log("current house loaded");
//   }


// customHoverSl();
// customHoverG();
// customHoverR();
// customHoverHuff();
// Hoverloop();

// Iterate over each box and set up GSAP flip effect
// const houses = document.querySelectorAll('.hpfluidcontainer') ;
// let currentHouse = null;
// let feTurb = $("#feturbulence");
// let currentHouse = null as any;
// const timeline = gsap.timeline;
// const houseElements = Array.from(document.querySelectorAll('.hpfluidcontainer'));
// let currentHouse = null as any;
// const feTurb = document.querySelector('#feturbulence') as SVGElement; 

// function customRipple() {
   
//     let state = Flip.getState(feTurb); 
//     Flip.from(state, {
//         // visibility: { visibility: "visible"},
//         attr: { baseFrequency: "0.01 0.02" },
//         duration: 2.8,
//         fade: true,
//         absolute: true,
//         absoluteOnLeave: true,
//         toggleClass: "show-filter",
//         ease: "power4.easeInOut",
//         delay: 1.5,
//         onComplete: function() {
//             feTurb.setAttribute('class', 'show-filter');
//             const bfX = 0.005 + 0.015; // base frequency x
//             const bfY = 0.05 + 0.1; // base frequency y
//             feTurb.setAttribute('baseFrequency', `${bfX} ${bfY}`);
//         }
        
        
//     });

// }

// function rippleOff() {
//     // const feTurb = document.querySelector('#feturbulence') as SVGElement; 
//     let state = Flip.getState(feTurb); 
//     Flip.from(state, {
//         // attr: { baseFrequency: "0.01 0.02" },
//         visibility: "hidden",
//         duration: 2.8,
//         fade: true,
//         absolute: true,
//         absoluteOnLeave: true,

//         ease: "power4.easeInOut",
//         delay: 1.5,
//         onComplete: function() {
//             feTurb.setAttribute('class', 'hide-filter');
//             const bfX = 0.005 + 0.015; // base frequency x
//             const bfY = 0.05 + 0.1; // base frequency y
//             feTurb.setAttribute('baseFrequency', `${bfX} ${bfY}`);
//         }
        
        
//     });

        // const timeline = gsap.timeline({
       
    //     ease: "power4.inOut",
    //     yoyo: false
    // });

    // const feTurb = document.querySelector('#feturbulence') as SVGElement; // Ensure proper element type

    // timeline.add(
    //     timeline.to(feTurb, {
    //         duration: 2.8,
    //         onUpdate: () => {
    //             const bfX = timeline.progress() * 0.005 + 0.015; // base frequency x
    //             const bfY = timeline.progress() * 0.05 + 0.1; // base frequency y
    //             feTurb.setAttribute('baseFrequency', `${bfX} ${bfY}`);
    //         }
    //     }),
    //     0
    // );

    // timeline.play();
    // const timeline = gsap.timeline({
       
    //     ease: "power4.easeInOut",
    //     yoyo: false
    // });

    // const feTurb = document.querySelector('#feturbulence') as SVGElement; // Ensure proper element type

    // timeline.add(
    //     timeline.to(feTurb, {
    //         duration: 2.8,
    //         onUpdate: () => {
    //             const bfX = timeline.progress() * 0.005 + 0.015; // base frequency x
    //             const bfY = timeline.progress() * 0.05 + 0.1; // base frequency y
    //             feTurb.setAttribute('baseFrequency', `${bfX} ${bfY}`);
    //             feTurb.setAttribute('class', 'hide-filter')
    //         }
    //     }),
    //     0
    // );

    // timeline.pause();
// }
// // Function to handle mouse enter event for each house
// function handleMouseEnter(house:any) {
//     return function() {
//         // let feTurb = $("#feturbulence");
//     customRipple();
//     console.log("hover");
//     // Use Flip plugin to create the flipping animation with a delay to start after the ripple
//     // let state = Flip.getState(this); 
//     // Flip.from(state, {
//     //     attr: { baseFrequency: "0.01 0.02" },
//     //     duration: 2.8,
//     //     fade: true,
//     //     absolute: true,
//     //     absoluteOnLeave: true,
//     //     toggleClass: "spell",
//     //     ease: "power4.inOut",
//     //     delay: 1.5 
//     // });
//       // Reset rotation for all houses
//     //   gsap.to('.house', { rotationY: 0, duration: 0 });
  
//       // Rotate the hovered house
//     //   gsap.to(house, { rotationY: 180, duration: 0.5 });
  
//       // Set the current house to the hovered house
//       currentHouse = house;
//     };
//   }
  
//   // Function to handle mouse leave event for each house
//   function handleMouseLeave(house:any) {
//     return function() {
//         console.log("leave");
//         rippleOff();
//         // let feTurb = $("#feturbulence");
//         // timeline.from(feTurb, {
//         //     attr: { baseFrequency: "0.01 0.02" }, // Adjust to the default values
//         //     duration: 2.8, // Match the duration with the initial ripple animation
//         //     ease: "power4.inOut"
//         // });
//         // customRippleOff();
//         let state = Flip.getState(this); // This references the current hovered element
//        let animating = Flip.getElementState(this);
//         // console.log("animating", animating);
// //         if (animating) {
// //             // rippleOff();
// //             // house.classList.remove("hpfluidcontainer");
// //             // rippleOff();
// //             console.log("animating");
// //         } else {
// // rippleOff();
// //             console.log("not animating");
// //         }
//         // if (animating) {
//         // //  house.classList.remove("hpfluidcontainer");
//         // rippleOff();
//         //     console.log("animating");
//         // } else {
//         //     // house.classList.add("hpfluidcontainer");
//         //     // house.classList.remove("hpfluidcontainer");
//         //     console.log("not animating");
//         // }
//         // Flip.from(state, {
//         //     duration: 2.5,
//         //     fade: true,
//         //     absolute: true,
//         //     absoluteOnLeave: true,
//         //     toggleClass: "hide-filter",
//         //     ease: "power4.inOut",
//         //     onComplete: function() {
//         //         feTurb.attr({ baseFrequency: "0.0 0.0" });
//         //     //    Flip.killFlipsOf(house);
//         //     }
//         // });
//       // Rotate back when mouse leaves
//     //   gsap.to(house, { rotationY: 0, duration: 0.5 });
//     // $(this).addClass("hpfluidcontainer--gryffindor");
    
//       // Reset the current house when the mouse leaves
//       currentHouse = null;
//     };
//   }
  
//   // Add event listeners for each house
//   houseElements.forEach(house => {
//     // console.log("house loaded");
//     house.addEventListener('mouseover', handleMouseEnter(house));
//     house.addEventListener('mouseleave', handleMouseLeave(house));
//     // if (currentHouse = house) {
//     //     Flip.killFlipsOf(".hpfluidcontainer");
//     //     console.log("killed");
//     //     console.log("current house", currentHouse);
//     // }
//   });
  
//   // Function to get the array of house elements
//   function getHouses() {
//     return houseElements;
//     console.log("houses loaded");
//   }
  
//   // Function to get the current house being hovered
//   function getCurrentHouse() {
//     return currentHouse;
//     console.log("current house loaded");
//   }

  
  
  
// function customHoverG() {
//     let hover = $("#hphouse--box--gryffindor");

//     hover.on("mouseover", function () {
//         $(this).addClass("hpfluidcontainer--gryffindor");
//         let feTurb = $("#feturbulence");
//         customRipple();
//         // Use Flip plugin to create the flipping animation with a delay to start after the ripple
//         let state = Flip.getState(this); 
//         Flip.from(state, {
//             attr: { baseFrequency: "0.01 0.02" },
//             duration: 2.8,
//             fade: true,
//             absolute: true,
//             absoluteOnLeave: true,
//             toggleClass: "turbulence-filter",
//             ease: "power4.inOut",
//             delay: 1.5 
//         });
//     });

//     hover.on("mouseleave", function () {
//         let feTurb = $("#feturbulence");
//         // timeline.from(feTurb, {
//         //     attr: { baseFrequency: "0.01 0.02" }, // Adjust to the default values
//         //     duration: 2.8, // Match the duration with the initial ripple animation
//         //     ease: "power4.inOut"
//         // });
// customRippleOff();
//         let state = Flip.getState(this); // This references the current hovered element
//         Flip.from(state, {
//             duration: 2.5,
//             fade: true,
//             absolute: true,
//             absoluteOnLeave: true,
//             toggleClass: "hide-filter",
//             ease: "power4.inOut",
//             onComplete: function() {
//                 feTurb.attr({ baseFrequency: "0.0 0.0" }); // Set baseFrequency to zero to eliminate the turbulence
//             }
//         });
//     });
// }
  
  
// houses.forEach(houses: any, currentHouse: any) {
//   currentHouse.addEventListener('mouseenter', () => {
//     // currentHouse = houses.item(house);
//     // let element = $(this);
//     // Pause any currently running animations
//     // gsap.to('.box', { rotationY: 0, duration: 0 });

//     // Start the flip animation for the hovered box
//     $(this).addClass("hpfluidcontainer--gryffindor");
   
//     let feTurb = $("#feturbulence");
//     customRipple();
//     // Use Flip plugin to create the flipping animation with a delay to start after the ripple
//     let state = Flip.getState(this); 
//     Flip.from(state, {
//         attr: { baseFrequency: "0.01 0.02" },
//         duration: 2.8,
//         fade: true,
//         absolute: true,
//         absoluteOnLeave: true,
//         toggleClass: "turbulence-filter",
//         ease: "power4.inOut",
//         delay: 1.5 
//     });
//   });

//   house.addEventListener('mouseleave', () => {
//     // Reverse the flip animation when mouse leaves
//     // gsap.to(box, { rotationY: 0, duration: 0.5 });
//     let feTurb = $("#feturbulence");
//     // timeline.from(feTurb, {
//     //     attr: { baseFrequency: "0.01 0.02" }, // Adjust to the default values
//     //     duration: 2.8, // Match the duration with the initial ripple animation
//     //     ease: "power4.inOut"
//     // });
// customRippleOff();
//     let state = Flip.getState(this); // This references the current hovered element
//     Flip.from(state, {
//         duration: 2.5,
//         fade: true,
//         absolute: true,
//         absoluteOnLeave: true,
//         toggleClass: "hide-filter",
//         ease: "power4.inOut",
//         onComplete: function() {
//             feTurb.attr({ baseFrequency: "0.0 0.0" }); // Set baseFrequency to zero to eliminate the turbulence
//         }
//     });
//   });
// });


// const houses = ["gryffindor", "ravenclaw", "hufflepuff", "slytherin"];
// let currentHouse =  $(`#hphouse--box--${house}`);
// const houses: string[] = ["gryffindor", "ravenclaw", "hufflepuff", "slytherin"];
// console.log("houses loaded");
// // Assuming you have elements to which you attach the hover event
// const houseElements = document.querySelectorAll('div[id^="house-"]');
// console.log("house elements loaded");
// houseElements.forEach((element, index) => {
//     element.addEventListener('mouseover', () => {
//         const house = houses[index];
//         console.log("Current house:", house);
//         // Do something with the 'house' value
//     });
// });
// const houses: string[] = ["gryffindor", "ravenclaw", "hufflepuff", "slytherin"];

// // Get the DOM element
// const houseElement = document.querySelectorAll(`hphouse--box--${houses}`);

// if (houseElement) {
//     // Extract the house name from the ID
//     const idParts = houseElement.id.split('--');
//     const houseName = idParts[idParts.length - 1] as any; // The last part is the house name

//     // Find the index of the house name in the 'houses' array
//     const houseIndex = houses.indexOf(houseName);

//     if (houseIndex !== -1) {
//         // Use the index to get the corresponding house from the array
//         const currentHouse = houses[houseIndex];
//         console.log("Current house:", currentHouse);
//         // Do something with the 'currentHouse' value
//     } else {
//         console.log("House not found in the array");
//     }
// }


// let feTurb = $("#feturbulence");
// // let currentHouse = null as any;
// const timeline = gsap.timeline;
// GSAP's Flip plugin should be imported or included before using it.
// Assuming you've already done this.



// function MagicReveal(house:any) {
//     const spellElement = document.getElementById(`spell--${house}`) as HTMLElement;

//     spellElement.addEventListener("mouseover", function () {
//        timeline.to(this, {
//             duration: 2.8,
//             visibility: "visible",
//             display: "grid",
//             ease: "power4.inOut"
//         });
//     });

//     spellElement.addEventListener("mouseleave", function () {
//         timeline.to(this, {
//             duration: 2.8,
//             visibility: "hidden",
//             display: "none",
//             ease: "power4.inOut"
//         });
//     });
// }

// houses.forEach(house => {
//     MagicReveal(house);
//     console.log("magic reveal loaded");
// });

// $('.sp19--hp--gryffindor').on("mouseover" , function() {
// 	const bodyWidth = document.body.clientWidth;
// 	const bodyHeight = document.body.clientHeight;
// 	const randPosX = Math.floor(Math.random() * (300 - 1) + 10);
// 	const randPosY = Math.floor(Math.random() * (300 - 1) + 10);
// 	const posLog = document.getElementById('spellgryff');
// 	const posXY = 'x: ' + randPosX + '<br />' + 'y: ' + randPosY;

// 	$('#spellgryff').css('left', randPosX);
// 	$('#spellgryff').css('top', randPosY);

// 	// posLog.innerHTML = posXY;
// 	//  console.log = posXY;
//     console.log("hover");
// });


// function MagicReveal(house: any, currentHouse: any) {
//     let hoverSpell = $(`#spell--${house}`);

//     hoverSpell.on("mouseover", function () {

//         let state = Flip.getState(this);
//         Flip.from(state, {
//             duration: 2.8,
//             fade: true,
//             absolute: true,
//             absoluteOnLeave: true,
//             toggleClass: "reveal-spell-show",
//             ease: "power4.inOut",
//             delay: 1.5 
//         });
//     });

//     hoverSpell.on("mouseleave", function () {
      

//         let state = Flip.getState(this);
//         Flip.from(state, {
//             duration: 2.8,
//             fade: true,
//             absolute: true,
//             absoluteOnLeave: true,
//             toggleClass: "reveal-spell-hide",
//             ease: "power4.inOut",
//             onComplete: function() {
//                 // feTurb.attr({ baseFrequency: "0.0 0.0" });
//             }
            
//         });
//     });
// }



// houses.forEach(house => {
//     MagicReveal(house, house);


// });


// var ripple = rippleEffectHover();
// const ripple: any = new rippleEffectHover();

// class RippleEffectHover {
//     private parent: Element;
//     private intensity: number;
//     private strength: number;
//     private area: number;
//     private waveSpeed: number;
//     private speedIn: number;
//     private speedOut: number;
//     private easing: string;
//     private hover: boolean;
//     private texture: string;

//     constructor(parent: Element, options: {
//         intensity: number,
//         strength: number,
//         area: number,
//         waveSpeed: number,
//         speedIn: number,
//         speedOut: number,
//         easing: string,
//         hover: boolean,
//         texture: string
//     }) {
//         this.parent = parent;
//         this.intensity = options.intensity;
//         this.strength = options.strength;
//         this.area = options.area;
//         this.waveSpeed = options.waveSpeed;
//         this.speedIn = options.speedIn;
//         this.speedOut = options.speedOut;
//         this.easing = options.easing;
//         this.hover = options.hover;
//         this.texture = options.texture;
//     }

//     createRippleEffect(): any { // Replace 'any' with the specific type if available
//         return new RippleEffect({
//             parent: this.parent,
//             intensity: this.intensity,
//             strength: this.strength,
//             area: this.area,
//             waveSpeed: this.waveSpeed,
//             speedIn: this.speedIn,
//             speedOut: this.speedOut,
//             easing: this.easing,
//             hover: this.hover,
//             texture: this.texture,
//         });
//     }
// }

// // Example usage:
// const myDiv = document.querySelector('.my-div');

// if (myDiv) {
//     const options = {
//         intensity: 1,
//         strength: 2,
//         area: 4,
//         waveSpeed: 0.001,
//         speedIn: 2,
//         speedOut: 1.5,
//         easing: 'Expo.easeInOut',
//         hover: true,
//         texture: './assets/images/ripples512.png',
//     };

//     const rippleEffect = new RippleEffectHover(myDiv, options);
//     const effect = rippleEffect.createRippleEffect();
// }

// function rippleEffectHover() {

//     return new RippleEffect({
//         parent: document.querySelector('.my-div'),
//         intensity: 1,
//         strength: 2,
//         area: 4,
//         waveSpeed: 0.001,
//         speedIn: 2,
//         speedOut: 1.5,
//         easing: 'Expo.easeInOut',
//         hover: true,
//         texture: './assets/images/ripples512.png',
//     });
// }

// function applyHoverEffects(house: any, currentHouse: any) {
//     let hover = $(`#hphouse--box--${house}`);

//     hover.on("mouseover", function () {
// rippleEffectHover();
//         // let state = Flip.getState(this);
//         // Flip.from(state, {
//         //     duration: 2.8,
//         //     fade: true,
//         //     absolute: true,
//         //     absoluteOnLeave: true,
//         //     toggleClass: "animate-hp-fade-in",
//         //     ease: "power4.inOut",
//         //     delay: 1.5 
//         // });
//     });

//     hover.on("mouseleave", function () {
//         rippleEffectHover();
//     //    let feTurb = $("#feturbulence");
//     //     timeline.from(feTurb, {
//     //         // attr: { baseFrequency: "0.01 0.02" },
//     //         duration: 2.8,
//     //         ease: "power4.inOut"
//     //     });

//     //     let state = Flip.getState(this);
//     //     Flip.from(state, {
//     //         duration: 2.8,
//     //         fade: true,
//     //         absolute: true,
//     //         absoluteOnLeave: true,
//     //         toggleClass: "animate-hp-fade-out",
//     //         ease: "power4.inOut",
//     //         onComplete: function() {
//     //             feTurb.attr({ baseFrequency: "0.0 0.0" });
//     //         }
            
//     //     });
//     });
// }



// houses.forEach(house => {
//    applyHoverEffects(house, house);
//    rippleEffectHover();

// });

// const gryffCursor = document.getElementById('spellgryff');

// gryffCursor.onmousemove = function(e ) { 
//     const x = e.pageX - e.currentTarget.offsetLeft; 
//     const y = e.pageY - e.currentTarget.offsetTop; 
// }

// function Hoverloop() {
//     let hover = document.querySelectorAll("#hphouse--box");
//     let action: any;

//     hover.forEach((hov, i) => {
//         let index = i;
//         (function(hov, index) {
//             customHover();
//             // hov.addEventListener("mouseover", function () {
//             //     console.log("hover");
//             //     customHover();
//             //     // action = gsap.to('.line' + index, { x: '+=10', duration: 0.1, repeat: -1, yoyo: true, stagger: 0.12 });
//             //     // customRipple.call.timeline.play();
//             // });
//             // hov.addEventListener("mouseleave", function () {
//             //     // customRipple().pause();
//             //     // action.pause(0);
//             //     console.log("leave");
//             //     // hover.item(index).classList.remove("hover");
//             //     hover.item(index).id = "hpfluidcontainer-none";
//             // });
//         })(hov, index);
//     });
// }

// function customHoverR() {
//     let hover = $("#hphouse--box--ravenclaw");

//     hover.on("mouseover", function () {
//         $(this).addClass("hpfluidcontainer--ravenclaw");
//         let feTurb = $("#feturbulence");
//         // Use Flip plugin to create the flipping animation with a delay to start after the ripple
//         let state = Flip.getState(this); 
//         Flip.from(state, {
//             duration: 2.8,
//             fade: true,
//             absolute: true,
//             absoluteOnLeave: true,
//             toggleClass: "animate-hp-fade-in",
//             ease: "power4.inOut",
//             delay: 1.5 
//         });
//     });

//     hover.on("mouseleave", function () {
//         let feTurb = $("#feturbulence");
//         timeline.from(feTurb, {
//             attr: { baseFrequency: "0.01 0.02" }, // Adjust to the default values
//             duration: 2.8, // Match the duration with the initial ripple animation
//             ease: "power4.inOut"
//         });

//         let state = Flip.getState(this); // This references the current hovered element
//         Flip.from(state, {
//             duration: 2.5,
//             fade: true,
//             absolute: true,
//             absoluteOnLeave: true,
//             toggleClass: "hide-filter",
//             ease: "power4.inOut",
//             onComplete: function() {
//                 feTurb.attr({ baseFrequency: "0.0 0.0" }); // Set baseFrequency to zero to eliminate the turbulence
//             }
//         });
//     });
// }



// function customHoverSl() {
//     let hover = $("#hphouse--box");

//     hover.on("mouseover", function () {
//         $(this).addClass("hpfluidcontainer");
//         let feTurb = $("#feturbulence");
//         // Use Flip plugin to create the flipping animation with a delay to start after the ripple
//         let state = Flip.getState(this); 
//         Flip.from(state, {
//             duration: 2.8,
//             fade: true,
//             absolute: true,
//             absoluteOnLeave: true,
//             toggleClass: "animate-hp-fade-in",
//             ease: "power4.inOut",
//             delay: 1.5 
//         });
//     });

//     hover.on("mouseleave", function () {
//         let feTurb = $("#feturbulence");
//         timeline.from(feTurb, {
//             attr: { baseFrequency: "0.01 0.02" }, // Adjust to the default values
//             duration: 2.8, // Match the duration with the initial ripple animation
//             ease: "power4.inOut"
//         });

//         let state = Flip.getState(this); // This references the current hovered element
//         Flip.from(state, {
//             duration: 2.5,
//             fade: true,
//             absolute: true,
//             absoluteOnLeave: true,
//             toggleClass: "hide-filter",
//             ease: "power4.inOut",
//             onComplete: function() {
//                 feTurb.attr({ baseFrequency: "0.0 0.0" }); // Set baseFrequency to zero to eliminate the turbulence
//             }
//         });
//     });
// }

// function customHoverHuff() {
//     let hover = $("#hphouse--box");

//     hover.on("mouseover", function () {
//         $(this).addClass("hpfluidcontainer");
//         let feTurb = $("#feturbulence");
//         // Use Flip plugin to create the flipping animation with a delay to start after the ripple
//         let state = Flip.getState(this); 
//         Flip.from(state, {
//             duration: 2.8,
//             fade: true,
//             absolute: true,
//             absoluteOnLeave: true,
//             toggleClass: "animate-hp-fade-in",
//             ease: "power4.inOut",
//             delay: 1.5 
//         });
//     });

//     hover.on("mouseleave", function () {
//         let feTurb = $("#feturbulence");
//         timeline.from(feTurb, {
//             attr: { baseFrequency: "0.01 0.02" }, // Adjust to the default values
//             duration: 2.8, // Match the duration with the initial ripple animation
//             ease: "power4.inOut"
//         });

//         let state = Flip.getState(this); // This references the current hovered element
//         Flip.from(state, {
//             duration: 2.5,
//             fade: true,
//             absolute: true,
//             absoluteOnLeave: true,
//             toggleClass: "hide-filter",
//             ease: "power4.inOut",
//             onComplete: function() {
//                 feTurb.attr({ baseFrequency: "0.0 0.0" }); // Set baseFrequency to zero to eliminate the turbulence
//             }
//         });
//     });
// }




// function customRippleOff() {
//     const timeline = gsap.timeline({
       
//         ease: "power4.inOut",
//         fade: true,
//         yoyo: false
//     });

//     // const feTurb = document.querySelector('#feturbulence') as SVGElement; // Ensure proper element type

//     // timeline.add(
//     //     timeline.from(feTurb, {
//     //         duration: 2.8,
//     //         onUpdate: () => {
//     //             const bfX = timeline.progress() * 0.00 + 0.0; // base frequency x
//     //             const bfY = timeline.progress() * 0.0 + 0.0; // base frequency y
//     //             feTurb.setAttribute('baseFrequency', `${bfX} ${bfY}`);
//     //         }
//     //     }),
//     //     0
//     // );

//     timeline.pause();
// }
// function customHover() {
//     let hover = $("#hphouse--box");
//     let rippleState = Flip.getState("#feturbulence");
//     let bgNative = document.querySelector("#hpfluidcontainer") || null;
//     let swappedSVG = document.querySelector("#hpfluidcontainer-none");
//     const state = Flip.getState(".hpfluidcontainer, .hpfluidcontainer-none");
//     hover.on("mouseover", function () {
//         console.log("hover");
//         $(this).addClass("hpfluidcontainer");
//         $(this).removeClass("hpfluidcontainer-none");
//         bgNative?.classList.toggle("active");
//         swappedSVG?.classList.toggle("active");
//         Flip.from(state, {
//             duration: 0.6,
//             fade: true,
//             absolute: true,
//             absoluteOnLeave: true,
//             toggleClass: "flipping",
//             ease: "power1.inOut"
//         });

//     });


//     hover.on("mouseleave", function () {
//         console.log("leave");
//         $(this).removeClass("hpfluidcontainer");
//         $(this).addClass("hpfluidcontainer-none");
//         TweenMax.from($(this), 1, {css:{className:"hpfluidcontainer"}, delay:0.5, repeatDelay:0.75});
//     });
// }

// function customHover() {
//     $(".hphouse--box").each(function(index, element) {
//         let hover = $(element);

//         hover.on("mouseover", function () {
//             console.log("hover");
//             hover.attr('id', 'hpfluidcontainer' + index);
//             hover.removeClass("hpfluidcontainer-none");
//             // gsap animation code here
//         });

//         hover.on("mouseleave", function () {
//             console.log("leave");
//             hover.attr('id', 'hpfluidcontainer-none' + index);
//             hover.removeClass("hpfluidcontainer");
//             // gsap animation code here
//         });
//     });
// }



// function customHover() {
//   let svg = document.querySelector('svg');
//   let action;

//   svg.addEventListener('mouseenter', function () {
//     svg.classList.add('hover'); // Add class to SVG for filtering
//   });

//   svg.addEventListener('mouseleave', function () {
//     svg.classList.remove('hover'); // Remove class from SVG to stop filtering
//   });
// }

// (window as any).$ = (window as any).jQuery = jQuery;

// (alias) module TimelineMax
// (alias) var TimelineMax: {
//     (vars: any, position: any): any;
//     updateRoot(time: any): void;
// } 


//   class TimelineMax {
//     set(arg0: string, arg1: { attr: { baseFrequency: number; }; }) {
//         throw new Error('Method not implemented.');
//     }
//     to(arg0: string, arg1: number, arg2: { attr: { baseFrequency: number; }; repeat: number; yoyo: boolean; }) {
//         throw new Error('Method not implemented.');
//     }
//     play() {
//         throw new Error('Method not implemented.');
//     }
//     pause: any;
   
//     constructor(vars: any) {}
    
//   }

// let tl: GSAPStatic.Timeline;
// Select the necessary SVG and image elements
// const svg = document.querySelector('svg') as any;
// const image = document.querySelector('image') as any; // Make sure this targets your image element

// // Function to convert an image to base64
// function toBase64(url:any, callback:any) {
//     const img = new Image();
//     img.crossOrigin = 'Anonymous';
//     img.onload = function() {
//       let canvas = document.createElement('canvas') as any;
//       const ctx = canvas.getContext('2d');
//   console.log("Image loaded and processed"); // Log after image processing
//       // Make sure to explicitly cast img as HTMLImageElement
//       if (img instanceof HTMLImageElement && ctx) {
//         canvas.height = img.height; // Accessing the height property
//         canvas.width = img.width; // Accessing the width property
//         ctx.drawImage(img, 0, 0);
  
//         const dataURL = canvas.toDataURL('image/png');
//         callback(dataURL);
//         canvas = null;
//       }
//     };
    
//     img.src = url;
//   }
  

// // Function to apply the image data to the SVG filter
// function applyFilter(data:any) {
//   const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
//   filter.id = 'filter';

//   const feImage = document.createElementNS('http://www.w3.org/2000/svg', 'feImage');
//   feImage.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', data);
//   feImage.setAttribute('result', 'source');

//   const feDisplacementMap = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
//   feDisplacementMap.setAttribute('in', 'source');
//   feDisplacementMap.setAttribute('in2', 'source');
//   feDisplacementMap.setAttribute('scale', '10');
//   feDisplacementMap.setAttribute('x', '0');
//   feDisplacementMap.setAttribute('y', '0');

//   filter.appendChild(feImage);
//   filter.appendChild(feDisplacementMap);

//   svg.appendChild(filter);

//   image.setAttribute('filter', 'url(#filter)');
// }

// // Apply the effect
// toBase64('path_to_your_image', applyFilter); // Replace 'path_to_your_image' with your image URL


// var xlink   = "http://www.w3.org/1999/xlink";
// var imgUrl  = "./assets/ripples512.png";
// var feImage = document.querySelector("feImage") as any;

// toBase64(imgUrl, function(data:any) {

//   feImage.setAttributeNS(xlink, "xlink:href", data);
//     console.log(data);
// //   var tl = new TimelineMax({ repeat: -1, repeatDelay: 1 });
//     var tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
//   tl.from("#displacement-map", 1.5, { attr: { scale: 100 }}, 0)
//     .to("feImage", 1.5, { attr: { x: -125, y: -125, width: "150%", height: "150%" }}, 0);
// });


// function toBase64(url:any, callback:any){
  
//   var img = new Image();
//   img.crossOrigin = "anonymous";
//   img.onload = function(){
//     var canvas = document.createElement("canvas") as any;
//     var ctx = canvas.getContext("2d");
//     // canvas.height = this(this as HTMLCanvasElement).height ;
//     // canvas.width = this.width;
//     // let height = this.height;

//     ctx.drawImage(this, 0, 0);
//     console.log("Image loaded and processed"); // Log after image processing

//     var dataURL = canvas.toDataURL("image/png");
//     callback(dataURL);
//     canvas = null; 
//     console.log("toBase64 function completed"); // Log at the end
//   };
  
//   img.src = url;
// }

// $(
// 	'.sp19--hp--flex__col.sp19--hp--gryffindor,.sp19--hp--flex__col.sp19--hp--ravenclaw,.sp19--hp--flex__col.sp19--hp--slytherin,.sp19--hp--flex__col.sp19--hp--hufflepuff'
// ).ripples({
// 	resolution: 512,
// 	dropRadius: 20,
// 	perturbance: 0.04,

// });

// $('.sp19--hp--flex__col.sp19--hp--gryffindor').ripples({
// 	resolution: 512,
// 	dropRadius: 20,
// 	perturbance: 0.04,
// 	crossOrigin: 'anonymous',
// 	imageUrl:
// 		'./assets/images/fa19_harrypotter_signup_page_pattern_gryffindor.jpg'
// });

// $('.sp19--hp--flex__col.sp19--hp--slytherin').ripples({
// 	resolution: 512,
// 	dropRadius: 20,
// 	perturbance: 0.04,
// 	crossOrigin: 'anonymous',
// 	imageUrl:
// 		'./assets/images/fa19_harrypotter_signup_page_pattern_slytherin.jpg'
// });

// $('.sp19--hp--flex__col.sp19--hp--ravenclaw').ripples({
// 	resolution: 512,
// 	dropRadius: 10,
// 	perturbance: 0.02,
// 	crossOrigin: 'anonymous',
// 	imageUrl:
// 		'./assets/images/fa19_harrypotter_signup_page_pattern_ravenclaw.jpg'
// });

// $('.sp19--hp--flex__col.sp19--hp--hufflepuff').ripples({
// 	resolution: 512,
// 	dropRadius: 20,
// 	perturbance: 0.04,
// 	crossOrigin: 'anonymous',
// 	imageUrl:
// 		'./assets/images/fa19_harrypotter_signup_page_pattern_hufflepuff.jpg'
// });

// let paragraphs = gsap.utils.toArray("#div1 p");

// document.addEventListener("mouseenter", function() {
//     let random = gsap.utils.random(0, paragraphs.length -1, 1);
//     gsap.to(paragraphs[random], {
//         xPercent: 50, duration: 0.5,
//     })
// });
// $("section").hover(hoverthis);
// function hoverthis() {
//   let random = gsap.utils.random(0, paragraphs.length -1, 1);
//     gsap.to(paragraphs[random], {
//         xPercent: 50, duration: 0.5,
//     })
// }

