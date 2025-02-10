import Splide from '@splidejs/splide';
// import '@splidejs/splide/css';
new Splide( '.splide', {
    type   : 'loop',
    perPage: 1,
    autoHeight: true,
    heightRatio:0.5,
    autoWidth: true,
  })
  .mount()
  document.addEventListener('DOMContentLoaded', () => {

    // console.log("dom loaded")
  } );