
import "./style.css";


const FacilitiesCard = () => {


  return (
    <div id="facilitiesCard-middle-wrapper"  >
      <div className="facilitiesCard-middle-title">서비스 및 부대시설</div>
      
      <div className="facilities-middle-card">
        <div className="facilities-middle-item">
          <div className="facility-middle-icon dog-icon"></div>
          <div className="facility-middle-icon-title">애견 동반</div>
          </div>
        <div className="facilities-middle-item">
          <div className="facility-middle-icon smoke-free-icon" ></div>
          <div className="facility-middle-icon-title">금연 객실</div>
        </div>
        <div className="facilities-middle-item">
          <div className="facility-middle-icon spa-icon"></div>
          <div className="facility-middle-icon-title">실내 스파</div>
        </div>
        <div className="facilities-middle-item">
          <div className="facility-middle-icon bbq-icon"></div>
          <div className="facility-middle-icon-title">바베큐 가능</div>
          
        </div>
        <div className="facilities-middle-item">
          <div className="facility-middle-icon wifi-icon"></div>
          <div className="facility-middle-icon-title">와이파이</div>
          
        </div>
        <div className="facilities-middle-item">
          <div className="facility-middle-icon parking-icon"></div>
          <div className="facility-middle-icon-title">주차시설</div>
          
        </div>
        <div className="facilities-middle-item">
          <div className="facility-middle-icon pool-icon"></div>
          <div className="facility-middle-icon-title">수영장</div>
        </div>
      </div>
    </div>
  );
}

export default FacilitiesCard