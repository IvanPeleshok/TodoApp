import React, { memo } from "react"
import { Redirect, Route } from "react-router-dom"
import { Todo } from "./Todo"
import { Create } from "./Modal/Create/Create"
import { Details } from "./Modal/Details/Details"
import { Filter } from "./Filter/Filter"

const TodoContainer = memo(() => {
  return (
    <>
      <Route path="/todo/create" exact render={() => <Create />} />
      <Route path="/todo/filter" exact render={() => <Filter />} />
      <Route path="/todo/details/:id" render={() => <Details />} />
      <Route path="*" render={() => <Redirect to="/todo" />} />

      <Todo />
    </>
  )
})

export default TodoContainer
