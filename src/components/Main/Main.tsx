import { Button } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import s from "./Main.module.scss"

export default function () {
  const history = useHistory()

  const [isPush, setPush] = useState(false)

  useEffect(() => {
    setPush((state) => !state)
  }, [])

  const handleClick = () => {
    setPush((state) => !state)
    setTimeout(() => {
      history.push("/todo")
    }, 500)
  }

  return (
    <>
      <CSSTransition
        in={isPush}
        timeout={500}
        mountOnEnter
        unmountOnExit
        classNames={{
          enterActive: `${s.show}`,
          exitActive: `${s.hide}`,
        }}
      >
        <div className={s.toTodo}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClick}
            className={s.button}
          >
            Перейти в Todo App
          </Button>
        </div>
      </CSSTransition>
    </>
  )
}
