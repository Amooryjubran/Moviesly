export const carouselSettings = {
  dots: false,
  infinite: false,
  slidesToShow: 7,
  slidesToScroll: 4,
  centerMode: false,
  vertical: false,

  responsive: [
    {
      breakpoint: 1800,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1360,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 5,
        infinite: true,
        dots: false,
      },
    },

    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 848,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
export const settings = {
  dots: false,
  arrows: true,
  infinite: false,
  slidesToShow: 9,
  slidesToScroll: 4,

  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 4,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: true,
        dots: false,
      },
    },

    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
};

export const miniSliderSetting = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
};
export const formSliderSetting = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};
