import React, { useState } from "react";
import { Check as CheckIcon } from "@mui/icons-material";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { styled } from "@mui/system";

// Custom icon styling for both completed and active steps
const CustomStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: ownerState.active || ownerState.completed ? theme.palette.primary.main : theme.palette.grey[300],
  display: "flex",
  height: 22,
  width: 22, // Ensures consistent size for both icons
  alignItems: "center",
  justifyContent: "center",
  "& .MuiSvgIcon-root": {
    fontSize: 26,  // Set a consistent icon size for the checkmark
    fill: ownerState.completed ? theme.palette.success.main : "inherit", // Completed icon color
  },
  "& .circle": {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: ownerState.completed ? theme.palette.success.main : theme.palette.grey[400], // Circle for incomplete steps
  },
}));

function CustomStepIcon(props) {
  const { completed } = props;

  return (
    <CustomStepIconRoot ownerState={{ completed }}>
      {completed ? <CheckIcon /> : <div className="circle" />}
    </CustomStepIconRoot>
  );
}

export default function ProgressIndicator({steps, activeStep, handleStepClick}) {
  return (
    <Stepper orientation="vertical" sx={{ mr: 4 }} activeStep={steps.findIndex(step => step.id === activeStep)}>
      {steps
      .filter(step => step.isVisible)
      .map((step) => (
        <Step key={step.key} completed={step.isActive} onClick={() => handleStepClick(step.id)}>
          <StepLabel StepIconComponent={CustomStepIcon}>{step.name}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
