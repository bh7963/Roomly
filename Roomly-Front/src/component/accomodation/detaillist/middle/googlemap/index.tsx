import {useEffect, useRef, useState} from "react";
interface GeoCodeResult{
  lat: number;
  lng: number;
}
function GoogleMap(){

  const ref = useRef<HTMLDivElement>(null);
  const [googleMap, setGoogleMap] = useState<google.maps.Map>();
  
  useEffect(() => {
    if (ref.current) {
      const initialMap = new window.google.maps.Map(ref.current, {
        center: {
          lat: 37.5,
          lng: 127.0,
        },
        zoom: 16,
      });

      setGoogleMap(initialMap);
    }
  }, []);

  return <div ref={ref} id="map" style={{ minHeight: '100vh' }} />
}

export default GoogleMap;