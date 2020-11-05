import React from "react";
import NextWeekCard from "./NextWeekCard";
import { IonContent, IonList } from "@ionic/react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const NextWeek = () => {
  const nextWeeksWeather = useSelector(
    (state: RootState) => state.weather.selectedWeather.weather.next_week
  );

  return (
    <IonContent>
      <IonList className="ion-margin-top">
        {nextWeeksWeather.map((element: any) => (
          <NextWeekCard
            key={element.dt}
            dt={element.dt}
            sunrise={element.sunrise}
            sunset={element.sunset}
            temp={element.temp}
            feels_like={element.feels_like}
            pressure={element.pressure}
            humidity={element.humidity}
            wind_speed={element.wind_speed}
            weather={element.weather}
            compass={element.compass}
            pop={element.pop}
            uvi={element.uvi}
          />
        ))}
      </IonList>
    </IonContent>
  );
};

export default NextWeek;
