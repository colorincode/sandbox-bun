import Splide from '@splidejs/splide';
// local imports
import './project-doc-temp_nav';
const splide = new Splide( '.splide' );
let scrollTimeout: number | null = null;
let isScrolling = false;
let lastScrollPosition = 0;

document.addEventListener('DOMContentLoaded', () => {
    //empty array to handle multiple pointer events
    // let activePointers = [];
    let splideOne = document.getElementById('fullscreenCarousel');
    let splideTwo = document.getElementById('testimonialCarousel');
// set up to handle multiple splide carousels
    if (splideOne) {
      new Splide(splideOne, {
        width: '100vw',
        heightRatio: 0.5,
      }).mount();
    }
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
        splideTwo?.classList.add('splide--resized');  
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

  function changeNav(scrollPosition: number) {
    const navBar = document.querySelector(".cic--navbar--fixedtop") as HTMLElement;
    if (navBar) {
      if (scrollPosition <= 0) {
        // Reset the navbar when at the top
        navBar.style.removeProperty('top');
      } else {
        navBar.style.setProperty('top', '0px');
      }
    }
  }
onscroll = (event) => {
  setupScrollListener();

};

function handleScroll() {
  if (!isScrolling) {
    isScrolling = true;
    requestAnimationFrame(() => {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      changeNav(currentScrollPosition);
      lastScrollPosition = currentScrollPosition;
      isScrolling = false;
    });
  }
}

function setupScrollListener() {
  window.addEventListener("scroll", handleScroll, { passive: true });
}

function resetScrollListener() {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  window.removeEventListener("scroll", handleScroll);
  setupScrollListener();
  changeNav(0); //to reset nav
}



// Reset on page visibility change
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    resetScrollListener();
  }
});