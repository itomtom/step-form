import React, { useMemo } from 'react'
import { MyFormData } from '../../pages/MultiStepForm';
import { Form, useField, useFormikContext } from 'formik';

type FormProps = {
  onNext: (formData: Partial<MyFormData>) => void;
  onBack: (formData: Partial<MyFormData>) => void;
};

export default function PhoneForm({ onNext, onBack }: FormProps) {
  const { handleChange, values, isSubmitting, errors } = useFormikContext<{
    phone: string;
}>();

  return (
    <Form autoComplete="on" noValidate>
      <>
        <input
            onChange={handleChange}
            name="phone"
            placeholder="07000000000"
            value={values.phone}
            type="tel"
          ></input>
        <div className="text-red-500">{errors.phone}</div>
      </>
      <div className="w-full flex items-center justify-between flex-row-reverse">
        <button disabled={isSubmitting} onClick={() => onNext(
            { phone: values.phone }
        )}>
          Continue
        </button>
        <button disabled={isSubmitting} onClick={() => onBack(
            { phone: values.phone }
        )}>
            Back
        </button>
      </div>
    </Form>

  )
}
