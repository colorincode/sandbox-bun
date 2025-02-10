
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

//reveal init , need for pages that use it. 
let firstofDeck = document.querySelector('.design') as HTMLElement;
let mainportfolioDeck = document.querySelector('.designportfoliodeck') as HTMLElement;
let revealSelector = document.querySelector('.reveal') as HTMLElement;
let deck = new Reveal(
  {
      // Parallax background image
  parallaxBackgroundImage: '../../assets/desat-prod-invert-bg.jpg', // e.g. "https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg"

  // Parallax background size
  parallaxBackgroundSize: '1632px 780px', // CSS syntax, e.g. "2100px 900px" - currently only pixels are supported (don't use % or auto)
//   view: 'scroll',

//   // Force the scrollbar to remain visible
//   scrollProgress: true,
  parallaxBackgroundHorizontal: 200,
  parallaxBackgroundVertical: 50,
    disableLayout: true,
    center: false,
    hash: true,
    mouseWheel: false,
    transition: 'fade',
    embedded: true,
    // transitionSpeed: 'medium',
    backgroundTransition: 'slide',
    // width:'100%', //needs-fix
    // height: '100%', //needs-fix
    // scroll: true,
    // width:1620 , //needs-fix
    // height: 980, //needs-fix
    touch: true,
    margin: 0,
    minScale: 1,
    maxScale: 2
})


document.addEventListener('DOMContentLoaded', () => {
  if (revealSelector) {
    deck.initialize();
    console.log('be a deck');
  }


});

window.addEventListener("resize", onResize);
function onResize() {
  if (revealSelector) {
deck.destroy();
deck.initialize();
  }
console.log('window resize, reveal reloaded..');
}

