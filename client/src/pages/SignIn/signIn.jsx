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
  InputGroup,
  Image,
} from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill, BsLock } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import "bootstrap/dist/css/bootstrap.min.css";
import SignInStyle from "./signIn.module.css";
import Login_IMG from "../../assets/images/loginimg.png";
import { signin, googlesignin } from "../../actions/authAction";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("*Must be a valid email address")
    .max(100, "*Email must be less than 100 characters")
    .required("*Please provide your email."),
  password: yup.string().required("*Please provide your password."),
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

  return (
    <Container
      className={SignInStyle.container}
      style={{ minHeight: dimensions.height }}
    >
      <div style={{ textAlign: "center" }}>
        <>
          <h3 className={SignInStyle.headerTitle}>Welcome Back</h3>
          <p>JavaScript Centric One Platform For All JavaScript Developer</p>
        </>
      </div>
      <div className={SignInStyle.formContainer}>
        <Image src={Login_IMG} className={SignInStyle.sideImage} />

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
            values,
            touched,
            errors,
            isSubmitting,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit} className={SignInStyle.signInForm}>
              <Form.Group controlId="validationFormEmail">
                <InputGroup className={SignInStyle.formGroup}>
                  <InputGroup.Text style={{ backgroundColor: "white" }}>
                    <AiOutlineMail />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    className={SignInStyle.formControl}
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </InputGroup>
                {touched.email && errors.email ? (
                  <div className={SignInStyle.formError}>{errors.email}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="validationFormPassword">
                <InputGroup className={SignInStyle.formGroup}>
                  <InputGroup.Text style={{ backgroundColor: "white" }}>
                    <BsLock />
                  </InputGroup.Text>
                  <Form.Control
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    className={SignInStyle.formControl}
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <InputGroup.Text onClick={() => setShowPass(!showPass)}>
                    {showPass ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                  </InputGroup.Text>
                </InputGroup>
                {touched.password && errors.password ? (
                  <div className={SignInStyle.formError}>{errors.password}</div>
                ) : null}
              </Form.Group>
              <div className={SignInStyle.buttonGroup}>
                <Link to="/forgetpassword" style={{ color: "black" }}>
                  Forgot/Change Password ?
                </Link>
                <Button
                  block
                  className={SignInStyle.signInButton}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign In
                </Button>
                <GoogleLogin
                  clientId="53790554286-8kljikjli2t9hdesgsss5a82u739djf7.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <Button
                      block
                      className={SignInStyle.googleSignInButton}
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
                <div>
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
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};
export default SignIn;
