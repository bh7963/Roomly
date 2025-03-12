import React from "react";
import "./modal4.css";

interface ModalProps {
    isOpen4: boolean;
    closeModal4: () => void;
}

const ModalComponent4: React.FC<ModalProps> = ({ isOpen4, closeModal4 }) => {
    if (!isOpen4) return null;

    return (
        <div className="overlay2-modal4">
            <div className="modal4">
                <button onClick={closeModal4} className="closeButton">X</button>
                <div className="policy__wrap">
                    <p className="red">
                        Roomly는 <b>만 14세 미만 아동</b>의 <b>서비스 이용을 제한</b>하고 있습니다.
                    </p>
                    <p>
                        개인정보 보호법에는 만 14세 미만 아동의 개인정보 수집 시 법정대리인 동의를 받도록 규정하고 있으며, 
                        <b>만 14세 미만 아동이 법정대리인 동의 없이 서비스 이용이 확인된 경우 서비스 이용이 제한될 수 있음을 알려드립니다.</b>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ModalComponent4;
