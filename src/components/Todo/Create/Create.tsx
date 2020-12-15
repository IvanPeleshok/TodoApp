import React, { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createTask, getTasks } from "../../../redux/todo-reducer"
import { todoSelectors } from "../../../redux/selectors/selectors"
import { Modal } from "../../Common/Modal/Modal"
import { StatusEnum } from "../../../interface/todo"

export const Create = memo(() => {
  const dispatch = useDispatch()

  const tasks = useSelector(todoSelectors.getTasks)
  const infoAboutPage = {
    title: "Создать новую задачу",
    btn: "Создать задачу",
  }

  const tasksExist = Object.keys(tasks).length

  useEffect(() => {
    if (!tasksExist) {
      dispatch(getTasks())
    }
  }, [])

  const initialValues = {
    name: "",
    title: "",
    description: "",
    status: StatusEnum.Doing,
  }

  return (
    <Modal
      initial={initialValues}
      actionFunc={createTask}
      infoAboutPage={infoAboutPage}
    />
  )
})
