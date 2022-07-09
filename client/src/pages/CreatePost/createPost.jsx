import React, { useState, useEffect, useRef, Fragment } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { Container, Row, Col, Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import createPostStyle from "./createPost.module.css";

import Navbar from "../../components/navbar";
import FeedService from "../../services/feedService";

const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postTitleRef = useRef();
  const postTagsRef = useRef();
  const postContentRef = useRef();
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
      userId,
      postTitle: postTitleRef.current.value,
      postTags: postTagsRef.current.value,
      postContent: postContentRef.current,
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
      <div className={createPostStyle.formStyle}>
        <h4>Create Post</h4>
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
        className={createPostStyle.container}
        style={{ minHeight: dimensions.height }}
      >
        <Row>
          <Col xl={12} lg={12} md={12}>
            <PostForm />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default CreatePost;
