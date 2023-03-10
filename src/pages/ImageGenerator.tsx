import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Card,
  Col,
  Divider,
  Input,
  InputNumber,
  notification,
  List,
  Row,
  Select,
  Slider,
  Switch,
  Button,
} from "antd";
import { lowerCase } from "lodash";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
  fetchSchedulers,
  fetchModels,
  makeGenerationRequest,
} from "../api";
import Popup from "../components/Popup";
import { UserContext } from "../App";
import GeneratedItem from "../components/ImageGeneratedItem";
import { Description, FAQ, WidthContainer } from "../ui/styledComponents";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { IImageGeneratedItem } from "../interface/ImageGeneration";

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
`;
const ImageGenerator = () => {
  const userData = useContext(UserContext);
  const { t } = useTranslation();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string) => {
    api.error({
      message: "Error",
      description: message,
      placement: "topRight",
    });
  };

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

  const generate = async () => {
    if (!prompt.trim()) {
      return;
    }

    const [width, height] = size.split("×");

    const parametrs: any = {
      pipeline_name: model,
      prompt: prompt,
      negative_prompt: negativePromt,
      width: Number(width),
      height: Number(height),
      scale: scale,
      steps: steps,
      seed: seed,
      sampler: sampler,
    };

    const res = await makeGenerationRequest(parametrs);

    setTasks((prev) => [...prev, { id: res, params: parametrs, file_url: "" }]);
  };

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
              userData?.isAuth ? generate() : setPopupIsActive(true);
            }}
          >
            {" "}
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
                {steps} {t("text2image_steps")}
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
            <Col xs={24} md={5} style={{ marginBottom: "16px" }}>
              <Label>
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
            <Col xs={24} md={7} style={{ marginBottom: "16px" }}>
              <Label>{t("text2image_negative")}</Label>
              <Input
                onChange={(event) =>
                  setNegativePromt(event.currentTarget.value)
                }
                value={negativePromt}
              />
            </Col>
            <Col md={1} />
            <Col xs={24} md={4} style={{ marginBottom: "16px" }}>
              <Label>{t("text2image_seed")}</Label>
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

export default ImageGenerator;
