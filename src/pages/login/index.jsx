import React from "react";
import CustomeButton from "../../components/customeButton";
import RequestCard from "../../components/requestCard";

const Login = () => {
  return (
    <>
      <div>Login</div>
      <RequestCard
        user={"hoge"}
        floor={"12F"}
        sheet={"32番"}
        wants={["おにぎり"]}
        reward={"150"}
        status={4}
        onClick={() => console.log("hoge")}
      />
      <CustomeButton onClick={() => console.log("test")} text="ログイン" />
    </>
  );
};

export default Login;
