function vans404VideoFit() {
    const video = document.querySelector('#vans-404-video_column_center') as HTMLVideoElement;
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
    window.addEventListener("resize", vans404VideoFit);
    vans404VideoFit();
  });
  
  