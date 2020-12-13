import { rootReducer } from "../redux/redux-store"
import { ThunkAction } from "redux-thunk"
import { Action } from "redux"

export type TRootReducer = typeof rootReducer
export type TAppState = ReturnType<TRootReducer>

export type TInferActions<T> = T extends {
  [keys: string]: (...args: any[]) => infer U
}
  ? U
  : never

export type TBaseThunk<
  A extends Action = Action,
  R = Promise<void>
> = ThunkAction<R, TAppState, unknown, A>

// export type TInitialState = typeof initialState
// type TActions = TInferActions<typeof actions>
// type TThunk = TBaseThunk<ActionsType>
