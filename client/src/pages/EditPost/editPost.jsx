import React, { useState, useEffect, useRef, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import swal from "sweetalert";
import { Formik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import editPostStyle from "./editPost.module.css";

import Navbar from "../../components/navbar";
import FeedService from "../../services/feedService";

const EditPost = () => {
  const navigate = useNavigate();
  const postTitleRef = useRef();
  const postTagsRef = useRef();
  const postContentRef = useRef();
  const { id } = useParams();
  const [userId, setUserId] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const { loggedInUser, isLoggedIn } = useSelector(
    (state) => state.AuthReducer
  );
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const simulateNetworkRequest = () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const fetchPostData = async () => {
    const result = await FeedService.getPost(id);
    if (result.status === "success") {
      const authorId = result.post.postedBy._id;
      const loggedInUserId = loggedInUser._id;
      console.log("result.post",result.post)
      if (authorId === loggedInUserId) {
        setPageLoading(false);
        postTitleRef.current.value = result.post.postTitle;
        postTagsRef.current.value = result.post.tags;
        postContentRef.current.value = result.post.postContent;
      } else {
        setPageLoading(false);
        navigate("/home", { replace: true });
      }
    }
  };

  useEffect(() => {
    setPageLoading(true);
    if (isLoggedIn) {
      setUserId(loggedInUser._id);
      fetchPostData();
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, []);

  const inputStyle = {
    margin: "5px 0 10px 0",
    padding: "5px",
    border: "1px solid #bfbfbf",
    borderRadius: "3px",
    boxSizing: "border-box",
    width: "100%",
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    const payload = {
      postTitle: postTitleRef.current.value,
      postTags: postTagsRef.current.value,
      postContent: postContentRef.current,
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

  const handleResetForm = () => {
    postTitleRef.current.value = "";
    postTagsRef.current.value = "";
    postContentRef.current.value = "";
  };

  const Field = React.forwardRef(({ type, placeholder }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          style={inputStyle}
        />
      </div>
    );
  });

  const PostForm = () => {
    return (
      <div className={editPostStyle.formStyle}>
        <h4>Edit Post</h4>
        <form onSubmit={handleSubmitPost}>
          <Field
            ref={postTitleRef}
            type="text"
            placeholder="post title here...."
          />
          <Field
            ref={postTagsRef}
            type="text"
            placeholder="add some tags here"
          />
          <Editor
            textareaName="content"
            ref={postContentRef}
            value={postContentRef.current}
            style={inputStyle}
            onEditorChange={(newValue, editor) =>
              (postContentRef.current = newValue)
            }
            apiKey="usrqd654ieh6pdqwrlrqsp9yau9eq3pcmhtpxjucyil29phd"
            init={{
              height: 500,
              menubar: true,
              selector: "textarea",
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help" +
                "code" +
                "link" +
                "preview",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              link_default_target: "_blank",
            }}
          />
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <Button
              block
              className={editPostStyle.customBtn}
              type="submit"
              disabled={isLoading}
              variant={isLoading ? "success" : "primary"}
            >
              {isLoading ? "Saving" : "Save"}
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button
              block
              className={editPostStyle.customBtn}
              type="reset"
              variant="outline-danger"
              onClick={handleResetForm}
            >
              Clear
            </Button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <Fragment>
      <Navbar showSearchBar={false} />
      <Container
        className={editPostStyle.container}
        style={{ minHeight: dimensions.height }}
      >
        {pageLoading ? null : (
          <Row>
            <Col xl={12} lg={12} md={12}>
            <PostForm />
            </Col>
          </Row>
        )}
      </Container>
    </Fragment>
  );
};

export default EditPost;
