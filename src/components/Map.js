import { MapContainer, TileLayer, useMap } from "react-leaflet";
import UserLocation from "./UserLocation";

import Routing from "./Routing";

export default function Map() {
  return (
    <MapContainer
      center={[20.593683, 78.962883]}
      zoom={5}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <UserLocation />
      <Routing />
    </MapContainer>
  );
}
