import React, { FC } from "react"
import s from "./Loader.module.scss"

export const Loader: FC = () => {
  return (
    <div className={s.loader}>
      <div className={s.progress}>
        <div className={s.indeterminate} />
      </div>
    </div>
  )
}
