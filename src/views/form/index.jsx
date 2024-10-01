import React, { useEffect, useState } from 'react'
// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import ProgressIndicator from 'ui-component/ProgressIndicator';
import BasicInfoform from './BasicInfoform';

import useCareQuestion from 'hooks/useCareQuestion';
import CareFormDTO from './CareFormDTO';
import useAuth from 'hooks/useAuth';

// ==============================|| SAMPLE PAGE ||============================== //

const Form = () => {
	const careFormDto = new CareFormDTO()

	const { user } = useAuth()

	const { careQuestions, getCareQuestions, submitCareQuestions, updateCareFormQuestion, retrieveformDataBySSN } = useCareQuestion();
	const [careForm, setCareForm] = useState(careFormDto)

	const [questions, setQuestions] = useState({})
	const [steps, setSteps] = useState([]);
	const [activeStep, setActiveStep] = useState(0);
	const [currentStep, setCurrentStep] = useState()

	const [parent, setParent] = useState('Basic Client Information')

	const fetchData = async () => {
		await getCareQuestions()
	}

	useEffect(() => {
		setCareForm((prevCareForm) => ({
			...prevCareForm,
			['submittedByEmail']: user.email,
			['submittedByName']: user.firstName
		}));
	}, [user])


	useEffect(() => {
		fetchData()
	}, [])


	useEffect(() => {
		if (!careQuestions?.data) return;

		// Create a sorted copy of the careQuestions.data
		const sortedData = [...careQuestions.data].sort((a, b) => {
			const aParts = a.questionID.split('.').map(Number);
			const bParts = b.questionID.split('.').map(Number);

			for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
				const aPart = aParts[i] || 0; // Treat missing parts as 0
				const bPart = bParts[i] || 0; // Treat missing parts as 0

				if (aPart !== bPart) {
					return aPart - bPart; // Numeric comparison
				}
			}

			return 0; // They are equal
		});

		// Group the sorted data by parentBlock
		const groupedData = sortedData.reduce((acc, curr) => {
			const { parentBlock } = curr;

			if (!acc[parentBlock]) {
				acc[parentBlock] = [];
			}

			acc[parentBlock].push(curr);
			return acc;
		}, {});

		setQuestions(groupedData);

		const uniqueParentBlocks = Array.from(new Set(careQuestions?.data.map(item => item.parentBlock)));

		// Format the steps based on unique parent blocks
		const formattedSteps = uniqueParentBlocks.map((parentBlock, index) => ({
			id: index,
			key: parentBlock, // Change this if you want to extract a specific key from the question
			name: parentBlock,
			nextId: index + 1 < uniqueParentBlocks.length ? index + 1 : null,
			isActive: index === 0,
			isVisible: true,
		}));
		setCurrentStep(formattedSteps[0])
		setSteps(formattedSteps);
	}, [careQuestions]);


	const handleNext = () => {
		const currentStep = steps.find(step => step.id === activeStep);
		if (currentStep && currentStep.nextId) {
			const nextCurrentStep = steps.find(step => step.id === currentStep.nextId)
			setSteps(prevSteps =>
				prevSteps.map(step =>
					step.id === currentStep.nextId ? { ...step, isActive: true } : step
				)
			);
			setParent(nextCurrentStep.name)
			setActiveStep(currentStep.nextId);
			setCurrentStep(nextCurrentStep)
		}
		handleUpdate()
	};

	const handleBack = () => {
		const currentIndex = steps.findIndex(step => step.id === activeStep);
		if (currentIndex > 0) {
			setActiveStep(steps[currentIndex - 1].id);
		}
	};

	const handleStepClick = (stepId) => {
		const currentStepIndex = steps.findIndex(step => step.id === stepId);
		const activeStepIndex = steps.findIndex(step => step.id === activeStep);

		if (currentStepIndex <= activeStepIndex || steps[currentStepIndex]?.isActive) {
			setActiveStep(stepId);
			setParent(steps[currentStepIndex].name)

			const updatedSteps = steps.map((step, index) => ({
				...step,
				isActive: index <= currentStepIndex,
			}));

			setSteps(updatedSteps);
			setCurrentStep(steps[currentStepIndex])
		}
	};

	const handleUpdate = async () => {
		console.log(careForm)
		await updateCareFormQuestion(careForm['3.3.5'], careForm)
	}

	const handleSubmit = async (value) => {
		try {
			const response = await retrieveformDataBySSN(value);
			const data = response.data
			if (data === '') {
				await submitCareQuestions(careForm);
			} else {
				
				for (const key in data) {
					if (careForm.hasOwnProperty(key)) {
						if (key === '3.3.5') {
							careForm['Social Security Number'] = Number.parseInt(data[key])
							careForm[key] = Number.parseInt(data[key])
						}
						else if (typeof data[key] === 'string' && data[key].startsWith('{')) {
							try {
								const cleanedString = data[key].replace(/[{}"]/g, '');
								const array = cleanedString.split(',').map(item => item.trim());
								careForm[key] = array
							} catch (error) {
								console.error(`Error parsing JSON for key ${key}:`, error);
								careForm[key] = []; // Fallback to an empty array if parsing fails
							}
						} else {
							if (Date.parse(data[key])) {
								careForm[key] = new Date(data[key]);
							}
							else {
								careForm[key] = data[key].length > 0 ? data[key]: careForm[key];
							}
						}
					}
				}
				setCareForm(careForm);
			}
		} catch (error) {
			console.error('Error during submission:', error);
		}
	}

	return (
		<MainCard>
			<Box sx={{ p: 4 }}>
				<Grid container>
					<Grid size={4} sx={{ m: 2 }} >
						{steps &&
							<ProgressIndicator steps={steps} handleStepClick={handleStepClick} activeStep={activeStep} />
						}
					</Grid>
					<Grid size={8}>
						{questions &&
							<BasicInfoform data={questions[parent]} handleNext={handleNext} setCareForm={setCareForm} careForm={careForm} currentStep={currentStep} handleSubmit={handleSubmit} handleUpdate={handleSubmit} />
						}
					</Grid>

				</Grid>
			</Box>
		</MainCard>
	)
}


export default Form;
