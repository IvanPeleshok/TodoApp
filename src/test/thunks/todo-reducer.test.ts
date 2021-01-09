import { actions, getTasks } from "../../redux/todo-reducer"
import { todoAPI } from "../../api/todo-api"
jest.mock("../../api/todo-api")

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
  dispatchMock.mockClear()
  getStateMock.mockClear()
  todoAPIMock.getTasks.mockClear()
})

const todoAPIMock = todoAPI as jest.Mocked<typeof todoAPI>

// @ts-ignore
todoAPIMock.getTasks.mockReturnValue({ data: [] })

test("", async () => {
  const thunk = getTasks()

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)

  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.loadingTrue())
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setTasks([] as any))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.loadingFalse())
})
