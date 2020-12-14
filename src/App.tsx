import React, { memo, useLayoutEffect } from "react"
import { Route } from "react-router-dom"
import { Switch, useHistory } from "react-router"
import "./App.scss"
import { withSuspense } from "./hoc/withSuspense"
import { todoSelectors } from "./redux/selectors/selectors"
import { Loader } from "./components/Common/Loader/Loader"
import { useSelector } from "react-redux"
import { todoAPI } from "./api/todo-api"

const Todo = React.lazy(() => import("./components/Todo/TodoContainer"))

const App = memo(() => {
  const history = useHistory()
  const loading = useSelector(todoSelectors.getLoading)

  useLayoutEffect(() => {
    history.push("/todo")
  }, [])

  return (
    <>
      {loading && <Loader />}
      <div className="app-content">
        <Switch>
          <Route path="/todo" render={withSuspense(Todo)} />
        </Switch>
      </div>
    </>
  )
})

export default App
