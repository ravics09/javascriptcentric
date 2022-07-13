import React, { useState, useEffect, Fragment } from "react";
import { Button, Form, Container, Row, Col, InputGroup } from "react-bootstrap";
import * as yup from "yup";
import swal from "sweetalert";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill, BsLock } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

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
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              isSubmitting,
              values,
              touched,
              errors,
            }) => (
              <Form
                onSubmit={handleSubmit}
                className={AdminSignInStyle.signInForm}
              >
                <Form.Group
                  controlId="validationFormEmail"
                  className={AdminSignInStyle.formGroup}
                >
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text style={{ backgroundColor: "white" }}>
                      <AiOutlineMail />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="email"
                      className={AdminSignInStyle.formControl}
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    {touched.email && errors.email ? (
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    ) : null}
                  </InputGroup>
                </Form.Group>
                <Form.Group
                  controlId="validationFormPassword"
                  className={AdminSignInStyle.formGroup}
                >
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text style={{ backgroundColor: "white" }}>
                      <BsLock />
                    </InputGroup.Text>
                    <Form.Control
                      type={showPass ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      className={AdminSignInStyle.formControl}
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                    />
                    <InputGroup.Text onClick={() => setShowPass(!showPass)}>
                      {showPass ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                    </InputGroup.Text>
                    {touched.password && errors.password ? (
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    ) : null}
                  </InputGroup>
                </Form.Group>
                <div className={AdminSignInStyle.buttonLayout}>
                  <Button
                    block
                    className={AdminSignInStyle.signInButton}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Sign In
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </Fragment>
  );
};
export default AdminSignIn;
