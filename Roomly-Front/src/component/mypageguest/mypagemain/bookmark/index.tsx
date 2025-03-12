import { ChangeEvent, useEffect, useState } from 'react'
import BookMarkList from '../../bookmarklist';
import { GetBookMarkListResponseDto } from 'src/apis/guestmypage/dto/response/get-bookmarklist.response.dto';
import { ResponseDto } from 'src/apis/guestmypage';
import { BookMarkListType } from 'src/types';
import { useCookies } from 'react-cookie';
import { GUEST_ACCESS_TOKEN } from 'src/constants';
import { SignInUser } from 'src/stores';
import { getBookMarkListRequest } from 'src/apis';
import { useNavigate } from 'react-router';

interface Props {
    titletext: string;
    username: string;
    activite: boolean;
}

export default function BookMark({ titletext, username, activite }: Props) {

    const [bookMarkList, setBookMarkList] = useState<BookMarkListType[]>([]);
    const [userId, setUserID] = useState<string>('');
    const [cookies, setCookie] = useCookies();

    const { signInUser } = SignInUser();
    
    const navigator = useNavigate();

    const getBookMarkListResponse = (responseBody: GetBookMarkListResponseDto | ResponseDto | null) => {
        const message =
            !responseBody ? '서버에 문제가 있습니다. ' :
                responseBody.code === 'AF' ? '잘못된 접근입니다. ' :
                    responseBody.code === 'DBE' ? '서버에 문제가있습니다. ' : '';
        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        };
        const { bookMarkResultSets } = responseBody as GetBookMarkListResponseDto;
        setBookMarkList(bookMarkResultSets);
        console.log(bookMarkResultSets)
    }
    useEffect(() => {
        if (!signInUser) return;  // signInUser가 없다면 리턴
        setUserID(signInUser.guestId);  // userId 업데이트
    }, [signInUser]);  // signInUser가 변경될 때마다 실행

    useEffect(() => {
        const guestAccessToken = cookies[GUEST_ACCESS_TOKEN];
        if (!guestAccessToken || !userId) return;  // userId가 설정되지 않으면 리턴
        getBookMarkListRequest(userId, guestAccessToken).then(getBookMarkListResponse);
    }, [userId])

    const onClickBookMarkGoingHandler = () => {
        navigator(`/main`)
    }

    const onClickMainavigator = () => {
        navigator(`/main`)
    }



    return (
        <>
            {activite && (
                <div id="booking-wrapper">
                    <div className="booking-title">
                        <div className="booking-title-text">{titletext}</div>
                        <div className="booking-title-box">
                            <div className="information-title-detail-username">
                                '{username}'
                            </div>
                            <div className="booking-title-detail">님 반갑습니다.</div>
                        </div>
                    </div>
                    <div className="booking-main">
                    {bookMarkList && bookMarkList.length > 0 ? (
                        bookMarkList.map(bookMark => 
                        <BookMarkList
                        hotelImage= {bookMark.accommodationMainImage}
                        hotelName = {bookMark.accommodationName}
                        hotelAddress = {bookMark.accommodationAddress}
                        hotelScore  = {bookMark.accommodationGradeSum}
                        onClick = {onClickBookMarkGoingHandler}
                    />)):(
                        <div className="no-results">
                          <p>즐겨 찾기 내역이 없습니다.</p>
                          <div className='main-navigtor-button' onClick={onClickMainavigator}>메인으로 돌아가기</div>
                        </div>)}
                    </div>
                </div>
            )}
        </>
    );
}
