import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import swal from "sweetalert";
import { Formik } from "formik";
import { Button, Form, Container, InputGroup, Image } from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill, BsLock } from "react-icons/bs";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";

import "bootstrap/dist/css/bootstrap.min.css";
import SignUpStyle from "./signUp.module.css";
import AuthService from "../../services/authService";
import RN_IMG from "../../assets/images/logoi.png";

const validationSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(2, "*Names must have at least 2 characters")
    .max(100, "*Names can't be longer than 100 characters")
    .required("*Full Name is required"),
  email: yup
    .string()
    .email("*Must be a valid email address")
    .max(100, "*Email must be less than 100 characters")
    .required("*Email is required"),
  password: yup.string().required("*Password is mendatory"),
  confirmPassword: yup.string().required("*Confirm Password is mendatory"),
});

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const handleSignUp = async (formValues) => {
    const { fullName, email, password, confirmPassword } = formValues;

    if (password !== confirmPassword) {
      swal({
        title: "Error!",
        text: `Password and confirm pass not matched`,
        icon: "warning",
        timer: 2000,
        button: false,
      });
    } else {
      let user = {
        fullName: fullName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };

      const result = await AuthService.signUp(user);

      if (result.status === "success") {
        swal({
          title: "Done!",
          text: `${result.message}`,
          icon: "success",
          timer: 2000,
          button: false,
        });

        setTimeout(function () {
          navigate("/signin");
        }, 3000);
      } else {
        swal({
          title: "Error!",
          text: `${result.message}`,
          icon: "warning",
          timer: 2000,
          button: false,
        });
      }
    }
  };

  return (
    <Container
      className={SignUpStyle.container}
      style={{ minHeight: dimensions.height }}
    >
      <div style={{ textAlign: "center" }}>
        <>
          <h3 className={SignUpStyle.headerTitle}>Sign Up Here</h3>
          <p>We are not sharing user details to anyone.</p>
        </>
      </div>
      <div className={SignUpStyle.formContainer}>
        <Image src={RN_IMG} className={SignUpStyle.sideImage} />

        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            handleSignUp(values);
            setTimeout(() => {
              resetForm();
              setSubmitting(false);
            }, 1000);
          }}
        >
          {/* Callback function containing Formik state and helpers that handle common form actions */}
          {({
            values,
            touched,
            errors,
            isSubmitting,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit} className={SignUpStyle.signUpForm}>
              <Form.Group controlId="validationFormFullName">
                <InputGroup className={SignUpStyle.formGroup}>
                  <InputGroup.Text style={{ backgroundColor: "white" }}>
                    <AiOutlineUser />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    name="fullName"
                    className={SignUpStyle.formControl}
                    value={values.fullName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </InputGroup>
                {touched.fullName && errors.fullName ? (
                  <div className={SignUpStyle.formError}>
                    <p> {errors.fullName}</p>
                  </div>
                ) : null}
              </Form.Group>

              <Form.Group controlId="validationFormEmail">
                <InputGroup className={SignUpStyle.formGroup}>
                  <InputGroup.Text style={{ backgroundColor: "white" }}>
                    <AiOutlineMail />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    className={SignUpStyle.formControl}
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </InputGroup>
                {touched.email && errors.email ? (
                  <div className={SignUpStyle.formError}>{errors.email}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="validationFormPassword">
                <InputGroup className={SignUpStyle.formGroup}>
                  <InputGroup.Text style={{ backgroundColor: "white" }}>
                    <BsLock />
                  </InputGroup.Text>
                  <Form.Control
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    className={SignUpStyle.formControl}
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <InputGroup.Text onClick={() => setShowPass(!showPass)}>
                    {showPass ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                  </InputGroup.Text>
                </InputGroup>
                {touched.password && errors.password ? (
                  <div className={SignUpStyle.formError}>{errors.password}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="validationFormConfirmPassword">
                <InputGroup className={SignUpStyle.formGroup}>
                  <InputGroup.Text style={{ backgroundColor: "white" }}>
                    <BsLock />
                  </InputGroup.Text>
                  <Form.Control
                    type={showConfirmPass ? "text" : "password"}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    className={SignUpStyle.formControl}
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <InputGroup.Text
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                  >
                    {showConfirmPass ? (
                      <BsFillEyeSlashFill />
                    ) : (
                      <BsFillEyeFill />
                    )}
                  </InputGroup.Text>
                </InputGroup>
                {touched.confirmPassword && errors.confirmPassword ? (
                  <div className={SignUpStyle.formError}>
                    {errors.confirmPassword}
                  </div>
                ) : null}
              </Form.Group>
              <div className={SignUpStyle.buttonGroup}>
                <Button
                  block
                  className={SignUpStyle.customBtn}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
                <div>
                  <p
                    style={{
                      color: "black",
                      paddingTop: 10,
                      textAlign: "center",
                    }}
                  >
                    Already have an account ? {""}
                    <Link to="/signin" style={{ color: "black" }}>
                      Sign In here
                    </Link>
                  </p>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default SignUp;
