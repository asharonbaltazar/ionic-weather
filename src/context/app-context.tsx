import React, { createContext, ReactNode, useReducer } from 'react';

// Typescript declarations
interface IStoreState {
  alertModalState: boolean;
  alertButtonState: boolean;
  toggleAlertModal: (toggleOption?: boolean) => void;
  toggleAlertButton: () => void;
}
interface IProps {
  children: ReactNode;
}
interface IToggleAlertModal {
  type: 'TOGGLE_ALERT_MODAL';
  payload?: boolean;
}
interface IToggleAlertBanner {
  type: 'TOGGLE_ALERT_BUTTON';
}

type Action = IToggleAlertModal | IToggleAlertBanner;

// Initial state
const initialState: IStoreState = {
  alertModalState: false,
  alertButtonState: true,
  toggleAlertModal: () => {},
  toggleAlertButton: () => {},
};

// Reducer
const reducer = (state: IStoreState, action: Action): IStoreState => {
  switch (action.type) {
    case 'TOGGLE_ALERT_MODAL':
      return {
        ...state,
        alertModalState: action.payload ?? !state.alertModalState,
      };

    case 'TOGGLE_ALERT_BUTTON':
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

  const toggleAlertModal = (toggleOption?: boolean) => {
    if (toggleOption !== undefined)
      dispatch({ type: 'TOGGLE_ALERT_MODAL', payload: toggleOption });
    else dispatch({ type: 'TOGGLE_ALERT_MODAL' });
  };

  const toggleAlertButton = () => {
    dispatch({ type: 'TOGGLE_ALERT_BUTTON' });
  };

  return (
    <AppContext.Provider
      value={{
        alertModalState: state.alertModalState,
        alertButtonState: state.alertButtonState,
        toggleAlertModal,
        toggleAlertButton,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
