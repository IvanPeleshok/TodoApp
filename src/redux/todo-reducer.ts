import { AxiosResponse, CancelToken } from "axios"
import { todoAPI } from "../api/todo-api"
import { ITask, StatusEnum } from "../interface/todo"
import { TInferActions, TBaseThunk } from "../types/redux"
import { AlertifyStatusEnum } from "../types/types"
import { showAlert } from "../utils/showAlert"

export type TInitialState = typeof initialState
type TActions = TInferActions<typeof actions>
type TThunk = TBaseThunk<TActions>

let initialState = {
  tasks: [] as Array<ITask>,
  details: {} as ITask,
  loading: false,
}

export const todoReducer = (
  state = initialState,
  action: TActions
): TInitialState => {
  switch (action.type) {
    case "TODO/SET_TASKS":
      return {
        ...state,
        tasks: [...action.payload],
      }
    case "TODO/SET_TASK":
      return {
        ...state,
        details: action.payload,
      }
    case "TODO/SET_TASK_DONE":
      const taskId = state.tasks.findIndex((task) => action.payload === task.id)
      const task = state.tasks[taskId]
      if (task.status === StatusEnum.Doing) {
        task.status = StatusEnum.Done
      } else {
        task.status = StatusEnum.Doing
      }
      return {
        ...state,
        tasks: [
          ...state.tasks.splice(0, taskId),
          task,
          ...state.tasks.splice(taskId + 1),
        ],
      }
    default:
      return state
  }
}

export const actions = {
  setTasks: (task: Array<ITask>) =>
    ({
      type: "TODO/SET_TASKS",
      payload: task,
    } as const),
  setTask: (
    name: string,
    title: string,
    description: string,
    status: StatusEnum
  ) =>
    ({
      type: "TODO/SET_TASK",
      payload: { name, title, description, status },
    } as const),
  setDoneTask: (id: string) =>
    ({
      type: "TODO/SET_TASK_DONE",
      payload: id,
    } as const),
}

export const getTasks = (CancelToken?: CancelToken): TThunk => async (
  dispatch
) => {
  try {
    const response = (await todoAPI.getTasks(CancelToken)) as AxiosResponse
    let data: Array<ITask> = []
    if (response.data !== null) {
      data = Object.keys(response.data).map((key) => ({
        ...response.data[key],
        id: key,
      }))
    }
    dispatch(actions.setTasks(data))
  } catch (error) {
    console.log("An error has occurred")
  }
}

export const getTask = (
  id: string,
  CancelToken?: CancelToken
): TThunk => async (dispatch) => {
  try {
    const response = await todoAPI.getTask(id, CancelToken)
    const { name, title, description, status } = response.data
    await dispatch(actions.setTask(name, title, description, status))
  } catch (error) {
    showAlert(AlertifyStatusEnum.error, "Не удалось загрузить задачи")
  }
}

export const createTask = (data: ITask): TThunk => async (dispatch) => {
  try {
    await todoAPI.createTask(data)
    showAlert(AlertifyStatusEnum.success, "Задача создана")
    dispatch(getTasks())
  } catch (error) {
    showAlert(AlertifyStatusEnum.error, "Задачу не удалось создать")
  }
}

export const editTask = (data: ITask, id: string): TThunk => async (
  dispatch
) => {
  try {
    await todoAPI.editTask(data, id)
    await dispatch(getTasks())
    showAlert(AlertifyStatusEnum.success, "Задача успешно изменена")
  } catch (error) {
    showAlert(AlertifyStatusEnum.error, "Задача не удалось изменить")
  }
}

export const deleteTask = (id: string): TThunk => async (dispatch) => {
  try {
    await todoAPI.deleteTask(id)
    showAlert(AlertifyStatusEnum.success, "Задача удалена")
    await dispatch(getTasks())
  } catch (error) {
    showAlert(AlertifyStatusEnum.error, "Задачу не удалось удалить")
  }
}
