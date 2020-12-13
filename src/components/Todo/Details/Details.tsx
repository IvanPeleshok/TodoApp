import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { todoSelectors } from "../../../redux/selectors/selectors"
import { getTask, getTasks } from "../../../redux/todo-reducer"
import { Popup } from "../../Common/Popup/Popup"
import { actions } from "../../../redux/todo-reducer"
import s from "./Details.module.scss"
import Axios from "axios"

interface IParams {
  id: string
}

export const Details = () => {
  const params: IParams = useParams()
  const dispatch = useDispatch()

  const task = useSelector(todoSelectors.getTask)
  const tasks = useSelector(todoSelectors.getTasks)

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
      dispatch(actions.setTask("", "", ""))
    }
  }, [params.id])

  return (
    <Popup>
      <div className={s.detailsPage}>
        <h2 className={s.detailsTitle}>Подробная информация</h2>

        <p className={s.label}>
          Имя: <span className={s.title}>{task.name}</span>
        </p>
        <p className={s.label}>
          Название: <span className={s.title}>{task.title}</span>
        </p>
        <p className={s.label}>
          Описание задания: <span className={s.title}>{task.description}</span>
        </p>
      </div>
    </Popup>
  )
}
