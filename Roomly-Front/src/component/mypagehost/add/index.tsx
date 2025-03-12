import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css';
import HostList from '../ReservationStatusList';
import ReservationStatusList from '../ReservationStatusList';
import { useNavigate } from 'react-router-dom';



interface Props {
    titletext: string;
    username: string;
    activite: boolean;
}

export default function Add({ titletext, username, activite }: Props) {
    const [password, setPassword] = useState<string>('');
    const [checkPassword, setCheckPassword] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // 한 페이지에 표시할 항목 수\

    const navigator = useNavigate();

    // 비밀번호 변경 핸들러
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const onCheckPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setCheckPassword(event.target.value);
    };

    useEffect(() => {
        if (password && checkPassword) {
            const equal = password === checkPassword;
            // 비밀번호 일치 여부를 확인하는 로직 추가 가능
        }
    }, [password, checkPassword]);

    // 페이지 변경 핸들러
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const totalItems = 40;  // 총 아이템 수 (예시로 5개로 설정)
    const totalPages = Math.ceil(totalItems / itemsPerPage); // 페이지 수 계산

    // 현재 페이지에 표시할 BookingList 컴포넌트 배열
    const currentItems = Array(totalItems)
        .fill(<ReservationStatusList />)
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // 페이지 번호 배열 생성
    const pageNumbers = [...Array(totalPages)].map((_, i) => i + 1);

    const onClickMoveAdd = () => {
        navigator('/mypagehost/enrollment')
    }

    return (
        <>
            {activite && (
                <div id="reservationstatus-wrapper">
                    <div className="reservationstatus-title">
                        <div className="reservationstatus-title-text">{titletext}</div>
                        <div className="reservationstatus-title-box">
                            <div className='qwer123-123'>
                            <div className="information-title-detail-username">
                                '{username}'
                            </div>
                            <div className="reservationstatus-title-detail">님 반갑습니다.</div>
                            </div>
                            <div className='add-button' onClick={onClickMoveAdd}>추가하기</div>
                        </div>

                    </div>
                    <div className="reservationstatus-main">
                        {currentItems}
                    </div>
                    <div className="pagination">
                        {/* 이전 버튼 */}
                        <button 
                            className="page-arrow" 
                            onClick={() => handlePageChange(currentPage - 1)} 
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>

                        {/* 페이지 번호 */}
                        {pageNumbers.slice(0, 5).map((pageNum) => (
                            <button
                                key={pageNum}
                                className={currentPage === pageNum ? 'active' : ''}
                                onClick={() => handlePageChange(pageNum)}
                            >
                                {pageNum}
                            </button>
                        ))}

                        {/* 다음 버튼 */}
                        <button 
                            className="page-arrow" 
                            onClick={() => handlePageChange(currentPage + 1)} 
                            disabled={currentPage === totalPages}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
