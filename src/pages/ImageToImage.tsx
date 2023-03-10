import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Card,
  Col,
  Divider,
  Input,
  InputNumber,
  List,
  Row,
  Select,
  Slider,
  Switch,
  Button,
  notification,
  Upload,
  UploadProps,
} from "antd";
import { lowerCase } from "lodash";
import styled from "styled-components";
import Popup from "../components/Popup";
import GeneratedItem from "../components/ImageGeneratedItem";
import { Description, FAQ, WidthContainer } from "../ui/styledComponents";
import { Link } from "react-router-dom";
import { IImageGeneratedItem } from "../interface/ImageGeneration";
import { UserContext } from "../App";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { fetchModels, fetchSchedulers, getImageUrl } from "../api";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "../styles/upload.scss";
import { API_URL } from "../api/constants";
import { $request } from "../api/request";
import Help from "../components/Help";
const { TextArea } = Input;

const Heading = styled.h2`
  font-size: 48px;
  margin-bottom: 0;
`;

const FormItem = styled.div`
  display: inline-flex;
  margin-right: 24px;
  align-items: center;
  flex-wrap: wrap;
  width: ${(props: { width?: "full" | "auto" }) =>
    props.width === "full" ? "100%" : "auto"};
`;

const GenerateTextArea = styled(TextArea)`
  max-height: 200px;
`;

const GenerateButton = styled(Button)`
  margin-top: 5px;
  width: 100%;
`;

const Label = styled.div`
  margin-bottom: 8px;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  max-width: 500px;
  border-radius: 5px;
  margin: 5px 0;
`;

const ImageToImage = () => {
  const userData = useContext(UserContext);
  const { t } = useTranslation();

  const [popupIsActive, setPopupIsActive] = useState(false);
  const [steps, setSteps] = useState(20);
  const [scale, setScale] = useState(8);
  const [size, setSize] = useState("768×768");
  const [sampler, setSampler] = useState("");
  const [model, setModel] = useState("");
  const [prompt, setPromt] = useState("");
  const [negativePromt, setNegativePromt] = useState("");
  const [seed, setSeed] = useState(777777);
  const [expanded, setExpanded] = useState(false);
  const [tasks, setTasks] = useState<IImageGeneratedItem[]>([]);
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [strengthData, setStrengthData] = useState(0);
  const [strength, setStrength] = useState(0);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string) => {
    api.error({
      message: "Error",
      description: message,
      placement: "topRight",
    });
  };

  const onChangeStrength = (e: any) => {
    const StrengthValue = Math.round(e) / 100;
    setStrengthData(StrengthValue);
    setStrength(e);
  };

  const { data: schedulers = [] } = useQuery("schedulers", fetchSchedulers, {
    onError(error: Error) {
      openNotification(error.message);
    },
  });

  const { data: models = [] } = useQuery("models", fetchModels, {
    onError(error: Error) {
      openNotification(error.message);
    },
  });

  useEffect(() => {
    if (!schedulers.includes(sampler) && schedulers[0]) {
      setSampler(schedulers[0]);
    }
  }, [sampler, schedulers]);

  useEffect(() => {
    if (!models.includes(model) && models[0]) {
      setModel(models[0]);
    }
  }, [model, models]);

  const options = useMemo(
    () => schedulers?.map((value) => ({ value, label: lowerCase(value) })),
    [schedulers]
  );

  const modelOptions = useMemo(
    () => models?.map((value) => ({ value, label: lowerCase(value) })),
    [models]
  );

  const getImage = async (id: string) => {
    const image = await getImageUrl(id);
    return image;
  };

  const upload = async (file: any) => {
    const form = new FormData();
    form.append("file", file.file);
    const res: any = await $request.post("/users/upload_image", form);

    const id = res.data.message.split(" ")[2];

    setImageUrl(await getImage(id));
  };

  const uploadButton = (
    <div className="upload">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <WidthContainer style={{ color: "#000", marginTop: "48px" }}>
      {popupIsActive && !userData?.isAuth ? (
        <Popup call={setPopupIsActive} />
      ) : null}
      <Row>
        <Col xs={24}>
          <Heading>{t("text2image_title")}</Heading>
          <Description>{t("text2image_description")}</Description>
          <Link to={"/faq"}>
            <FAQ>FAQ</FAQ>
          </Link>
        </Col>
        <Col xs={24}>
          <Upload
            name="avatar"
            listType="picture-card"
            className={"avatar-uploader"}
            showUploadList={false}
            customRequest={(file) => upload(file)}
            // beforeUpload={beforeUpload}
          >
            {imageUrl ? <Image src={imageUrl} alt="avatar" /> : uploadButton}
          </Upload>
          <GenerateTextArea
            placeholder={`${t("text2image_placeholder")}`}
            size="large"
            value={prompt}
            // loading={isRequesting}
            onChange={(e) => setPromt(e.target.value)}
          />
          <GenerateButton
            type="primary"
            onClick={() => {
              userData?.isAuth ? {} : setPopupIsActive(true);
            }}
          >
            {t("text2image_button")}
          </GenerateButton>
        </Col>
      </Row>
      <Row style={{ marginTop: "24px" }}>
        <Col xs={24} md={12}>
          <FormItem width="auto">
            {t("text2image_size")}
            <Select
              value={size}
              onChange={(value) => setSize(value)}
              bordered={false}
              dropdownMatchSelectWidth={false}
              options={[
                { value: "512×512", label: "512×512" },
                { value: "512×768", label: "512×768" },
                { value: "768×512", label: "768×512" },
                { value: "768×768", label: "768×768" },
                { value: "768×832", label: "768×832" },
                { value: "832×768", label: "832×768" },
              ]}
            />
          </FormItem>
          <FormItem width="auto">
            <Help description={t("text2image_sampler_help")} />
            {t("text2image_sampler")}
            <Select
              value={sampler}
              onChange={(value) => setSampler(value)}
              bordered={false}
              options={options}
              dropdownMatchSelectWidth={false}
            />
          </FormItem>
          <FormItem width="auto">
            <Help description={t("text2image_model_help")} />
            {t("text2image_model")}
            <Select
              value={model}
              onChange={(value) => setModel(value)}
              bordered={false}
              options={modelOptions}
              dropdownMatchSelectWidth={false}
            />
          </FormItem>
        </Col>
      </Row>
      <Divider plain>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Switch
            size="small"
            checked={expanded}
            onChange={(value) => setExpanded(value)}
            style={{ marginRight: "8px" }}
          />
          {t("text2image_options")}
        </label>
      </Divider>

      {expanded && (
        <Card size="small" color={"red"}>
          <Row>
            <Col xs={24} md={5} style={{ marginBottom: "16px" }}>
              <Label>
                <Help description={t("text2image_steps_help")} />
                {t("text2image_steps")} {steps}
              </Label>
              <div style={{ marginTop: "20px" }}>
                <Slider
                  min={5}
                  max={50}
                  onChange={(value: number) => setSteps(value)}
                  value={steps}
                />
              </div>
            </Col>
            <Col md={1} />
            <Col xs={19} md={5} style={{ marginBottom: "16px" }}>
              <Label>
                <Help description={t("text2image_scale_help")} />
                {t("text2image_scale")} {scale}
              </Label>
              <div style={{ marginTop: "20px" }}>
                <Slider
                  min={0}
                  max={100}
                  onChange={(value: number) => setScale(value)}
                  value={scale}
                />
              </div>
            </Col>
            <Col md={1} />
            <Col xs={19} md={5} style={{ marginBottom: "16px" }}>
              <Label>
                <Help description={t("text2image_strength_help")} />
                Strength {strengthData}
              </Label>
              <div style={{ marginTop: "20px" }}>
                <Slider
                  min={0}
                  max={100}
                  onChange={(value: number) => onChangeStrength(value)}
                  value={strength}
                />
              </div>
            </Col>
            <Col md={1} />
            <Col xs={19} md={5} style={{ marginBottom: "16px" }}>
              <Label>
                {t("text2image_negative")}
                <Help description={t("text2image_negative_help")} />
              </Label>
              <Input
                onChange={(event) =>
                  setNegativePromt(event.currentTarget.value)
                }
                value={negativePromt}
              />
            </Col>
            <Col md={1} />
            <Col xs={19} md={4} style={{ marginBottom: "16px" }}>
              <Label>
                {t("text2image_seed")}
                <Help description={t("text2image_seed_help")} />
              </Label>
              <InputNumber
                style={{ width: "100%" }}
                onChange={(value) => setSeed(value || 0)}
                value={seed}
                min={Number.MIN_SAFE_INTEGER}
                max={Number.MAX_SAFE_INTEGER}
              />
            </Col>
          </Row>
        </Card>
      )}

      <List
        style={{ marginTop: "32px" }}
        itemLayout="vertical"
        size="large"
        dataSource={tasks.slice().reverse()}
        renderItem={(item: any) => (
          <GeneratedItem key={item.id} setTasks={setTasks} item={item} />
        )}
      />
    </WidthContainer>
  );
};

export default ImageToImage;
