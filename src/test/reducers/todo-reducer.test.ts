import { StatusEnum } from "../../interface/todo"
import {
  actions,
  initialState as state,
  todoReducer,
} from "../../redux/todo-reducer"


beforeEach(() => {
})

it("length of tasks should be incremented", () => {

  let action = actions.setTasks([{
    id: "new",
    name: "new",
    title: "new",
    description: "new",
    status: StatusEnum.Doing,
  }])

  let newState = todoReducer(state, action)

  expect(newState.tasks.length).toBe(1)
})