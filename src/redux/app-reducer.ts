import { IApp } from "../interface/app"
import { TInferActions } from "../types/redux"

export type TInitialState = typeof initialState
type TActions = TInferActions<typeof actions>

let initialState: IApp = {
  initialization: false,
}

export const appReducer = (
  state = initialState,
  action: TActions
): TInitialState => {
  switch (action.type) {
    case "app/SET_INITIALIZATION":
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export const actions = {
  setInitialization: (initialization: boolean) =>
    ({
      type: "app/SET_INITIALIZATION",
      payload: { initialization },
    } as const),
}
