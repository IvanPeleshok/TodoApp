import React, { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { todoSelectors } from "../../../redux/selectors/selectors"
import s from "./List.module.scss"
import { deleteTask, getTasks } from "../../../redux/todo-reducer"
import { useHistory, useLocation } from "react-router-dom"
import Axios from "axios"
import DeleteIcon from "@material-ui/icons/Delete"
import ListIcon from "@material-ui/icons/List"
export const List = memo(() => {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  const tasks = useSelector(todoSelectors.getTasks)
  let source = Axios.CancelToken.source()

  useEffect(() => {
    if (location.pathname === "/todo") {
      dispatch(getTasks(source.token))
    }
    return () => {
      source.cancel()
    }
  }, [location.pathname])

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id))
  }

  return (
    <>
      <div className={s.list}>
        {tasks.map((task) => (
          <div key={task.id} className={s.item}>
            <p className={s.title}>{task.title}</p>
            <DeleteIcon
              color="action"
              onClick={() => handleDelete(task.id!)}
              className={s.icon}
            />
            <ListIcon
              color="action"
              className={s.icon}
              onClick={() => history.push(`/todo/details/${task.id!}`)}
            />
          </div>
        ))}
      </div>
    </>
  )
})
