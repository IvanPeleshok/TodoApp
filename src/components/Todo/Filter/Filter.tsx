import React from "react"
import { StatusEnum } from "../../../interface/todo"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { Popup } from "../../Common/Popup/Popup"
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core"
import s from "./Filter.module.scss"
import { useDispatch } from "react-redux"
import { actions } from "../../../redux/todo-reducer"
import { FilterEnum } from "../../../interface/todo"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: "block",
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
)

export const Filter = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const handleChange = (
    event: React.ChangeEvent<{ value: FilterEnum | unknown }>
  ) => {
    dispatch(actions.setFilter(event.target.value as FilterEnum))
    history.push("/todo")
  }

  return (
    <Popup toRoute={"/todo"}>
      <div className={s.filterPage}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">Фильтр</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            onChange={(e) => handleChange(e)}
          >
            <MenuItem value={FilterEnum.All}>
              <em>Все</em>
            </MenuItem>
            <MenuItem value={FilterEnum.Doing}>Задачи в процессе</MenuItem>
            <MenuItem value={FilterEnum.Done}>Выполенные задачи</MenuItem>
          </Select>
        </FormControl>
      </div>
    </Popup>
  )
}
