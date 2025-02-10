// function vans404VideoFit() {
//     let el = document.querySelector('#videoEl') as HTMLElement;
//     let vw = window.innerWidth;
//     let vh = window.innerHeight;
//     const wr = vw / vh;
//     if (wr < 1) {
//       if (el.getAttribute('src') !== 'https://www.colorincode.me/assets/portfolio_pages/vans_surf/vans-surf-phone-ratio.mp4') el.setAttribute('src', 'https://www.colorincode.me/assets/portfolio_pages/vans_surf/vans-surf-phone-ratio.mp4');
//     } else {
//       if (el.getAttribute('src') !== 'https://www.colorincode.me/assets/portfolio_pages/vans_surf/otl_background_final_1500x1000_sm.mp4') el.setAttribute('src', 'https://www.colorincode.me/assets/portfolio_pages/vans_surf/otl_background_final_1500x1000_sm.mp4');
//     }   
//   }
//   window.addEventListener("resize", (event)=>{
//     vans404VideoFit();
//   });
//   vans404VideoFit();


let surfbox = document.querySelector(".surf-box") as HTMLElement;
function swapIframe() {
  let e;
let el = (e.currentTarget);
let id = surfbox.getAttribute("data-vid-id");
let iframe = document.createElement("iframe");
      iframe.setAttribute("src", "//www.youtube.com/embed/" + id + "?autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&controls=1&showinfo=0&rel=0");
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("id", "youtube-iframe");
      surfbox.classList.add('.iframe-holder');
      el.find(".over-img-4").hide();
}

function vanssurfVideoFit() {
  const video = document.querySelector('#vans-surf-video_column_center') as HTMLVideoElement;
  if (!video) return;

  const sources = video.getElementsByTagName('source');
  let needsReload = false;

  for (let i = 0; i < sources.length; i++) {
    const source = sources[i] as HTMLSourceElement;
    if (window.matchMedia(source.media).matches) {
      if (video.currentSrc !== source.src) {
        video.src = source.src;
        needsReload = true;
      }
      break;
    }
  }

  if (needsReload) {
    video.load();
    video.play().catch(e => console.error("Error playing video:", e));
    console.log('reloaded');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener("resize", vanssurfVideoFit);
  vanssurfVideoFit();
  document.addEventListener("click", swapIframe)
});

