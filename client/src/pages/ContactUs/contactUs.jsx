import React from "react";
import * as yup from "yup";
import swal from "sweetalert";
import { Formik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import contactUsStyle from "./contactUs.module.css";
import { FaDev, FaYoutube, FaMediumM } from "react-icons/fa";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import UserService from "../../services/userService";

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
  subject: yup
    .string()
    .min(5, "*Subject must have at least 5 characters")
    .max(50, "*Subject can't be longer than 50 characters")
    .required("*Subject is required"),
  message: yup
    .string()
    .min(5, "*Message must have at least 5 characters")
    .max(100, "*Message can't be longer than 100 characters")
    .required("*Message is required"),
});

const initialValues = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

const ContactUs = () => {
  const handleContactForm = (formValues) => {
    swal({
      title: "Are You sure ?",
      text: "You want to send this message ?",
      icon: "warning",
      dangerMode: true,
    }).then(async (willSend) => {
      if (willSend) {
        const result = await UserService.contactUsMessage(formValues);
        if (result.status === "success") {
          swal({
            title: "Done!",
            text: `${result.message}`,
            icon: "success",
            timer: 2000,
            button: false,
          });
        } else {
          swal({
            title: "Error",
            text: `${result.message}`,
            timer: 2000,
            button: false,
            icon: "warning",
            dangerMode: true,
          });
        }
      }
    });
  };
  
  return (
    <Container
      className={contactUsStyle.container}
      style={{ border: "1px solid gray", borderRadius: 10}}
    >
      <Row>
        <Col className={contactUsStyle.contactUsForm}>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              handleContactForm(values);
              setTimeout(() => {
                resetForm();
                setSubmitting(false);
              }, 6000);
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
                className={contactUsStyle.contactForm}
              >
                <Row className="mb-5">
                  <article>
                    <h3>Send Message To Us</h3>
                    <p>Have any questions ? we'd love to hear from you.</p>
                  </article>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationFormFullName"
                  >
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Full Name"
                      name="fullName"
                      className={contactUsStyle.formControl}
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
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="validationFormEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="email"
                      className={contactUsStyle.formControl}
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
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationFormSubject"
                  >
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Subject"
                      name="subject"
                      className={contactUsStyle.formControl}
                      value={values.subject}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={!!errors.subject}
                    />
                    {touched.subject && errors.subject ? (
                      <Form.Control.Feedback type="invalid">
                        {errors.subject}
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationFormMessage"
                  >
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      type="text"
                      placeholder="Type your message here..."
                      name="message"
                      className={contactUsStyle.formControl}
                      value={values.message}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={!!errors.message}
                      aria-label="With textarea"
                    />

                    {touched.message && errors.message ? (
                      <Form.Control.Feedback type="invalid">
                        {errors.message}
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                </Row>
                {/* <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="formFile">
                    <Form.File
                      id="inputGroupFile01"
                      type="file"
                      custom
                    />
                  </Form.Group>
                </Row> */}
                <Row
                  className="mb-3"
                  style={{ paddingLeft: 10, paddingRight: 10 }}
                >
                  <Button
                    block
                    className={contactUsStyle.customBtn}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Send Message
                  </Button>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
        <Col className={contactUsStyle.contactInfo}>
          <Row className="mb-5">
            <article>
              <h3>How Can We Help You?</h3>
              <p>
                We always welcome new suggestions any correction if it happend
                by mistake. Please write us if you find any issue with this
                platform or you can raise a pull request on our github page.
              </p>
              <p>
                Github Link:{" "}
                <a href="https://github.com/ravics09/javascriptcentricreactjs">
                  https://github.com/ravics09/javascriptcentricreactjs
                </a>
              </p>
            </article>
          </Row>
          <Row className="mb-5">
            <article>
              <p>
                <strong>Email: ravisharmacs09@gmail.com</strong>
              </p>
              <p>
                <strong>Phone: +91-8817147753</strong>
              </p>
              <p>
                <strong>
                  Address: Raja Ram Nagar, Dewas M.P. Pincode 455001
                </strong>
              </p>
            </article>
          </Row>
          <Row className="mb-5">
            <article>
              <h4>Join us on other social platform</h4>
              <p>
                <FaYoutube size={40} color="#F20000" />{" "}
                <a href="https://www.youtube.com/channel/JavaScriptCentric">
                  https://www.youtube.com/channel/JavaScriptCentric
                </a>
              </p>
              <p>
                {" "}
                <FaDev size={40} color="white" />{" "}
                <a href="https://dev.to/javascriptcentric">
                  https://dev.to/javascriptcentric
                </a>
              </p>
              <p>
                {" "}
                <FaMediumM size={40} color="white" />{" "}
                <a href="https://www.javascriptcentric.medium.com">
                  https://www.javascriptcentric.medium.com
                </a>
              </p>
            </article>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
