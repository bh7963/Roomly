import React from "react";
import "./modal1.css";

interface ModalProps {
    isOpen1: boolean;
    closeModal1: () => void;
}

const ModalComponent1: React.FC<ModalProps> = ({ isOpen1, closeModal1 }) => {
    if (!isOpen1) return null;

    return (

        <div className="overlay2-modal1">
            <div className="modal1">
                <button onClick={closeModal1} className="closeButton">X</button>
                <h1 className="title1-modal1">숙소 이용규칙 및 취소/환불규정 동의(필수)</h1>
                <p className="title2-modal1">이용규칙</p>
                <div className="modal1-body1">
                    <p >최대 인원 초과 시 입실이 불가합니다.</p>
                    <p > 정원 기준 요금 외 인원 추가 요금을 포함하여 조식, 침구, 침대 등의 추가 요금은 예약 시 옵션으로 선택하여 선결제하실 수 있습니다. 선결제 하지 않거나 예약 시 옵션에 포함되지 않은 추가 비용이 있을 시 이는 현장결제 대상입니다.</p>
                    <p >제공 이미지는 배정된 객실과 다를 수 있습니다.</p>
                    <p >제공 정보는 숙소의 사정에 따라 변경될 수 있습니다.</p>
                    <p >미성년자는 보호자 동반 시 투숙이 가능합니다.</p>
                    <p > 반려동물은 숙소 규정에 따라 출입이 제한되오니 숙소별 상세정보를 꼭 확인해 주세요.</p>
                    <p > 체크인 시 배정의 경우, 객실과 베드 타입을 보장하지 않습니다.</p>
                    <p > 객실 타입에 시간이 별도 기재된 경우, 체크인/아웃 시간이 상이할 수 있습니다.</p>
                    <p > 업체 현장에서 객실 컨디션 및 서비스로 인해 발생된 분쟁은 Roomly에서 책임지지 않습니다.</p>
                </div>
                <p className="title3-modal1">취소/환불규정</p>
                <div className="modal1-body2">
                    <p> Roomly에서 판매되는 국내 호텔/리조트/펜션/게스트하우스/캠핑/홈앤빌라 상품은 예약/결제 후 10분 이내에는 무료취소 가능합니다. (단, 체크인 시간 경과 시 취소불가) </p>
                    <p>숙소 사정에 의해 취소 발생 시 100% 환불이 가능합니다.</p>
                    <p> 예약 상품 별 숙소 정보에 기재된 취소, 환불 규정을 반드시 확인 후 이용해주시기 바랍니다. </p>
                    <p> 예약/결제 10분 이후의 취소는 업체의 취소/환불 규정에 의거하여 적용됩니다. </p>
                    <p> 취소, 변경 불가 상품은 규정과 상관없이 취소, 변경이 불가합니다. </p>
                    <p> 당일 결제를 포함한 체크인 당일 취소는 취소, 변경이 불가합니다. </p>
                    <p> 단! 숙소의 객실 정보가 수시로 변경될 수 있으며 이로 인한 불이익은 여기어때가 책임지지 않습니다. </p>
                    <p> 취소/환불 규정에 따라 취소 수수료가 발생한 경우, 취소 수수료는 판매가(객실가격+추가옵션요금) 기준으로 계산됩니다. </p>
                    <p>객실과 추가옵션의 취소/환불 규정은 동일합니다.</p>
                    <p>추가옵션만 취소는 불가합니다.</p>
                </div>
            </div>
        </div>
    );
};

export default ModalComponent1;

