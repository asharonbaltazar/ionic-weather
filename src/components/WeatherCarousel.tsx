import React from "react";
import { IonSlides } from "@ionic/react";
import WeatherCarouselItem from "./WeatherCarouselItem";
import "../css/weather-carousel.css";

const WeatherCarousel = () => {
  const slideOptions = {
    initialSlide: 0,
    speed: 500,
    slidesPerView: 3.2,
    centeredSlides: true,
    centeredSlidesBounds: true,
    slideToClickedSlide: true,
  };

  return (
    <div className="weather-carousel">
      <IonSlides options={slideOptions}>
        <WeatherCarouselItem />
        <WeatherCarouselItem />
        <WeatherCarouselItem />
        <WeatherCarouselItem />
        <WeatherCarouselItem />
        <WeatherCarouselItem />
      </IonSlides>
    </div>
  );
};

export default WeatherCarousel;
