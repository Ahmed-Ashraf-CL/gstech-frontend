import React, { useState } from 'react'
import Box from '@mui/material/Box'
import InputDropdown from 'ui-component/base-input/inputDropDown'
import InputText from 'ui-component/base-input/InputText'
import InputDatePicker from 'ui-component/base-input/inputDatePicker'
import Button from '@mui/material/Button'
import InputMultipleDropDown from 'ui-component/base-input/inputMultipleDropDown'

const BasicInfoform = ({ data, handleNext, setCareForm, careForm, currentStep, handleSubmit, handleUpdate }) => {


	const [questionId, setQuestionId] = useState();
	const handleMultipleChange = (event) => {
		const { name, value } = event.target;
		if (name === '3.4.2') {
			setQuestionId("3.4.2")
		}
		setCareForm((prev) => ({
			...prev,
			[name]: (typeof value === 'string' ? value.split(',') : value),
		}))

	};

	const handleDateChange = (name) => (newValue) => {
		setCareForm((prev) => ({
			...prev,
			[name]: new Date(newValue),
		}));

	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === '3.3.5') {
			setCareForm((prevCareForm) => ({
				...prevCareForm,
				['Social Security Number']: Number.parseInt(value),
				[name]: Number.parseInt(value) ? Number.parseInt(value) : value,
			}));
			if(value.length >= 9)
				setTimeout(()=>handleSubmit(value), 2000)
		}
		setCareForm((prevCareForm) => ({
			...prevCareForm,
			[name]: Number.parseInt(value) ? Number.parseInt(value) : value,
		}));

	}

	const isDependent = (d) => {
		if (d.questionID === questionId || d.dependentOn != null) {
			const res = careForm[questionId]?.filter((value) => d.dependentOn[questionId].toLowerCase().includes(value.toLowerCase()))
			return res?.length > 0 ? true : false
		}
		return true
	}

	return (
		<Box sx={{ minWidth: 1000 }}>
			{
				data?.map((d) => {
					if (d.type === 'select_single' && isDependent(d)) {
						return (
							<Box sx={{ m: 2 }}>
								<InputDropdown
									key={d.questionID}
									label={d.description}
									value={careForm[d.questionID]}
									name={d.questionID}
									handleChange={handleChange}
									options={d.options}
								/>
							</Box>
						);
					} else if (d.type === 'select_multiple') {
						return (
							<Box sx={{ m: 2 }}>
								<InputMultipleDropDown
									key={d.id}
									label={d.description}
									name={d.questionID}
									value={careForm[d.questionID]}
									handleChange={handleMultipleChange}
									options={d.options}
								/>
							</Box>
						)
					} else if (d.type === 'Date') {
						return (
							<Box sx={{ m: 2 }} key={d.id}>

								<InputDatePicker
									key={d.questionID}
									label={d.description}
									name={d.questionID}
									value={careForm[d.questionID]}
									handleChange={handleDateChange}
								/>

							</Box>
						)
					}
					else if (d.type === 'text' || d.type === 'number') {
						return (
							<Box sx={{ m: 2 }}>
								<InputText
									key={d.questionID}
									label={d.description}
									name={d.questionID}
									type={d.type}
									value={careForm[d.questionID]}
									handleChange={handleChange}
								/>
							</Box>
						)
					}
					return null
				})
			}
			<Box sx={{ m: 2, display: 'flex', justifyContent: 'flex-end' }}>
				{currentStep && currentStep.nextId ? (
					<Button
						variant='contained'
						sx={{
							borderRadius: '20px',
							backgroundColor: '#0366A4',
							color: '#fff',
							'&:hover': {
								backgroundColor: '#025A8C'
							}
						}}
						onClick={handleNext}
					>
						Continue
					</Button>
				) : (
					<Button
						variant='contained'
						sx={{
							borderRadius: '20px',
							backgroundColor: '#0366A4',
							color: '#fff',
							'&:hover': {
								backgroundColor: '#025A8C'
							}
						}}
						onClick={handleUpdate}
					>
						Submit
					</Button>
				)
				}
			</Box>
		</Box>
	)
}

export default BasicInfoform