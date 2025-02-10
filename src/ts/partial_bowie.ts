let loaderInterval: number | null = null;

function showLoader(duration: number = 7000): void {
    console.log('Showing loader');
    const loader = document.getElementById("loader");
    const contentContainer = document.getElementById("content-container");
    
    if (loader && contentContainer) {
        loader.style.display = "block";
        contentContainer.style.display = "none";
        
        setTimeout(() => hideLoader(), duration);
    } else {
        console.error('Loader or content container not found');
    }
}

function hideLoader(): void {
    console.log('Hiding loader');
    const loader = document.getElementById("loader");
    const contentContainer = document.getElementById("content-container");
    
    if (loader && contentContainer) {
        loader.style.display = "none";
        contentContainer.style.display = "block";
    } else {
        console.error('Loader or content container not found');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM content loaded, calling showLoader');
    showLoader();
    generateStars();
});

// Night Sky element
const $el: HTMLElement = document.body;

// Generate a random number between min and max values
const genRandomNumber = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
};

// Generate stars
function generateStars(): void {
    console.log('Generating stars');
    const starWrapper: HTMLElement = document.createElement("aside");
    starWrapper.classList.add("star-wrapper");

    const fragment = document.createDocumentFragment();
    const numStars: number = Math.min(500, Math.floor(window.innerWidth * window.innerHeight / 1000));

    console.log(`Generating ${numStars} stars`);
    console.log(`Window dimensions: ${window.innerWidth}x${window.innerHeight}`);

    for (let i = 0; i < numStars; i++) {
        const star: HTMLDivElement = document.createElement("div");
        star.classList.add("star");

        const x: number = genRandomNumber(0, 100);
        const y: number = genRandomNumber(0, 100);

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;

        const starSize: number = genRandomNumber(1, 4);
        const twinkleDuration: number = genRandomNumber(1, 5);

        star.style.setProperty("--star-size", `${starSize}px`);
        star.style.setProperty("--twinkle-duration", `${twinkleDuration}s`);
        star.style.setProperty("--twinkle-delay", `${genRandomNumber(0, 5)}s`);

        fragment.appendChild(star);
    }

    starWrapper.appendChild(fragment);
    $el.appendChild(starWrapper);
    console.log(`Stars generated: ${numStars}`);
}

console.log('Stepped through all functions');

