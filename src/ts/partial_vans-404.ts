function vans404VideoFit() {
  let ele = document.querySelector("#vans-404-video_column_center") as HTMLVideoElement;
  let el = document.querySelector("#videoFit") as HTMLSourceElement;
  let vw = window.innerWidth;
  let vh = window.innerHeight;
  let vidw = ele.videoWidth;
  let vidh = ele.videoHeight;
  const vr = vidw / vidh;
  const wr = vw / vh;
  if (wr < 1) {
      el.style.width = vh * vr + "px";
      el.style.height = vh + "px";
      if (el.getAttribute("src") !== "https://www.colorincode.me/assets/portfolio_pages/vans_404/404-video-mobile.mp4") el.setAttribute("src", "https://www.colorincode.me/assets/portfolio_pages/vans_404/404-video-mobile.mp4");
  } else {
      el.style.width = vw + "px";
      el.style.height = vw / vr + "px";
      if (el.getAttribute("src") !== "https://www.colorincode.me/assets/portfolio_pages/vans_404/404-video-optimized-red.mp4") el.setAttribute("src", "https://www.colorincode.me/assets/portfolio_pages/vans_404/404-video-optimized-red.mp4");
  }
}
window.addEventListener("resize", (event)=>{
  vans404VideoFit();
});
vans404VideoFit();