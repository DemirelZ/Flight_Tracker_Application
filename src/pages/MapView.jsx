import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import L from "leaflet";
import axios from "axios";
import { setRoute } from "../redux/slices/flightSlice";
import { options2 } from "../constants";

const MapView = ({ openModal }) => {
  const state = useSelector((store) => store);
  const [showLine, setShowLine] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const icon = L.icon({
    iconUrl: "/plane-i.png",
    iconSize: [25, 25],
    iconAnchor: [16, 16],
  });

  const showFlightLine = (id) => {
    setLoading(true);
    dispatch(setRoute([]));
    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${id}`,
        options2
      )
      .then((res) => {
        dispatch(setRoute(res.data.trail));
        setLoading(false);
      })
      .catch((err) => {
        console.log("err getting datas", err);
        setLoading(false);
      });

    setShowLine(!showLine);
  };

  return (
    <MapContainer
      center={[38.795923, 35.366686]}
      zoom={6}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {state.flights.map((fly) => (
        <Marker icon={icon} position={[fly.lat, fly.lng]}>
          <Popup>
            <div className="popup">
              <p>Code: {fly.code}</p>
              <button onClick={() => openModal(fly.id)}>Flight Detail</button>
              <button onClick={() => showFlightLine(fly.id)}>
                {loading
                  ? "Loading..."
                  : showLine
                  ? "don't show the route"
                  : "Show the route"}
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
      {showLine && <Polyline positions={state.route} />}
    </MapContainer>
  );
};

export default MapView;
