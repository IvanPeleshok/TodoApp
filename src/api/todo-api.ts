import { CancelToken } from "axios"
import { ITask } from "../interface/todo"
import { handleErr, instance } from "./api"

export const todoAPI = {
  getTasks(cancelToken?: CancelToken) {
    return instance
      .get(`/notes.json`, {
        cancelToken,
      })
      .then((response) => response)
      .catch((err) => handleErr(err))
  },
  getTask(id: string, cancelToken?: CancelToken) {
    return instance.get(`/notes/${id}.json`, {
      cancelToken,
    })
  },
  createTask(data: ITask) {
    return instance
      .post(`/notes.json`, data)
      .then((response) => console.log(response))
      .catch((err) => handleErr(err))
  },
  editTask(data: ITask, id: string) {
    return instance
      .put(`/notes/${id}.json`, data)
      .then((response) => console.log(response))
      .catch((err) => console.log(err))
  },
  deleteTask(id: string) {
    return instance
      .delete(`/notes/${id}.json`)
      .then((response) => console.log(response))
      .catch((err) => console.log(err))
  },
}
