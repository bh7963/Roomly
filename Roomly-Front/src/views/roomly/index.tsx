import React from 'react';
import './style.css';

export default function Roomly() {


    // event handler: 메인페이지 이동 버튼(회원가입 버튼 하단) 클릭 이벤트 처리
    const onMainPageGoClickHandler = () => {
        window.location.href = '/main'; // 이동할 페이지 경로 설정
    };

    return (<div id='roomly-body-wrapper'>
        <div id="roomly-top-wrapper">
            {/* roomly-bar at the top with full width */}
            <div id="roomly-bar" onClick={onMainPageGoClickHandler}>
                <div className='roomly-bar-text'>Roomly</div></div>

            <video className="roomly-video" autoPlay loop muted>
                <source src="/roomly.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Text overlay */}
            <div className="roomly-ment">
                너 나 우리, <br /> Roomly
            </div>
        </div>
        <div id='roomly-bottom-wrapper'>
            <div className='roomly-bottom-content1'>1</div>
            <div className='roomly-bottom-content2'>2</div>
            <div className='roomly-bottom-content3'>3</div>
            <div className='roomly-bottom-content4'>4</div>
        </div>
    </div>

    );
}