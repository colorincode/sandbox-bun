// loader();
export function loader() {
    const c = document.getElementById('loader') as HTMLCanvasElement;
    const loaderText = document.getElementById('loader--text') as HTMLElement;

    // Set canvas width and height to window dimensions
    var w = c.width = window.innerWidth, h = c.height = window.innerHeight, ctx = c.getContext('2d'), particles = [], dirs = [
        { x: Math.cos(Math.PI * 2 / 6), y: Math.sin(Math.PI * 2 / 6) },
        { x: Math.cos(Math.PI * 2 / 6 * 2), y: Math.sin(Math.PI * 2 / 6 * 2) },
        { x: Math.cos(Math.PI * 2 / 6 * 3), y: Math.sin(Math.PI * 2 / 6 * 3) },
        { x: Math.cos(Math.PI * 2 / 6 * 4), y: Math.sin(Math.PI * 2 / 6 * 4) },
        { x: Math.cos(Math.PI * 2 / 6 * 5), y: Math.sin(Math.PI * 2 / 6 * 5) },
        { x: Math.cos(Math.PI * 2 / 6 * 6), y: Math.sin(Math.PI * 2 / 6 * 6) },
    ], len = 80;

    var maxParticles = 30;
    var tick = 0;
    var colorArray = ['#ffffff', '#8e0b5c', '#d62b72', '#086b25', '#024c6d', '#028cb0'];
    var colorChangeInterval = 2000;
    var currentColorIndex = 0;
    var nextColorIndex = 1;
    var transitionProgress = 0;
    var lastColorChangeTime = Date.now();
    var lastParticleCreationTime = Date.now();

    function anim() {
        if (!c) {
            console.error('Canvas element not found');
            return;
        }
        window.requestAnimationFrame(anim);

        tick += .1;

        ctx.shadowBlur = 0;
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(0,0,0,.04)';
        ctx.fillRect(0, 0, w, h);

        ctx.shadowBlur = 3;
        ctx.globalCompositeOperation = 'lighter';

        var currentTime = Date.now();

        if (particles.length < maxParticles && (currentTime - lastParticleCreationTime >= 300)) {
            particles.push({
                tick: tick,
                sx: w / 2,
                sy: h / 2,
                x: 0,
                y: 0,
                dir: (Math.random() * 3 | 0) * 2,
                askDir: false,
                time: 0
            });
            lastParticleCreationTime = currentTime;
        }

        var timeSinceLastChange = currentTime - lastColorChangeTime;

        if (timeSinceLastChange >= colorChangeInterval) {
            currentColorIndex = nextColorIndex;
            nextColorIndex = (nextColorIndex + 1) % colorArray.length;
            lastColorChangeTime = currentTime;
            transitionProgress = 0;
        } else {
            transitionProgress = timeSinceLastChange / colorChangeInterval;
        }

        var currentColor = colorArray[currentColorIndex];
        var nextColor = colorArray[nextColorIndex];

        // Update loader text color
        updateLoaderTextColor(currentColor, nextColor, transitionProgress);

        particles.map(function (particle) {
            if (particle.askDir) {
                particle.dir = Math.random() < .5 ?
                    (particle.dir + 1) % 6 :
                    (particle.dir + 5) % 6;
                particle.askDir = false;
            }

            ++particle.time;

            var dir = dirs[particle.dir];
            particle.x += dir.x * 1.5;
            particle.y += dir.y * 1.5;

            if (particle.x * particle.x + particle.y * particle.y >= len * len) {
                particle.sx += dir.x * len;
                particle.sy += dir.y * len;

                particle.x = particle.y = 0;
                particle.askDir = true;

                if (Math.random() < .05) {
                    particle.sx = w / 2;
                    particle.sy = h / 2;
                    particle.dir = (Math.random() * 3 | 0) * 2;
                    particle.askDir = false;
                    particle.tick = tick;
                }
            }

            var interpolatedColor = interpolateColor(currentColor, nextColor, transitionProgress);
            ctx.shadowColor = ctx.fillStyle = interpolatedColor;
            var x = particle.sx + particle.x, y = particle.sy + particle.y;
            ctx.fillRect(x, y, 2.5, 2.5);
        });
    }

    function interpolateColor(color1, color2, factor) {
        var result = '#';
        for (var i = 1; i < 7; i += 2) {
            var c1 = parseInt(color1.substr(i, 2), 16);
            var c2 = parseInt(color2.substr(i, 2), 16);
            var hex = Math.round(c1 + (c2 - c1) * factor).toString(16);
            result += ('0' + hex).slice(-2);
        }
        return result;
    }

    function updateLoaderTextColor(currentColor, nextColor, progress) {
        const interpolatedTextColor = interpolateColor(currentColor, nextColor, progress);
        loaderText.style.color = interpolatedTextColor; // Update text color
    }

    // Initial canvas setup
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, w, h);
    anim();

    // Resize event listener
    window.addEventListener('resize', function () {
        w = c.width = window.innerWidth;
        h = c.height = window.innerHeight;
        particles.length = 0; // Clear existing particles on resize
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, w, h);
    });
}

