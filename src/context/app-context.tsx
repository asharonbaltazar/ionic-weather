import React, { createContext, ReactNode, useReducer } from "react";

// Typescript declarations
interface IStoreState {
  alertModalState: boolean;
  segmentCarouselOption: "today" | "tomorrow";
  toggleAlertModal: (toggleOption?: boolean) => void;
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
type Action = IToggleSegmentsCarousel | IToggleAlertModal;

// Initial state
const initialState: IStoreState = {
  alertModalState: false,
  segmentCarouselOption: "today",
  toggleAlertModal: () => {
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

  return (
    <AppContext.Provider
      value={{
        segmentCarouselOption: state.segmentCarouselOption,
        alertModalState: state.alertModalState,
        toggleAlertModal,
        toggleSegmentsCarousel,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
