'use client'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

export default function Carousel() {
    const images = ['images/aaa.jpg', 'images/bg03.jpg'];
  
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '0px',
    };
  
    return (
      <div className="flex justify-center w-full h-[750px] border-red-100">
        <div className="w-[1920px] border-blue-200">
          <Slider {...settings}>
            {images.map((img, index) => (
              <img
                key={index}
                className="w-full h-[950px]"
                src={img}
                alt="thumbnail"
              />
            ))}
          </Slider>
        </div>
      </div>
    );
  }
  