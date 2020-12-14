import axios, { AxiosError } from "axios"
import { AlertifyStatusEnum } from "../types/types"
import { showAlert } from "../utils/showAlert"

export let apiURL = "https://todoapp-873ef-default-rtdb.firebaseio.com/"

export const instance = axios.create({
  baseURL: `${apiURL}api/`,
  headers: {
    "Content-Type": "application/json",
  },
})

export const handleErr = async (err: AxiosError) => {
  if (err?.response?.status && err?.response?.status === 429) {
    showAlert(
      AlertifyStatusEnum.warn,
      "Очень много запросов на сервер. Пожалуйста, подождите"
    )
  } else if (err?.response?.status === undefined) {
  } else {
    showAlert(AlertifyStatusEnum.error, "Что-то пошло не так")
  }

  return err?.response
}
