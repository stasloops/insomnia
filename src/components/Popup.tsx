import React, { FC } from "react";
import GoogleAuthButton from "./GoogleAuthButton";
import "../styles/popup.scss";
import { useClose } from "../hooks/useClose";

interface Props {
  call: (value: boolean) => void;
}
const Popup: FC<Props> = ({ call }) => {
  const { ref } = useClose(call);
  return (
    <div className="popup">
      <div ref={ref} className="popup__content">
        <div onClick={() => call(false)} className="popup__close">
          <span className="popup__close_icon">+</span>
        </div>
        <GoogleAuthButton />
      </div>
    </div>
  );
};

export default Popup;
