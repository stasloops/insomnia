import { Button } from "antd";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../App";
import { useClose } from "../hooks/useClose";
import { size } from "../ui/AdaptiveSize";
import ChangeLanguage from "./ChangeLanguage";
import GoogleAuthButton from "./GoogleAuthButton";
import MenuOpening from "./MenuOpening";
// import Wallet from "./Wallet";

const FixedHeader = styled.header`
  position: relative;
  height: 70px;
  z-index: 10;
`;

const Container = styled.div`
  background-color: #001529;
  box-sizing: border-box;
  z-index: 10;
  position: fixed;
  left: 0;
  top: 0;
  padding-inline: 50px;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${size.tablet}) {
    padding-inline: 20px;
  }
`;

const Logo = styled.h1`
  color: #fff;
  font-size: 22px;

  @media (max-width: ${size.tablet}) {
    font-size: 18px;
  }
`;

const LeftContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BurgerMenu = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 50px;
  height: 20px;
  border-radius: 50%;
  margin-right: 30px;
  cursor: pointer;

  @media (max-width: ${size.tablet}) {
    margin-right: 15px;
  }
`;

const BurgerMenuLine = styled.span`
  display: block;
  width: 35px;
  height: 3px;
  border-radius: 5px;
  background-color: #fff;
`;

const Header = () => {
  const userData = useContext(UserContext);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { ref: menuRef } = useClose(setMenuIsOpen);

  const toggleMenu = () => {
    if (!menuIsOpen) {
      setTimeout(() => {
        setMenuIsOpen((prev) => !prev);
      }, 0);
    }
    setMenuIsOpen(false);
  };

  return (
    <FixedHeader>
      <Container>
        <LeftContent>
          <BurgerMenu onClick={toggleMenu}>
            <BurgerMenuLine />
            <BurgerMenuLine />
            <BurgerMenuLine />
          </BurgerMenu>
          <MenuOpening
            setMenuIsOpen={setMenuIsOpen}
            menuIsOpen={menuIsOpen}
            menuRef={menuRef}
          />
          <Link to={'/'}>
            <Logo>
              Insomnia AI
            </Logo>
          </Link>
        </LeftContent>
        <RightContent>
          <ChangeLanguage />
          {userData?.isAuth ? <Button>Wallet</Button> : <GoogleAuthButton />}
        </RightContent>
      </Container>
    </FixedHeader>
  );
};

export default Header;
