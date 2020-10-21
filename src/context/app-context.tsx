import React, { createContext, ReactNode, useReducer } from "react";

// Typescript declarations
interface IStoreState {
  settingsModal: boolean;
  searchModal: boolean;
  segmentCarouselOption: string;
  toggleSettingsModal: () => void;
  toggleSearchModal: () => void;
  toggleSegmentsCarousel: (segmentItem: any) => void;
}

interface IProps {
  children: ReactNode;
}
interface IToggleSettings {
  type: "TOGGLE_SETTINGS_MODAL";
}
interface IToggleSearch {
  type: "TOGGLE_SEARCH_MODAL";
}

interface IToggleSegmentsCarousel {
  type: "TOGGLE_SEGMENTS_CAROUSEL";
  payload: string;
}
type Action = IToggleSearch | IToggleSettings | IToggleSegmentsCarousel;

// Initial state
const initialState: IStoreState = {
  settingsModal: false,
  searchModal: false,
  segmentCarouselOption: "today",
  toggleSettingsModal: () => {
    return;
  },
  toggleSearchModal: () => {
    return;
  },
  toggleSegmentsCarousel: () => {
    return;
  },
};

// Reducer
const reducer = (state: IStoreState, action: Action): IStoreState => {
  switch (action.type) {
    case "TOGGLE_SEARCH_MODAL":
      return {
        ...state,
        searchModal: !state.searchModal,
      };
    case "TOGGLE_SETTINGS_MODAL":
      return {
        ...state,
        settingsModal: !state.settingsModal,
      };
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

  const toggleSearchModal = () => {
    dispatch({ type: "TOGGLE_SEARCH_MODAL" });
  };

  const toggleSettingsModal = () => {
    dispatch({ type: "TOGGLE_SETTINGS_MODAL" });
  };

  const toggleSegmentsCarousel = (segmentItem: string) => {
    dispatch({ type: "TOGGLE_SEGMENTS_CAROUSEL", payload: segmentItem });
  };

  return (
    <AppContext.Provider
      value={{
        settingsModal: state.settingsModal,
        searchModal: state.searchModal,
        segmentCarouselOption: state.segmentCarouselOption,
        toggleSearchModal,
        toggleSettingsModal,
        toggleSegmentsCarousel,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
