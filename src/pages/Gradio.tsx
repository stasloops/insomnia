import React, { useRef } from "react";
import styled from "styled-components";

const Iframe = styled.iframe`
  position: absolute;
  width: 100vw;
  height: 100%;
  border: none;
  /* padding-bottom: 100px; */
`;
const Gradio = () => {
  const first = useRef(null);

  console.log(first);
  
  return (
    <Iframe ref={first} src="https://controlnet.cluster.srvdev.ru"></Iframe>
  );
};

export default Gradio;
