import React, { createContext, useReducer } from "react";

// Typescript declarations
interface IStoreState {
  settingsModal: boolean;
  searchModal: boolean;
  toggleSettingsModal: Function;
  toggleSearchModal: Function;
}
interface IToggleSettings {
  type: "TOGGLE_SETTINGS_MODAL";
}
interface IToggleSearch {
  type: "TOGGLE_SEARCH_MODAL";
}
type Action = IToggleSearch | IToggleSettings;

// Initial state
const initialState = {
  settingsModal: false,
  searchModal: false,
  toggleSettingsModal: () => null,
  toggleSearchModal: () => null,
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
    default:
      return state;
  }
};

const AppContext = createContext<IStoreState>(initialState);

// Context Provider componenet
const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleSearchModal = () => {
    dispatch({ type: "TOGGLE_SEARCH_MODAL" });
  };

  const toggleSettingsModal = () => {
    dispatch({ type: "TOGGLE_SETTINGS_MODAL" });
  };

  return (
    <AppContext.Provider
      value={{
        settingsModal: state.settingsModal,
        searchModal: state.searchModal,
        toggleSearchModal,
        toggleSettingsModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
