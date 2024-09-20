import { Form, useFormikContext } from 'formik'
import React from 'react'
import Select, { SingleValue } from 'react-select';

const options = [
  {
    value: 'Bulbasaur',
    label: 'Bulbasaur',
  },
  {
    value: 'Squirtle',
    label: 'Squirtle',
  },
  {
    value: 'Charmander',
    label: 'Charmander',
  }
]

export default function LandingForm() {
  const { setFieldValue, values, isSubmitting, isValid } = useFormikContext<{
      starter: 'Bulbasaur' | 'Squirtle' | 'Charmander';
  }>();

  return (
    <Form noValidate autoComplete="on">

      <Select options={options} name="starter" value={options.find(option => option.value === values.starter)} onChange={(newValue: SingleValue<{ value: string; label: string }>) => {
         if (newValue?.value !== undefined) {
          setFieldValue('starter', newValue.value);
         }
      }}/>

      <div className="flex justify-end">
          <button disabled={!isValid || isSubmitting} type="submit">
              Continue
          </button>
      </div>
    </Form>
  )
}
