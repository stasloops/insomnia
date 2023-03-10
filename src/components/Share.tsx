import {
  FacebookOutlined,
  InstagramOutlined,
  ShareAltOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import React, { FC, useState } from "react";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  RedditShareButton,
  VKShareButton,
  TelegramIcon,
  FacebookIcon,
  TwitterIcon,
  RedditIcon,
  VKIcon,
} from "react-share";
import styled from "styled-components";
import { useClose } from "../hooks/useClose";

const ShareContainer = styled.div`
  position: relative;
  font-size: 14px;
  margin-right: 50px;
`;

const ShareList = styled.div`
  position: absolute;
  bottom: 30px;
  left: -50px;
  z-index: 20;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 150px;
  border-radius: 5px;
  padding: 10px;
  padding-bottom: 5px;

  -webkit-box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
`;

const ShareItem = styled.div`
  cursor: pointer;
`;

interface Props {
  image?: string;
}

const SHARE_ITEMS = [
  { button: TelegramShareButton, icon: TelegramIcon },
  { button: FacebookShareButton, icon: FacebookIcon },
  { button: TwitterShareButton, icon: TwitterIcon },
  { button: RedditShareButton, icon: RedditIcon },
  { button: VKShareButton, icon: VKIcon },
];

const Share: FC<Props> = ({ image }) => {
  const [shareListActive, setShareListActive] = useState(false);
  const { ref } = useClose(setShareListActive);

  const openShareList = () => {
    setTimeout(() => {
      setShareListActive(true);
    }, 0);
  };

  return (
    <ShareContainer>
      <span
        onClick={openShareList}
        style={{ cursor: "pointer", color: "#1677ff" }}
      >
        <ShareAltOutlined style={{ marginRight: "5px" }} />
        <span>Share</span>
      </span>
      {shareListActive ? (
        <ShareList ref={ref}>
          {SHARE_ITEMS.map((item, index) => (
            <ShareItem>
              <item.button url={`${image}`} key={index}>
                <item.icon size={25} />
              </item.button>
            </ShareItem>
          ))}
        </ShareList>
      ) : null}
    </ShareContainer>
  );
};

export default Share;
