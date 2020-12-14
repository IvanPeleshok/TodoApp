import React, { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { todoSelectors } from "../../../redux/selectors/selectors"
import s from "./List.module.scss"
import classnames from "classnames"
import { actions, deleteTask, getTasks } from "../../../redux/todo-reducer"
import { useHistory, useLocation } from "react-router-dom"
import Axios from "axios"
import DeleteIcon from "@material-ui/icons/Delete"
import ListIcon from "@material-ui/icons/List"
import DoneIcon from "@material-ui/icons/Done"

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

  const handleDone = (id: string) => {
    dispatch(actions.setDoneTask(id))
  }

  return (
    <>
      <div className={s.list}>
        {tasks.map((task) => (
          <div
            key={task.id}
            className={classnames(s.item, { [s.done]: task.done })}
          >
            <DoneIcon
              onClick={() => handleDone(task.id!)}
              className={s.icon}
              color="action"
            />
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
