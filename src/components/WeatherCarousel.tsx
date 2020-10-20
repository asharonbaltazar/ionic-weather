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
        {weather[segmentCarouselOption].map((element: any, index: number) => (
          <WeatherCarouselItem
            key={index}
            time={element.dt}
            temp={element.temp}
            weather={element.weather}
          />
        ))}
      </IonSlides>
    </div>
  );
};

export default WeatherCarousel;
