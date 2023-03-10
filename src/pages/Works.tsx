import { List } from "antd";
import React, { useContext, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { $request } from "../api/request";
import { UserContext } from "../App";
import ImageGeneratedItem from "../components/ImageGeneratedItem";
import { IImageGeneratedItem } from "../interface/ImageGeneration";
import { WidthContainer } from "../ui/styledComponents";

const WorksList = styled(List)``;

const Works = () => {
  const userData = useContext(UserContext);
  const navigate = useNavigate();
  if (!userData?.isAuth) {
    setTimeout(() => {
      navigate("/");
    });
  }

  const [history, setHistory] = useState<any>([]);

  const getHistory = async () => {
    const res = await $request.get("/users/history", { params: {
      page: 2
    }});
    setHistory(res.data.items);
  };

  useLayoutEffect(() => {
    getHistory();
  }, []);

  return (
    <WidthContainer>
      <h3 style={{ color: "#4a4b65", marginTop: "30px" }}>My Works</h3>
      <WorksList
        style={{ marginTop: "32px" }}
        itemLayout="vertical"
        size="large"
        dataSource={history?.slice().reverse()}
        renderItem={(item: any) => <ImageGeneratedItem item={item ?? null} />}
      />
    </WidthContainer>
  );
};

export default Works;
