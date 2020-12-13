import { apiURL } from "../api/api"
import noUserImg from "../assets/img/avatar-placeholder.png"
import noContentImg from "../assets/img/content-placeholder.png"
// import { OrderEnum } from '../components/Common/Table/Table'

export const apiFileSrc = (fileSrc: string | null, type = "user") => {
  let src = ""

  if (fileSrc && fileSrc !== "null") {
    if (typeof fileSrc === "string" && fileSrc.includes("http")) src = fileSrc
    else src = apiURL + "storage/" + fileSrc
  } else {
    src = type === "user" ? noUserImg : noContentImg
  }

  return src
}

export const converToFormData = (data: any): FormData => {
  let formData = new FormData()
  for (let key in data) {
    formData.append(key, data[key])
  }

  return formData
}

// export const formatApiListParams = (page: number, order: OrderEnum, orderBy: string) => {
// 	return {
// 		page: page + 1,
// 		sort: `${order === OrderEnum.desc ? '-' : ''}${orderBy}`
// 	} as APIListParamsType
// }
