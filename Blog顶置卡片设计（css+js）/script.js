var swiper = new Swiper('.blog-slider', {
      spaceBetween: 30,
      effect: 'fade',
      loop: true,
      mousewheel: {
        invert: false,
      },

      pagination: {
        el: '.blog-slider_pagination',
        clickable: true,
      }
    });
