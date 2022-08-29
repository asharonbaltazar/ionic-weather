import { useState, Dispatch, SetStateAction } from 'react';

interface StateProps<State> {
  state: State;
  children(state: [State, Dispatch<SetStateAction<State>>]): JSX.Element;
}

export const State = <State,>({ state, children }: StateProps<State>) => {
  const componentState = useState(state);

  return children(componentState);
};
