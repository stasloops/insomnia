import { Button, Image, InputNumber, Select, Skeleton, Slider } from "antd";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useClose } from "../hooks/useClose";
import {
  WidthContainer,
  Heading,
  Description,
  FAQ,
} from "../ui/styledComponents";

const Container = styled(WidthContainer)`
  display: flex;
  flex-direction: column;
  width: 600px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionsHeading = styled.h3`
  text-align: center;
  font-weight: 400;
  margin-bottom: 0px;
  margin-top: 40px;
`;

const Area = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  padding: 5px 10px;
`;

const AreaInput = styled.div`
  border: none;
  position: absolute;
  top: 5px;
  left: 5px;
  width: 95%;
  height: 90%;

  &:focus {
    outline: 0;
  }
`;

const Label = styled.div`
  margin-bottom: 8px;
`;

const RunButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
`;

const Desc = styled(Description)`
  width: 600px;
`;

const ResultsContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  margin-bottom: 100px;
`;

const Result = styled.div`
  position: relative;
  display: inline-block;
  width: 25%;
`;
const ResultImage = styled(Image)``;

const SkeletonImage = styled(Skeleton)`
  /* width: 100%;
  position: relative;
  margin-bottom: 10px; */
`;

const results = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const ContentGenerator = () => {
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [random, setRandom] = useState<number>(5);
  const [count, setCount] = useState<number>(10);
  const [seed, setSeed] = useState<number>(5);
  const [placeholderIsActive, setPlaceholderIsActive] = useState(false);

  const promptRef: any = useRef(null);

  const { ref } = useClose(setPlaceholderIsActive);

  const run = () => {
    const data = {
      type: type,
      content: content,
      prompt: promptRef?.current?.innerText,
      count: count,
      seed: seed,
    };
    console.log(promptRef?.current?.innerText, "prompt");
  };

  const tapToPrompt = () => {
    setPlaceholderIsActive(true);
  };

  const placeholderIsActiveFalse = () => {
    setTimeout(() => {
      setPlaceholderIsActive(false);
    }, 0);
  };

  return (
    <Container>
      <Heading>Title</Heading>
      <Desc>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore veniam
        exercitationem unde ipsa explicabo quasi!
      </Desc>
      <Link to={"/faq"}>
            <FAQ>FAQ</FAQ>
          </Link>
      <Area>
        <AreaInput ref={ref} onClick={tapToPrompt} contentEditable={true}>
          <span onClick={placeholderIsActiveFalse} contentEditable={false}>
            I want to
          </span>
          <Select
            onClick={placeholderIsActiveFalse}
            // contentEditable={false}
            defaultValue="generate"
            style={{ width: 120, marginLeft: "10px" }}
            onChange={setType}
            options={[
              { value: "generate", label: "generate" },
              { value: "convert", label: "convert" },
            ]}
          />
          <Select
            onClick={placeholderIsActiveFalse}
            // contentEditable={false}
            defaultValue="image"
            style={{ width: 120, marginLeft: "10px" }}
            onChange={setContent}
            options={[
              { value: "image", label: "image" },
              { value: "gif", label: "gif" },
              { value: "text", label: "text" },
            ]}
          />
          <span ref={promptRef} style={{ marginLeft: "10px" }}>
            {placeholderIsActive ||
            promptRef?.current?.innerText?.length ? null : (
              <span style={{ opacity: "0.5" }}>Prompt...</span>
            )}
          </span>
        </AreaInput>
      </Area>
      <RunButton onClick={run} type="primary">
        Run
      </RunButton>
      <OptionsContainer>
        <OptionsHeading>Additional options</OptionsHeading>
        <Label>Count</Label>
        <InputNumber
          onChange={(value) => setCount(value || 0)}
          value={count}
          min={1}
          max={100}
        />
        <Label style={{ marginTop: "20px" }}>Seed</Label>
        <InputNumber
          onChange={(value) => setSeed(value || 0)}
          value={seed}
          min={1}
          max={10000}
        />
        <Label style={{ marginTop: "20px" }}>Random {random}</Label>
        <Slider
          onChange={(value: number) => setRandom(value)}
          value={random}
          min={5}
          max={100}
          defaultValue={5}
        />
      </OptionsContainer>
      <ResultsContainer>
        <OptionsHeading style={{ marginBottom: "20px" }}>
          Results
        </OptionsHeading>
        {results.map((item) => (
          <Result>
            {/* <ResultImage
              width={100}
              src={!item?.img ? "error" : item?.img}
              key={item}
            /> */}
            <SkeletonImage.Image
              style={{ width: "98%", marginBottom: "3px" }}
              active={true}
            />
          </Result>
        ))}
      </ResultsContainer>
    </Container>
  );
};

export default ContentGenerator;
