import React from "react";
import Button from "../common/Button";
import MaterialTextField from "../common/Material/MaterialTextField";
import "./Login.scss";

interface LoginProps {
  changePage: () => void;
}

const Login = ({ changePage }: LoginProps) => {
  return (
    <>
      <div className="Login-Content">
        <div className="Login-Content-Text">
          <p className="Login-Content-Text-Title">환영합니다!</p>
          <p className="Login-Content-Text-Subtitle">로그인 후 롤링페이퍼를 작성하실 수 있습니다.</p>
        </div>
        <div className="Login-Content-Email">
          <MaterialTextField label="이메일" variant="outlined" type="text" width="100%" size="small" />
        </div>
        <div className="Login-Content-Password">
          <MaterialTextField label="비밀번호" variant="outlined" type="password" width="100%" size="small" />
        </div>
        <Button text="로그인" height="2.6rem" />
        <div className="Login-Content-Register">
          <p className="Login-Content-Register-Comment">전 아직 회원이 아닌걸요...</p>
          <p className="Login-Content-Register-Link" onClick={changePage}>
            회원가입
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
