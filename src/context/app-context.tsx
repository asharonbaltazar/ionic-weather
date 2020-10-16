import React, { createContext, ReactNode, useReducer } from "react";

// Typescript declarations
interface IStoreState {
  settingsModal: boolean;
  searchModal: boolean;
  tempActionSheet: boolean;
  segmentCarouselOption: string;
  toggleSettingsModal: () => void;
  toggleSearchModal: () => void;
  toggleSegmentsCarousel: (segmentItem: any) => void;
  toggleTempActionSheet: () => void;
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
interface IToggleTempActionSheet {
  type: "TOGGLE_TEMP_ACTION_SHEET";
}
type Action =
  | IToggleSearch
  | IToggleSettings
  | IToggleSegmentsCarousel
  | IToggleTempActionSheet;

// Initial state
const initialState = {
  settingsModal: false,
  searchModal: false,
  tempActionSheet: false,
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
  toggleTempActionSheet: () => {
    return;
  },
};

// Reducer
const reducer = (state: IStoreState, action: Action) => {
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
    case "TOGGLE_TEMP_ACTION_SHEET":
      return {
        ...state,
        tempActionSheet: !state.tempActionSheet,
      };
    default:
      return state;
  }
};

const AppContext = createContext<IStoreState>(initialState);

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

  const toggleTempActionSheet = () => {
    dispatch({ type: "TOGGLE_TEMP_ACTION_SHEET" });
  };

  return (
    <AppContext.Provider
      value={{
        settingsModal: state.settingsModal,
        searchModal: state.searchModal,
        tempActionSheet: state.tempActionSheet,
        segmentCarouselOption: state.segmentCarouselOption,
        toggleSearchModal,
        toggleSettingsModal,
        toggleSegmentsCarousel,
        toggleTempActionSheet,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
