import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import { Formik } from "formik";
import { Link, useParams } from "react-router-dom";
import { Button, Form, Container, Row, Col, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillEyeFill, BsFillEyeSlashFill, BsLock } from "react-icons/bs";
import ResetPasswordStyle from "./resetPassword.module.css";

const API_URL = "http://localhost:9090/user";

const validationSchema = yup.object().shape({
  password: yup.string().required("Password is mendatory"),
  confirmPassword: yup.string().required("Confirm Password is mendatory"),
});

const initialValues = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const { id, token } = useParams();
  const [userId, setUserId] = useState(id);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    const url = `${API_URL}/validateresetlink/${id}/${token}`;
    const payload = {
      id,
      token,
    };

    try {
      axios.get(url, payload).then((response) => {
        if (response.status === 200) {
          swal({
            title: "Done!",
            text: "Reset Link Is Ok, You Can Reset Password",
            icon: "success",
            timer: 2000,
            button: false,
          });
        }
      });
    } catch (error) {
      swal({
        title: "Error!",
        text: "Reset Password Link Expired",
        icon: "danger",
        timer: 2000,
        button: false,
      });
    }
  }, []);

  const handleResetPassword = (formValues) => {
    const url = `${API_URL}/resetpassword/${userId}`;
    const password = formValues.password;
    const payload = {
      password,
    };

    axios.put(url, payload).then(
      (response) => {
        if (response.status === 200) {
          swal({
            title: "Done!",
            text: "Password Updated successfully.",
            icon: "success",
            timer: 2000,
            button: false,
          });
        }
      },
      (error) => {
        if (error.response) {
          swal({
            title: "Error!",
            text: `${error.response.data}`,
            icon: "danger",
            timer: 2000,
            button: false,
          });
        } else {
          swal({
            title: "Error!",
            text: `Server Not Responding`,
            icon: "warning",
            timer: 2000,
            button: false,
          });
        }
      }
    );
  };

  return (
    <Container
      className={ResetPasswordStyle.container}
      style={{ border: "1px solid gray", borderRadius: 10 }}
    >
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          handleResetPassword(values);
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
          isValid,
          errors,
        }) => (
          <Form
            onSubmit={handleSubmit}
            className={ResetPasswordStyle.resetPasswordForm}
          >
            <Row className="mb-5">
              <h3>Use Strong Password</h3>
            </Row>
            <Row className="mb-3">
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
                    className={ResetPasswordStyle.formControl}
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
            </Row>
            <Row className="mb-3">
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
                    className={ResetPasswordStyle.formControl}
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
            </Row>
            <Row className="mb-2" style={{ padding: 10 }}>
              <Button
                block
                className={ResetPasswordStyle.customBtn}
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Row>
            <Row className="mb-2">
              <Link to="/signin" style={{ color: "white" }}>
                Back To Sign In Page ?
              </Link>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
export default ResetPassword;
