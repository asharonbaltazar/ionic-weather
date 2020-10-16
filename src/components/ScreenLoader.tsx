import React from "react";
import { IonLoading } from "@ionic/react";
import { RootStateOrAny, useSelector } from "react-redux";

const ScreenLoader = () => {
  const loading = useSelector((state: RootStateOrAny) => state.weather.loading);

  return (
    <IonLoading
      isOpen={loading}
      message="Loading your weather..."
      translucent={false}
    />
  );
};

export default ScreenLoader;
