import './style.css';
import "react-datepicker/dist/react-datepicker.css";
import './Calendar.css';
import Topbar from 'src/component/topbar';
import ImageSlider6 from 'src/component/ImageSlider6';
import ImageSlider4 from 'src/component/imageSlider4';
import DistimctionButton from 'src/component/distinctionbutton';


import { useNavigate } from 'react-router';

import { mainImages } from 'src/resources/images/main';
import { ACCOMMODATION_LIST_PATH } from 'src/constants';
import { proposeImages } from 'src/resources/images/propose';
import { ChangeEvent, useEffect, useState } from 'react';
import CalendarEnd from 'src/component/Calendar';
import { RegionImages } from 'src/resources/images/region';
import DatePicker from 'react-datepicker';
import Calendar from 'react-calendar';
import Bottombar from 'src/component/bottombar';


type ValuePiece = Date | null ;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type DateString = string | undefined;

// component: 메인페이지 화면 컴포턴트 //
export default function Main() {

    // 대문 글자 //
    const imagetext = '여행은 역시 Roomly.'

    // state: 년 월 일 상태 관리 //
    const today: Date = new Date();
    const year: number = today.getFullYear();
    const month: number = today.getMonth() + 1; // 월은 0~11을 불러오기 떄문에 1을 추가해야한다 //
    const date: number = today.getDate();

    const getNextDay = (date: Date) => {
        const nextDay = new Date(date); // 주어진 날짜를 복사
        nextDay.setDate(date.getDate() + 1); // 하루를 추가
        return nextDay;
    };

    const nextDay = getNextDay(today);
    const nextYear: number = nextDay.getFullYear();
    const nextMonth: number = nextDay.getMonth() + 1; // 월은 0~11을 불러오기 떄문에 1을 추가해야한다 //
    const nextDate: number = nextDay.getDate();


    const [Region, setRegion] = useState<string>('');
    const [start, setStart] = useState<string>(`${year}-${month}-${date}`);
    const [end, setEnd] = useState<string>(`${nextYear}-${nextMonth}-${nextDate}`);
    const [count, setCount] = useState<string>('2');
    const [endDate, setEndDate] = useState<Value>(new Date());
    const [endStart, setStartDate] = useState<Value>(new Date());

    // state: 분류 버튼 상태 관리 //
    const [click, setClick] = useState<string>('전체');

    // function: 네비게이터 함수 //
    const navigator = useNavigate();

    // event handler: 분류 버튼 클릭 이벤트 핸들러 //
    const onClickButtonHandler = (distimction: string) => {
        setClick(distimction);
    }

    // event handler: 지역입력값 입력 이벤트 핸들러 //
    const onRegionChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setRegion(value);
    }

    // event handler: 시작날짜 입력 이벤트 핸들러 //
    const onStartChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setStart(value);
    }

    // event handler: 종료날짜 입력 이벤트 핸들러 //
    const onEndChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setEnd(value);
    }

    // event handler: 인원수 입력 이벤트 핸들러 //
    const onCountChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setCount(value);
    }


    /** 
     * event handler: 예약 시작 날짜 변경 이벤트 핸들러 */
    const onChangeStartDateHandler = (value: Value) => {

        setStartDate(value);
    
        if (!value) return;
        const word= value.toString();
        const wordpart = word.split(' ');

        let endMonth : string ='';
        let endDay : string ='';
        let endYear : string ='';
        if (wordpart[1] === 'Jan') endMonth = '1'
        if (wordpart[1] === 'Feb') endMonth = '2'
        if (wordpart[1] === 'Mar') endMonth = '3'
        if (wordpart[1] === 'Apr') endMonth = '4'
        if (wordpart[1] === 'May') endMonth = '5'
        if (wordpart[1] === 'Jun') endMonth = '6'
        if (wordpart[1] === 'Jul') endMonth = '7'
        if (wordpart[1] === 'Aug') endMonth = '8'
        if (wordpart[1] === 'Sep') endMonth = '9'
        if (wordpart[1] === 'Oct') endMonth = '10'
        if (wordpart[1] === 'Nov') endMonth = '11'
        if (wordpart[1] === 'Dec') endMonth = '12'

        endDay = wordpart[2];
        endYear = wordpart[3];
        setStart(`${endYear}-${endMonth}-${endDay}`)

        console.log(today)
    }

    

    /** 
     * event handler: 예약 마지막 날짜 변경 이벤트 핸들러 */
    const onChangeEndDateHandler = (value: Value) => {

        setEndDate(value);
    
        if (!value) return;
        const word= value.toString();
        const wordpart = word.split(' ');

        let startMonth : string ='';
        let startDay : string ='';
        let startYear : string ='';
        if (wordpart[1] === 'Jan') startMonth = '1'
        if (wordpart[1] === 'Feb') startMonth = '2'
        if (wordpart[1] === 'Mar') startMonth = '3'
        if (wordpart[1] === 'Apr') startMonth = '4'
        if (wordpart[1] === 'May') startMonth = '5'
        if (wordpart[1] === 'Jun') startMonth = '6'
        if (wordpart[1] === 'Jul') startMonth = '7'
        if (wordpart[1] === 'Aug') startMonth = '8'
        if (wordpart[1] === 'Sep') startMonth = '9'
        if (wordpart[1] === 'Oct') startMonth = '10'
        if (wordpart[1] === 'Nov') startMonth = '11'
        if (wordpart[1] === 'Dec') startMonth = '12'

        startDay = wordpart[2];
        startYear = wordpart[3];
        setEnd(`${startYear}-${startMonth}-${startDay}`)
    }

    // event handler: 검색 버튼 클릭 이벤트 핸들러 //
    const onSerchButtonClick = () => {
        if (!Region) {
            alert('지역을 입력해 주세요!');
            return;
        };
        if (!start || !end) {
            alert('날짜를 입력해 주세요!');
            return;
        };
        if (!count) {
            alert('인원수를 입력해 주세요!')
            return
        };

        navigator(`${ACCOMMODATION_LIST_PATH}?Region=${Region}&start=${start}&end=${end}&count=${count}`)
    }

    // event handler: 인기 지역 클릭 이벤트 핸들러 //
    const onClickSerchRegionChangeHandler = (text: string) => {
        navigator(`${ACCOMMODATION_LIST_PATH}?Region=${text}&start=${start}&end=${end}&count=${count}`)

    }

    const [openEndCalender, setEndOpenCalender] = useState<boolean>(false);
    const [openStartCalender, setStartOpenCalender] = useState<boolean>(false);

    // event handler: 종료날짜 입력 이벤트 핸들러 //
    const onEndClickHandler = () => {
        if (openEndCalender) {
            setEndOpenCalender(false);
            return
        }
        setEndOpenCalender(true);
    }

    // event handler: 종료날짜 입력 이벤트 핸들러 //
    const onstartClickHandler = () => {
        if (openStartCalender) {
            setStartOpenCalender(false);
            return
        }
        setStartOpenCalender(true);
    }



    return (
        <>
            <Topbar />
            <div id="main-wrapper" >
                <div className='main-detail' >
                        <img className='main-image' src={mainImages} alt="이제된다 ㅋㅋㅋ 개꿀" />
                        <div className='main-image-text'> {imagetext} </div>
                    <div className='main-search-bar'>
                        <div className='destination'>
                            <div className='word'>where to?</div>
                            <input className='search' value={Region} onChange={onRegionChangeHandler} />
                        </div>
                        {/* <div className='check-in'>
                            <div className='word'>입실 날짜</div>
                            <input className='search' defaultValue={`${year}-${month}-${date}`} value={start} type='date' placeholder='입실 날짜를 입력하세요' onChange={onStartChangeHandler}/>
                        </div> */}
                        <div className='check-out'>
                            <div className='word'>check-in</div>
                            <button className='calendar-button' onClick={onstartClickHandler} >
                                <div>{start}</div>
                            </button>
                            <div className='123' style={{ position: 'absolute', right: 0, top: '74px' }} > 
                                {openStartCalender && <Calendar onChange={onChangeStartDateHandler} defaultValue={start} formatDay={(locale, date) => new Date(date).toLocaleDateString("en-us", {day: "2-digit",})
                    }/>}
                            </div>

                        </div>
                        <div className='check-out'>
                            <div className='word'>check-out</div>
                            <button className='calendar-button' onClick={onEndClickHandler} >
                                <div>{end}</div>
                            </button>
                            <div className='123' style={{ position: 'absolute', left: 0, top: '74px' }} >
                                {openEndCalender && <Calendar onChange={onChangeEndDateHandler} defaultValue={end} formatDay={(locale, date) => new Date(date).toLocaleDateString("en-us", {day: "2-digit",})
                    } />}
                            </div>
                        </div>
                        <div className='people'>
                            <div className='word'>people</div>
                            <input className='search' defaultValue={'2'} value={count} onChange={onCountChangeHandler} />
                        </div>
                        <button className='search-button' onClick={onSerchButtonClick}>search</button>
                    </div>
                    <div className='image-slider'>

                        <ImageSlider6 title='국내 인기 여행지' imageContents={RegionImages} onClick={onClickSerchRegionChangeHandler} />

                    </div>
                    <div className='distimction-warpper'>
                        <div className='distimction-title'>여행 추천 숙소</div>
                        <div className='distimction-column'>
                            <DistimctionButton text='전체' activite={click === '' || click === '전체'} onClick={onClickButtonHandler} />
                            <DistimctionButton text='모텔' activite={click === '' || click === '모텔'} onClick={onClickButtonHandler} />
                            <DistimctionButton text='호텔' activite={click === '' || click === '호텔'} onClick={onClickButtonHandler} />
                            <DistimctionButton text='리조트' activite={click === '' || click === '리조트'} onClick={onClickButtonHandler} />
                            <DistimctionButton text='펜션' activite={click === '' || click === '펜션'} onClick={onClickButtonHandler} />
                        </div>
                        <ImageSlider4 imageContents={proposeImages} />
                    </div>
                </div>
            </div>
            <div style={{ paddingTop: '400px' }} />
            <Bottombar />
        </>
    )

}