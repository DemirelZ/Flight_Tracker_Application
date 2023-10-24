import { useEffect, useState } from "react";
import Header from "./components/Header";
import MapView from "./pages/MapView";
import ListView from "./pages/ListView";
import { useDispatch } from "react-redux";
import { getFlights } from "./redux/actions/flightActions";
import DetailModal from "./components/DetailModal";

function App() {
  const dispatch = useDispatch();
  const [showMapView, setShowMapView] = useState(true);

  const [showDetail, setShowDetail] = useState(false);
  const [detailId, setDetailId] = useState(null);

  useEffect(() => {
    // setInterval(()=>{
    //   dispatch(getFlights());
    // },5000)

    dispatch(getFlights());
  }, []);

  const openModal = (id) => {
    setShowDetail(true);
    setDetailId(id);
  };

  return (
    <>
      <Header />
      <div className="view-buttons">
        <button
          className={showMapView ? "active" : ""}
          onClick={() => setShowMapView(true)}
        >
          Map View
        </button>
        <button
          className={!showMapView ? "active" : ""}
          onClick={() => setShowMapView(false)}
        >
          List View
        </button>
      </div>

      {showMapView ? (
        <MapView openModal={openModal} />
      ) : (
        <ListView openModal={openModal} />
      )}
      {showDetail && (
        <DetailModal
          detailId={detailId}
          closeModel={() => setShowDetail(false)}
        />
      )}
    </>
  );
}

export default App;
