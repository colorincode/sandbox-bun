import Splide from '@splidejs/splide';
import gsap from 'gsap' ;
import Draggable from 'gsap/Draggable';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Flip from 'gsap/Flip';
import { TextPlugin} from 'gsap/all';
import { EasePack } from 'gsap/EasePack';
import ScrollToPlugin from 'gsap' ;


gsap.registerPlugin(
    TextPlugin,
    EasePack,
    Flip,
    Draggable,
    ScrollTrigger,
    ScrollToPlugin,
);
// local imports
const splide = new Splide( '.splide' );

document.addEventListener('DOMContentLoaded', () => {
    //empty array to handle multiple pointer events
    // let activePointers = [];
    let donutSplide = document.getElementById('donutCarousel');
// set up to handle multiple splide carousels

    if (donutSplide) {
      new Splide(donutSplide, {
        autoHeight: true,
        type: 'loop',
        focus: 'center',
        padding: '15%',
        gap: '15%',
        pagination: false,
        grid: {
          rows: 1,
          cols: 1,
          gap : {
            row: '1fr',
            col: '1fr',
          },
        },
        mediaQuery: 'min',
        breakpoints: {
          640: {
            padding: '5%',
            gap: '5%',
            destroy: false,
          },
        },
      }).mount().on('resized', function() {
        donutSplide?.classList.add('splide--resized');  
        console.log("donutSplide resize fired");
      });
    }
  });

  const swapImgContainers = gsap.utils.toArray<Element>(".donut--icons");
  

  swapImgContainers.forEach((el) => {
    // const el = container.querySelector<HTMLElement>(".donuts--icons-swapimg");
    // if (!el) return; // non null ass
   
    function cancelHandler(e: PointerEvent) {
      el.releasePointerCapture(e.pointerId);
    }
    function setHandler(e: PointerEvent) {
      el.setPointerCapture(e.pointerId);
    }
    const defaultImg = el.querySelector<HTMLImageElement>('.donuts--icons-swapimg');
    const hoverImg = el.querySelector<HTMLImageElement>('.donuts--icons-swapimg--hover');
    if (!defaultImg || !hoverImg) return; // non null ass
    
    const swapImgTimeline = gsap.timeline({ paused: true });
  
    swapImgTimeline
    .to(defaultImg, { autoAlpha: 0, duration: 0.5, ease: "none" },)
    .to(hoverImg, { autoAlpha: 1, duration: 0.3,scale:1, ease: "none" },0),

    el.addEventListener("pointerenter", (e) => {
      setHandler(e);
      // console.log("pointer captured");
      swapImgTimeline.play();
      e.stopPropagation();
      // console.log("pointer has entered");
    });
  
    el.addEventListener("pointerleave", (e) => {
      swapImgTimeline.reverse();
      // console.log("pointer has left");
      e.stopPropagation();
      cancelHandler(e);
      // console.log("capture is canceled");
    });
  });
///nav related
const subMenuItems = document.querySelectorAll('.donut--mobile--wrapper--li') as NodeListOf<HTMLElement>;

subMenuItems.forEach(item => {
  const subMenu = item.querySelector('.donut--mobile--inner--ul') as HTMLElement;
  const icon = item.querySelector('i') as HTMLElement;
  gsap.set(subMenu, { height: 0, opacity: 0, overflow: 'hidden' });

  item.addEventListener('click', (e) => {
    e.preventDefault();
    
    const isOpen = item.classList.contains('donut--mobile--wrapper--li-active');
    item.classList.toggle('donut--mobile--wrapper--li-active');
    
    gsap.to(subMenu, {
      height: isOpen ? 0 : 'auto',
      opacity: isOpen ? 0 : 1,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        if (!isOpen) {
          gsap.set(subMenu, { overflow: 'visible' });
        }
      }
    });
    icon.classList.toggle('fa-angle-down');
    icon.classList.toggle('fa-angle-up');
  });
});
const hamburgerMenu = document.querySelector('.donut--hamburger--wrapper');
hamburgerMenu.addEventListener('click', (e) => {

  e.preventDefault();
  const icon = document.querySelector('.donut--hamburger--icon') as HTMLElement;
  let hamburgerNav =  document.querySelector('.donut--dropdown__wrapper--ul');
  hamburgerNav.classList.toggle('dropdown--visible');
  const isOpen = hamburgerNav.classList.contains('dropdown--visible');
  if (isOpen) {
    gsap.to('.donut--dropdown__wrapper--ul', {
      // right: 0,
      stagger: 0.25,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        // if (!isOpen) {
        //   gsap.set(hamburgerNav, { overflow: 'visible' });
        // }
      }
    });
    // icon.classList.add('fa-circle-xmark');
    // icon.classList.remove('fa-bars');
    gsap.to('.fa-circle-xmark', {
      // right: 0,
      autoAlpha: 1,
      // stagger: 0.15,
      // color: "#238FB9",
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        
        // if (!isOpen) {
        //   gsap.set(hamburgerNav, { overflow: 'visible' });
        // }
      }
    });
 
  }
  icon.classList.toggle('fa-circle-xmark');
  icon.classList.toggle('fa-bars');
  gsap.to('.fa-bars', {
    // right: 0,
    autoAlpha: 1,
    // stagger: 0.15,
    // color: "#FFFFFF",
    duration: 0.4,
    delay: 0,
    ease: 'power2.inOut',
    onComplete: () => {
      // if (!isOpen) {
      //   gsap.set('.fa-bars', { paused: true });
      // }
    }
  });
});
  document.addEventListener('DOMContentLoaded', () => {
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var currentYearElement: HTMLElement = document.getElementById("currentYear")!;
    currentYearElement.textContent = year.toString();
  });


