import React, { useState, useEffect, Fragment } from "react";
import * as yup from "yup";
import swal from "sweetalert";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import createPostStyle from "./createPost.module.css";
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
  // tags: yup
  //   .array()
  //   .length(3, "Max 3 tags are allowed")
  //   .required("tags is mendatory"),
});

const initialValues = {
  title: "",
  content: "",
  // tags: [],
};

const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { loggedInUser } = useSelector((state) => state.AuthReducer);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const simulateNetworkRequest = () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };

  useEffect(() => {
    if (loggedInUser) {
      setUserId(loggedInUser._id);
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, []);

  const handleSubmitPost = async (formValues) => {
    let postTitle = formValues.title;
    let postContent = formValues.content;

    const payload = {
      userId,
      postTitle,
      postContent,
    };

    const result = await FeedService.createPost(payload);

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
      <Navbar />
      <Container
        className={createPostStyle.container}
        style={{ minHeight: dimensions.height }}
      >
        <Row >
          <Col xl={12} lg={6} md={9}>
            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                setLoading(true);
                if (values) {
                  handleSubmitPost(values);
                } else {
                  alert("Title missing");
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
                touched,
                errors,
              }) => (
                <Form
                  onSubmit={handleSubmit}
                  className={createPostStyle.postForm}
                >
                  <Row className="mb-3">
                    <h3 style={{ marginLeft: 10 }}>Create A New Post</h3>
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
                          className={createPostStyle.postTitle}
                          value={values.title}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  {/* <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationPostTitle"
                    >
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder="#tags"
                          name="tags"
                          className={createPostStyle.postTags}
                          value={values.tags}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Row> */}
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
                          className={createPostStyle.postContent}
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
                      className={createPostStyle.customBtn}
                      type="submit"
                      disabled={isLoading}
                      variant={isLoading ? "success" : "primary"}
                    >
                      {isLoading ? "Waiting to publish" : "Publish"}
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button
                      block
                      className={createPostStyle.customBtn}
                      type="reset"
                      disabled={isSubmitting}
                      variant="outline-danger"
                      onClick={resetForm}
                    >
                      Clear
                    </Button>
                  </Row>
                </Form>
              )}
            </Formik>
          </Col>
          <Col xl={0} lg={6} md={3}></Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default CreatePost;
