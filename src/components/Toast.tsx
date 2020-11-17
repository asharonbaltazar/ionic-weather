import React from "react";
import { IonToast } from "@ionic/react";
import { dismissSearchErrors } from "../slices/searchSlice";
import { useDispatch } from "react-redux";

interface IProps {
  error: string;
  slice: "search" | "weather";
}

const dismissErrorsMap = {
  search: dismissSearchErrors,
  weather: () => {},
};

const Toast = ({ error, slice }: IProps) => {
  const dispatch = useDispatch();
  return (
    <IonToast
      isOpen={true}
      onDidDismiss={() => dispatch(dismissErrorsMap[slice]())}
      position="bottom"
      duration={2000}
      message={error}
    />
  );
};

export default Toast;
