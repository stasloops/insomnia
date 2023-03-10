import React, { useState } from "react";
import styled from "styled-components";
import { storage } from "../helpers/localStorage";
import qr from "../assets/qr.jpg";
import qr2 from "../assets/qr2.jpg";
import { Heading, WidthContainer } from "../ui/styledComponents";
import { Image } from "antd";
import { useTranslation } from "react-i18next";

const QR = styled(Image)``;

const PaymentContainer = styled.div`
  
`;
const Ul = styled.ul`
  padding: 0;
`;
const Iframe = styled.iframe`
  width: 100%;
  height: 100vh;
  border: none;
  margin-top: 50px;
  /* padding-bottom: 100px; */
`;

const Billing = () => {
  const { i18n } = useTranslation();

  if (i18n.language === "ru") {
    return (
      <WidthContainer>
        <QR width={200} src={qr} />
        <p>
          После оплаты напишите{" "}
          <a href="https://t.me/cyberoleg" target="blank">
            @cyberoleg
          </a>
        </p>
      </WidthContainer>
    );
  }
  return (
    <WidthContainer>
      <Heading style={{ fontSize: "34px" }}>
        Hi! Right now we don’t have a normal billing system, but you can buy
        credits for USDT Tether
      </Heading>
      <h3>100 credits - 30 USDT</h3>
      <h3>500 credits - 75 USDT</h3>
      <h3>1000 credits - 120 USDT</h3>
      <Ul>
        <li>1. Pick a credits count</li>
        <li>2. Just send you Tether USDT to our wallet by using QR</li>
        <li>3. Be careful and send only USDT on Tether chain </li>
        <li>3. Fill out the form below 👇🏻 </li>
        <li>4. We will add credits to your account</li>
        <li>5. If you have any difficulties write us on email or telegram</li>
      </Ul>
      <PaymentContainer>
        <QR style={{ border: "1px solid #d4d4d4" }} width={200} src={qr2} />
        <h3 style={{marginBottom: '0px'}}>Public address for payment</h3>
        <p style={{marginTop: '0px'}}>0x335dad280fea881108AD5E87a22E2B594F08a129</p>
        <h3>
          Payment with Trust Wallet{" "}
          <a
            target="blank"
            href="https://link.trustwallet.com/send?address=0x335dad280fea881108AD5E87a22E2B594F08a129&asset=c60_t0xdAC17F958D2ee523a2206206994597C13D831ec7"
          >
            here
          </a>
        </h3>
      </PaymentContainer>
      <Iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfvwC9NW3uDoIApte7BG9yxthEXDvkCG9X5-n7e7jATyXxhzQ/viewform?usp=sf_link"></Iframe>
    </WidthContainer>
  );
};

export default Billing;
