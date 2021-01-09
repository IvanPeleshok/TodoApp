import { AxiosResponse, CancelToken } from "axios"
import { ITask, StatusEnum } from "../interface/todo"
import { handleErr, instance } from "./api"

export const todoAPI = {
  getTasks(cancelToken?: CancelToken) {
    return instance
      .get<AxiosResponse<any>>(`/notes.json`, {
        cancelToken,
      })
      .then((response) => response as AxiosResponse<any>) 
      .catch((err) => handleErr(err))  
  },
  getTask(id: string, cancelToken?: CancelToken) {
    return instance
      .get(`/notes/${id}.json`, {
        cancelToken,
      })
      .then((response) => response)
      .catch((err) => handleErr(err))
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
      .then((response) => response)
      .catch((err) => handleErr(err))
  },
  toggleStatusTask(status: StatusEnum, id: string) {
    return instance
      .put(`/notes/${id}/status.json`, JSON.stringify(status))
      .then((response) => response)
      .catch((err) => handleErr(err))
  },
  deleteTask(id: string) {
    return instance
      .delete(`/notes/${id}.json`)
      .then((response) => response)
      .catch((err) => handleErr(err))
  },
}
