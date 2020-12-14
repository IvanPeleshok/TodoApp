export enum StatusEnum {
  Doing = "doing",
  Done = "done",
}
export interface ITask {
  id?: string
  name: string
  title: string
  description: string
  status: StatusEnum
}
