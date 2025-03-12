import { useNavigate } from 'react-router-dom';
import './style.css';

export default function Bottombar() {

    const navigate = useNavigate();

    //event handler: 카카오톡 문의 버튼 핸들러 //
    const kakaoClickHandler = () => {
        window.open('http://pf.kakao.com/_axcqVn', '_blank', 'noopener,noreferrer');
    };

    //event handler: FAQ 버튼 핸들러 //
    const faqClickHandler = () => {
        navigate('/faq');
    };

    //event handler: 회사소개 버튼 핸들러 //
    const roomlyCompanyPageClickHandler = () => {
        navigate('/roomly-company');
    };

    return (
        <div id="footer-wrapper">
            <div className="footer">
                <div className="top-footer">
                    <div className="top-footer1">
                        <div className="top-footer1-title">문의센터</div>
                        <div className="top-footer1-content1">카카오톡 문의: 오전 9시 ~ 새벽 3시 운영</div>
                        <div className="top-footer1-content2">FAQ: 24시간 운영</div>
                        <div className="top-footer1-button">
                            <button className='top-footer1-kakao' onClick={kakaoClickHandler}>카카오톡 문의</button>
                            <button className="top-footer1-faq" onClick={faqClickHandler}>FAQ</button>
                        </div>
                    </div>
                    <div className="top-footer2">
                        <div className="top-footer2-title">회사</div>
                        <div className="top-footer2-content" onClick={roomlyCompanyPageClickHandler}>회사소개</div>
                    </div>
                    <div className="top-footer3">
                        <div className="top-footer3-title">인기 검색 키워드</div>
                        <div className="top-footer3-content1">여행 추천 숙소</div>
                        <div className="top-footer3-content2">국내 인기 여행지</div>


                    </div>
                    <div className="top-footer4">
                        <div className="top-footer4-title">회원정보</div>
                        <div className="top-footer4-content1">마이페이지</div>
                        <div className="top-footer4-content2">로그아웃</div>
                    </div>
                </div>
                <div className="bottom-footer">
                    <div className="bottom-footer1">
                        <div className="bottom-footer1-content1">(주)Roomly</div>
                        <div className="bottom-footer1-content2">주소 : 부산광역시 부산진구 부전로, Roomly타워 | 대표이사 : 김나연 | 사업자등록번호 : 000-00-00000사업자정보확인</div>
                        <div className="bottom-footer1-content3">전자우편주소 : qwer1234@roomly.com | 통신판매번호 : 0000-부산서면-00000 | 관광사업자 등록번호 : 제0000-00호 | 전화번호 : 0000-0000 | 호스팅서비스제공자의 상호 표시 : (주)Roomly</div>
                        <div className="bottom-footer1-content4">(주)Roomly는 통신판매중개자로서 통신판매의 당사자가 아니며, 상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.</div>
                    </div>
                    <div className="bottom-footer2">
                        <div className="bottom-footer2-content1">Team C</div>
                        <div className="bottom-footer2-content1-1">|</div>
                        <div className="bottom-footer2-content2">SoJin</div>
                        <div className="bottom-footer2-content2-1">|</div>
                        <div className="bottom-footer2-content3">SeongJoon</div>
                        <div className="bottom-footer2-content3-1">|</div>
                        <div className="bottom-footer2-content4">JinSeo</div>
                        <div className="bottom-footer2-content4-1">|</div>
                        <div className="bottom-footer2-content5">HyunWoo</div>
                        <div className="bottom-footer2-content5-1">|</div>
                        <div className="bottom-footer2-content6">NaYeon</div>
                        
                    </div>
                    <div className="bottom-footer3">Copyright Roomly COMPANY Corp. All rights reserved.</div>
                </div>
            </div>
            </div>
    )
}