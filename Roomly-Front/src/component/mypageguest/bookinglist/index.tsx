import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import './style.css'
import onStar from './onstar.png'
import disableStar from './disablestar.png'
import { SignInUser } from 'src/stores';
import { useCookies } from 'react-cookie';
import { UseInformation } from 'src/types';
import { ResponseDto } from 'src/apis/guestmypage';
import { GetReservationListResponseDto } from 'src/apis/guestmypage/dto/response/get-reservationlist.response.dto';
import { GUEST_ACCESS_TOKEN } from 'src/constants';
import { getReservationListRequest, PostReviewRequest } from 'src/apis';
import PostReviewRequestDto from 'src/apis/hostmypage/dto/request/post-review.request.dto'

interface Props {
    bookingDate: string;
    bookingPrice: number;
    accommodationImage: string;
    accommodationName: string;
    roomName: string;
    totalNight: number;
    roomCheckIn: string;
    roomCheckOut: string;
    reservationTotalPeople: string;
    reservationNumber: number;
    onReviewSendClick?: (() => void)
}

export default function BookingList({
    bookingDate,
    bookingPrice,
    accommodationImage,
    accommodationName,
    roomName,
    totalNight,
    roomCheckIn,
    roomCheckOut,
    reservationTotalPeople,
    reservationNumber,
    onReviewSendClick
}: Props) {

    const navigator = useNavigate();

    const { signInUser } = SignInUser();

    const [reviewWrite, setReviewWrite] = useState<boolean>(false);
    const [scoreOne, setScoreOne] = useState<boolean>(false);
    const [scoreTwo, setScoreTwo] = useState<boolean>(false);
    const [scoreThree, setScoreThree] = useState<boolean>(false);
    const [scoreFour, setScoreFour] = useState<boolean>(false);
    const [scoreFive, setScoreFive] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [userId, setUserID] = useState<string>('');
    const [cookies, setCookie] = useCookies();
    const [reivewcontents, setReivewcontents] = useState<string>('');

    useEffect(() => {
        if (!signInUser) return;  // signInUser가 없다면 리턴
        setUserID(signInUser.guestId);  // userId 업데이트
    }, [signInUser]);  // signInUser가 변경될 때마다 실행

    // 불러온 예약 숙소 개수 //
    // const reservationListRef = useRef<UseInformation[]>([]);
    const [reservationList, setReservationList] = useState<UseInformation[]>([]);

    const getReservationListResponse = (responseBody: GetReservationListResponseDto | ResponseDto | null) => {
    const message =
        !responseBody ? '서버에 문제가 있습니다. ' :
            responseBody.code === 'AF' ? '잘못된 접근입니다. ' :
                responseBody.code === 'DBE' ? '서버에 문제가있습니다. ' : '';
    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
        alert(message);
        return;
    };
    const { getReservationStatusResultSets } = responseBody as GetReservationListResponseDto;
    
    setReservationList(getReservationStatusResultSets);
    // reservationListRef.current = reservation;
    }

    useEffect(() => {
        const guestAccessToken = cookies[GUEST_ACCESS_TOKEN];
        if (!guestAccessToken || !userId) return;  // userId가 설정되지 않으면 리턴
        getReservationListRequest(userId, guestAccessToken).then(getReservationListResponse);
    }, [userId])

    
    /** 
     * event handler: 클릭시 관련된 숙소 상세 페이지로 이동  
     * detail: 지금은 메인으로 이동하게 해놓음
     */
    const onClickListComponent = () => {
        navigator('/main')

    }

    const onClickReviewWriteHandler = () => {
        if (reviewWrite) {
            setReviewWrite(false)
            return;
        }
        setReviewWrite(true)
    }

    const onClickSubmissionHandler = () => {
        setReviewWrite(false)
    }

    const onClickOneOnStar = () => {
        setScoreTwo(false)
        setScoreThree(false)
        setScoreFour(false)
        setScoreFive(false)
    }
    const onClickTwoOnStar = () => {
        setScoreThree(false)
        setScoreFour(false)
        setScoreFive(false)
    }
    const onClickThreeOnStar = () => {
        setScoreFour(false)
        setScoreFive(false)
    }
    const onClickFourOnStar = () => {
        setScoreFive(false)
    }

    const onClickOneDisableStar = () => {
        setScoreOne(true)
    }
    const onClickTwoDisableStar = () => {
        setScoreOne(true)
        setScoreTwo(true)
    }
    const onClickThreeDisableStar = () => {
        setScoreOne(true)
        setScoreTwo(true)
        setScoreThree(true)
    }
    const onClickFourDisableStar = () => {
        setScoreOne(true)
        setScoreTwo(true)
        setScoreThree(true)
        setScoreFour(true)
    }
    const onClickFiveDisableStar = () => {
        setScoreOne(true)
        setScoreTwo(true)
        setScoreThree(true)
        setScoreFour(true)
        setScoreFive(true)
    }

    useEffect (() => {
        if (scoreFive) {setScore(5); return;}
        if (scoreFour) {setScore(4); return;}
        if (scoreThree) {setScore(3); return;}
        if (scoreTwo) {setScore(2); return;}
        if (scoreOne) {setScore(1); return;}
    } , [scoreOne, scoreTwo, scoreThree, scoreFour, scoreFive])

    const reivewResponse = (responseBody: ResponseDto | null) => {
        const message =
        !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'VF' ? '아이디와 비밀번호를 모두 입력하세요.' :
                responseBody.code === 'SF' ? '로그인 정보가 일치하지 않습니다.' :
                    responseBody.code === 'TCF' ? '서버에 문제가 있습니다.' :
                        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
        alert(message);
        return;
    }
    }

    const onClickSuccessButton = () => {
        if (!scoreOne) {
            alert('별점 1점이상으로 체크해 주세요')
            return;
        }

        const guestAccessToken = cookies[GUEST_ACCESS_TOKEN];
        const requestBody: PostReviewRequestDto = {
            reservationId: reservationNumber,
            reviewContent: reivewcontents,
            reviewGrade: score
        };
        PostReviewRequest(userId, requestBody, guestAccessToken).then(reivewResponse);


        setReviewWrite(false)
    }

    const onReivewChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setReivewcontents(event.target.value);
    };


    return (
        <div id='bookinglist-warpper'>
                        <div className='bookinglist-box'>
                            <div className='bookinglist-list-top-deatail'>
                                <div className='bookinglist-date'>{bookingDate}</div>
                                <div className='bookinglist-bill'>{bookingPrice}</div>
                            </div>
                            <div className='bookinglist-list-main-detail'>
                                <img className='bookinglist-list-image' src={accommodationImage} onClick={onClickListComponent} />
                                <div className='bookinglist-hotel-detail'>
                                    <div className='bookinglist-hotel-title'>{accommodationName}</div>
                                    <div className='bookinglist-hotel-room'>{roomName}</div>
                                </div>
                                <div className='bookinglist-detail-list'>
                                    <div className='bookinglist-stay'>{totalNight}</div>
                                    <div className='bookinglist-start-end-time'>
                                        <div className='bookinglist-start'>입실시간:{roomCheckIn}</div>
                                        <div className='bookinglist-end'>퇴실시간:{roomCheckOut}</div>
                                    </div>
                                    <div className='bookinglist-count-reviewbox'>
                                        <div className='bookinglist-count'>인원:{reservationTotalPeople}</div>
                                        {!reviewWrite && <button className='bookinglist-reviewbox' onClick={onClickReviewWriteHandler}>리뷰하기</button>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {reviewWrite && <div className='reviewwrite-box'>
                            <input className='reviewwrite-inputbox' type="text" value={reivewcontents} onChange={onReivewChangeHandler}/>
                            <div className='review-bottom-box'>
                                <div className='score-component'>
                                    {scoreOne && <img className='star-icon' src={onStar} alt="" onClick={onClickOneOnStar} />} {!scoreOne && <img className='star-icon' src={disableStar} alt="" onClick={onClickOneDisableStar} />}
                                    {scoreTwo && <img className='star-icon' src={onStar} alt="" onClick={onClickTwoOnStar} />} {!scoreTwo && <img className='star-icon' src={disableStar} alt="" onClick={onClickTwoDisableStar} />}
                                    {scoreThree && <img className='star-icon' src={onStar} alt="" onClick={onClickThreeOnStar} />} {!scoreThree && <img className='star-icon' src={disableStar} alt="" onClick={onClickThreeDisableStar} />}
                                    {scoreFour && <img className='star-icon' src={onStar} alt="" onClick={onClickFourOnStar} />} {!scoreFour && <img className='star-icon' src={disableStar} alt="" onClick={onClickFourDisableStar} />}
                                    {scoreFive && <img className='star-icon' src={onStar} alt="" />} {!scoreFive && <img className='star-icon' src={disableStar} alt="" onClick={onClickFiveDisableStar} />}
                                </div>
                                <div className='score-component'></div>
                                <div className='submission-button' onClick={onClickSuccessButton}>완료</div>
                            </div>
                        </div>}
                    </div>

    )
}
