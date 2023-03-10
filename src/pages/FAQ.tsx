import React from "react";
import styled from "styled-components";

const Iframe = styled.iframe`
  position: absolute;
  width: 100vw;
  height: 100%;
  border: none;
  /* padding-bottom: 100px; */
`;

const FAQ = () => {
  return (
    <Iframe src="https://notioniframe.com/notion/2l41cylgs9d" />
  );
};

export default FAQ;
