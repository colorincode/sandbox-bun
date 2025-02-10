// import './scrollparallax';
import { Splide } from '@splidejs/splide';
import TypingAnimation from "./typing_animation";
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
const splide = new Splide('.splide');

const typinganimation = new TypingAnimation(document.querySelector(".targetTyping") as HTMLDivElement, {
  loop: true,
  typingSpeed: 100,
  deletingSpeed: 100,
});

typinganimation
  .pauseFor(2000)
  .typeString("Doctor")
  .pauseFor(1000)
  .deleteChars(6)
  .pauseFor(1000)
  .typeString("Freedom Lover")
  .pauseFor(1000)
  .deleteChars(13)
  .pauseFor(1000)
  .typeString("Representative")
  .pauseFor(1000)
  .deleteChars(14)
  .pauseFor(1000)
  .typeString("Baseball Coach")
  .pauseFor(1000)
  .deleteChars(14)
  .pauseFor(1000)
  .typeString("Tesla Enthusiast")
  .pauseFor(1000)
  .deleteChars(16)
  .pauseFor(1000)
  .typeString("Doge Enjoyer")
  .pauseFor(1000)
  .deleteChars(16)
  .start();

console.log("stepped through imports, help me");

function pageClock() {
  let date = new Date();
  var secs = ('00' + date.getSeconds()).slice(-2);
  var mins = ('0' + date.getMinutes()).slice(-2);
  var hr = date.getHours();
  let session = "AM";

  if (hr == 0) {
    hr = 12;
  }
  if (hr > 12) {
    hr = hr - 12;
    session = "PM";
  }

  var Time = hr + ":" + mins + ":" + secs + "&nbsp" + session;
  document.getElementById("clockStyle")!.innerHTML = Time;
}
setInterval(pageClock, 1000);

document.addEventListener('DOMContentLoaded', () => {
  let splideTwo = document.getElementById('testimonialCarousel');

  if (splideTwo) {
    new Splide(splideTwo, {
      autoHeight: true,
      type: 'loop',
      focus: 'center',
      padding: '15%',
      gap: '15%',
      grid: {
        rows: 1,
        cols: 1,
        gap: {
          row: '1fr',
          col: '1fr',
        },
      },
    }).mount().on('resized', function() {
      console.log("splideTwo resize fired");
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  var currentTime = new Date();
  var year = currentTime.getFullYear();
  var currentYearElement: HTMLElement = document.getElementById("currentYear")!;
  currentYearElement.textContent = year.toString();
});


let resizeTimer: number | Timer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    const twitterTweet = document.querySelector('.twitter-tweet');
    if (twitterTweet) {
      window.location.reload();
    }
  }, 500);
});




function dogeDimensions() {
  function setDimensions() {
    var sourceElement = document.querySelector('.twitter-tweet-rendered') as HTMLElement;
    var targetElement = document.querySelector('.doge--addr--tile') as HTMLElement;

    if (!sourceElement || !targetElement) {
      setTimeout(setDimensions, 100);
      return;
    }

    var dimensions = sourceElement.getBoundingClientRect();
    if (dimensions.height > 0) {
      targetElement.style.width = dimensions.width + 'px';
      targetElement.style.height = dimensions.height + 'px';
    } else {
      setTimeout(setDimensions, 100);
    }
  }

  setDimensions();
}

document.addEventListener('DOMContentLoaded', dogeDimensions);


// function dogeDimensions() {
//   var sourceElements = document.getElementsByClassName('twitter-tweet-rendered');
//   var targetElements = document.getElementsByClassName('doge--addr--tile');

//   for (var i = 0; i < sourceElements.length; i++) {
//     var sourceElement = sourceElements[i] as HTMLElement;
//     var targetElement = targetElements[i] as HTMLElement;

//     var dimensions = sourceElement.getBoundingClientRect();
//     targetElement.style.width = dimensions.width + 'px';
//     targetElement.style.height = dimensions.height + 'px';
//   }
// }

// function scrollTrigger() {
//   document.addEventListener("scroll", scrollCallback, { once: true });
//   dogeDimensions();
// }

// const scrollCallback = () => {
//   document.removeEventListener("scroll", scrollCallback);
//   setTimeout(scrollTrigger, 3000);
// };

// scrollTrigger();

const csAwaitDelay = 1000 as number;
const dogeCopyButton = document.getElementById('copyAddrBtn') as HTMLElement;
const dogeAddrString = 'DJnUQn5pXmdWqU73AhfuDLQ7cf8S6Eirav' as string;

dogeCopyButton.addEventListener("copy", (event) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(dogeAddrString)
      .then(() => {
        console.log('green');
        dogeCopyButton.style.backgroundColor = "green";
        setTimeout(() => {
          dogeCopyButton.style.backgroundColor = "";
        }, csAwaitDelay);
      })
      .catch((error) => {
        dogeCopyButton.style.color = "red";
        setTimeout(() => {
          dogeCopyButton.style.backgroundColor = "";
        }, csAwaitDelay);
        console.error('Failed to copy text to clipboard:', error);
      });
  } else {
    // For Android devices
    const input = document.createElement('input');
    input.setAttribute('value', dogeAddrString);
    document.body.appendChild(input);
    input.select();
 
    // document.execCommand('copy');
    document.body.removeChild(input);

    console.log('green');
    dogeCopyButton.style.backgroundColor = "green";
    setTimeout(() => {
      dogeCopyButton.style.backgroundColor = "";
    }, csAwaitDelay);
  }
});



// navbar function

//placing this in global scope so it can be accessed by pointer api listeners
const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

document.addEventListener('DOMContentLoaded', () => {
    // Fetch navbar elements
    const navbarMenu = document.querySelector<HTMLElement>(".navbar-menu");
    const navbarBurger = document.querySelector<HTMLElement>(".navbar-burger");
    const burgerBackground = document.querySelector<HTMLElement>(".burger--background");
    const navbarBurgerIcon = document.querySelector<HTMLElement>(".navbar-burger i");
    const hamburgerIcon = document.querySelector<HTMLElement>(".hamburger--icon--fontawesome");
    const navbarBurgers = document.querySelectorAll<HTMLElement>(".navbar-burger");
    const navbarWrap = document.querySelector<HTMLElement>(".navbar-menu > .navbar__wrapper--vertical");
    // Array to handle multiple pointer events
    let activePointers: number[] = [];
  
    // Function to toggle classes
    const toggleClass = (element: HTMLElement, className: string) => {
      element.classList.toggle(className);
    };
  
    // Function to set styles
    const setStyles = (element: HTMLElement, styles: {[key: string]: string}) => {
      Object.assign(element.style, styles);
    };
    gsap.set(navbarWrap, { height: 0, opacity: 0, overflow: 'hidden' });
    // Function to handle burger click
    const handleBurgerClick = (el: HTMLElement) => {
    //   toggleClass(navbarMenu, "is-active");
    const isOpen = navbarWrap.classList.contains('is-active');
 
   
       gsap.to(navbarWrap , {
            height: isOpen ? 0 : 'auto',
            opacity: isOpen ? 0 : 1,
            duration: 0.5,
            ease: 'power4.inOut',
            })
      toggleClass(navbarBurger, "is-active");
      toggleClass(burgerBackground, 'is-active');
      toggleClass(navbarWrap, "is-active");
      if (navbarBurger.classList.contains("is-active")) {
     
        setStyles(navbarBurger, {"zIndex": "1004", "visibility": "visible"});
        // setStyles(navbarMenu, {"zIndex": "1003", "visibility": "visible", "display": "flex"});
        setStyles(navbarWrap, {"zIndex": "1003", "visibility": "visible", "display": "flex"});
        navbarBurgerIcon.classList.replace("fa-bars", "fa-x");
        setStyles(navbarBurgerIcon, {"visibility": "visible"});
        hamburgerIcon.classList.replace("burgerColor-forwards", "burgerColor-backwards");
      } else {
        setStyles(navbarBurger, {"zIndex": "1", "visibility": "hidden"});
        // setStyles(navbarMenu, {"zIndex": "1", "visibility": "hidden"});
        setStyles(navbarWrap, {"zIndex": "1", "visibility": "hidden", "display": "none"});
        navbarBurgerIcon.classList.replace("fa-x", "fa-bars");
        hamburgerIcon.classList.replace("burgerColor-backwards", "burgerColor-forwards");
      }
    };
  
    // Add event listeners to navbar burgers
    navbarBurgers.forEach(el => {
      el.addEventListener('pointerdown', (ev: PointerEvent) => {
        ev.stopPropagation();
        activePointers.push(ev.pointerId);
        el.setPointerCapture(ev.pointerId);
        handleBurgerClick(el);
        el.releasePointerCapture(ev.pointerId);
      });
    });
  });
  