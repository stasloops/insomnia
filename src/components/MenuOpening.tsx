import { Menu } from "antd";
import React, { FC, useContext, useEffect, useState } from "react";
import {
  ApiOutlined,
  ExperimentOutlined,
  FileImageOutlined,
  GifOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
  ShoppingOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
// import Popup from "./Popup";
import { storage } from "../helpers/localStorage";
import { useTranslation } from "react-i18next";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const ContainerMenu = styled.div`
  position: absolute;
  z-index: -1;
  left: 0;
  transition: 0.2s;
`;

const MenuGroup = styled(Menu)`
  overflow: auto;
  width: 200px;
  height: calc(100vh - 70px);
`;

interface Props {
  menuIsOpen: boolean;
  menuRef: any;
  setMenuIsOpen: (item: boolean) => void;
}
const MenuOpening: FC<Props> = ({ menuIsOpen, setMenuIsOpen, menuRef }) => {
  const userData = useContext(UserContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [popupIsActive, setPopupIsActive] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const { i18n } = useTranslation();

  useEffect(() => {
    const isRu = pathname.split("/")[2];
    if (isRu === "ru") {
      i18n.changeLanguage("ru");
    }
    
    const path = pathname.split("/")[1];
    if (path === "wait") {
      return;
    }

    setActiveItem(path);
  }, [pathname]);

  const items: MenuItem[] = [
    getItem("text2image", "image", <FileImageOutlined />),
    getItem("image2image", "image2image", <FileImageOutlined />),
    getItem("data2model", "model", <PlusCircleOutlined />),
    getItem("text2video", "wait/:1", <GifOutlined />),
    getItem("text2music", "wait/:2", <GifOutlined />),
    getItem("task2content", "content", <FileImageOutlined />),
    getItem("chatbot", "chatbot", <FileImageOutlined />),
    getItem("laboratory", "control", <ExperimentOutlined />),
    getItem("works", "works", <UnorderedListOutlined />),
    getItem("profile", "profile", <UserOutlined />),
    getItem("billing", "billing", <ShoppingOutlined />),
    getItem("api", "api", <ApiOutlined />),
    getItem("FAQ", "faq", <QuestionCircleOutlined />),

    userData?.isAuth ? getItem("logout", "logout", <LogoutOutlined />) : null,
  ];

  const nav: MenuProps["onClick"] = (e) => {
    setMenuIsOpen(false);

    if (!userData?.isAuth && e.key === "works") {
      return setPopupIsActive(true);
    }
    if (!userData?.isAuth && e.key === "profile") {
      return setPopupIsActive(true);
    }

    if (e.key === "logout") {
      storage.remove("token");
      userData?.setIsAuth(false);
      return;
    }

    if (e.key === "video") {
      navigate(`/control`);
      return;
    }

    navigate(`/${e.key}`);
  };

  return (
    <ContainerMenu
      ref={menuRef}
      style={
        menuIsOpen ? { bottom: `calc(-100vh - -70px)` } : { bottom: "0px" }
      }
    >
      {/* {popupIsActive && !userData?.isAuth ? (
        <Popup call={setPopupIsActive} />
      ) : null} */}
      <MenuGroup
        style={menuIsOpen ? { display: "block" } : { display: "none" }}
        selectedKeys={[activeItem]}
        theme="dark"
        onClick={nav}
        items={items}
      />
    </ContainerMenu>
  );
};

export default MenuOpening;
