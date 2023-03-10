import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import styled from "styled-components";
import { size } from "../ui/AdaptiveSize";

const fileList: UploadFile[] = [];

const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  /* display: flex;
  justify-content: center; */
`;

const UploadContainer = styled.div`
  width: 310px;
  height: 110px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
  margin-bottom: 10px;

  @media (max-width:${size.mobileL}) {
    width: 250px;
    height: 90px;
  }
`;
const UploadButton = styled(Button)`
  width: 100%;
  height: 100%;
  border-style: dashed;
`;

const UploadImage: React.FC = () => {
  console.log(fileList);

  return (
    <Container>
      <Upload
        style={{ width: "100%" }}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture"
        maxCount={100}
        defaultFileList={[...fileList]}
      >
        <UploadContainer>
          <UploadButton icon={<UploadOutlined />}>
            Select from 20 to 100 images
          </UploadButton>
        </UploadContainer>
      </Upload>
    </Container>
  );
};

export default UploadImage;
