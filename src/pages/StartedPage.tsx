import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../App";

const Iframe = styled.iframe`
  position: absolute;
  width: 100vw;
  height: 100%;
  border: none;
`;

const StartedPage = () => {
  // const userData = useContext(UserContext);
  // const navigate = useNavigate();
  // if (userData?.isAuth) {
  //   setTimeout(() => {
  //     navigate("/image");
  //   });
  // }
  return <Iframe src="https://notioniframe.com/notion/2rfp6d55b6l"></Iframe>;
};

export default StartedPage;
