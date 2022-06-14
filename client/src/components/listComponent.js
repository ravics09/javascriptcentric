import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Imgix from "react-imgix";

const ListComponent = (items) => {
  const arr = items.items;
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const handleResize = () => {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {arr.map((item) => (
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            padding: "10px",
            flexDirection: dimensions.width > 700 ? "row" : "column",
          }}
          key={item.id}
        >
          <Imgix
            src="https://1000logos.net/wp-content/uploads/2020/09/JavaScript-Logo.jpg"
            width={400}
            height={200}
          />
          <div
            style={{
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              // width: "50%",
              // height: "200px",
            }}
          >
            <>
              <h4>{item.topic}</h4>
              <h5>{item.description}</h5>
            </>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListComponent;
