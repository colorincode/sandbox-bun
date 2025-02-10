import Reveal from 'reveal.js';


let csAwaitDelay = 500;
const bodyEl: HTMLElement = document.querySelector('body');
const revealEl: HTMLElement = document.querySelector('.reveal[data-reveal-type="projectAudacity"]');
const headerEl: HTMLElement = document.querySelector('.sitewide--banner__wrapper');
const globalHeaderEl: HTMLElement = document.querySelector('.test--global__headerwrapper');
const globalFooterEl: HTMLElement = document.querySelector(".global__footerwrapper");
const revealContainer: HTMLElement = document.querySelector('.reveal-viewport');
function getCalculatedHeight(element: HTMLElement): number {
    const computedStyle = window.getComputedStyle(bodyEl);
    return parseFloat(computedStyle.height);
}
interface AspectRatioElement extends HTMLElement {
    aspectRatio: number;
  }

let deck = new Reveal({
    disableLayout: true,
    center: false,
    embedded: true,
    controls: true,
    hash: true,
    mouseWheel: false,
    transition: 'slide',
    transitionSpeed: 'slow',
    backgroundTransition: 'slide',
    margin: 0,
    minScale: 1,
    maxScale: 1
});

deck.initialize();

function updateLayout() {
    const windowHeight = window.innerHeight;
    const headerHeight = getCalculatedHeight(globalHeaderEl);
    const footerHeight = getCalculatedHeight(globalFooterEl);
    const headerTwoHeight = getCalculatedHeight(headerEl);
    const revealHeight = windowHeight - headerHeight - headerTwoHeight - footerHeight;

    const root = document.documentElement;

    root.style.setProperty('--slide-width', '100%');
    root.style.setProperty('--slide-height', `${revealHeight}px`);
    root.style.setProperty('--slide-scale', '1');
    root.style.setProperty('--viewport-width', `${window.innerWidth}px`);
    root.style.setProperty('--viewport-height', `${windowHeight}px`);
    // root.style.setProperty('--r-controls-spacing', `${footerHeight}px`);
    bodyEl.style.height = '100dvh';
    if (revealContainer) {
    revealContainer.style.width = '100%';
    revealContainer.style.height = `${revealHeight}px`;
    }
    // revealContainer.style.flexGrow = '1';
    // revealContainer.style.minHeight = `${revealHeight}px`;

    revealEl.style.width = '100%';
    revealEl.style.height = `${revealHeight}px`;
    revealEl.style.flexGrow = '1';
    revealEl.style.minHeight = `${revealHeight}px`;
    deck.layout();
}

function initLayout() {
    updateLayout();
    window.addEventListener('resize', updateLayout);
}
  const maintainAspectRatio = (): void => {
    const elements = document.querySelectorAll<AspectRatioElement>('[data-aspect-ratio]');
    
    elements.forEach((element) => {
      const aspectRatio = parseFloat(element.dataset.aspectRatio || '1');
      element.aspectRatio = isNaN(aspectRatio) ? 1 : aspectRatio;
      updateElementSize(element);
    });
  };
  
  const updateElementSize = (element: AspectRatioElement): void => {
    const { width } = element.getBoundingClientRect();
    const height = width / element.aspectRatio;
    element.style.setProperty('--aspect-ratio-height', `${height}px`);
  };
  
  const debouncedResize = debounce(maintainAspectRatio, 250);
  
  document.addEventListener('DOMContentLoaded', () => {
    maintainAspectRatio();
    initLayout();
    window.addEventListener('resize', debouncedResize);
  });
  
  function debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    
    return (...args: Parameters<T>): void => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => func(...args), wait);
    };
  }
  