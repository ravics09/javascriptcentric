import React, { useState } from "react";
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
import { AiOutlineMail } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import RN_IMG from "../../assets/images/forogtimg.png";
import ForgetPasswordStyle from "./forgetPassword.module.css";
import { forgotpassword } from "../../actions/authAction";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("*Must be a valid email address")
    .max(100, "*Email must be less than 100 characters")
    .required("Email is mendatory"),
});

const initialValues = {
  email: "",
};

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const handleForgetPassword = (formValues) => {
    const payload = {
      email: formValues.email,
    };

    dispatch(forgotpassword(payload)).then((res) => {
      if (res.status === "success") {
        swal({
          title: "Done!",
          text: `${res.message}`,
          icon: "success",
          timer: 2000,
          button: false,
        });

        setTimeout(function () {
          navigate("/signin");
        }, 3000);
      } else if (res.status === "failed") {
        swal({
          title: "Error!",
          text: `${res.message}`,
          icon: "warning",
          timer: 2000,
          button: false,
        });
        setTimeout(() => {
          navigate("/forgetpassword");
        }, 3000);
      }
    });
  };

  return (
    <Container
      className={ForgetPasswordStyle.container}
      style={{ minHeight: dimensions.height }}
    >
      <div style={{ textAlign: "center" }}>
        <>
          <h3 className={ForgetPasswordStyle.headerTitle}>Password Reset</h3>
          <p>Forgot your password? Reset it here.</p>
        </>
      </div>
      <div className={ForgetPasswordStyle.formContainer}>
        <Image src={RN_IMG} className={ForgetPasswordStyle.sideImage} />
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            handleForgetPassword(values);
            setTimeout(() => {
              resetForm();
              setSubmitting(false);
            }, 4000);
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
              className={ForgetPasswordStyle.forgetPasswordForm}
            >
              <Form.Group controlId="validationFormPassword">
                <Form.Label>Enter email address</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: "white" }}>
                    <AiOutlineMail />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    className={ForgetPasswordStyle.formControl}
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
              <div className={ForgetPasswordStyle.buttonLayout}>
                <Button
                  block
                  className={ForgetPasswordStyle.requestLinkBtn}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Request reset link
                </Button>
                <span
                  style={{
                    color: "black",
                    marginTop: "10px",
                  }}
                >
                  Want to sign in ?
                  <Link
                    to="/signin"
                    style={{ color: "black" }}
                    as={Col}
                    md="12"
                  >
                    Sign In
                  </Link>
                </span>
                <span
                  style={{
                    color: "black",
                    marginTop: "10px",
                  }}
                >
                  Don't have an account ?
                  <Link
                    to="/signup"
                    style={{ color: "black" }}
                    as={Col}
                    md="12"
                  >
                    Sign Up
                  </Link>
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};
export default ForgetPassword;
