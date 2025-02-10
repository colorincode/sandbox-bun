function vansSurfVideoFit() {
    let ele = document.querySelector('#vans-surf-video_column_center') as HTMLVideoElement;
    let el = document.querySelector('#videoFit') as HTMLSourceElement;
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let vidw = ele.videoWidth;
    let vidh = ele.videoHeight;
    const vr = vidw / vidh;
    const wr = vw / vh;
    if (wr < 1) {
      el.style.width = vh * vr + "px";
      el.style.height = vh + "px";
      if (el.getAttribute('src') !== 'https://www.colorincode.me/assets/portfolio_pages/vans_surf/vans-surf-phone-ratio.mp4') el.setAttribute('src', 'https://www.colorincode.me/assets/portfolio_pages/vans_surf/vans-surf-phone-ratio.mp4');
    } else {
      el.style.width = vw + "px";
      el.style.height = vw / vr + "px";
      if (el.getAttribute('src') !== 'https://www.colorincode.me/assets/portfolio_pages/vans_surf/otl_background_final_1500x1000_sm.mp4') el.setAttribute('src', 'https://www.colorincode.me/assets/portfolio_pages/vans_surf/otl_background_final_1500x1000_sm.mp4');
    }   
  }
  window.addEventListener("resize", (event)=>{
    vansSurfVideoFit();
  });
  vansSurfVideoFit();
  