import { QuestionCircleOutlined } from "@ant-design/icons";
import React, { FC, useState } from "react";
import styled from "styled-components";
import { useClose } from "../hooks/useClose";

interface Props {
  description: string;
}

const Help: FC<Props> = ({ description }) => {
  const [popupIsActive, setPopupIsActive] = useState(false);
  const { ref } = useClose(setPopupIsActive);

  const togglePopup = () => {
    setTimeout(() => {
      if (!popupIsActive) {
        setPopupIsActive(true);
      }
    }, 0);
  };

  const Popup = styled.div`
    z-index: 10;
    position: absolute;
    bottom: 70px;
    padding: 10px;
    border-radius: 5px;
    background-color: #fff;
    -webkit-box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
  `;

  return (
    <div>
      <QuestionCircleOutlined
        onClick={togglePopup}
        style={{ margin: "0px 5px", cursor: "pointer" }}
      />
      {popupIsActive ? (
        <Popup
          style={{ width: description.length > 20 ? "300px" : "100px" }}
          ref={ref}
        >
          {description}
        </Popup>
      ) : null}
    </div>
  );
};

export default Help;
