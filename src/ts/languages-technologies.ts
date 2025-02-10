// const container = document.querySelector('.scrolling-icons_container');

// container.addEventListener('wheel', (e) => {
//     if (e.deltaY !== 0) {
//         e.preventDefault();
//         container.scrollLeft += e.deltaY;
//     }
// }, { passive: false });

// Function to calculate total width of an icon including margins
function getIconTotalWidth(element: Element): number {
    const styles = window.getComputedStyle(element);
    const marginLeft = parseFloat(styles.marginLeft);
    const marginRight = parseFloat(styles.marginRight);
    return (element as HTMLElement).offsetWidth + marginLeft + marginRight;
  }
  
  // Function to set container width based on screen size
  function setContainerWidth(container: HTMLElement, iconTotalWidth: number) {
    const screenWidth = window.innerWidth;
    
    if (screenWidth > 1550) {
      container.style.width = `${iconTotalWidth * 5}px`;
    } else if (screenWidth > 1230) {
      container.style.width = `${iconTotalWidth * 4}px`;
    } else if (screenWidth > 768) {
      container.style.width = `${iconTotalWidth * 3}px`;
    } else {
        container.style.width = `${iconTotalWidth * 3}px`;
    }
  }
  
  // Function to handle wheel event
  function handleWheel(event: WheelEvent, container: HTMLElement, iconTotalWidth: number) {
    event.preventDefault();
    
    const scrollDirection = Math.sign(event.deltaY);
    const scrollAmount = iconTotalWidth * scrollDirection;
    
    container.scrollBy({
      top: 0,
      left: scrollAmount,
      behavior: 'smooth'
    });
  }
  
  // Get all icon containers
  const iconContainers = document.querySelectorAll('.scrolling-icons_container') as NodeListOf<HTMLElement>;
  
  iconContainers.forEach(container => {
    // Get the first icon to calculate its total width
    const firstIcon = container.querySelector('.pricing--icon--svg__wrapper') as HTMLElement;
    const iconTotalWidth = getIconTotalWidth(firstIcon);
  
    // Set initial container width
    setContainerWidth(container, iconTotalWidth);
  
    // Add wheel event listener
    container.addEventListener('wheel', (event: WheelEvent) => handleWheel(event, container, iconTotalWidth));
  });
  
  // Add event listener for window resize
  window.addEventListener('resize', () => {
    iconContainers.forEach(container => {
      const firstIcon = container.querySelector('.pricing--icon--svg__wrapper') as HTMLElement;
      const iconTotalWidth = getIconTotalWidth(firstIcon);
      setContainerWidth(container, iconTotalWidth);
    });
  });