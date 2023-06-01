import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  ProfileContainer,
  InfoRowContainer,
} from "../setting/EditProfilePage";
import TitleComponent from "../../components/TitleComponent";
import Btn from "../../components/Btn";
import InputLine from "../../components/InputLine";
import styled from "styled-components";
import palette from "../../styles/colorPalette";
import FindPwAfter from "./FindPwAfter";

const ContentContainer = styled.div`
  width: 70%;
`;

const InformMessage = styled.div`
  font-size: 1rem;
  color: ${palette.mainColor};
  margin-top: 5%;
  margin-bottom: 5%;
  margin-left: 2%;
  visible: none;
`;

const FindPassword = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [userVerificationCode, setUserVerificationCode] = useState("");
  const [showInformMessage, setShowInformMessage] = useState(false);

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleVerificationCodeChange = (event) => {
    setUserVerificationCode(event.target.value);
  };

  const handleSubmit = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "email-auth-type": "findPw",
      },
      body: JSON.stringify({ id, email }),
    };

    try { // 아이디와 이메일이 일치하는지 확인
      const response = await fetch(
        "http://localhost:8123/users/checkIdwithEmail",
        requestOptions
      );
      if (response.status === 401) {
        alert("해당 id의 user가 존재하지 않습니다.");
        return;
      } else if (response.status === 409) {
        alert("아이디와 이메일이 일치하지 않습니다");
        return;
      }
      alert("이메일로 인증번호가 발송되었습니다.");
      setShowInformMessage(true);
    }
    catch (error) {
      console.error("Error:", error);
    }
    try { // 인증번호 발송
      const response = await fetch(
        "http://localhost:8123/users/verifyEmail/send",
        requestOptions
      );
      const data = await response.json();
      setVerificationCode(data.verificationCode);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleVerify = () => {
    if (verificationCode == userVerificationCode) {
      // string == number
      alert("인증되었습니다.");
      // 비밀번호 변경 페이지로 이동 <FindPwAfter />
      


    } else {
      alert("인증번호가 일치하지 않습니다.");
    }
  };

  return (
    <Container style={{ marginTop: "10%" }}>
      <TitleComponent style={{ marginBottom: "2%", padding: "1.5% 3.5%" }}>
        비밀번호 찾기
      </TitleComponent>
      <ProfileContainer>
        <InfoRowContainer style={{ padding: "10% 0" }}>
          <ContentContainer style={{}}>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <InputLine
                name="id"
                type="text"
                value={id}
                onChange={handleIdChange}
                placeholder="아이디를 입력해주세요."
              />
              <Btn
                $empty
                style={{
                  padding: "1.5%",
                  width: "120px",
                  marginLeft: "10px",
                  borderRadius: "10px",
                }}
              >
                여백맞춤
              </Btn>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              <InputLine
                style={{ marginBottom: "0px" }}
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="이메일을 입력해주세요."
              />
              <Btn
                $colored
                onClick={handleSubmit}
                style={{
                  padding: "1.5%",
                  width: "120px",
                  marginLeft: "10px",
                  borderRadius: "10px",
                }}
              >
                인증요청
              </Btn>
            </div>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <InputLine
                style={{ marginBottom: "0px" }}
                onChange={handleVerificationCodeChange}
                type="text"
                placeholder="인증번호"
              />
              <Btn
                $colored
                onClick={handleVerify}
                style={{
                  padding: "1.5%",
                  width: "120px",
                  marginLeft: "10px",
                  borderRadius: "10px",
                }}
              >
                인증하기
              </Btn>
            </div>

            {showInformMessage ? (
              <InformMessage>
                회원님의 아이디로 이메일로 전송되었습니다.
              </InformMessage>
            ) : (
              <InformMessage style={{ visibility: "hidden" }}>
                회원님의 아이디로 이메일로 전송되었습니다.
              </InformMessage>
            )}
            <div style={{ marginLeft: "2%" }}>
              본인확인 이메일 주소와 입력한 이메일 주소가 같아야,
              <br /> 인증번호를 받을 수 있습니다.
            </div>
          </ContentContainer>
        </InfoRowContainer>
      </ProfileContainer>
    </Container>
  );
};

export default FindPassword;