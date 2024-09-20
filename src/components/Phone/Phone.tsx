import { Formik } from 'formik'
import React from 'react'
import { MyFormData } from '../../pages/MultiStepForm';
import { object, string } from 'yup';
import PhoneForm from './PhoneForm';

type Props = {
  handleNext: (formData: Partial<MyFormData>) => void;
  handlePrevious: (formData: Partial<MyFormData>) => void;
  data: Partial<MyFormData>;
};

const validationSchema = object().shape({
  phone: string().phone('GB', 'Please enter a valid UK number').required('Phone number is required'),
});

export default function Phone({ data, handleNext, handlePrevious }: Props) {
  return (
    <>
      <h1>This is the phone page</h1>
      <Formik 
        initialValues={{
          phone: data.phone || '',
        }}
        onSubmit={handleNext}
        validationSchema={validationSchema}>
          <PhoneForm onNext={handleNext} onBack={handlePrevious}></PhoneForm>
        </Formik>
    </>
  )
}
