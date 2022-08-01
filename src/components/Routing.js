import { useEffect, useContext, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import axios from "axios";
import { ApplicationContext } from "../App";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

export default function Routing() {
  const { data } = useContext(ApplicationContext);
  const { list, setList } = useContext(ApplicationContext);
  let templat = parseFloat(data.latitude);
  let templng = parseFloat(data.longitude);
  const map = useMap();

  const [json, setJson] = useState([]);

  useEffect(() => {
    axios
      .get("/data")
      .then((res) => {
        setJson(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    json.map((data) => {
      if (!map) return;
      if (!templat || !templng) return;
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(templat, templng),
          L.latLng(data.latitude, data.longitude),
        ],
        routeWhileDragging: true,
      }).addTo(map);

      routingControl.on("routesfound", function (e) {
        var routes = e.routes;
        var summary = routes[0].summary;
        // alert distance and time in km and minutes
        setList((current) => [
          ...current,
          { name: data.name, dist: summary.totalDistance / 1000 },
        ]);
      });
      return () => map.removeControl(routingControl);
    });
  }, [map, templat, templng]);

  return null;
}
