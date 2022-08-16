import React from 'react';
import { IonSlides } from '@ionic/react';
import CarouselItem from '@components/CarouselItem';
import '../css/weather-carousel.css';

interface IProps {
  hourly: {}[];
}

const Carousel = ({ hourly }: IProps) => {
  // Carousel init options
  const slideOptions = {
    initialSlide: 0,
    centeredSlidesBounds: true,
    slideToClickedSlide: true,
    freeMode: true,
    freeModeSticky: true,
    breakpoints: {
      300: {
        slidesPerView: 4,
      },
      450: {
        slidesPerView: 5,
      },
      600: {
        slidesPerView: 6,
      },
      750: {
        slidesPerView: 7,
      },
      850: {
        slidesPerView: 8,
      },
    },
  };

  return (
    <div className="weather-carousel">
      <IonSlides
        options={slideOptions}
        mode="ios"
        scrollbar={true}
        key={hourly.map((element: any) => element.dt).join('_')}
      >
        {hourly.map((element: any, index: number) => (
          <CarouselItem
            key={index}
            time={element.dt}
            temp={element.temp}
            weather={element.weather}
            pop={element.pop}
          />
        ))}
      </IonSlides>
    </div>
  );
};

export default Carousel;
