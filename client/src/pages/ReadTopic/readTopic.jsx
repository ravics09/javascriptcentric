import React, { useState, useEffect, Fragment } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Parser from "html-react-parser";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

import ReadTopicStyle from "./readTopic.module.css";
import { JavaScriptTopics, NodeTopics } from "../../helpers/constant/index";

const ReadTopic = () => {
  const [data, setData] = useState({});
  const { id, topic } = useParams();
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    fetchArticle(topic);
  }, []);

  const fetchArticle = (topic) => {
    let result;
    switch (topic) {
      case "javascript":
        result = JavaScriptTopics.filter((item) => {
          return item.id.toLowerCase() === id.toLowerCase();
        });
        break;
      case "nodejs":
        result = NodeTopics.filter((item) => {
          return item.id.toLowerCase() === id.toLowerCase();
        });
        break;
      default:
        setData({});
    }
    setData(result[0]);
  };

  return (
    <Fragment>
      <Navbar showSearchBar={false} />
      <Container
        className={ReadTopicStyle.container}
        style={{ minHeight: dimensions.height }}
      >
        <Row>
          <Col md={9} xl={9} xs={12}>
            {data && (
              <div className={ReadTopicStyle.leftPanel}>
                <div className={ReadTopicStyle.title}>
                  <span>June 9, 2022 / {topic.toUpperCase()}</span>
                </div>
                <div className={ReadTopicStyle.leftPanelBody}>
                  <div className={ReadTopicStyle.articleHeading}>
                    <span>{data.topic}</span>
                  </div>
                  <div className={ReadTopicStyle.articleImage}>
                    <Image src={data.coverImage} width="100%" />
                  </div>
                  <div className={ReadTopicStyle.articleBody}>
                    <article>{Parser(`${data.description}`)}</article>
                  </div>
                </div>
              </div>
            )}
          </Col>
          <Col md={3} xl={3}>
            <div className={ReadTopicStyle.rightPanel}>
              <div className={ReadTopicStyle.title}>
                <span>Other Topics</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default ReadTopic;
