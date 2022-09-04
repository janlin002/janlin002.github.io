import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

import FormikYup1 from './Demo/formik-yup1';
import FormikYup2 from './Demo/formik-yup2';

const Header = () =>{
  return (
    <div>
      <button>
        <Link to="/formik-yup-1">
          Formik+Yup
        </Link>
      </button>
      <button>
        <Link to="/formik-yup-2">
          Formik+Yup-2
        </Link>
      </button>
    </div>
  )
}

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/formik-yup-1" element={<FormikYup1 />} />
          <Route path="/formik-yup-2" element={<FormikYup2 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
