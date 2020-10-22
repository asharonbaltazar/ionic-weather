import React, { useContext } from "react";
import { IonSlides } from "@ionic/react";
import WeatherCarouselItem from "./WeatherCarouselItem";
import { RootStateOrAny, useSelector } from "react-redux";
import { AppContext } from "../context/app-context";
import "../css/weather-carousel.css";

const WeatherCarousel = () => {
  const { weather } = useSelector(
    (state: RootStateOrAny) => state.weather.selectedWeather
  );
  const { segmentCarouselOption } = useContext(AppContext);

  // Carousel init options
  const slideOptions = {
    initialSlide: 0,
    slidesPerView: 2,
    centeredSlidesBounds: true,
    slideToClickedSlide: true,
    freeMode: true,
    freeModeSticky: true,
  };

  return (
    <div className="weather-carousel">
      <IonSlides options={slideOptions} mode="ios" scrollbar={true}>
        {weather[segmentCarouselOption].map((element: any, index: number) => (
          <WeatherCarouselItem
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

export default WeatherCarousel;