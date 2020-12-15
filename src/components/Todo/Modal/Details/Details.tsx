import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { todoSelectors } from "../../../../redux/selectors/selectors"
import { editTask, getTask, getTasks } from "../../../../redux/todo-reducer"
import { actions } from "../../../../redux/todo-reducer"
import Axios from "axios"
import { Modal } from "../Modal"
import { ITask, StatusEnum } from "../../../../interface/todo"

interface IParams {
  id: string
}

export const Details = () => {
  const params: IParams = useParams()
  const dispatch = useDispatch()

  const loading = useSelector(todoSelectors.getLoading)
  const task = useSelector(todoSelectors.getTask)
  const tasks = useSelector(todoSelectors.getTasks)

  const infoAboutPage = {
    title: "Подробная информация/Изменить задачу",
    btn: "Сохранить измененя",
  }

  const tasksExist = Object.keys(tasks).length

  useEffect(() => {
    if (!tasksExist) {
      dispatch(getTasks())
    }
  }, [])

  let source = Axios.CancelToken.source()

  useEffect(() => {
    dispatch(getTask(params.id, source.token))
    return () => {
      source.cancel()
    }
  }, [params.id])

  useEffect(() => {
    return () => {
      dispatch(actions.setTask("", "", "", StatusEnum.Doing))
    }
  }, [params.id])

  if (!task.name) {
    return null
  }

  return (
    <Modal
      initial={task}
      actionFunc={(data: ITask): void => {
        dispatch(editTask(data, params.id))
      }}
      infoAboutPage={infoAboutPage}
    />
  )
}
