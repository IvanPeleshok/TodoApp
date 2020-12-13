import React, { memo } from "react"
import { Route } from "react-router-dom"
import { Todo } from "./Todo"
import { Create } from "./Create/Create"
import { Details } from "./Details/Details"

const TodoContainer = memo(() => {
  return (
    <>
      <Route path="/todo/create" render={() => <Create />} />
      <Route path="/todo/details/:id" render={() => <Details />} />
      <Todo />
    </>
  )
})

export default TodoContainer
