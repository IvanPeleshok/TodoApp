import React, { FC } from "react"
import "./CustomField.module.scss"

interface ICustomButtom {
  text: string
  isSubmitting: boolean
  className?: string
  type?: "button" | "submit" | "reset" | undefined
}

export const CustomButton: FC<ICustomButtom> = ({
  text,
  isSubmitting,
  className,
  type,
  ...props
}) => {
  return (
    <button className={className} type={type} {...props}>
      {isSubmitting ? "Загрузка" : text}
    </button>
  )
}
