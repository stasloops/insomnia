import { GoogleOutlined } from "@ant-design/icons";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { API_URL } from "../api/constants";
import { UserContext } from "../App";
import { storage } from "../helpers/localStorage";
import { useTranslation } from "react-i18next";

const GoogleAuthButton = () => {
  const userData = useContext(UserContext);
  const [token, setToken] = useState<null | string>(null);
  const { t } = useTranslation();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setToken(tokenResponse.access_token);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const getUserInfoByToken = async () => {
    try {
      const res = await axios.get(`${API_URL}/authorize?google_token=${token}`);
      userData?.setIsAuth(true);
      storage.set("token", res.data.access_token);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserInfoByToken();
    }
  }, [token]);

  return (
    <div style={{ width: "100px" }}>
      <Button type="primary" onClick={() => googleLogin()}>
        <GoogleOutlined />
        {t("login_button")}
      </Button>
    </div>
  );
};

export default GoogleAuthButton;
