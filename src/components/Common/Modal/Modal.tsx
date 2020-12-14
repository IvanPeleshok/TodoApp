import React, { FC, useEffect } from "react"
import s from "./Modal.module.scss"
import { Formik, Form } from "formik"
import * as yup from "yup"
import { CustomField, Textarea } from "../../CustomFormik/CustomField"
import { Popup } from "../Popup/Popup"
import { CustomButton } from "../../CustomFormik/CustomButton"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { ITask } from "../../../interface/todo"

interface IInitialValues {
  name: string
  title: string
  description: string
  done: boolean
}

interface IProps {
  initial: IInitialValues
  infoAboutPage: {
    title: string
    btn: string
  }
  actionFunc: (data: ITask) => void
}

export const Modal: FC<IProps> = ({ initial, actionFunc, infoAboutPage }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const initialValues = initial

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(3, "Минимум 3 буквы")
      .max(12, "Минимум 12 букв")
      .required("Введите имя"),
    title: yup
      .string()
      .min(3, "Минимум 3 буквы")
      .max(50, "Максимум 50 букв")
      .required("Введите название задачи"),
    description: yup
      .string()
      .min(10, "Минимум 10 букв")
      .max(140, "Максимум 140 букв")
      .required("Введите описание задачи"),
  })

  return (
    <Popup>
      <div className={s.createPage}>
        <Formik
          validateOnChange={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            history.push("/todo/")
            dispatch(actionFunc({ ...values}, ))
            setSubmitting(false)
            resetForm()
          }}
        >
          {({ isSubmitting }) => {
            return (
              <Form className={s.createForm}>
                <h2 className={s.createTitle}>{infoAboutPage.title}</h2>

                <CustomField
                  name="name"
                  placeholder="Имя"
                  className={s.createInput}
                  autoComplete="off"
                />

                <CustomField
                  name="title"
                  placeholder="Название задачи"
                  className={s.createInput}
                  autoComplete="off"
                />

                <CustomField
                  name="description"
                  placeholder="Описание задачи"
                  className={s.createInput}
                  Component={Textarea}
                  autoComplete="off"
                />

                <CustomButton
                  type="submit"
                  className={s.createBtn}
                  text={infoAboutPage.btn}
                  isSubmitting={isSubmitting}
                ></CustomButton>
              </Form>
            )
          }}
        </Formik>
      </div>
    </Popup>
  )
}
