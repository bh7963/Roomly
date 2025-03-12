import React, { useEffect, useState } from 'react'
import "./style.css"
import Topbar from 'src/component/topbar'
import MypageCatalogButton from 'src/component/mypageguest/mypagecatalogbutton';
import Information from 'src/component/mypageguest/mypagemain/information';
import { useCookies } from 'react-cookie';
import { MAIN_PATH } from 'src/constants';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Booking from 'src/component/mypageguest/mypagemain/booking';
import BookMark from 'src/component/mypageguest/mypagemain/bookmark';
import { SignInUser } from 'src/stores';



export default function GuestMypage() {
    
    const { signInUser } = SignInUser();

    const [guestName, setGuestName] = useState<string>('');
    const [guestId, setGuestId] = useState<string>('');

        // 게스트 이름 불러오기
        useEffect(() => {
            if (!signInUser) return;
            setGuestName(signInUser.guestName)
            setGuestId(signInUser.guestId)
        }, [signInUser])

    const datail1 = "내정보관리"
    const datail2 = "예약내역"
    const datail3 = "즐겨찾기"

    const [click, setClick] = useState<string>(datail1)
    const [cookies, setCookie] = useCookies();

    const navigator = useNavigate();

    // event handler: 분류 버튼 클릭 이벤트 핸들러 //
    const onClickButtonHandler = (distimction: string) => {
        setClick(distimction);
    }

    const testValue = true;

    // useEffect(() => {
    //     if (!cookies['guestAccessToken']) navigator(MAIN_PATH);
    // }, [Topbar]);

    const ConSortArea = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    gap: 10px;
  `;


    return (
        <>
            <Topbar />
            <div id='mypage-wrapper'>
                <div id='mypage-container'>
                    <div className='guestMypage-side-bar'>
                        <MypageCatalogButton text={datail1} activite={click === datail1 || click === ''} onClick={onClickButtonHandler} />
                        <MypageCatalogButton text={datail2} activite={click === datail2 || click === ''} onClick={onClickButtonHandler} />
                        <MypageCatalogButton text={datail3} activite={click === datail3 || click === ''} onClick={onClickButtonHandler} />
                    </div>
                    <div className='guestMypage-main'>
                        <Information activite={click === datail1 || click === ''} titletext={datail1} username={guestName} />
                        <Booking activite={click === datail2 || click === ''} titletext={datail2} username={guestName} />
                        <BookMark activite={click === datail3 || click === ''} titletext={datail3} username={guestName} />
                    </div>
                </div>

            </div>
        </>
    )

}
