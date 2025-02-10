// Placing this in global scope so it can be accessed by pointer API listeners
const navbarBurgers: HTMLElement[] = Array.from(document.querySelectorAll('.navbar-burger'));

// Wait for all DOM content to load before firing function
document.addEventListener('DOMContentLoaded', () => {
  // Fetch navbar elements
  const navbarMenu = document.querySelector(".navbar-menu") as HTMLElement;
  const navbarBurger = document.querySelector(".navbar-burger") as HTMLElement;
  const burgerBackground = document.querySelector(".burger--background") as HTMLElement;
  const navbarBurgerIcon = document.querySelector(".navbar-burger i") as HTMLElement;
  const hamburgerIcon = document.querySelector(".hamburger--icon--fontawesome") as HTMLElement;
  const verticalNav = document.querySelector(".navbar__wrapper--vertical") as HTMLElement;
  // Empty array to handle multiple pointer events
  let activePointers: number[] = [];

  // Loop through navbar elements and add pointer API listeners
  navbarBurgers.forEach(el => {
    el.addEventListener('pointerdown', (ev: PointerEvent) => {
      // Loop through array of pointers and set pointer capture
      activePointers.push(ev.pointerId);
      el.setPointerCapture(ev.pointerId);

      // Toggle active state for nav elements
      navbarMenu.classList.toggle("is-active");
      navbarBurger.classList.toggle("is-active");
      burgerBackground.classList.toggle('is-active');

      if (navbarBurger.classList.contains("is-active")) {
        // Set z-index and visibility in an open/active state
        verticalNav.classList.add("is-active");
        navbarBurger.style.zIndex = "1004";
        navbarBurger.style.visibility = "visible";
        // navbarMenu.style.zIndex = "1003";
        // navbarMenu.style.visibility = "visible";

        // Icon switch
        navbarBurgerIcon.classList.remove("fa-bars");
        navbarBurgerIcon.classList.add("fa-x");
        navbarBurgerIcon.style.visibility = "visible";
        hamburgerIcon.classList.remove("burgerColor-forwards");
        hamburgerIcon.classList.add("burgerColor-backwards");
        //this line might be off
        if(verticalNav.classList.contains("is-active")) {
          verticalNav.style.visibility = "visible";
          verticalNav.style.display = "flex";
        }
        // if(navbarMenu.classList.contains("navbar__wrapper--vertical")) {
        //   verticalNav.style.visibility = "visible";
        //   verticalNav.style.display = "flex";
        // }
        // Release pointer capture if menu has been toggled on but still active
        el.releasePointerCapture(ev.pointerId);
      } else {
        // Set z-index and visibility in a closed state, to stop interference with other elements
        verticalNav.classList.remove("is-active");
        navbarBurger.style.zIndex = "1";
        navbarBurger.style.visibility = "hidden";
        // navbarMenu.style.zIndex = "1";
        // navbarMenu.style.visibility = "hidden";

        // Icon switch
        navbarBurgerIcon.classList.remove("fa-x");
        navbarBurgerIcon.classList.add("fa-bars");
        hamburgerIcon.classList.remove("burgerColor-backwards");
        hamburgerIcon.classList.add("burgerColor-forwards");
        //this line might be off
        if(!verticalNav.classList.contains("is-active")) {
          verticalNav.style.visibility = "hidden";
          verticalNav.style.display = "none";
        }
        // Release pointer capture if menu has been toggled off
        el.releasePointerCapture(ev.pointerId);
      }

      ev.stopPropagation();
    });
  });
});
