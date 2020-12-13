import React, { useState, useEffect, FC } from 'react'
import Select from 'react-select';


export type DropdownValueType = {
	value: string
	label: string
}

type DropdownPropsType = any & {
	values: Array<DropdownValueType>
}


export const Dropdown: FC<DropdownPropsType> = ({ ...props }) => {
	let options = props.values ?? []

	const [selectedOption, setSelectedOption] = useState(null)


	useEffect(() => {
	console.log(props)

		// if (props.value) {
			setSelectedOption(props.value)
		// }
	}, [props.value, props.field.value]);

	const handleChange = (selectedOption: any) => {
		if (props.multiSelect) {
			props.handleChange(props.name, selectedOption ?? [])
		} else {
			props.handleChange(props.name, selectedOption)
		}
		setSelectedOption(selectedOption)
	}



	
	return (
		<Select

			value={options.length ? selectedOption : {}}
			isMulti={props.multiSelect}
			onChange={handleChange}
			options={options}
			placeholder={props.placeholder}
		/>
	)
}
