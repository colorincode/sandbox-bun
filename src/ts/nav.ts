
console.log('nav loaded');

// DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    navigationToggle();
    checkForAnimation();
    mouseOutAnimation();
});

function isClassActive(className: string): boolean {
    const elements = Array.from(document.querySelectorAll(`.${className}`));
    elements.forEach((el: Element) => {
        el.addEventListener('click', function(this: HTMLElement) {
            this.classList.toggle('is-active');
        });
    });
    return elements.some(el => el.classList.contains(className));
}

function mouseOutAnimation(): void {
    const animatedTypes = document.querySelectorAll('.animatedType');
    animatedTypes.forEach((el: Element) => {
        el.addEventListener('mouseleave', () => {
            el.classList.add('pricinglist--isanimating');
        });
        el.addEventListener('mouseenter', () => {
            el.classList.remove('pricinglist--isanimating');
        });
    });
}

function navigationToggle(): void {
    const navigation = document.querySelector('.navigation') as HTMLElement;
    const showButton = document.querySelector('.navigation .toggle-wrapper .show') as HTMLElement;
    const hideButton = document.querySelector('.navigation .toggle-wrapper .hide') as HTMLElement;
    const hasMenuItems = document.querySelectorAll('.navigation .has-menu') as NodeListOf<HTMLElement>;
    const subMenuItems = document.querySelectorAll('.sldm-submenu > a') as NodeListOf<HTMLElement>;
    const widgetToggles = document.querySelectorAll('.sldm-widget-toggle') as NodeListOf<HTMLElement>;

    showButton.addEventListener('click', () => navigation.classList.add('open'));
    hideButton.addEventListener('click', () => navigation.classList.remove('open'));

    hasMenuItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener('click', (e) => e.stopPropagation());
        }
        item.addEventListener('click', () => item.classList.toggle('open'));
    });

    subMenuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            item.classList.toggle('sldm-open');
            const subMenu = item.parentElement?.querySelector('ul');
            if (subMenu) {
                subMenu.style.display = subMenu.style.display === 'none' ? 'block' : 'none';
            }
            const toggle = item.querySelector('.sldm-widget-toggle');
            if (toggle) {
                toggle.classList.toggle('fa-angle-up');
                toggle.classList.toggle('fa-angle-down');
            }
        });
    });

    widgetToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = toggle.getAttribute('data-target');
            if (targetId) {
                const target = document.querySelector(targetId) as HTMLElement;
                if (target) {
                    target.style.display = target.style.display === 'none' ? 'block' : 'none';
                }
            }
        });
    });
}

function checkForAnimation(): void {
    const navigation = document.querySelector('.navigation') as HTMLElement;
    if (isClassActive('is-animating')) {
        navigation.classList.add('open');
    } else {
        navigation.classList.remove('open');
    }
}