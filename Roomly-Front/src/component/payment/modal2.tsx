import React from "react";
import "./modal2.css";

interface ModalProps {
    isOpen2: boolean;
    closeModal2: () => void;
}

const ModalComponent2: React.FC<ModalProps> = ({ isOpen2, closeModal2 }) => {
    if (!isOpen2) return null;

    return (
        <div className="overlay2-modal2">
            <div className="modal2">
                <button onClick={closeModal2} className="closeButton">X</button>
                <h1 className="title1-modal2">개인정보 수집 및 이용(필수)</h1>
                <div className="policy__wrap personal_agree__wrap">
                    <table cellPadding="0" cellSpacing="0">
                        <colgroup>
                            <col width="10%" />
                            <col width="20%" />
                            <col width="40%" />
                            <col width="30%" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>구분</th>
                                <th>수집 목적</th>
                                <th>수집 항목</th>
                                <th>보유 및 이용기간</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>필수</td>
                                <td>예약/구매 서비스 제공 상담 및 부정거래 기록 확인</td>
                                <td>
                                    <div>
                                        <b>[예약·구매]</b><br />
                                        예약자 정보(이름, 휴대전화번호)
                                    </div>
                                    <br />
                                    <div>
                                        <b>[결제]</b><br />
                                        거래내역<br />
                                        *결제 시 개인정보는 PG사(결제대행업체)에서 수집 및 저장하고 있으며, 회사는 PG사에서 제공하는 거래 내역만 제공받음
                                    </div>
                                    <br />
                                    <div>
                                        <b>[거래명세서 발급]</b><br />
                                        이메일주소
                                    </div>
                                    <br />
                                    <div>
                                        <b>[현금영수증 발급]</b><br />
                                        휴대전화번호, 이메일주소
                                    </div>
                                    <br />
                                    <div>
                                        <b>[취소·환불]</b><br />
                                        은행명, 계좌번호, 예금주명
                                    </div>
                                </td>
                                <td>
                                    <b className="emphasis"><u>- 회원 탈퇴 시 까지</u></b><br />
                                    * 관계 법령에 따라 보존할 필요가 있는 경우 해당 법령에서 요구하는 기한까지 보유
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

export default ModalComponent2;