export enum StatusEnum {
  Doing = "doing",
  Done = "done",
}

export enum FilterEnum {
  Doing = "doing",
  Done = "done",
  All = "all",
}

export interface ITask {
  id?: string
  name: string
  title: string
  description: string
  status: StatusEnum
  filter?: FilterEnum
}
