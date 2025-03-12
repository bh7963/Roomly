import React from "react";
import "./modal3.css";

interface ModalProps {
    isOpen3: boolean;
    accommodationName: string;
    closeModal3: () => void;
}

const ModalComponent3: React.FC<ModalProps> = ({ isOpen3, closeModal3, accommodationName }) => {
    if (!isOpen3) return null;

    return (
        <div className="overlay2-modal3">
            <div className="modal3">
                <button onClick={closeModal3} className="closeButton">X</button>
                <div className="policy__wrap provide_personal_agree__wrap">
                    <table>
                        <tbody>
                            <tr>
                                <th>제공받는 자</th>
                                <td>
                                    <b className="emphasis">{accommodationName}</b>
                                </td>
                            </tr>
                            <tr>
                                <th>제공 목적</th>
                                <td>
                                    <b className="emphasis">
                                        숙박예약서비스 이용계약 이행<br />
                                        (서비스 제공, 확인, 이용자 정보 확인)
                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <th>제공하는 항목</th>
                                <td>
                                    예약한 숙박서비스의 이용자 정보(예약자 이름, 휴대폰번호, 예약번호, 예약 업체명, 예약한 객실명, 결제금액)
                                </td>
                            </tr>
                            <tr>
                                <th>제공받는 자의 개인정보<br />보유 및 이용기간</th>
                                <td>
                                    <b className="emphasis">예약서비스 제공 완료 후 6개월</b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="paragraph_list">
                        ※ 위 동의 내용을 거부하실 수 있으나, 동의를 거부하실 경우 서비스를 이용하실 수 없습니다.
                    </p>
                    <p className="paragraph_list">
                        ※ 개인정보 처리와 관련된 상세 내용은 '개인정보처리방침'을 참고
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ModalComponent3;
