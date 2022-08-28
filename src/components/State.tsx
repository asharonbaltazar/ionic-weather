import { useState } from 'react';

interface StateProps<State> {
  state: State;
  children(state: [State, (newState: State) => void]): JSX.Element;
}

export const State = <State extends unknown>({
  state,
  children,
}: StateProps<State>) => {
  const componentState = useState(state);

  return children(componentState);
};
