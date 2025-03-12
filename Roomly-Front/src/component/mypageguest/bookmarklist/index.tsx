import './style.css'

interface Props {
    hotelImage: string;
    hotelName: string;
    hotelAddress: string;
    hotelScore: string;
    onClick?: ( ) => void;
}

export default function BookMarkList(
   { hotelImage,
    hotelName,
    hotelAddress,
    hotelScore,
    onClick} : Props
) {


    return (
        <div id='bookmark-wrapper'>
            <div className='bookmark-image'>
                <img src={hotelImage} alt="" />
                <div className='bookmark-image-element'></div>
            </div>
            <div className='bookmark-detail'>
                <div className='bookmark-hotel-name'>{hotelName}</div>
                <div className='bookmark-hotel-address'>{hotelAddress}</div>
                <div className='bookmark-hotel-score-navigator'>
                    <div className='bookmark-hotel-score'>{hotelScore}/5</div>
                    <div className='bookmark-hotel-navigator' onClick={onClick}>바로가기</div>
                </div>
            </div>
        </div>
    )
}
