import React, { memo, useLayoutEffect } from "react"
import { Route } from "react-router-dom"
import { Switch, useHistory } from "react-router"
import "./App.scss"
import { withSuspense } from "./hoc/withSuspense"
const Todo = React.lazy(() => import("./components/Todo/TodoContainer"))

const App = memo(() => {
  const history = useHistory()

  useLayoutEffect(() => {
    history.push("/todo")
  }, [])

  return (
    <>
      <div className="app-content">
        <Switch>
          <Route path="/todo" render={withSuspense(Todo)} />
        </Switch>
      </div>
    </>
  )
})

export default App
