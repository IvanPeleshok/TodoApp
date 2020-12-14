import React from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { todoSelectors } from "../../redux/selectors/selectors"
import { Loader } from "../Common/Loader/Loader"
import { List } from "./List/List"
import s from "./Todo.module.scss"

export const Todo = () => {
  const loading = useSelector(todoSelectors.getLoading)

  return (
    <div className={s.pageTodo}>
      {loading && <Loader />}
      <Label />
      <Btn />
      <List />
    </div>
  )
}

const Label = () => {
  return <h1 className={s.title}>Todo App</h1>
}

const Btn = () => {
  const history = useHistory()
  const handleCreate = () => {
    history.push("/todo/create")
  }
  return (
    <button className={s.btn} onClick={handleCreate}>
      Создать новую задачу
    </button>
  )
}
