
import styled from 'styled-components';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { px } from 'framer-motion';

const CarouselContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    z-index: 5;
    padding: 0;
    margin: 0;
    position: relative;
`

const ImageContainers = styled.div`
    height: ${({ height }) => height ? height : 'fit-content'};
    width: fit-content;
    background-color: #fff;
    border-radius: 10px;
    @media (max-width: 576px) {
        height: 100px;
        width: 200px;
    }
`

const CarouselImg = styled.img`
    height: ${({ height }) => height ? height : 'fit-content'};
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: contain;
    border-radius: 10px;
    /* mix-blend-mode: color-burn; */
    /* border-image: fill 0 linear-gradient(#fff, #ccc, #000); */
     @media (max-width: 576px) {
        height: 100px;
        width: 200px;
    }
`

const CarouselFadeLeft = styled.div`
    position: absolute;
    top: 0%;
    bottom: 0%;
    width: 15%;
    height: 104%;
    pointer-events: none; /* Make sure the gradients don't interfere with interactions */
    z-index: 2;;
    
    left: 0;
    background: ${({ ticker }) => ticker === true ?
    'linear-gradient(to right, #00A9FF, rgba(255, 255, 255, 0))' :
    'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))'};
    border-radius: 10px 0px 0px 10px;
`

const CarouselFadeRight = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 15%;
    height: 104%;
    pointer-events: none; /* Make sure the gradients don't interfere with interactions */
    z-index: 2;
    
    right: 0;
    background:  ${({ ticker }) => ticker === true ?
    'linear-gradient(to left, #00A9FF, rgba(255, 255, 255, 0))' :
    'linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))'};
    border-radius: 0px 10px 10px 0px;
`

const InfiniteCarousel = ({ direction, gap, images, isTicker, height, slidesToShow }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
      slideToSlide: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slideToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slideToSlide: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slideToSlide: 1
    }
  };

  const customAnimation = {
    // Define your custom animation styles here
    transform: 'translateX(-50%)',
    transition: 'transform .5s ease-in-out',
  };

  const imageUrls = [
    { id: 1, logo: "https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755028/olnxfrhzkj0czc5fsvxt_gia9h0.png" },
    { id: 2, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755028/olnxfrhzkj0czc5fsvxt_gia9h0.png' },
    { id: 3, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755028/olnxfrhzkj0czc5fsvxt_gia9h0.png' },
    { id: 4, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755028/olnxfrhzkj0czc5fsvxt_gia9h0.png' },
    { id: 5, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755028/olnxfrhzkj0czc5fsvxt_gia9h0.png' },
    { id: 6, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755028/olnxfrhzkj0czc5fsvxt_gia9h0.png' },
    { id: 7, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755028/olnxfrhzkj0czc5fsvxt_gia9h0.png' },
    { id: 8, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755028/olnxfrhzkj0czc5fsvxt_gia9h0.png' },
    { id: 9, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755028/olnxfrhzkj0czc5fsvxt_gia9h0.png' },
    { id: 10, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755028/olnxfrhzkj0czc5fsvxt_gia9h0.png' },
    { id: 11, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755028/olnxfrhzkj0czc5fsvxt_gia9h0.png' },
    { id: 12, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755028/olnxfrhzkj0czc5fsvxt_gia9h0.png' },
    { id: 13, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755028/olnxfrhzkj0czc5fsvxt_gia9h0.png' },
    { id: 14, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755028/olnxfrhzkj0czc5fsvxt_gia9h0.png' },
    { id: 15, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755028/olnxfrhzkj0czc5fsvxt_gia9h0.png' },
    { id: 16, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755028/olnxfrhzkj0czc5fsvxt_gia9h0.png' },
    { id: 17, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755028/olnxfrhzkj0czc5fsvxt_gia9h0.png' },
    { id: 18, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755028/olnxfrhzkj0czc5fsvxt_gia9h0.png' },
    { id: 19, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755028/olnxfrhzkj0czc5fsvxt_gia9h0.png' },
    { id: 20, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755028/olnxfrhzkj0czc5fsvxt_gia9h0.png' },
    { id: 21, logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755028/olnxfrhzkj0czc5fsvxt_gia9h0.png' },
  ]

  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 7000,
    gap: gap,
    slidesToShow: slidesToShow ? slidesToShow : 3,
    slidesToScroll: 1,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: true,
    centerMode: true,
    easing: 'linear',
    Fade: true,
    focusOnSelect: true,
    rows: 1,
    rtl: direction,
    width: '100px',
  };

  return (
    <CarouselContainer >
      {!isTicker && <><CarouselFadeLeft
        className="carousel-fade-left"
        ticker={isTicker}>
      </CarouselFadeLeft>

        <CarouselFadeRight
          className="carousel-fade-right"
          ticker={isTicker}>
        </CarouselFadeRight>
      </>}

      <Slider {...settings} style={{
        width: '100%',
        height: height,
        borderRadius: '15px',
      }}>
        {images ? images.map(image =>
          <ImageContainers
            key={image.id}
            style={customAnimation}
            height={height}
          >
            <CarouselImg src={image.logo} alt="image" height={height} />
          </ImageContainers>
        ) : imageUrls.map(image =>
          <ImageContainers
            key={image.id}
            style={customAnimation}
          >
            <CarouselImg src={image.logo} alt="image" />
          </ImageContainers>
        )
        }
      </Slider>
    </CarouselContainer>
  );
};

export default InfiniteCarousel;