import React, { memo, useEffect } from "react"
import { Route } from "react-router-dom"
import { Switch } from "react-router"
import "./App.scss"
import { withSuspense } from "./hoc/withSuspense"
import { useSelector } from "react-redux"
import { todoSelectors } from "./redux/selectors/selectors"
import { Loader } from "./components/Common/Loader/Loader"
const Main = React.lazy(() => import("./components/Main/Main"))
const Todo = React.lazy(() => import("./components/Todo/TodoContainer"))

const App = memo(() => {
  const loading = useSelector(todoSelectors.getLoading)

  useEffect(() => {
    
  }, [loading])

  return (
    <>
      {loading && <Loader />}
      <div className="app-content">
        <Switch>
          <Route path="/" exact render={withSuspense(Main)} />
          <Route path="/todo" render={withSuspense(Todo)} />
        </Switch>
      </div>
    </>
  )
})

export default App
