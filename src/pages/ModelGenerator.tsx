import React, { useState } from "react";
import { Button, Input, } from "antd";
import styled from "styled-components";
import UploadImage from "../components/UploadImage";
import "../styles/modelGenerator.scss";
import { WidthContainer } from "../ui/styledComponents";

const Heading = styled.h2`
  font-size: 48px;
  margin-bottom: 0;
`;

const Description = styled.p`
  margin-bottom: 2em;
`;

const TrainButton = styled(Button)`
  width: 100px;
`;

const ModelGenerator = () => {
  const [modelName, setModelName] = useState<string>("");

  return (
    <div className="modelGenerator">
      <WidthContainer style={{ color: "#000", marginTop: "48px" }}>
        <Heading>AI Model Generation</Heading>
        <Description>Train your AI Model</Description>

        <h2 style={{ color: "#4a4b65", marginTop: "30px" }}>
          1. Upload images for model generation
        </h2>
        <UploadImage />

        <h2 style={{ color: "#4a4b65", marginTop: "30px" }}>2. Сreate model name</h2>
        <Input
          placeholder="My cat"
          size="large"
          value={modelName}
          onChange={(value) => {
            setModelName(value.currentTarget.value);
          }}
        />

        <h2 style={{ color: "#4a4b65", marginTop: "30px" }}>
          3.Train your model
        </h2>
        <TrainButton
          type="primary"
          size="large"
          onClick={() => console.log(modelName)}
        >
          Train
        </TrainButton>
      </WidthContainer>
    </div>
  );
};

export default ModelGenerator;
