import React, { FC } from "react"
import { FieldAttributes, useField } from "formik"
import classnames from "classnames"
import s from "./CustomField.module.scss"

interface IClassName {
  className?: string
}
interface CustomFieldProps extends IClassName {
  name: string
  label?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  style?: any
  handleChange?: any
  Component?: any
  componentProps?: any
}

export const CustomField: React.FC<FieldAttributes<CustomFieldProps>> = ({
  label,
  Component = Input,
  className,
  ...props
}) => {
  const [field, meta] = useField<CustomFieldProps>(props)
  let errorText = meta.error && meta.touched ? meta.error : ""

  return (
    <div
      className={classnames("", {
        [s.error]: errorText,
        [s.withLabel]: label,
      })}
    >
      <label className={s.fieldLabel}>{label}</label>
      <Component
        field={field}
        className={classnames(className, {
          [s.hasError]: meta.error && meta.touched,
        })}
        {...field}
        {...props}
        {...props.componentProps}
      />
      <p className={classnames(s.fieldErrors)}>{errorText}</p>
    </div>
  )
}

export const Input: FC = ({ ...props }) => {
  return <input {...props} />
}

export const Textarea = ({ ...props }) => {
  return <textarea {...props} />
}

export const Radiobutton: FC = ({ ...props }) => {
  return <input type="radio" {...props} />
}

export const Select: FC = ({ ...props }) => {
  return <select {...props} />
}

export const Checkbox: FC = ({ ...props }) => {
  return <input type="checkbox" {...props} />
}
