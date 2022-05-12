import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import { Formik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Container, Row, Col, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillEyeFill, BsFillEyeSlashFill, BsLock } from "react-icons/bs";
import UserResetPasswordStyle from "./userResetPassword.module.css";

const API_URL = "http://localhost:9090/user";

const validationSchema = yup.object().shape({
  password: yup.string().required("Password is mendatory"),
  confirmPassword: yup.string().required("Confirm Password is mendatory"),
});

const initialValues = {
  password: "",
  confirmPassword: "",
};

const UserResetPassword = () => {
  const history = useNavigate();
  const [id, setUserId] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("userData"));
    if (loggedInUser) {
      setUserId(loggedInUser.userId);
      console.log("In useEffect Used Id==",loggedInUser.userId);
    } else {
      return null;
    }
  }, []);

  const handleUserResetPassword = (formValues) => {
    console.log("In handleUserResetPassword Used Id==",id);
    const url = `${API_URL}/resetpassword/${id}`;
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
            icon: "warning",
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
      className={UserResetPasswordStyle.container}
      style={{ border: "1px solid gray", borderRadius: 10 }}
    >
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          handleUserResetPassword(values);
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
            className={UserResetPasswordStyle.resetPasswordForm}
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
                    className={UserResetPasswordStyle.formControl}
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
                    className={UserResetPasswordStyle.formControl}
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
                className={UserResetPasswordStyle.customBtn}
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
export default UserResetPassword;
