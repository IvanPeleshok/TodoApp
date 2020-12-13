import React, { memo, useEffect } from "react"
import s from "./Create.module.scss"
import { Formik, Form } from "formik"
import * as yup from "yup"
import { CustomField, Textarea } from "../../CustomFormik/CustomField"
import { Popup } from "../../Common/Popup/Popup"
import { CustomButton } from "../../CustomFormik/CustomButton"
import { useDispatch, useSelector } from "react-redux"
import { createTask, getTasks } from "../../../redux/todo-reducer"
import { useHistory } from "react-router-dom"
import { todoSelectors } from "../../../redux/selectors/selectors"

interface IInitialValues {
  name: string
  title: string
  description: string
}

export const Create = memo(() => {
  const history = useHistory()
  const dispatch = useDispatch()

  const tasks = useSelector(todoSelectors.getTasks)

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(getTasks())
    }
  }, [])

  const initialValues: IInitialValues = {
    name: "",
    title: "",
    description: "",
  }

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
            dispatch(createTask({ ...values }))
            setSubmitting(false)
            history.push("/todo")
            resetForm()
          }}
        >
          {({ isSubmitting }) => {
            return (
              <Form className={s.createForm}>
                <h2 className={s.createTitle}>Создать новую задачу</h2>

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
                  text={"Добавить"}
                  isSubmitting={isSubmitting}
                ></CustomButton>
              </Form>
            )
          }}
        </Formik>
      </div>
    </Popup>
  )
})
