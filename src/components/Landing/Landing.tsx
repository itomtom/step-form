import { Formik } from 'formik'
import React from 'react'
import LandingForm from './LandingForm'
import { MyFormData } from '../../pages/MultiStepForm';
import { mixed, object } from 'yup';

type Props = {
  handleNext: (formData: Partial<MyFormData>) => void;
  data: Partial<MyFormData>;
};

export const StarterOptionsArray = ['', 'Bulbasaur', 'Squirtle', 'Charmander'] as const;
export type StarterOptions = (typeof StarterOptionsArray)[number];

const validationSchema = object().shape({
  starter: mixed<StarterOptions>()
      .oneOf(StarterOptionsArray.slice(1), 'Must be one of the starters')
      .required('Please tell us your starter pokemon'),
});


export default function Landing({ data, handleNext }: Props) {
  return (
    <>
      <h1>This is the landing page</h1>
      <Formik 
        initialValues={{
          starter: data.starter || '',
        }}
        onSubmit={handleNext}
        validationSchema={validationSchema}>
          <LandingForm></LandingForm>
        </Formik>
    </>
  )
}
