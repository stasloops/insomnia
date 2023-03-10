import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const IframeContainer = styled.div`
  position: relative;
  height: 240vh;

`;
const Iframe = styled.iframe`
  top: 0;
  position: absolute;
  width: 100vw;
  height: 100%;
  border: none;
`;

const Message = styled.h1``;

const WaitList = () => {
  return (
    <>
      <Container>
        <Message>Coming soon...</Message>
      </Container>
      <IframeContainer>
        <Iframe
          src={
            "https://docs.google.com/forms/d/e/1FAIpQLSd5YK5WNKCQP4zcCHcjPVZFJ2A3zIjuA6no1_j2b2tI7Zm1yQ/viewform?usp=sf_link"
          }
        />
      </IframeContainer>
    </>
  );
};

export default WaitList;
