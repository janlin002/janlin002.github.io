import React from 'react';

import { useFormik, Formik, Form, Field } from 'formik';
import * as Yup from 'yup'

const initValue = {
  name: '',
  age: '',
  sex: ''
}

const myValidation = Yup.object().shape({
  name: Yup.string()
    .required('名字 為必填欄位'),
  age: Yup.number()
    .required('年齡 為必填欄位'),
  sex: Yup.string()
    .required('性別 為必填欄位'),
})

function FormikYup() {
  return (
    <Formik 
      initialValues={initValue}
      validationSchema={myValidation}
      onSubmit={values => {
        console.log(values);
      }}
    >
      {({ errors, touched })=>(
        <Form>
          {/* name */}
          <div>
            <span>name: </span>
            <Field name="name" autocomplete="off" />
            {errors.name && touched.name ? (
              <div>{errors.name}</div>
            ) : null}
          </div>
          
          {/* age */}
          <div>
            <span>age: </span>
            <Field name="age" autocomplete="off" />
            {errors.age && touched.age ? (
              <div>{errors.age}</div>
            ) : null}
          </div>

          {/* sex */}
          <div>
            <span>sex: </span>
            <Field name="sex" autocomplete="off" />
            {errors.sex && touched.sex ? (
              <div>{errors.sex}</div>
            ) : null}
          </div>
          
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default FormikYup;
