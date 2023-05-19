import styled from "styled-components";
import { useState } from "react";
import "../../css/customView/ViewAddress.css";

const StyledBorder = styled.div`
    width: 100%;
    padding-top: 13px;
    padding-bottom: 13px;

    /* 점선 넣기 */
    background-image: linear-gradient(90deg, #6368E3 50%, transparent 50%), linear-gradient(90deg, #6368E3 50%, transparent 50%), linear-gradient(#6368E3 50%, transparent 50%), linear-gradient(#6368E3 50%, transparent 50%);
    background-size: 20px 2px, 20px 2px, 2px 20px, 2px 20px;
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
    background-position: 0 0, 0 100%, 0 0, 100% 0;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center; /* 수평 중앙 정렬 */
    justify-content: start;

    /* 테두리 둥글게 */
    border-radius: 5px;

`;

const StyledAddrIcon = styled.img`

    width: 42px;
    height: 42px;
    margin-left: 23px;

    grid-column: 1/2;
    grid-row: 1/2;
    margin-right: 29px;
`;

const StyledEditInput = styled.div`
    border: none;
    outline: none;
    font-size: 20px;
    margin-left: 85px;
    font-family: 'NanumSquare_acR';
    grid-column: 1/2;
    grid-row: 1/2;
`;

const StyledEditAddIcon = styled.img`
`;

const StyledEditAddBtn = styled.button`
    margin-left: auto;
    margin-right: auto;
    justify-self: center;
    grid-column: 2/3;
    border: none;
    background: none;
`;

const StyledEditTrashIcon = styled.img`
    width: 32px;
    height: 32px;
    /*flex-shrink: 0; /* 아이템 크기 고정 */
    margin-right: 21px;
    grid-column: 3/4;
    margin-left: auto;
`;

const StyledView = styled.div`
    grid-column: 1/3;
    grid-row: 1/2;
    margin-left: 85px;
`;

const StyledViewRoad = styled.div`
    font-family: 'NanumSquare_acB';
    font-size: 18px;
    margin-bottom: 4px;
`;

const StyledViewLotNum = styled.div`
    font-family: 'NanumSquare_acR';
    font-size: 18px;
    color: #9B9B9B;
`;

const ViewAddress = () => {

    //모드
    const [mode, setMode] = useState("view");
    const [road, setRoad] = useState("경상북도 경주시 보문로 544");
    const [lot, setLot] = useState("천군동 191-5 경주월드")

    let content = null;
    // edit 모드일 때
    if (mode === "edit"){
        content = 
            <StyledBorder>
                <StyledAddrIcon src="image/ic_address.png"/>
                <StyledEditInput>주소 추가</StyledEditInput>
                <StyledEditAddBtn>
                    <StyledEditAddIcon src="image/ic_add_view.png"/>
                </StyledEditAddBtn>
                <StyledEditTrashIcon
                    src="image/ic_trash.png"    
                />
            </StyledBorder>
    }
    // view 모드
    else if (mode==="view"){
        content =
            <StyledBorder>
                <StyledAddrIcon src="image/ic_address.png"/>
                <StyledView>
                    <StyledViewRoad>{road}</StyledViewRoad>
                    <StyledViewLotNum>지번: {lot}</StyledViewLotNum>
                </StyledView>
            </StyledBorder>
    }
    return (
        <div>
            {content}
        </div>
    )
}

export default ViewAddress;