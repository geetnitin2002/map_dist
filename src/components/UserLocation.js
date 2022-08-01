import { useContext, useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { ApplicationContext } from "../App";

function UserLocation() {
  const [position, setPosition] = useState(null);
  const { data, setData } = useContext(ApplicationContext);
  const map = useMap();
  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      let templat = (e.latitude).toString();
      let templng = (e.longitude).toString();
      setData({ ...data, latitude: templat, longitude: templng });
      map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;
      const circle = L.circle(e.latlng, radius);
      circle.addTo(map);
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position} draggable={false}>
      <Popup>
        You are here. <br />
      </Popup>
    </Marker>
  );
}
export default UserLocation;
