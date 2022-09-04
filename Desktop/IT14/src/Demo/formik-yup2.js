import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const initValue = {
  name: '',
  age: '',
  sex: ''
}

const FormikYup2 = () => {

  const formik = useFormik({
    initialValues: initValue,
    validationSchema: Yup.object({
      name: Yup.string()
        .required('名字 為必填欄位'),
      age: Yup.number()
        .required('年齡 為必填欄位'),
      sex: Yup.string()
        .required('性別 為必填欄位'),
    }),
    onSubmit: (values) => {console.log(values)}
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      {/* name */}
      <div>
        <label htmlFor="name">name: </label>
        <input type="text" name="name" id="name" 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name} 
        />
        {formik.touched.name && formik.errors.name && (
          <span className='text-red-400'>{formik.errors.name}</span>
        )}
      </div>

      {/* age */}
      <div>
        <label htmlFor="age">age: </label>
        <input type="text" name="age" id="age"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.age} 
        />
        {formik.touched.age && formik.errors.age && (
          <span className='text-red-400'>{formik.errors.age}</span>
        )}
      </div>

      {/* sex */}
      <div>
        <label htmlFor="sex">sex: </label>
        <input type="text" name="sex" id="sex" 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.sex} 
        />
        {formik.touched.sex && formik.errors.sex && (
          <span className='text-red-400'>{formik.errors.sex}</span>
        )}

      </div>
      
      <button type="submit">Submit</button>
    </form>
  )
}

export default FormikYup2