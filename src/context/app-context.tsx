import React, { createContext, ReactNode, useReducer } from "react";

// Typescript declarations
interface IStoreState {
  alertModalState: boolean;
  alertButtonState: boolean;
  segmentCarouselOption: "today" | "tomorrow";
  toggleAlertModal: (toggleOption?: boolean) => void;
  toggleAlertButton: () => void;
  toggleSegmentsCarousel: (segmentItem: "today" | "tomorrow") => void;
}
interface IProps {
  children: ReactNode;
}
interface IToggleSegmentsCarousel {
  type: "TOGGLE_SEGMENTS_CAROUSEL";
  payload: "today" | "tomorrow";
}
interface IToggleAlertModal {
  type: "TOGGLE_ALERT_MODAL";
  payload?: boolean;
}
interface IToggleAlertBanner {
  type: "TOGGLE_ALERT_BUTTON";
}
type Action = IToggleSegmentsCarousel | IToggleAlertModal | IToggleAlertBanner;

// Initial state
const initialState: IStoreState = {
  alertModalState: false,
  alertButtonState: true,
  segmentCarouselOption: "today",
  toggleAlertModal: () => {
    return;
  },
  toggleAlertButton: () => {
    return;
  },
  toggleSegmentsCarousel: () => {
    return;
  },
};

// Reducer
const reducer = (state: IStoreState, action: Action): IStoreState => {
  switch (action.type) {
    case "TOGGLE_SEGMENTS_CAROUSEL":
      return {
        ...state,
        segmentCarouselOption: action.payload,
      };
    case "TOGGLE_ALERT_MODAL":
      return {
        ...state,
        alertModalState:
          action.payload !== undefined
            ? action.payload
            : !state.alertModalState,
      };

    case "TOGGLE_ALERT_BUTTON":
      return {
        ...state,
        alertButtonState: !state.alertButtonState,
      };
    default:
      return state;
  }
};

const AppContext = createContext(initialState);

// Context Provider componenet
const AppProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleSegmentsCarousel = (segmentItem: "today" | "tomorrow") => {
    dispatch({ type: "TOGGLE_SEGMENTS_CAROUSEL", payload: segmentItem });
  };

  const toggleAlertModal = (toggleOption?: boolean) => {
    if (toggleOption !== undefined)
      dispatch({ type: "TOGGLE_ALERT_MODAL", payload: toggleOption });
    else dispatch({ type: "TOGGLE_ALERT_MODAL" });
  };

  const toggleAlertButton = () => {
    dispatch({ type: "TOGGLE_ALERT_BUTTON" });
  };

  return (
    <AppContext.Provider
      value={{
        segmentCarouselOption: state.segmentCarouselOption,
        alertModalState: state.alertModalState,
        alertButtonState: state.alertButtonState,
        toggleAlertModal,
        toggleAlertButton,
        toggleSegmentsCarousel,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
