import React, { useState } from "react";
import {
  ModalContainer,
  ModalBox,
  ModalTitle,
  ContentBox,
  ModalContent,
} from "./InquireModal";
import axios from "axios";
import Btn from "./Btn";
import InputLine from "./InputLine";
import showPwIcon from "../../contents/showPwIcon.png";
import checkImg from "../../contents/check_img.png";
import IncorrectImg from "../../contents/incorrect_img.svg";
import styled from "styled-components";
import Cookies from "js-cookie";

const CheckImg = styled.img`
  width: 27px;
  height: 27px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const InputLineContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ChangePwModal = ({ isOpen, close, onOk, userInfo }) => {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  const [currentPw, setCurrentPw] = useState("");
  const [isCurrentPwCorrect, setIsCurrentPwCorrect] = useState(false);
  const [newPw, setNewPw] = useState("");
  const [newPwCheck, setNewPwCheck] = useState("");
  const [isValidPw, setIsValidPw] = useState(false);

  const handleOkClick = () => {
    // Call the onOk callback function and pass the newPw value
    onOk(newPw);
    close();
  };

  const handleCurrentPwChange = async (e) => {
    const currentPw = e.target.value; // 유저가 입력한 현재 비밀번호
    setCurrentPw(currentPw);

    // DB에 비밀번호 비교 요청
    try {
      const response = await axios.post(
        "/api/users/checkCurrentPw",
        {
          currentPassword: currentPw,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      if (response.status === 200) {
        // 비밀번호가 일치하면
        setIsCurrentPwCorrect(true);
      }
    } catch (error) {
      setIsCurrentPwCorrect(false);
      console.log(error);
    }
  };
  // 비밀번호 형식 검사 함수
  const validatePwFormat = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    return passwordRegex.test(password);
  };
  const handleNewPw = (e) => {
    const newPw = e.target.value;
    // 비밀번호 유효성 검사
    let validFormat = false;
    setNewPw(newPw);
    validFormat = validatePwFormat(newPw);

    if (validFormat) {
      // newPwCheck 와 같은지 확인
      if (newPw === newPwCheck) {
        // 같으면
        setIsValidPw(true);
      } else {
        // 다르면
        setIsValidPw(false);
      }
    }
  };
  const handleNewPwCheck = (e) => {
    const newPwCheck = e.target.value;
    // 비밀번호 유효성 검사
    let validFormat = false;
    setNewPwCheck(newPwCheck);
    validFormat = validatePwFormat(newPwCheck);

    if (validFormat) {
      // newPw 와 같은지 확인
      if (newPw === newPwCheck) {
        // 같으면
        setIsValidPw(true);
      } else {
        // 다르면
        setIsValidPw(false);
      }
    }
  };

  if (!isOpen) return null;
  return (
    <ModalContainer>
      <ModalBox>
        <ModalTitle>비밀번호 변경</ModalTitle>
        <ContentBox style={{ marginBottom: "3%" }}>
          <ModalContent>
            <InputLineContainer style={{ marginBottom: "2%" }}>
              <InputLine
                type="password"
                placeholder="현재 비밀번호"
                value={currentPw}
                onChange={handleCurrentPwChange}
              />
              {isCurrentPwCorrect ? (
                <CheckImg src={checkImg} />
              ) : (
                <CheckImg src={IncorrectImg} />
              )}
            </InputLineContainer>
            {/* 비밀번호 보기 <img src={showPwIcon}/> */}
            <InputLineContainer>
              <InputLine
                type="password"
                placeholder="변경할 비밀번호"
                value={newPw}
                onChange={handleNewPw}
              />
              {isValidPw ? (
                <CheckImg src={checkImg} />
              ) : (
                <CheckImg src={IncorrectImg} />
              )}
            </InputLineContainer>
            <InputLineContainer style={{ marginBottom: "5%" }}>
              <InputLine
                type="password"
                placeholder="비밀번호 확인"
                value={newPwCheck}
                onChange={handleNewPwCheck}
              />
              {isValidPw ? (
                <CheckImg src={checkImg} />
              ) : (
                <CheckImg src={IncorrectImg} />
              )}
            </InputLineContainer>
          </ModalContent>
          <Btn style={{ marginRight: "10%" }} onClick={close}>
            취소
          </Btn>
          <Btn $colored onClick={handleOkClick}>
            확인
          </Btn>
        </ContentBox>
      </ModalBox>
    </ModalContainer>
  );
};

export default ChangePwModal;
