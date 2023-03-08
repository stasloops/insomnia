import { GlobalOutlined } from "@ant-design/icons";
import React, { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useClose } from "../hooks/useClose";
import { size } from "../ui/AdaptiveSize";

const Container = styled.div`
  position: relative;
  color: #fff;
  margin-right: 40px;
  cursor: pointer;

  @media (max-width: ${size.tablet}) {
    margin-right: 20px;
  }

  @media (max-width: ${size.mobileL}) {
    margin-right: 10px;
  }
`;

const ListLanguages = styled.div`
  position: absolute;
  top: 30px;
  border-radius: 5px;
  padding: 10px 5px;
  background-color: #fff;
  width: 80px;
  -webkit-box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);

  @media (max-width: ${size.mobileL}) {
    top: 35px;
    left: -35px;
  }
`;

const TextLanguage = styled.span`
  @media (max-width: ${size.mobileL}) {
    display: none;
  }
`;

const ItemLanguage = styled.div`
  color: #000;
  margin-bottom: 10px;
  text-align: center;
  &:last-child {
    margin-bottom: 0px;
  }
`;

const languages = [
  { id: "en", title: "English" },
  { id: "ru", title: "Русский" },
];

const ChangeLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const [isListActive, setListIsActive] = useState(false);
  const { ref } = useClose(setListIsActive);
  const { i18n } = useTranslation();

  useLayoutEffect(() => {
    if (i18n.language === "ru") {
      return setSelectedLanguage("Русский");
    }
    setSelectedLanguage("English");
  }, [i18n.language]);

  const toggleIsActiveList = () => {
    setTimeout(() => {
      setListIsActive((prev) => !prev);
    }, 0);
  };

  const selectLanguage = (title: string, id: string) => {
    i18n.changeLanguage(id);
    setSelectedLanguage(title);
    setListIsActive(false);
  };

  return (
    <Container>
      <span onClick={toggleIsActiveList}>
        <GlobalOutlined style={{ marginRight: "5px" }} />
        <TextLanguage>{selectedLanguage}</TextLanguage>
      </span>
      {isListActive ? (
        <ListLanguages ref={ref}>
          {languages.map((item) => (
            <ItemLanguage
              style={{
                color: selectedLanguage === item.title ? "blue" : "#000",
              }}
              onClick={() => selectLanguage(item.title, item.id)}
              key={item.id}
            >
              {item.title}
            </ItemLanguage>
          ))}
        </ListLanguages>
      ) : null}
    </Container>
  );
};

export default ChangeLanguage;
