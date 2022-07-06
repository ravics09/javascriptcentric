import React, { useState, useEffect, useRef, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import swal from "sweetalert";
import { Formik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import editPostStyle from "./editPost.module.css";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";

import Navbar from "../../components/navbar";
import FeedService from "../../services/feedService";

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .max(100, "*Title must be less than 100 characters")
    .required("Post Title is mendatory"),
  content: yup
    .string()
    .max(5000, "*Content must be less than 5000 characters")
    .required("Post Content is mendatory"),
});

const EditPost = () => {
  const navigate = useNavigate();
  const formikRef = useRef();
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const { loggedInUser, isLoggedIn } = useSelector(
    (state) => state.AuthReducer
  );
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [initialValues, setInitialValues] = useState({
    title: "",
    content: "",
  });

  const simulateNetworkRequest = () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const fetchPostData = async () => {
    const result = await FeedService.getPost(id);
    if (result.status === "success") {
      const authorId = result.post.postedBy._id;
      const loggedInUserId = loggedInUser._id;
      if (authorId === loggedInUserId) {
        setPageLoading(false);
        if (formikRef.current) {
          formikRef.current.setFieldValue("title", result.post.postTitle);
          formikRef.current.setFieldValue("content", result.post.postContent);
        }
      } else {
        setPageLoading(false);
        navigate("/home", { replace: true });
      }
    }
  };

  useEffect(() => {
    setPageLoading(true);
    if (isLoggedIn) {
      fetchPostData();
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, []);

  const onSubmitPost = async (formValues) => {
    const { title, content } = formValues;
    const payload = {
      title,
      content,
    };

    const result = await FeedService.editPost(id, payload);
    if (result.status === "success") {
      swal({
        title: "Done!",
        text: `${result.message}`,
        icon: "success",
        timer: 2000,
        button: false,
      });

      setTimeout(() => {
        navigate(`/home`);
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
  };

  return (
    <Fragment>
      <Navbar showSearchBar={false} />
      <Container
        className={editPostStyle.container}
        style={{ minHeight: dimensions.height }}
      >
        {pageLoading ? null : (
          <Row className="mb-3">
            <Col md={9}>
              <Formik
                validationSchema={validationSchema}
                innerRef={formikRef}
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  setLoading(true);
                  if (values) {
                    onSubmitPost(values);
                  }
                  setTimeout(() => {
                    setSubmitting(false);
                    setLoading(false);
                  }, 3000);
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  resetForm,
                  isSubmitting,
                  values,
                }) => (
                  <Form
                    onSubmit={handleSubmit}
                    className={editPostStyle.postForm}
                  >
                    <Row className="mb-5">
                      <h3 style={{ marginLeft: 10 }}>Edit Your Post</h3>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationPostTitle"
                      >
                        <InputGroup>
                          <Form.Control
                            type="text"
                            autoFocus
                            placeholder="New Post Title Here..."
                            name="title"
                            className={editPostStyle.postTitle}
                            value={values.title}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationPostContent"
                      >
                        <InputGroup>
                          <Form.Control
                            as="textarea"
                            type="text"
                            placeholder="Write your post content here..."
                            name="content"
                            className={editPostStyle.postContent}
                            value={values.content}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            maxlength="5000"
                            minlength="10"
                          />
                        </InputGroup>
                      </Form.Group>
                    </Row>
                    <Row className="mb-2" style={{ padding: 10 }}>
                      <Button
                        block
                        className={editPostStyle.customBtn}
                        type="submit"
                        disabled={isLoading}
                        variant={isLoading ? "success" : "primary"}
                      >
                        {isLoading ? "Waiting to save" : "Save Changes"}
                      </Button>
                      &nbsp;&nbsp;&nbsp;
                      <Button
                        block
                        className={editPostStyle.customBtn}
                        type="reset"
                        disabled={isSubmitting}
                        variant="outline-danger"
                        onClick={resetForm}
                      >
                        Clear All
                      </Button>
                      &nbsp;&nbsp;&nbsp;
                      <Button
                        block
                        className={editPostStyle.customBtn}
                        type="reset"
                        disabled={isSubmitting}
                        variant="danger"
                        onClick={() => navigate(`/home`, { replace: true })}
                      >
                        Go Back
                      </Button>
                    </Row>
                  </Form>
                )}
              </Formik>
            </Col>
            <Col md={3}></Col>
          </Row>
        )}
      </Container>
    </Fragment>
  );
};

export default EditPost;
