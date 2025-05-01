import { authThunkCreator } from "./auth-reducer.ts";
import {
  InferActionsTypes,
  ThunkActionType,
  ThunkDispatchType,
} from "./redux-store.ts";

const initialState = {
  initialized: false,
};

const appReducer = (
  state: InitialStateType = initialState,
  action: ActionTypesApp
): InitialStateType => {
  switch (action.type) {
    case "SET_INIT":
      return {
        ...state,
        initialized: action.initialized,
      };

    default:
      return state;
  }
};

export const actionsApp = {
  handleInit: (initialized: boolean) => ({
    type: "SET_INIT",
    initialized,
  }),
};

export const initialize = (): ThunkActionApp => async (dispatch) => {
  await dispatch(authThunkCreator());
  dispatch(actionsApp.handleInit(true));
};

export default appReducer;

type ActionTypesApp = InferActionsTypes<typeof actionsApp>;

export type AppDispatch = ThunkDispatchType<ActionTypesApp>;

type ThunkActionApp = ThunkActionType<ActionTypesApp>;

type InitialStateType = typeof initialState;
