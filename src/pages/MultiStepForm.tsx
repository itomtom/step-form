import React, { useEffect, useState } from 'react'
import Background from '../components/Background';
import Landing from '../components/Landing/Landing';
import Phone from '../components/Phone/Phone';
import End from '../components/End/End';

enum DIRECTION {
  NEXT = 1,
  PREVIOUS = -1,
}

export interface MyFormData {
  starter: string;
  phone: string;
}

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<DIRECTION>(DIRECTION.NEXT);
  const [data, setData] = useState<MyFormData>({ starter: '', phone: '' });

  const handleNext = (formData: Partial<MyFormData>) => {
    setData((prev) => ({ ...prev, ...formData }));
    setCurrentStep((step) => step + 1);
    setDirection(DIRECTION.NEXT);
    window.history.pushState(null, '', window.location.href);
    window.scrollTo(0, 0);
  };

  const handlePrevious = (formData: Partial<MyFormData>) => {
    setData((prev) => ({ ...prev, ...formData }));
    window.history.back();
    window.scrollTo(0, 0);
  };

  const steps = [
    <Landing data={data} handleNext={handleNext}></Landing>,
    <Phone data={data} handleNext={handleNext} handlePrevious={handlePrevious}></Phone>,
    <End></End>
  ];

  useEffect(() => {
    // override the default behavior of the browser's back button
    const onPopState = () => {
        if (currentStep > 0 && currentStep < steps.length - 1) {
            setCurrentStep((step) => step - 1);
            setDirection(DIRECTION.PREVIOUS);
        } else if (currentStep === steps.length - 1) {
            window.history.go(-(steps.length - 1));
        }
    };
    window.addEventListener('popstate', onPopState);

    return () => {
        window.removeEventListener('popstate', onPopState);
    };
  }, [currentStep, steps.length]);


  function getComponentForStep(currentStep: number, direction: DIRECTION): JSX.Element {
    const step = steps[currentStep];
    const checkData = { ...data };
    if (Array.isArray(step)) {
        for (const { key, value, component } of step) {
            if (checkData[key as keyof MyFormData] === value) {
                return component;
            }
        }
        setCurrentStep((step) => step + direction);
        return getComponentForStep(currentStep + direction, direction);
    } else {
        return step;
    }
  }
  
  return (
    <Background currentStep={currentStep} totalSteps={steps.length}>
      {getComponentForStep(currentStep, direction)}
    </Background>
  )
}
