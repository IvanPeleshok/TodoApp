
export const formErrors = {
	required: 'Обязательное поле',
	minLength: (count: number) => `Минимальное количество символов: ${count}`,
	maxLength: (count: number) => `Максимальное количество символов: ${count}`,
	email: 'Некорректный Email',
	numeric: 'Числовое поле',
	unique: (fieldName: string) => `Значение поля ${fieldName} должно быть уникальным`
}