import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import "./styles.css";

//custom validation function -> without yup
// const validate = values => {
//   const errors = {}

//   if (!values.firstName) {
//     errors.firstName = 'First Name is required'
//   } else if (values.firstName.length > 10) {
//     errors.firstName = 'Must be 10 characters or less'
//   }

//   if (!values.lastName) {
//     errors.lastName = 'Last Name is required'
//   } else if (values.lastName.length > 15) {
//     errors.lastName = 'Must be 15 characters or less'
//   }

//   if (!values.email) {
//     errors.email = 'Email is required'
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid'
//   }

//   return errors

// }

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (<div className="error">{meta.error}</div>)
      : null}
    </>
  );
};

const MyCheckbox = ({children, ...props}) => {
  const [field, meta] = useField({...props, type: 'checkbox'})
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (<div className="error">{meta.error}</div>)
      : null}
    </div>
  )
}

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const SignupForm = () => {
  //via hook method
  // const formik = useFormik({
  //   initialValues: {
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //   },

  //   // validate, -> via custom validate function

  //   validationSchema: Yup.object({
  //     firstName: Yup.string()
  //       .max(10, "Must be 10 characters or less")
  //       .required("First name is required"),
  //     lastName: Yup.string()
  //       .max(15, "Must be 15 characters or less")
  //       .required("Last name is required"),
  //     email: Yup.string()
  //       .email("Invalid email address")
  //       .required("Email is required"),
  //   }), //-> via YUP

  //   onSubmit: (values) => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });
  return (
    <>
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "", acceptedTerms: false, jobType: '' }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(10, "Must be 10 characters or less")
          .required("First name is required"),
        lastName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Last name is required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
          acceptedTerms: Yup.boolean().required('Required').oneOf([true], 'Please accept terms and conditions'),
          jobType: Yup.string().oneOf(['frontEnd_dev', 'database_admin', 'backend_dev', 'designer'], 'Invalid Job Type').required('Required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <MyTextInput label="First Name" name="firstName" type="text" placeholder="Uncle" />

        <MyTextInput label="Last Name" name="lastName" type="text" placeholder="Sam" />

        <MyTextInput label="Email Address" name="email" type="email" placeholder="unclesam@formik.com" />

        <MySelect label="Job Type" name="jobType">
          <option value="">Select a job type</option>
          <option value="frontEnd_dev">Frontend Dev</option>
          <option value="database_admin">Database Admin</option>
          <option value="backend_dev">Backend Dev</option>
          <option value="designer">Designer</option>
        </MySelect>

        <MyCheckbox name="acceptedTerms">
          I accept the terms and conditions
        </MyCheckbox>
        

        

        <button type="submit">Submit</button>
      </Form>
    </Formik>
    </>
  );
};

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
