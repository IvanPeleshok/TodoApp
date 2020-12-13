// import { showAlert } from './showAlert'

export const loadImage = (file: File, fieldName: string, holderId: string, setFiledValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => {
	let fileReader = new FileReader()
		
	let maxFileSize = 2
	// Max image size 2MB
	if (holderId.includes('video'))
		maxFileSize = 10
	if (file) {
		if (file.size / 1024 / 1024 < maxFileSize) {
			fileReader.onload = function (event: any) {
				document.getElementById(holderId)?.setAttribute("src", event.target.result)
			}
			fileReader.readAsDataURL(file)
			setFiledValue(fieldName, file)
	
		} else {
			// showAlert(AlertifyStatusEnum.error, `Размер файла не должен превышеть ${maxFileSize}МБ`)
		}
	}
}