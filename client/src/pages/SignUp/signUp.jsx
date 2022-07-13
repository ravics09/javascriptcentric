import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import swal from "sweetalert";
import { Formik } from "formik";
import {
  Button,
  Form,
  Container,
  Col,
  InputGroup,
  Image,
} from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill, BsLock } from "react-icons/bs";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";

import "bootstrap/dist/css/bootstrap.min.css";
import signUpStyle from "./signUp.module.css";
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
  password: yup.string().required("Password is mendatory"),
  confirmPassword: yup.string().required("Confirm Password is mendatory"),
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
      className={signUpStyle.container}
      style={{ minHeight: dimensions.height }}
    >
      <div style={{ textAlign: "center" }}>
        <>
          <h3 className={signUpStyle.headerTitle}>Sign Up Here</h3>
          <p>We are not sharing user details to anyone.</p>
        </>
      </div>
      <div className={signUpStyle.formContainer}>
        <Image src={RN_IMG} className={signUpStyle.sideImage} />

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
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            isSubmitting,
            values,
            touched,
            errors,
          }) => (
            <Form onSubmit={handleSubmit} className={signUpStyle.signUpForm}>
              <Form.Group controlId="validationFormFullName">
                <Form.Label>Full Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: "white" }}>
                    <AiOutlineUser />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    name="fullName"
                    className={signUpStyle.formControl}
                    value={values.fullName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    isInvalid={!!errors.fullName}
                  />
                  {touched.fullName && errors.fullName ? (
                    <Form.Control.Feedback type="invalid">
                      {errors.fullName}
                    </Form.Control.Feedback>
                  ) : null}
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="12" controlId="validationFormEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: "white" }}>
                    <AiOutlineMail />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    className={signUpStyle.formControl}
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
              <Form.Group as={Col} md="12" controlId="validationFormPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: "white" }}>
                    <BsLock />
                  </InputGroup.Text>
                  <Form.Control
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    className={signUpStyle.formControl}
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
              <Form.Group
                as={Col}
                md="12"
                controlId="validationFormConfirmPassword"
              >
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: "white" }}>
                    <BsLock />
                  </InputGroup.Text>
                  <Form.Control
                    type={showConfirmPass ? "text" : "password"}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    className={signUpStyle.formControl}
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    isInvalid={!!errors.confirmPassword}
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
                  {touched.confirmPassword && errors.confirmPassword ? (
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  ) : null}
                </InputGroup>
              </Form.Group>
              <div className={signUpStyle.buttonLayout}>
                <Button
                  block
                  className={signUpStyle.customBtn}
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
