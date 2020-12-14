import React from "react"
import { useHistory } from "react-router-dom"
import { List } from "./List/List"
import s from "./Todo.module.scss"

export const Todo = () => {
  return (
    <div className={s.pageTodo}>
      <Label />
      <CreateBtn />
      <FilterBtn />
      <List />
    </div>
  )
}

const Label = () => {
  return <h1 className={s.title}>Todo App</h1>
}

const CreateBtn = () => {
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

const FilterBtn = () => {
  const history = useHistory()
  const handleFilter = () => {
    history.push("/todo/filter")
  }
  return (
    <button className={s.btn} onClick={handleFilter}>
      Отфильтровать задачи
    </button>
  )
}
