import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import swal from "sweetalert";
import { Formik } from "formik";
import { GoogleLogin } from "react-google-login";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  InputGroup,
  Image,
} from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill, BsLock } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import AuthService from "../../services/authService";
// import { signIn } from "./../../redux/slices/authSlice";

import "bootstrap/dist/css/bootstrap.min.css";
import signInStyle from "./signIn.module.css";
import Login_IMG from "../../assets/images/loginimg.png";
import { signin, googlesignin } from "../../actions/authAction";

const { innerHeight: winHight } = window;

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("*Must be a valid email address")
    .max(100, "*Email must be less than 100 characters")
    .required("Please provide your email."),
  password: yup.string().required("Please provide your password."),
});

const initialValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.AuthReducer);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/home");
    }
  }, []);

  const handleSignIn = async (formValues) => {
    let user = {
      email: formValues.email,
      password: formValues.password,
    };

    dispatch(signin(user)).then((res) => {
      if (res.status === "success") {
        swal({
          title: "Done!",
          text: `${res.message}`,
          icon: "success",
          timer: 2000,
          button: false,
        });

        setTimeout(function () {
          navigate("/home");
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
          navigate("/");
        }, 3000);
      }
    });
  };

  const responseGoogleSuccess = async (response) => {
    let user = { idToken: response.tokenId };

    dispatch(googlesignin(user)).then((res) => {
      if (res.status === "success") {
        navigate("/home");
      } else if (res.status === "failed") {
        setMessage(res.message);
        setTimeout(() => {
          setMessage("");
          navigate("/");
        }, 3000);
      }
    });
  };

  // const responseGoogleError = (response) => {
  //   alert("Check your internet connection");
  // };

  return (
    <Fragment>
      <Container
        className={signInStyle.container}
        style={{ minHeight: dimensions.height }}
      >
        <Row className={signInStyle.formContainer}>
          <Row style={{ textAlign: "center" }}>
            <Col>
              <h3 className={signInStyle.headerTitle}>Welcome Back</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row className="mb-3">
                <Image
                  src={Login_IMG}
                  style={{
                    borderRadius: "30px",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Row>
            </Col>
            <Col>
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
                    className={signInStyle.signInForm}
                  >
                    <Row className="mb-3">
                      <Form.Group controlId="validationFormEmail">
                        <Form.Label>Email</Form.Label>
                        <InputGroup>
                          <InputGroup.Text style={{ backgroundColor: "white" }}>
                            <AiOutlineMail />
                          </InputGroup.Text>
                          <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            className={signInStyle.formControl}
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
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationFormPassword"
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
                            className={signInStyle.formControl}
                            value={values.password}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                          />
                          <InputGroup.Text
                            onClick={() => setShowPass(!showPass)}
                          >
                            {showPass ? (
                              <BsFillEyeSlashFill />
                            ) : (
                              <BsFillEyeFill />
                            )}
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
                        controlId="validationFormCheckbox"
                      >
                        <Form.Check
                          type="checkbox"
                          label="Remember for 30 days"
                          style={{ color: "black" }}
                          onChange={(e) => setCheckboxChecked(!checkboxChecked)}
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Link
                        to="/forgetpassword"
                        style={{ color: "black" }}
                        as={Col}
                        md="12"
                      >
                        Forget Password ?
                      </Link>
                    </Row>
                    <Row className="mb-2" style={{ padding: 10 }}>
                      <Button
                        block
                        className={signInStyle.customBtn}
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Sign In
                      </Button>
                    </Row>

                    <Row
                      className="mb-2"
                      style={{ paddingLeft: 10, paddingRight: 10 }}
                    >
                      <GoogleLogin
                        clientId="53790554286-8kljikjli2t9hdesgsss5a82u739djf7.apps.googleusercontent.com"
                        render={(renderProps) => (
                          <Button
                            block
                            className={signInStyle.googleSignBtn}
                            onClick={renderProps.onClick}
                          >
                            Sign In With {"  "}
                            <InputGroup.Text
                              style={{
                                backgroundColor: "#ffff",
                                border: "white",
                              }}
                            >
                              <FcGoogle />
                            </InputGroup.Text>
                          </Button>
                        )}
                        onSuccess={responseGoogleSuccess}
                        // onFailure={responseGoogleError}
                        cookiePolicy={"single_host_origin"}
                      />
                    </Row>

                    <Row className="mb-2">
                      <p
                        style={{
                          color: "black",
                          paddingTop: 10,
                          textAlign: "center",
                        }}
                      >
                        Don't have an account ? {""}
                        <Link to="/signup" style={{ color: "black" }}>
                          Sign Up
                        </Link>
                      </p>
                    </Row>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Row>
      </Container>
    </Fragment>
  );
};
export default SignIn;
