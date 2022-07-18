import React, { useState, useEffect, Fragment } from "react";
import { Container, Row, Col, Image, Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import JavaScriptStyle from "./javaScript.module.css";
import { JavaScriptTopics } from "../../helpers/constant/index";

const JavaScript = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(JavaScriptTopics);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    if (data && data.length === 0) {
      setData(JavaScriptTopics);
    }
  });

  const handleSelectedTopic = (e, item) => {
    e.preventDefault();
    navigate(`/topics/${"javascript"}/readtopic/${item.id}`);
  };

  return (
    <Fragment>
      <Navbar showSearchBar={false} />
      <Container
        className={JavaScriptStyle.container}
        style={{ minHeight: dimensions.height }}
      >
        <Row>
          <Col md={9} xl={9} xs={12}>
            <div className={JavaScriptStyle.body}>
              <div className={JavaScriptStyle.breadCrumb}>
                <Breadcrumb as="h5">
                  <Breadcrumb.Item active>Home</Breadcrumb.Item>
                  <Breadcrumb.Item active>Topics</Breadcrumb.Item>
                  <Breadcrumb.Item active>Java Script</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              {data.map((item) => (
                <div
                  key={item.id}
                  className={JavaScriptStyle.renderCard}
                  onClick={(e) => {
                    handleSelectedTopic(e, item);
                  }}
                >
                  <Image
                    src={item.coverImage}
                    className={JavaScriptStyle.cardImage}
                  />
                  <div className={JavaScriptStyle.cardBody}>
                    <h4 style={{ color: "white" }}>{item.topic}</h4>
                    <h5 style={{ color: "gray" }}>{item.description}</h5>
                    <h5 style={{ color: "gray" }}>2 min Read</h5>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Fragment>
  );
};
export default JavaScript;
