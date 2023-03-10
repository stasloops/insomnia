import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { WidthContainer } from "../ui/styledComponents";


const Profile = () => {
  const userData = useContext(UserContext);
  const navigate = useNavigate();
  if (!userData?.isAuth) {
    setTimeout(() => {
      navigate("/");
    });
  }

  return (
    <WidthContainer>
      <h3 style={{ color: "#4a4b65", marginTop: "30px" }}>
        Email: {userData?.user?.email}
      </h3>
      <h3 style={{ color: "#4a4b65", marginTop: "30px" }}>
        Credits: {userData?.user?.credits}
      </h3>
    </WidthContainer>
  );
};

export default Profile;
