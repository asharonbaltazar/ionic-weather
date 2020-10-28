import React, { createContext, ReactNode, useReducer } from "react";

// Typescript declarations
interface IStoreState {
  segmentCarouselOption: string;
  toggleSegmentsCarousel: (segmentItem: any) => void;
}

interface IProps {
  children: ReactNode;
}

interface IToggleSegmentsCarousel {
  type: "TOGGLE_SEGMENTS_CAROUSEL";
  payload: string;
}
type Action = IToggleSegmentsCarousel;

// Initial state
const initialState: IStoreState = {
  segmentCarouselOption: "today",
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
    default:
      return state;
  }
};

const AppContext = createContext(initialState);

// Context Provider componenet
const AppProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleSegmentsCarousel = (segmentItem: string) => {
    dispatch({ type: "TOGGLE_SEGMENTS_CAROUSEL", payload: segmentItem });
  };

  return (
    <AppContext.Provider
      value={{
        segmentCarouselOption: state.segmentCarouselOption,
        toggleSegmentsCarousel,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
