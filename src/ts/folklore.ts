// import gsap from 'gsap' ;
// import Draggable from 'gsap/Draggable';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Flip from 'gsap/Flip';
// import { TextPlugin} from 'gsap/all';
// import { EasePack } from 'gsap/EasePack';
// import './ScrollSmoother.min';

// gsap.registerPlugin(
//     TextPlugin,
//     EasePack,
//     Flip,
//     Draggable,
//     ScrollTrigger,
//     ScrollSmoother
//   );


// let scrollTrig = self;
// const afterScroll = e => { document.body.style.cssText += `--scrollTop: ${scrollTrig.scrollY}px` }
// const scroll = () => { window.addEventListener('scroll', afterScroll) }

// scroll()

// // gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
// ScrollSmoother.create({
//   wrapper: '.wrapper',
//   content: '.content'
// })

// main.ts

document.addEventListener('DOMContentLoaded', () => {
  const parallaxLayers = document.querySelectorAll('.content');

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    parallaxLayers.forEach((layer: Element) => {
      const speed = (layer as HTMLElement).dataset.speed || '0';
      const yPos = -(scrollPosition * parseFloat(speed));
      (layer as HTMLElement).style.transform  += `--scrollTop: ${self.scrollY}px`;
    });
  });
});
