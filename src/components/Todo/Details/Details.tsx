import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { todoSelectors } from "../../../redux/selectors/selectors"
import { editTask, getTask, getTasks } from "../../../redux/todo-reducer"
import { actions } from "../../../redux/todo-reducer"
import Axios from "axios"
import { Modal } from "../../Common/Modal/Modal"
import { ITask } from "../../../interface/todo"

interface IParams {
  id: string
}

export const Details = () => {
  const params: IParams = useParams()
  const dispatch = useDispatch()

  const task = useSelector(todoSelectors.getTask)
  const tasks = useSelector(todoSelectors.getTasks)

  const infoAboutPage = {
    title: "Подробная информация/Изменить задачу",
    btn: "Сохранить измененя",
  }

  let source = Axios.CancelToken.source()

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(getTasks())
    }
  }, [])

  useEffect(() => {
    dispatch(getTask(params.id, source.token))
    return () => {
      source.cancel()
      dispatch(actions.setTask("", "", "", false))
    }
  }, [params.id])

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
