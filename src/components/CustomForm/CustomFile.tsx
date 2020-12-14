import React, { useState, useEffect, ChangeEvent } from "react"
import s from "../FormComponents.module.scss"
import contentHolder from "../../../../assets/img/content-holder.png"
import { loadImage } from "../../utils/loadImage"

type CustomFieldProps = {
  name: string
  Component?: React.Component | any
  label?: string
  canSeeInputValue?: boolean
  type?: string
  placeholder?: string
  style?: any
  required?: boolean
  disabled?: boolean
  values?: Array<{
    value: number | string
    label: number | string
    active?: boolean
  }>
  handleChange?: any
  multiSelect?: boolean
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void
}

export const File = ({ ...props }) => {
  const setPreviewImage = (file: File) => {
    loadImage(file, props.name, "preview-img-holder", props.setFieldValue)
  }

  return (
    <div className={s.filePicker}>
      <input
        type="file"
        ref={props.changePreviewFile}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          e.preventDefault()
          if (e.target.files && e.target.files.length) {
            setPreviewImage(e.target.files[0])
          }
        }}
      />
      <div style={{ marginTop: "20px" }}>
        <img
          id="preview-img-holder"
          src={props.field.value ? props.field.value : contentHolder}
          alt="preview-img"
        />
      </div>
    </div>
  )
}
