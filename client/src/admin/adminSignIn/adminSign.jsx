import React, { useState, useEffect, Fragment } from "react";
import { Button, Container } from "react-bootstrap";
import * as yup from "yup";
import swal from "sweetalert";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

import AdminSignInStyle from "./adminSignIn.module.css";
import AuthService from "./../../services/authService";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("*Must be a valid email address")
    .max(100, "*Email must be less than 100 characters")
    .required("Please provide admin email."),
  password: yup.string().required("Please provide admin password."),
});

const initialValues = {
  email: "",
  password: "",
};

const AdminSignIn = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const Role = JSON.parse(localStorage.getItem("Admin"));
    if (Role && Role.role === "admin") {
      navigate("/admindashboard");
    }
  }, []);

  const handleSignIn = async (formValues) => {
    let admin = {
      email: formValues.email,
      password: formValues.password,
    };

    try {
      let result = await AuthService.adminSignIn(admin);
      swal({
        title: "Done!",
        text: `${result.message}`,
        icon: "success",
        timer: 2000,
        button: false,
      });
      setTimeout(function () {
        navigate("/admindashboard");
      }, 3000);
    } catch (e) {
      swal({
        title: "Error!",
        text: `${e.message}`,
        icon: "warning",
        timer: 2000,
        button: false,
      });
      setTimeout(() => {
        navigate("/admingsignin");
      }, 3000);
    }
  };

  return (
    <Fragment>
      <Container
        className={AdminSignInStyle.container}
        style={{ minHeight: dimensions.height }}
      >
        <div className={AdminSignInStyle.formContainer}>
          <div style={{ textAlign: "center" }}>
            <h3 className={AdminSignInStyle.headerTitle}>Admin Sign In</h3>
          </div>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              handleSignIn(values);
              setTimeout(() => {
                resetForm();
                setSubmitting(false);
              }, 1000);
            }}
          >
            <Form className={AdminSignInStyle.signInForm}>
              <div className={AdminSignInStyle.formGroup}>
                <Field
                  type="text"
                  name="email"
                  placeholder="Email"
                  className={AdminSignInStyle.formControl}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={AdminSignInStyle.errors}
                />
              </div>

              <div className={AdminSignInStyle.formGroup}>
                <Field
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className={AdminSignInStyle.formControl}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={AdminSignInStyle.errors}
                />
              </div>

              <div className={AdminSignInStyle.buttonGroup}>
                <Button
                  block
                  className={AdminSignInStyle.signInButton}
                  type="submit"
                >
                  Sign In
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </Container>
    </Fragment>
  );
};
export default AdminSignIn;
